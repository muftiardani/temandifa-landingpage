import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { randomUUID } from "crypto";
import { checkRateLimit, getRateLimitMethod } from "@/lib/security/redis-rate-limit";
import { contactFormEmailTemplate } from "@/lib/email/templates";
import { contactFormSchema } from "@/lib/validation/schemas";
import { z } from "zod";
import {
  validateCSRFToken,
  getCSRFTokenFromHeaders,
  getCSRFSecret,
  createCSRFErrorResponse,
} from "@/lib/security/csrf";

const resend = new Resend(process.env.RESEND_API_KEY);

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: NextRequest) {
  const requestId = randomUUID();
  
  console.log(`[${requestId}] Rate limiting via: ${getRateLimitMethod()}`);
  
  try {
    const ip = getClientIp(request);

    const rateLimitResult = await checkRateLimit(ip);
    
    if (!rateLimitResult.success) {
      const retryAfter = Math.ceil((rateLimitResult.reset - Date.now()) / 1000);
      
      console.log(`[${requestId}] Rate limit exceeded for IP: ${ip}`);
      
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
    
    // CSRF Protection
    const csrfToken = getCSRFTokenFromHeaders(request.headers);
    const csrfHash = body.csrfHash;
    
    if (!csrfToken || !csrfHash) {
      console.log(`[${requestId}] Missing CSRF token or hash`);
      return NextResponse.json(
        createCSRFErrorResponse(),
        { status: 403 }
      );
    }
    
    const secret = getCSRFSecret();
    if (!validateCSRFToken(csrfToken, csrfHash, secret)) {
      console.log(`[${requestId}] Invalid CSRF token`);
      return NextResponse.json(
        createCSRFErrorResponse(),
        { status: 403 }
      );
    }
    
    if (body.website) {
      console.log(`[${requestId}] Honeypot triggered for IP: ${ip}`);
      
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

    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const toEmail = process.env.CONTACT_EMAIL || "hello@temandifa.com";

    const { data, error } = await resend.emails.send({
      from: `TemanDifa Contact Form <${fromEmail}>`,
      to: [toEmail],
      replyTo: validatedData.email,
      subject: `[Contact Form] ${validatedData.subject}`,
      html: emailTemplate.html,
      text: emailTemplate.text,
    });

    if (error) {
      console.error(`[${requestId}] Resend error:`, error);
      return NextResponse.json(
        {
          error: "Failed to send email. Please try again later.",
          requestId,
        },
        { status: 500 }
      );
    }

    console.log(`[${requestId}] Email sent successfully`, {
      to: toEmail,
      from: validatedData.email,
      resendId: data?.id,
    });

    try {
      await resend.emails.send({
        from: `TemanDifa <${fromEmail}>`,
        to: [validatedData.email],
        subject: "Terima kasih telah menghubungi TemanDifa",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #3b82f6;">Terima Kasih!</h2>
            <p>Halo <strong>${validatedData.name}</strong>,</p>
            <p>Terima kasih telah menghubungi kami. Kami telah menerima pesan Anda dan akan segera merespons.</p>
            
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>Subjek:</strong> ${validatedData.subject}</p>
            </div>
            
            <p>Kami akan menghubungi Anda melalui email <strong>${validatedData.email}</strong> dalam 1-2 hari kerja.</p>
            
            <p style="margin-top: 30px;">Salam hangat,<br><strong>Tim TemanDifa</strong></p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
            
            <p style="color: #6b7280; font-size: 12px;">
              Email ini dikirim otomatis. Mohon tidak membalas email ini.
            </p>
          </div>
        `,
        text: `
Halo ${validatedData.name},

Terima kasih telah menghubungi kami. Kami telah menerima pesan Anda dan akan segera merespons.

Subjek: ${validatedData.subject}

Kami akan menghubungi Anda melalui email ${validatedData.email} dalam 1-2 hari kerja.

Salam hangat,
Tim TemanDifa

---
Email ini dikirim otomatis. Mohon tidak membalas email ini.
        `.trim(),
      });
      
      console.log(`[${requestId}] Auto-reply sent to ${validatedData.email}`);
    } catch (autoReplyError) {
      console.error(`[${requestId}] Auto-reply error:`, autoReplyError);
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
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.reset.toString(),
        }
      }
    );
  } catch (error) {
    console.error(`[${requestId}] Contact form error:`, error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid form data",
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

