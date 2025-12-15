export const RATE_LIMITS = {
  CONTACT: {
    requests: 3,
    window: 60000,
    windowInSeconds: 60,
  },

  NEWSLETTER: {
    requests: 3,
    window: 60000,
    windowInSeconds: 60,
  },

  UNSUBSCRIBE: {
    requests: 5,
    window: 60000,
    windowInSeconds: 60,
  },

  CSRF: {
    requests: 10,
    window: 60000,
    windowInSeconds: 60,
  },
} as const;

export const RATE_LIMIT_HEADERS = {
  LIMIT: 'X-RateLimit-Limit',
  REMAINING: 'X-RateLimit-Remaining',
  RESET: 'X-RateLimit-Reset',
  RETRY_AFTER: 'Retry-After',
} as const;

export const RATE_LIMIT_MESSAGES = {
  EXCEEDED: 'Too many requests. Please try again later.',
  REDIS_ERROR: 'Rate limiting service unavailable. Using fallback.',
} as const;

export type RateLimitEndpoint = keyof typeof RATE_LIMITS;
export type RateLimitConfig = typeof RATE_LIMITS[RateLimitEndpoint];
