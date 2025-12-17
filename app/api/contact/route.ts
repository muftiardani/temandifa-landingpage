import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { randomUUID } from "crypto";
import {
  checkRateLimit,
  getRateLimitMethod,
} from "@/lib/security/redis-rate-limit";
import { getClientIp } from "@/lib/security/ip-utils";
import { contactFormEmailTemplate } from "@/lib/email/templates";
import { contactAutoReplyTemplate } from "@/lib/email/auto-reply";
import { withTimeout, EMAIL_TIMEOUT_MS } from "@/lib/email/timeout";
import { contactFormSchema } from "@/lib/validation/schemas";
import { z } from "zod";
import {
  validateCSRFToken,
  getCSRFTokenFromHeaders,
  getCSRFSecret,
  createCSRFErrorResponse,
} from "@/lib/security/csrf";
import { logger } from "@/lib/logger";
import { config } from "@/lib/config";
import { getEnv } from "@/lib/env";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const requestId = randomUUID();
  const contactLogger = logger.withMetadata({ requestId, context: "Contact" });

  contactLogger.debug(`Rate limiting via: ${getRateLimitMethod()}`);

  try {
    const ip = getClientIp(request);

    const rateLimitResult = await checkRateLimit(ip, config.rateLimit.contact);

    if (!rateLimitResult.success) {
      const retryAfter = Math.ceil((rateLimitResult.reset - Date.now()) / 1000);

      contactLogger.warn(`Rate limit exceeded for IP: ${ip}`);

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
      contactLogger.warn("Missing CSRF token or hash");
      return NextResponse.json(createCSRFErrorResponse(), { status: 403 });
    }

    const secret = getCSRFSecret();
    if (!validateCSRFToken(csrfToken, csrfHash, secret, csrfExpiresAt)) {
      contactLogger.warn("Invalid or expired CSRF token");
      return NextResponse.json(createCSRFErrorResponse(), { status: 403 });
    }

    if (body.website) {
      contactLogger.warn(`Honeypot triggered for IP: ${ip}`);

      return NextResponse.json(
        {
          success: true,
          message: "Email sent successfully",
          requestId,
        },
        { status: 200 }
      );
    }

    const validatedData = contactFormSchema.parse(body);

    const emailTemplate = contactFormEmailTemplate(validatedData);

    const env = getEnv();
    const fromEmail = env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const toEmail = env.CONTACT_EMAIL || "hello@temandifa.com";

    const { data, error } = await withTimeout(
      () =>
        resend.emails.send({
          from: `TemanDifa Contact Form <${fromEmail}>`,
          to: [toEmail],
          replyTo: validatedData.email,
          subject: `[Contact Form] ${validatedData.subject}`,
          html: emailTemplate.html,
          text: emailTemplate.text,
        }),
      EMAIL_TIMEOUT_MS,
      "Contact Email"
    );

    if (error) {
      contactLogger.error(
        "Resend error",
        error instanceof Error ? error : undefined
      );
      return NextResponse.json(
        {
          error: "Failed to send email. Please try again later.",
          requestId,
        },
        { status: 500 }
      );
    }

    contactLogger.success("Email sent successfully", {
      to: toEmail,
      from: validatedData.email,
      resendId: data?.id,
    });

    try {
      const autoReplyTemplate = contactAutoReplyTemplate({
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
      });

      await withTimeout(
        () =>
          resend.emails.send({
            from: `TemanDifa <${fromEmail}>`,
            to: [validatedData.email],
            subject: "Terima kasih telah menghubungi TemanDifa",
            html: autoReplyTemplate.html,
            text: autoReplyTemplate.text,
          }),
        EMAIL_TIMEOUT_MS,
        "Auto-Reply Email"
      );

      contactLogger.info(`Auto-reply sent to ${validatedData.email}`);
    } catch (autoReplyError) {
      contactLogger.error(
        "Auto-reply failed",
        autoReplyError instanceof Error ? autoReplyError : undefined
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully",
        requestId,
        id: data?.id,
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
    contactLogger.error(
      "Contact form submission failed",
      error instanceof Error ? error : undefined
    );

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid form data",
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
