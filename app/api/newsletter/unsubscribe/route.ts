import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { randomUUID } from "crypto";
import { checkRateLimit } from "@/lib/security/redis-rate-limit";
import { validateSignedUnsubscribeUrl } from "@/lib/security/csrf";
import { getClientIp } from "@/lib/security/ip-utils";
import { logger } from "@/lib/logger";

const resend = new Resend(process.env.RESEND_API_KEY);

const unsubscribeSchema = z.object({
  email: z.string().email(),
  t: z.number(),
  sig: z.string(),
});

export async function POST(request: NextRequest) {
  const requestId = randomUUID();
  const unsubLogger = logger.withMetadata({
    requestId,
    context: "Unsubscribe",
  });

  try {
    const ip = getClientIp(request);

    const rateLimitResult = await checkRateLimit(`unsub:${ip}`);

    if (!rateLimitResult.success) {
      const retryAfter = Math.ceil((rateLimitResult.reset - Date.now()) / 1000);

      unsubLogger.warn(`Rate limit exceeded for IP: ${ip}`);

      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfter,
        },
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

    const body = await request.json();

    const validatedData = unsubscribeSchema.parse(body);

    const signatureValidation = validateSignedUnsubscribeUrl(
      validatedData.email,
      validatedData.t,
      validatedData.sig
    );

    if (!signatureValidation.valid) {
      unsubLogger.warn(`Invalid signature: ${signatureValidation.error}`);
      return NextResponse.json(
        {
          error:
            signatureValidation.error || "Invalid or expired unsubscribe link",
          requestId,
        },
        { status: 403 }
      );
    }

    return await processUnsubscribe(validatedData.email, requestId);
  } catch (error) {
    unsubLogger.error(
      "Unsubscribe failed",
      error instanceof Error ? error : undefined
    );

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error:
            "Invalid unsubscribe link. Please use the link from your email.",
          requestId,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "An unexpected error occurred. Please try again later.",
        requestId,
      },
      { status: 500 }
    );
  }
}

async function processUnsubscribe(
  email: string,
  requestId: string
): Promise<NextResponse> {
  const unsubLogger = logger.withMetadata({
    requestId,
    context: "Unsubscribe",
  });

  if (process.env.RESEND_AUDIENCE_ID) {
    try {
      const { data: contacts } = await resend.contacts.list({
        audienceId: process.env.RESEND_AUDIENCE_ID,
      });

      const contact = contacts?.data?.find(
        (c: { email: string }) => c.email === email
      );

      if (contact) {
        await resend.contacts.remove({
          audienceId: process.env.RESEND_AUDIENCE_ID,
          id: contact.id,
        });

        unsubLogger.success(`Unsubscribed from audience: ${email}`);
      } else {
        unsubLogger.info(`Email not found in audience: ${email}`);
      }
    } catch (audienceError) {
      unsubLogger.error(
        "Audience removal failed",
        audienceError instanceof Error ? audienceError : undefined
      );
    }
  }

  unsubLogger.success(`Unsubscribe successful: ${email}`);

  return NextResponse.json(
    {
      success: true,
      message: "Successfully unsubscribed from newsletter",
      requestId,
    },
    { status: 200 }
  );
}
