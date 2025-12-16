import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { randomUUID } from "crypto";
import { checkRateLimit } from "@/lib/security/redis-rate-limit";
import { getClientIp } from "@/lib/security/ip-utils";
import { withTimeout, EMAIL_TIMEOUT_MS } from "@/lib/email/timeout";
import { newsletterWelcomeTemplate } from "@/lib/email/newsletter-welcome";
import {
  validateCSRFToken,
  getCSRFTokenFromHeaders,
  getCSRFSecret,
  createCSRFErrorResponse,
  generateSignedUnsubscribeUrl,
} from "@/lib/security/csrf";
import { config } from "@/lib/config";
import { logger } from "@/lib/logger";

const resend = new Resend(process.env.RESEND_API_KEY);

const newsletterSchema = z.object({
  email: z.string().email(),
  honeypot: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const requestId = randomUUID();
  const newsletterLogger = logger.withMetadata({
    requestId,
    context: "Newsletter",
  });

  try {
    const ip = getClientIp(request);

    const rateLimitResult = await checkRateLimit(
      ip,
      config.rateLimit.newsletter
    );

    if (!rateLimitResult.success) {
      const retryAfter = Math.ceil((rateLimitResult.reset - Date.now()) / 1000);

      newsletterLogger.warn(`Rate limit exceeded for IP: ${ip}`);

      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfter,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": rateLimitResult.limit.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimitResult.reset.toString(),
            "Retry-After": retryAfter.toString(),
          },
        }
      );
    }

    const body = await request.json();

    const csrfToken = getCSRFTokenFromHeaders(request.headers);
    const csrfHash = body.csrfHash;
    const csrfExpiresAt = body.csrfExpiresAt;

    if (!csrfToken || !csrfHash) {
      newsletterLogger.warn("Missing CSRF token or hash");
      return NextResponse.json(createCSRFErrorResponse(), { status: 403 });
    }

    const secret = getCSRFSecret();
    if (!validateCSRFToken(csrfToken, csrfHash, secret, csrfExpiresAt)) {
      newsletterLogger.warn("Invalid or expired CSRF token");
      return NextResponse.json(createCSRFErrorResponse(), { status: 403 });
    }

    if (body.honeypot) {
      newsletterLogger.warn(`Honeypot triggered for IP: ${ip}`);

      return NextResponse.json(
        {
          success: true,
          message: "Successfully subscribed to newsletter",
          requestId,
        },
        { status: 200 }
      );
    }

    const validatedData = newsletterSchema.parse(body);

    const unsubscribeUrl = generateSignedUnsubscribeUrl(
      validatedData.email,
      config.baseUrl
    );

    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    const welcomeTemplate = newsletterWelcomeTemplate({
      email: validatedData.email,
      unsubscribeUrl,
    });

    const { data, error } = await withTimeout(
      () =>
        resend.emails.send({
          from: `TemanDifa Newsletter <${fromEmail}>`,
          to: [validatedData.email],
          subject: "Welcome to TemanDifa Newsletter! 🎉",
          html: welcomeTemplate.html,
          text: welcomeTemplate.text,
        }),
      EMAIL_TIMEOUT_MS,
      "Newsletter Email"
    );

    if (error) {
      newsletterLogger.error(
        "Newsletter email failed",
        error instanceof Error ? error : undefined
      );
      return NextResponse.json(
        {
          error: "Failed to subscribe. Please try again later.",
          requestId,
        },
        { status: 500 }
      );
    }

    newsletterLogger.success("Newsletter subscription successful", {
      email: validatedData.email,
      resendId: data?.id,
    });

    let audienceId: string | undefined;

    if (process.env.RESEND_AUDIENCE_ID) {
      try {
        const { data: contactData, error: contactError } =
          await resend.contacts.create({
            email: validatedData.email,
            unsubscribed: false,
            audienceId: process.env.RESEND_AUDIENCE_ID,
          });

        if (contactError) {
          newsletterLogger.error(
            "Failed to add to audience",
            contactError instanceof Error ? contactError : undefined
          );
        } else {
          audienceId = contactData?.id;
          newsletterLogger.info(`Added to audience: ${contactData?.id}`);
        }
      } catch (audienceError) {
        newsletterLogger.error(
          "Audience operation failed",
          audienceError instanceof Error ? audienceError : undefined
        );
      }
    } else {
      newsletterLogger.warn(
        "RESEND_AUDIENCE_ID not configured - subscriber not stored"
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed to newsletter",
        requestId,
        id: data?.id,
        ...(audienceId && { audienceId }),
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": rateLimitResult.limit.toString(),
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": rateLimitResult.reset.toString(),
        },
      }
    );
  } catch (error) {
    newsletterLogger.error(
      "Newsletter subscription failed",
      error instanceof Error ? error : undefined
    );

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid email address",
          requestId,
          ...(process.env.NODE_ENV === "development" && {
            details: error.issues,
          }),
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
