import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { randomUUID } from "crypto";
import { checkRateLimit } from "@/lib/redis-rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

const unsubscribeSchema = z.object({
  email: z.string().email(),
});

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: NextRequest) {
  const requestId = randomUUID();
  
  try {
    const ip = getClientIp(request);

    // Rate limiting: 5 requests per 60 seconds
    const rateLimitResult = await checkRateLimit(ip);
    
    if (!rateLimitResult.success) {
      const retryAfter = Math.ceil((rateLimitResult.reset - Date.now()) / 1000);
      
      console.log(`[${requestId}] Unsubscribe rate limit exceeded for IP: ${ip}`);
      
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfter,
        },
        { 
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
          }
        }
      );
    }

    const body = await request.json();
    const validatedData = unsubscribeSchema.parse(body);

    // Remove from Resend Audiences
    if (process.env.RESEND_AUDIENCE_ID) {
      try {
        // First, try to find the contact
        const { data: contacts } = await resend.contacts.list({
          audienceId: process.env.RESEND_AUDIENCE_ID,
        });

        const contact = contacts?.data?.find(
          (c: { email: string }) => c.email === validatedData.email
        );

        if (contact) {
          // Remove contact from audience
          await resend.contacts.remove({
            audienceId: process.env.RESEND_AUDIENCE_ID,
            id: contact.id,
          });

          console.log(`[${requestId}] Unsubscribed from audience:`, validatedData.email);
        } else {
          console.log(`[${requestId}] Email not found in audience:`, validatedData.email);
        }
      } catch (audienceError) {
        console.error(`[${requestId}] Audience error:`, audienceError);
        // Continue anyway - email might not be in audience
      }
    }

    console.log(`[${requestId}] Unsubscribe successful:`, validatedData.email);

    return NextResponse.json(
      {
        success: true,
        message: "Successfully unsubscribed from newsletter",
        requestId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`[${requestId}] Unsubscribe error:`, error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid email address",
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
