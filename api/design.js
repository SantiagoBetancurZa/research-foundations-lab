// Vercel Function: POST /api/design turns a student observation into a research design with
// Claude Sonnet 5.5. The Anthropic key stays on the server (ANTHROPIC_API_KEY), in a workspace
// with its own monthly spend limit; the browser never sees it. Before any paid call this
// function checks, in order: same-origin request, per-IP limits, JSON body and size, and a
// global limit. The model and the output ceiling are fixed in ./_lib/design.js.
import { HttpError, LIMITS, createRateLimiter, generateDesign, parseInput } from './_lib/design.js';

// Best-effort limits kept in each instance's memory; the workspace spend limit is the hard ceiling.
const perIpPerMinute = createRateLimiter({ windowMs: 60_000, max: 4 });
const perIpPerDay = createRateLimiter({ windowMs: 24 * 60 * 60_000, max: 20 });
const allPerMinute = createRateLimiter({ windowMs: 60_000, max: 30, maxKeys: 1 });

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

/** Browsers always send Origin with a POST: only the app's own pages may use the AI. */
function isSameOrigin(request) {
  let originHost;
  try {
    originHost = new URL(request.headers.get('origin') ?? '').host.toLowerCase();
  } catch {
    return false;
  }
  let urlHost = '';
  try {
    urlHost = new URL(request.url).host;
  } catch {
    // A relative URL: rely on the Host headers.
  }
  return [request.headers.get('x-forwarded-host'), request.headers.get('host'), urlHost].some(
    (host) => typeof host === 'string' && host.toLowerCase() === originHost,
  );
}

const readApiKey = () => process.env.ANTHROPIC_API_KEY?.trim() ?? '';

/** GET /api/design tells the app whether the live AI designer is switched on. */
export function GET() {
  return json({ available: Boolean(readApiKey()) });
}

export async function POST(request) {
  try {
    if (!isSameOrigin(request)) throw new HttpError(403, 'forbidden_origin');
    const ip = clientKey(request);
    if (perIpPerMinute(ip)) throw new HttpError(429, 'rate_limited', { 'Retry-After': '60' });
    if (perIpPerDay(ip)) throw new HttpError(429, 'daily_limit', { 'Retry-After': '3600' });

    const contentType = (request.headers.get('content-type') ?? '').toLowerCase();
    if (!contentType.includes('application/json')) throw new HttpError(415, 'unsupported_media_type');
    if (Number(request.headers.get('content-length') ?? 0) > LIMITS.maxBodyBytes) {
      throw new HttpError(413, 'too_large');
    }

    const { observation, lang } = parseInput(await request.text());

    const apiKey = readApiKey();
    if (!apiKey) throw new HttpError(503, 'not_configured');
    if (allPerMinute('all')) throw new HttpError(503, 'upstream_busy', { 'Retry-After': '30' });

    const { design, model } = await generateDesign({ apiKey, observation, lang });
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
