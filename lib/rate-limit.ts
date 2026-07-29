/**
 * Minimal in-memory rate limiter, good enough for a single-instance
 * deployment. If you scale to multiple server instances/regions,
 * replace this with a shared store (Redis / Upstash) — see
 * GUIDE.md → "Production hardening".
 */
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: limit - entry.count };
}

export function hashIp(ip: string) {
  // Lightweight non-cryptographic hash so we never store raw IPs.
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    hash = (hash << 5) - hash + ip.charCodeAt(i);
    hash |= 0;
  }
  return `ip_${Math.abs(hash)}`;
}
