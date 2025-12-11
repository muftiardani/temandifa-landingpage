import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { checkRateLimit as fileBasedRateLimit } from "./rate-limit";

let ratelimit: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(3, "60 s"),
      analytics: true,
      prefix: "temandifa:ratelimit",
    });
    console.log("✅ Redis rate limiting initialized");
  } catch (error) {
    console.error("❌ Failed to initialize Redis rate limiting:", error);
    console.log("⚠️  Falling back to file-based rate limiting");
  }
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
      console.error("Redis rate limit error, falling back to file-based:", error);
    }
  }
  
  return fileBasedRateLimit(identifier);
}

export function getRateLimitMethod(): string {
  return ratelimit ? "Redis (Upstash)" : "File-based";
}
