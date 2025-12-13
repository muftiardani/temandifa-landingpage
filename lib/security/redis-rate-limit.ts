import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { checkRateLimit as fileBasedRateLimit } from "./rate-limit";
import { logger } from "@/lib/logger";

let ratelimit: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(3, "60 s"),
      analytics: true,
      prefix: "temandifa:ratelimit",
    });
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

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export async function checkRateLimit(identifier: string): Promise<RateLimitResult> {
  if (ratelimit) {
    try {
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
  
  return fileBasedRateLimit(identifier);
}

export function getRateLimitMethod(): string {
  return ratelimit ? "Redis (Upstash)" : "File-based";
}
