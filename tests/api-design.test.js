import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CONCEPT_KEYS,
  GENERATION,
  HttpError,
  METHOD_KEYS,
  MODEL,
  RESPONSE_SCHEMA,
  createRateLimiter,
  generateDesign,
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

const jsonResponse = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

// A Messages API reply as the Anthropic API sends it.
const claudeReply = (payload, overrides = {}) =>
  jsonResponse({
    id: 'msg_test',
    type: 'message',
    role: 'assistant',
    model: 'claude-sonnet-5-5',
    content: [{ type: 'text', text: typeof payload === 'string' ? payload : JSON.stringify(payload) }],
    stop_reason: 'end_turn',
    stop_sequence: null,
    usage: { input_tokens: 10, output_tokens: 10 },
    ...overrides,
  });

const apiError = (status, type, message = 'test error') =>
  jsonResponse({ type: 'error', error: { type, message } }, status);

const expectHttpError = async (promiseOrFn, status, code) => {
  try {
    await (typeof promiseOrFn === 'function' ? promiseOrFn() : promiseOrFn);
    assert.fail('expected an HttpError');
  } catch (error) {
    assert.ok(error instanceof HttpError, `unexpected error: ${error?.name}`);
    assert.equal(error.status, status);
    assert.equal(error.code, code);
  }
};

const observation = 'Plants on my windowsill grow toward the light.';

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

test('the response schema is strict at every level', () => {
  for (const schema of [RESPONSE_SCHEMA, RESPONSE_SCHEMA.properties.method, RESPONSE_SCHEMA.properties.concepts]) {
    assert.equal(schema.type, 'object');
    assert.equal(schema.additionalProperties, false);
    assert.deepEqual([...schema.required].sort(), Object.keys(schema.properties).sort());
  }
});

test('generateDesign calls only Claude Sonnet 5.5, with the key in a header and fixed ceilings', async () => {
  let seen;
  const fetchImpl = async (url, init) => {
    seen = { url: String(url), init };
    return claudeReply(fullDesign);
  };
  const result = await generateDesign({ apiKey: 'test-key', observation, lang: 'en', fetchImpl });
  assert.equal(result.model, 'claude-sonnet-5-5');
  assert.equal(result.design.summary, 'A summary.');

  assert.match(seen.url, /^https:\/\/api\.anthropic\.com\/v1\/messages(\?|$)/);
  assert.ok(!seen.url.includes('test-key'));
  assert.ok(!seen.init.body.includes('test-key'));
  // This SDK version sends the API key as a bearer token.
  assert.equal(new Headers(seen.init.headers).get('authorization'), 'Bearer test-key');

  const body = JSON.parse(seen.init.body);
  assert.equal(body.model, MODEL);
  assert.equal(MODEL, 'claude-sonnet-5-5');
  assert.equal(body.max_tokens, GENERATION.maxTokens);
  assert.deepEqual(body.thinking, { type: 'between_tools' });
  assert.equal(body.output_config.effort, 'low');
  assert.equal(body.output_config.format.type, 'json_schema');
  assert.equal(body.stream, undefined);
  assert.equal(body.tools, undefined);
  assert.match(body.messages[0].content, /<observation>\nPlants on my windowsill grow toward the light\.\n<\/observation>/);
});

test('generateDesign maps API problems to stable error codes', async () => {
  const run = (makeResponse) =>
    generateDesign({ apiKey: 'k', observation, lang: 'en', fetchImpl: async () => makeResponse() });
  await expectHttpError(run(() => apiError(401, 'authentication_error')), 503, 'upstream_auth');
  await expectHttpError(run(() => apiError(403, 'permission_error')), 503, 'upstream_auth');
  await expectHttpError(run(() => apiError(429, 'rate_limit_error')), 503, 'upstream_busy');
  await expectHttpError(run(() => apiError(529, 'overloaded_error')), 503, 'upstream_busy');
  await expectHttpError(run(() => apiError(404, 'not_found_error')), 502, 'model_unavailable');
  await expectHttpError(run(() => apiError(400, 'invalid_request_error')), 502, 'upstream_rejected');
  await expectHttpError(run(() => apiError(500, 'api_error')), 502, 'upstream_error');
  await expectHttpError(run(() => claudeReply('', { stop_reason: 'refusal', content: [] })), 422, 'blocked');
  await expectHttpError(run(() => claudeReply('{"summary":"cut', { stop_reason: 'max_tokens' })), 502, 'bad_output');
  await expectHttpError(run(() => claudeReply({ summary: 'only' })), 502, 'bad_output');
});

