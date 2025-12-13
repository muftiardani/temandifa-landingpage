import { NextResponse } from "next/server";
import { generateCSRFToken, hashCSRFToken, getCSRFSecret } from "@/lib/security/csrf";

/**
 * CSRF Token API Route
 * Generates and returns a CSRF token for client-side forms
 */
export async function GET() {
  try {
    const secret = getCSRFSecret();
    const token = generateCSRFToken();
    const tokenHash = hashCSRFToken(token, secret);

    return NextResponse.json(
      {
        token,
        hash: tokenHash,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
          "Pragma": "no-cache",
        },
      }
    );
  } catch (error) {
    console.error("CSRF token generation error:", error);
    
    return NextResponse.json(
      {
        error: "Failed to generate CSRF token",
      },
      { status: 500 }
    );
  }
}
