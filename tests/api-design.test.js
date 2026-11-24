import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CONCEPT_KEYS,
  HttpError,
  METHOD_KEYS,
  createRateLimiter,
  generateDesign,
  modelChain,
  normalizeDesign,
  parseInput,
  parseModelJson,
} from '../api/_lib/design.js';
import { GET, POST } from '../api/design.js';

const fullDesign = {
  summary: 'A summary.',
  method: Object.fromEntries(METHOD_KEYS.map((key) => [key, `${key} text`])),
  concepts: Object.fromEntries(CONCEPT_KEYS.map((key) => [key, `${key} text`])),
};

const geminiReply = (payload, extra = {}) =>
  new Response(
    JSON.stringify({
      candidates: [{ content: { parts: [{ text: JSON.stringify(payload) }] }, finishReason: 'STOP' }],
      ...extra,
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } },
  );

const expectHttpError = async (promiseOrFn, status, code) => {
  try {
    await (typeof promiseOrFn === 'function' ? promiseOrFn() : promiseOrFn);
    assert.fail('expected an HttpError');
  } catch (error) {
    assert.ok(error instanceof HttpError, `unexpected error: ${error}`);
    assert.equal(error.status, status);
    assert.equal(error.code, code);
  }
};

test('parseInput accepts a valid observation and normalizes spaces', () => {
  const input = parseInput(JSON.stringify({ observation: '  Plants   grow\ntoward the light  ', lang: 'es' }));
  assert.deepEqual(input, { observation: 'Plants grow toward the light', lang: 'es' });
});

test('parseInput falls back to English for unknown languages', () => {
  assert.equal(parseInput(JSON.stringify({ observation: 'Plants grow toward the light', lang: 'fr' })).lang, 'en');
});

test('parseInput rejects bad bodies', async () => {
  await expectHttpError(() => parseInput('not json'), 400, 'invalid_json');
  await expectHttpError(() => parseInput('[]'), 400, 'invalid_input');
  await expectHttpError(() => parseInput(JSON.stringify({ observation: 42 })), 400, 'invalid_input');
  await expectHttpError(() => parseInput(JSON.stringify({ observation: 'too short' })), 400, 'invalid_length');
  await expectHttpError(() => parseInput(JSON.stringify({ observation: 'a'.repeat(1201) })), 400, 'invalid_length');
  await expectHttpError(() => parseInput(JSON.stringify({ observation: 'a'.repeat(5000) })), 413, 'too_large');
});

test('parseModelJson handles code fences and surrounding text', () => {
  assert.deepEqual(parseModelJson('```json\n{"a":1}\n```'), { a: 1 });
  assert.deepEqual(parseModelJson('Here you go: {"a":2} thanks'), { a: 2 });
  assert.equal(parseModelJson('no json here'), null);
});

test('normalizeDesign keeps known string fields and rejects empty answers', () => {
  const design = normalizeDesign({ ...fullDesign, extra: 'ignored', method: { ...fullDesign.method, question: 7 } });
  assert.equal(design.method.question, '');
  assert.equal(design.extra, undefined);
  assert.equal(normalizeDesign({ summary: 'only this' }), null);
});

test('modelChain puts the configured model first without duplicates', () => {
  assert.deepEqual(modelChain(' custom-model '), ['custom-model', 'gemini-flash-latest', 'gemini-2.5-flash']);
  assert.deepEqual(modelChain('gemini-2.5-flash'), ['gemini-2.5-flash', 'gemini-flash-latest']);
});

test('generateDesign sends the key in a header, never in the URL', async () => {
  let seen;
  const fetchImpl = async (url, options) => {
    seen = { url, options };
    return geminiReply(fullDesign);
  };
  const result = await generateDesign({ apiKey: 'test-key', observation: 'Plants grow toward the light', lang: 'en', fetchImpl });
  assert.equal(result.model, 'gemini-flash-latest');
  assert.equal(result.design.summary, 'A summary.');
  assert.ok(!seen.url.includes('test-key'));
  assert.equal(seen.options.headers['x-goog-api-key'], 'test-key');
  const body = JSON.parse(seen.options.body);
  assert.equal(body.generationConfig.responseMimeType, 'application/json');
  assert.match(body.contents[0].parts[0].text, /Plants grow toward the light/);
});

test('generateDesign falls back to the next model on 404', async () => {
  const calls = [];
  const fetchImpl = async (url) => {
    calls.push(url);
    return calls.length === 1 ? new Response('{}', { status: 404 }) : geminiReply(fullDesign);
  };
  const result = await generateDesign({ apiKey: 'k', observation: 'x'.repeat(20), lang: 'en', fetchImpl });
  assert.equal(calls.length, 2);
  assert.equal(result.model, 'gemini-2.5-flash');
});

test('generateDesign maps upstream problems to stable error codes', async () => {
  const run = (response) =>
    generateDesign({ apiKey: 'k', observation: 'x'.repeat(20), lang: 'en', fetchImpl: async () => response() });
  await expectHttpError(run(() => new Response('{}', { status: 429 })), 429, 'upstream_busy');
  await expectHttpError(run(() => new Response('{}', { status: 403 })), 503, 'upstream_auth');
  await expectHttpError(
    run(() => new Response(JSON.stringify({ error: { message: 'API key not valid' } }), { status: 400 })),
    503,
    'upstream_auth',
  );
  await expectHttpError(run(() => geminiReply({}, { promptFeedback: { blockReason: 'SAFETY' } })), 422, 'blocked');
  await expectHttpError(run(() => geminiReply({ summary: 'only' })), 502, 'bad_output');
  await expectHttpError(run(() => new Response('{}', { status: 500 })), 502, 'upstream_error');
});

test('rate limiter blocks after the limit and recovers after the window', () => {
  const limited = createRateLimiter({ windowMs: 1000, max: 2 });
  assert.equal(limited('ip', 0), false);
  assert.equal(limited('ip', 10), false);
  assert.equal(limited('ip', 20), true);
  assert.equal(limited('ip', 1500), false);
});

test('HTTP handler: GET reports availability, POST validates and explains a missing key', async () => {
  const saved = process.env.GEMINI_API_KEY;
  delete process.env.GEMINI_API_KEY;
  try {
    assert.deepEqual(await GET().json(), { available: false });

    const post = (body, headers = { 'content-type': 'application/json', 'x-forwarded-for': '203.0.113.7' }) =>
      POST(new Request('http://localhost/api/design', { method: 'POST', headers, body }));

    const wrongType = await post('{}', { 'content-type': 'text/plain', 'x-forwarded-for': '203.0.113.8' });
    assert.equal(wrongType.status, 415);

    const invalid = await post(JSON.stringify({ observation: 'short' }));
    assert.equal(invalid.status, 400);
    assert.deepEqual(await invalid.json(), { error: 'invalid_length' });

    const noKey = await post(JSON.stringify({ observation: 'Plants on my windowsill grow toward the light.' }));
    assert.equal(noKey.status, 503);
    assert.deepEqual(await noKey.json(), { error: 'not_configured' });
    assert.equal(noKey.headers.get('cache-control'), 'no-store');
  } finally {
    if (saved === undefined) delete process.env.GEMINI_API_KEY;
    else process.env.GEMINI_API_KEY = saved;
  }
});
