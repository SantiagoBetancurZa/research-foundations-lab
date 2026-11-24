// Vercel Function: POST /api/design turns a student observation into a research design with Gemini.
// The API key stays on the server (GEMINI_API_KEY); the browser never sees it.
import {
  HttpError,
  LIMITS,
  createRateLimiter,
  generateDesign,
  modelChain,
  parseInput,
} from './_lib/design.js';

const isRateLimited = createRateLimiter({ windowMs: 60_000, max: 8 });

function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...headers,
    },
  });
}

function clientKey(request) {
  const forwarded = request.headers.get('x-forwarded-for') ?? '';
  return forwarded.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown';
}

/** GET /api/design tells the app whether the live AI designer is switched on. */
export function GET() {
  return json({ available: Boolean(process.env.GEMINI_API_KEY) });
}

export async function POST(request) {
  try {
    if (isRateLimited(clientKey(request))) {
      throw new HttpError(429, 'rate_limited', { 'Retry-After': '60' });
    }
    const contentType = (request.headers.get('content-type') ?? '').toLowerCase();
    if (!contentType.includes('application/json')) throw new HttpError(415, 'unsupported_media_type');
    if (Number(request.headers.get('content-length') ?? 0) > LIMITS.maxBodyBytes) {
      throw new HttpError(413, 'too_large');
    }

    const { observation, lang } = parseInput(await request.text());

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new HttpError(503, 'not_configured');

    const { design, model } = await generateDesign({
      apiKey,
      observation,
      lang,
      models: modelChain(process.env.GEMINI_MODEL),
    });
    return json({ design, model });
  } catch (error) {
    if (error instanceof HttpError) {
      if (error.status >= 500) console.warn(`[api/design] ${error.status} ${error.code}`);
      return json({ error: error.code }, error.status, error.headers);
    }
    console.error('[api/design] unexpected error:', error?.name ?? 'unknown');
    return json({ error: 'server_error' }, 500);
  }
}
