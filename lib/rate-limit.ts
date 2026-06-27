type WindowEntry = { count: number; windowStart: number }

const store = new Map<string, WindowEntry>()

// Purge stale entries every 5 minutes to avoid unbounded memory growth
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of store) {
    if (now - entry.windowStart > 60_000) store.delete(key)
  }
}, 5 * 60_000)

export function rateLimit(
  ip: string,
  { limit, windowMs = 60_000 }: { limit: number; windowMs?: number }
): { ok: boolean; retryAfter: number } {
  const now = Date.now()
  const entry = store.get(ip)

  if (!entry || now - entry.windowStart >= windowMs) {
    store.set(ip, { count: 1, windowStart: now })
    return { ok: true, retryAfter: 0 }
  }

  entry.count++
  if (entry.count > limit) {
    const retryAfter = Math.ceil((windowMs - (now - entry.windowStart)) / 1000)
    return { ok: false, retryAfter }
  }

  return { ok: true, retryAfter: 0 }
}
