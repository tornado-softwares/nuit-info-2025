import type { Context, Next } from 'hono'
import { rate_limited } from '../lib/errors'
import { get_client_ip } from '../lib/utils'

// --- Configurations ---
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const MAX_REQUESTS = 100

// --- Stockage des rate limits ---
type Usage = {
  count: number
  reset_timestamp: number
}

const usages = new Map<string, Usage>()

// --- Middleware ---
export async function bruno_the_rate_limiter(c: Context, next: Next) {
  const ip = get_client_ip(c)
  const now = Date.now()

  let usage = usages.get(ip)

  if (!usage) {
    usage = { count: 1, reset_timestamp: now + WINDOW_MS }
    usages.set(ip, usage)
    return next()
  }

  if (now > usage.reset_timestamp) {
    usage.count = 1
    usage.reset_timestamp = now + WINDOW_MS
    usages.set(ip, usage)
    return next()
  }

  usage.count++

  if (usage.count > MAX_REQUESTS) {
    return rate_limited(c)
  }

  return next()
}
