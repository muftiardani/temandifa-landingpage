import { NextRequest, NextResponse } from "next/server";
import {
  generateCSRFToken,
  hashCSRFToken,
  getCSRFSecret,
} from "@/lib/security/csrf";
import { checkRateLimit } from "@/lib/security/redis-rate-limit";
import { getClientIp } from "@/lib/security/ip-utils";
import { logger } from "@/lib/logger";
import { config } from "@/lib/config";

const csrfLogger = logger.child("CSRF");

export async function GET(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const isDev = process.env.NODE_ENV === "development";

    if (!isDev) {
      const rateLimitResult = await checkRateLimit(
        `csrf:${ip}`,
        config.rateLimit.csrf
      );

      if (!rateLimitResult.success) {
        const retryAfter = Math.ceil(
          (rateLimitResult.reset - Date.now()) / 1000
        );

        csrfLogger.warn(`Rate limit exceeded for IP: ${ip}`);

        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          {
            status: 429,
            headers: {
              "Retry-After": retryAfter.toString(),
              "X-RateLimit-Limit": rateLimitResult.limit.toString(),
              "X-RateLimit-Remaining": "0",
              "X-RateLimit-Reset": rateLimitResult.reset.toString(),
            },
          }
        );
      }
    }

    const secret = getCSRFSecret();
    const tokenData = generateCSRFToken();
    const tokenHash = hashCSRFToken(tokenData.token, secret);

    return NextResponse.json(
      {
        token: tokenData.token,
        hash: tokenHash,
        expiresAt: tokenData.expiresAt,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
          Pragma: "no-cache",
        },
      }
    );
  } catch (error) {
    csrfLogger.error(
      "Token generation failed",
      error instanceof Error ? error : undefined
    );

    return NextResponse.json(
      {
        error: "Failed to generate CSRF token",
      },
      { status: 500 }
    );
  }
}
