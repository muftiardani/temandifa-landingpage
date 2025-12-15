import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { checkRateLimit as fileBasedRateLimit, RateLimitConfig, RateLimitResult } from "./rate-limit";
import { logger } from "@/lib/logger";
import { config } from "@/lib/config";

let redis: Redis | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    redis = Redis.fromEnv();
    logger.success("Redis rate limiting initialized", null, "Redis");
  } catch (error) {
    logger.error("Failed to initialize Redis rate limiting", error, "Redis");
    logger.info("Falling back to file-based rate limiting", null, "Redis");
  }
} else if (process.env.NODE_ENV === "production") {
  throw new Error(
    "❌ Redis is required for production. Please set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN environment variables.\n" +
    "Get free Redis from https://upstash.com (10,000 commands/day free tier)"
  );
} else {
  logger.info("Redis not configured. Using file-based rate limiting (development only)", null, "Redis");
}

export type { RateLimitResult, RateLimitConfig };

export async function checkRateLimit(
  identifier: string,
  rateLimitConfig?: RateLimitConfig
): Promise<RateLimitResult> {
  const { maxRequests, windowMs } = rateLimitConfig || config.rateLimit.default;
  
  if (redis) {
    try {
      const ratelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(maxRequests, `${windowMs / 1000} s`),
        analytics: true,
        prefix: "temandifa:ratelimit",
      });
      
      const { success, limit, reset, remaining } = await ratelimit.limit(identifier);
      
      return {
        success,
        limit,
        remaining,
        reset,
      };
    } catch (error) {
      logger.error("Redis rate limit error, falling back to file-based", error, "Redis");
    }
  }
  
  return fileBasedRateLimit(identifier, rateLimitConfig);
}

export function getRateLimitMethod(): string {
  return redis ? "Redis (Upstash)" : "File-based";
}

