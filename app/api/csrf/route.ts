import { NextRequest, NextResponse } from "next/server";
import { generateCSRFToken, hashCSRFToken, getCSRFSecret } from "@/lib/security/csrf";
import { checkRateLimit } from "@/lib/security/redis-rate-limit";
import { logger } from "@/lib/logger";

const csrfLogger = logger.child("CSRF");
function getClientIp(request: NextRequest): string {
  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip") || "unknown";
}

export async function GET(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    const rateLimitResult = await checkRateLimit(`csrf:${ip}`);

    if (!rateLimitResult.success) {
      const retryAfter = Math.ceil((rateLimitResult.reset - Date.now()) / 1000);

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
          "Pragma": "no-cache",
          "X-RateLimit-Limit": rateLimitResult.limit.toString(),
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": rateLimitResult.reset.toString(),
        },
      }
    );
  } catch (error) {
    csrfLogger.error("Token generation failed", error instanceof Error ? error : undefined);

    return NextResponse.json(
      {
        error: "Failed to generate CSRF token",
      },
      { status: 500 }
    );
  }
}
