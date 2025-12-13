/**
 * Rate Limiting Constants
 * Configuration for API rate limiting
 */

/**
 * Rate limit configurations for different endpoints
 * Format: { requests: number, window: milliseconds }
 */
export const RATE_LIMITS = {
  /**
   * Contact form rate limit
   * 3 requests per 60 seconds per IP
   */
  CONTACT: {
    requests: 3,
    window: 60000, // 60 seconds in milliseconds
    windowInSeconds: 60,
  },

  /**
   * Newsletter subscription rate limit
   * 3 requests per 60 seconds per IP
   */
  NEWSLETTER: {
    requests: 3,
    window: 60000, // 60 seconds
    windowInSeconds: 60,
  },

  /**
   * Newsletter unsubscribe rate limit
   * 5 requests per 60 seconds per IP (more lenient)
   */
  UNSUBSCRIBE: {
    requests: 5,
    window: 60000, // 60 seconds
    windowInSeconds: 60,
  },

  /**
   * CSRF token generation rate limit
   * 10 requests per 60 seconds per IP
   */
  CSRF: {
    requests: 10,
    window: 60000, // 60 seconds
    windowInSeconds: 60,
  },
} as const;

/**
 * Rate limit header names
 */
export const RATE_LIMIT_HEADERS = {
  LIMIT: 'X-RateLimit-Limit',
  REMAINING: 'X-RateLimit-Remaining',
  RESET: 'X-RateLimit-Reset',
  RETRY_AFTER: 'Retry-After',
} as const;

/**
 * Rate limit error messages
 */
export const RATE_LIMIT_MESSAGES = {
  EXCEEDED: 'Too many requests. Please try again later.',
  REDIS_ERROR: 'Rate limiting service unavailable. Using fallback.',
} as const;

/**
 * Type helpers
 */
export type RateLimitEndpoint = keyof typeof RATE_LIMITS;
export type RateLimitConfig = typeof RATE_LIMITS[RateLimitEndpoint];