test('generateDesign treats the spend limit as "AI unavailable"', async () => {
  const run = (makeResponse) =>
    generateDesign({ apiKey: 'k', observation, lang: 'en', fetchImpl: async () => makeResponse() });
  await expectHttpError(
    run(() => apiError(400, 'invalid_request_error', 'You have reached your specified workspace API usage limits.')),
    503,
    'unavailable',
  );
  await expectHttpError(
    run(() => apiError(400, 'invalid_request_error', 'Your credit balance is too low to access the Anthropic API.')),
    503,
    'unavailable',
  );
  await expectHttpError(run(() => apiError(402, 'billing_error')), 503, 'unavailable');
});

test('generateDesign reports network failures and timeouts', async () => {
  await expectHttpError(
    generateDesign({
      apiKey: 'k',
      observation,
      lang: 'en',
      fetchImpl: async () => {
        throw new TypeError('fetch failed');
      },
    }),
    502,
    'upstream_unreachable',
  );

  const hang = (url, init) =>
    new Promise((resolve, reject) => {
      init.signal.addEventListener('abort', () => reject(Object.assign(new Error('aborted'), { name: 'AbortError' })));
    });
  await expectHttpError(generateDesign({ apiKey: 'k', observation, lang: 'en', fetchImpl: hang, timeoutMs: 20 }), 504, 'timeout');
});

test('rate limiter blocks after the limit and recovers after the window', () => {
  const limited = createRateLimiter({ windowMs: 1000, max: 2 });
  assert.equal(limited('ip', 0), false);
  assert.equal(limited('ip', 10), false);
  assert.equal(limited('ip', 20), true);
  assert.equal(limited('ip', 1500), false);
});

test('HTTP handler: availability, same-origin rule, limits, validation and a missing key', async () => {
  const saved = process.env.ANTHROPIC_API_KEY;
  try {
    delete process.env.ANTHROPIC_API_KEY;
    assert.deepEqual(await GET().json(), { available: false });
    process.env.ANTHROPIC_API_KEY = '   ';
    assert.deepEqual(await GET().json(), { available: false });
    process.env.ANTHROPIC_API_KEY = 'test-key';
    assert.deepEqual(await GET().json(), { available: true });
    delete process.env.ANTHROPIC_API_KEY;

    let lastOctet = 0;
    const send = (body, headers) =>
      POST(new Request('http://localhost/api/design', { method: 'POST', headers, body }));
    const fromApp = (extra = {}) => ({
      'content-type': 'application/json',
      origin: 'http://localhost',
      'x-forwarded-for': `203.0.113.${++lastOctet}`,
      ...extra,
    });
    const valid = JSON.stringify({ observation });

    const crossSite = await send(valid, fromApp({ origin: 'https://example.com' }));
    assert.equal(crossSite.status, 403);
    assert.deepEqual(await crossSite.json(), { error: 'forbidden_origin' });

    const { origin, ...withoutOrigin } = fromApp(); // eslint-disable-line no-unused-vars
    assert.equal((await send(valid, withoutOrigin)).status, 403);

    assert.equal((await send('{}', fromApp({ 'content-type': 'text/plain' }))).status, 415);

    const invalid = await send(JSON.stringify({ observation: 'short' }), fromApp());
    assert.equal(invalid.status, 400);
    assert.deepEqual(await invalid.json(), { error: 'invalid_length' });

    const noKey = await send(valid, fromApp());
    assert.equal(noKey.status, 503);
    assert.deepEqual(await noKey.json(), { error: 'not_configured' });
    assert.equal(noKey.headers.get('cache-control'), 'no-store');

    // Four requests a minute per IP, then 429.
    const sameIp = fromApp({ 'x-forwarded-for': '198.51.100.9' });
    for (let i = 0; i < 4; i += 1) assert.equal((await send(valid, sameIp)).status, 503);
    const limited = await send(valid, sameIp);
    assert.equal(limited.status, 429);
    assert.deepEqual(await limited.json(), { error: 'rate_limited' });
    assert.equal(limited.headers.get('retry-after'), '60');
  } finally {
    if (saved === undefined) delete process.env.ANTHROPIC_API_KEY;
    else process.env.ANTHROPIC_API_KEY = saved;
  }
});
