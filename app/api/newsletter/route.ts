import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { randomUUID } from "crypto";
import { checkRateLimit } from "@/lib/security/redis-rate-limit";
import { getClientIp } from "@/lib/security/ip-utils";
import { escape } from "html-escaper";
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
  const newsletterLogger = logger.withMetadata({ requestId, context: "Newsletter" });
  
  try {
    const ip = getClientIp(request);

    const rateLimitResult = await checkRateLimit(ip, config.rateLimit.newsletter);
    
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
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
            'Retry-After': retryAfter.toString(),
          }
        }
      );
    }

    const body = await request.json();
    
    const csrfToken = getCSRFTokenFromHeaders(request.headers);
    const csrfHash = body.csrfHash;
    const csrfExpiresAt = body.csrfExpiresAt;
    
    if (!csrfToken || !csrfHash) {
      newsletterLogger.warn("Missing CSRF token or hash");
      return NextResponse.json(
        createCSRFErrorResponse(),
        { status: 403 }
      );
    }
    
    const secret = getCSRFSecret();
    if (!validateCSRFToken(csrfToken, csrfHash, secret, csrfExpiresAt)) {
      newsletterLogger.warn("Invalid or expired CSRF token");
      return NextResponse.json(
        createCSRFErrorResponse(),
        { status: 403 }
      );
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
    const escapedEmail = escape(validatedData.email);

    const unsubscribeUrl = generateSignedUnsubscribeUrl(validatedData.email, config.baseUrl);

    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    const { data, error } = await resend.emails.send({
      from: `TemanDifa Newsletter <${fromEmail}>`,
      to: [validatedData.email],
      subject: "Welcome to TemanDifa Newsletter! 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #3b82f6; margin: 0;">Welcome to TemanDifa! 🎉</h1>
          </div>
          
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 30px; border-radius: 12px; color: white; margin-bottom: 30px;">
            <h2 style="margin: 0 0 15px 0;">Thank You for Subscribing!</h2>
            <p style="margin: 0; font-size: 16px; line-height: 1.6;">
              You're now part of our community dedicated to making technology accessible for everyone.
            </p>
          </div>
          
          <div style="margin-bottom: 30px;">
            <h3 style="color: #1f2937; margin-bottom: 15px;">What to Expect:</h3>
            <ul style="color: #4b5563; line-height: 1.8;">
              <li>📱 Latest updates about TemanDifa app</li>
              <li>✨ New features and improvements</li>
              <li>💡 Tips for better accessibility</li>
              <li>🎯 Exclusive content and announcements</li>
            </ul>
          </div>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              <strong>Your email:</strong> ${escapedEmail}
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
              Follow us on social media:
            </p>
            <div style="margin-bottom: 20px;">
              <a href="https://instagram.com/temandifa" style="color: #3b82f6; text-decoration: none; margin: 0 10px;">Instagram</a>
              <a href="https://tiktok.com/@temandifa" style="color: #3b82f6; text-decoration: none; margin: 0 10px;">TikTok</a>
              <a href="https://linkedin.com/company/temandifa-com" style="color: #3b82f6; text-decoration: none; margin: 0 10px;">LinkedIn</a>
            </div>
            <p style="color: #9ca3af; font-size: 12px; margin: 20px 0 0 0;">
              © 2025 TemanDifa.com. All rights reserved.<br>
              <a href="https://temandifa.com" style="color: #9ca3af;">Visit our website</a>
            </p>
            <p style="color: #9ca3af; font-size: 11px; margin: 15px 0 0 0;">
              Don't want to receive these emails? <a href="${unsubscribeUrl}" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a>
            </p>
          </div>
        </div>
      `,
      text: `
Welcome to TemanDifa Newsletter! 🎉

Thank you for subscribing! You're now part of our community dedicated to making technology accessible for everyone.

What to Expect:
- Latest updates about TemanDifa app
- New features and improvements
- Tips for better accessibility
- Exclusive content and announcements

Your email: ${validatedData.email}

Follow us:
Instagram: https://instagram.com/temandifa
TikTok: https://tiktok.com/@temandifa
LinkedIn: https://linkedin.com/company/temandifa-com

---
© 2025 TemanDifa.com. All rights reserved.
Visit our website: https://temandifa.com

Don't want to receive these emails?
Unsubscribe: ${unsubscribeUrl}
      `.trim(),
    });

    if (error) {
      newsletterLogger.error("Newsletter email failed", error instanceof Error ? error : undefined);
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
        const { data: contactData, error: contactError } = await resend.contacts.create({
          email: validatedData.email,
          unsubscribed: false,
          audienceId: process.env.RESEND_AUDIENCE_ID,
        });

        if (contactError) {
          newsletterLogger.error("Failed to add to audience", contactError instanceof Error ? contactError : undefined);
        } else {
          audienceId = contactData?.id;
          newsletterLogger.info(`Added to audience: ${contactData?.id}`);
        }
      } catch (audienceError) {
        newsletterLogger.error("Audience operation failed", audienceError instanceof Error ? audienceError : undefined);
      }
    } else {
      newsletterLogger.warn("RESEND_AUDIENCE_ID not configured - subscriber not stored");
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
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.reset.toString(),
        }
      }
    );
  } catch (error) {
    newsletterLogger.error("Newsletter subscription failed", error instanceof Error ? error : undefined);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid email address",
          requestId,
          ...(process.env.NODE_ENV === 'development' && { details: error.issues }),
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
