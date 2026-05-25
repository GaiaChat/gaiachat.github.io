type UsageKv = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  list(options?: { prefix?: string; limit?: number; cursor?: string }): Promise<{
    keys: Array<{ name: string }>;
    list_complete: boolean;
    cursor?: string;
  }>;
};

type UsageEnv = {
  GAIA_USAGE_KV?: UsageKv;
};

type PagesContext = {
  request: Request;
  env: UsageEnv;
};

const ACTIVE_TTL_SECONDS = 150;
const USAGE_KEY_PREFIX = 'usage:active:';
const JSON_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, OPTIONS',
  'access-control-allow-headers': 'content-type',
};

function jsonResponse(payload: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: {
      ...JSON_HEADERS,
      ...(init.headers ?? {}),
    },
  });
}

async function activeUserCount(kv: UsageKv): Promise<number> {
  let cursor: string | undefined;
  let total = 0;
  do {
    const page = await kv.list({ prefix: USAGE_KEY_PREFIX, limit: 1_000, cursor });
    total += page.keys.length;
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);
  return total;
}

function clientIdFromRequest(body: unknown): string | null {
  if (!body || typeof body !== 'object') {
    return null;
  }
  const clientId = (body as { clientId?: unknown }).clientId;
  if (typeof clientId !== 'string') {
    return null;
  }
  const trimmed = clientId.trim();
  return /^[a-z0-9-]{16,96}$/i.test(trimmed) ? trimmed.toLowerCase() : null;
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: JSON_HEADERS,
  });
}

export async function onRequestGet({ env }: PagesContext): Promise<Response> {
  if (!env.GAIA_USAGE_KV) {
    return jsonResponse({ activeUsers: null, available: false }, { status: 503 });
  }

  return jsonResponse({
    activeUsers: await activeUserCount(env.GAIA_USAGE_KV),
    available: true,
  });
}

export async function onRequestPost({ request, env }: PagesContext): Promise<Response> {
  if (!env.GAIA_USAGE_KV) {
    return jsonResponse({ activeUsers: null, available: false }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const clientId = clientIdFromRequest(body);
  if (!clientId) {
    return jsonResponse({ error: 'Invalid client id.' }, { status: 400 });
  }

  await env.GAIA_USAGE_KV.put(
    `${USAGE_KEY_PREFIX}${clientId}`,
    JSON.stringify({
      app: 'gaia-launcher',
      updatedAt: new Date().toISOString(),
    }),
    { expirationTtl: ACTIVE_TTL_SECONDS },
  );

  return jsonResponse({
    activeUsers: await activeUserCount(env.GAIA_USAGE_KV),
    available: true,
  });
}
