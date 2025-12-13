/**
 * CSRF Protection Utilities
 * Generates and validates CSRF tokens for form submissions
 */

import { createHash, randomBytes, timingSafeEqual } from "crypto";

/**
 * Generate a cryptographically secure CSRF token
 */
export function generateCSRFToken(): string {
  return randomBytes(32).toString("base64url");
}

/**
 * Create a hash of the CSRF token with a secret
 */
export function hashCSRFToken(token: string, secret: string): string {
  return createHash("sha256")
    .update(`${token}:${secret}`)
    .digest("base64url");
}

/**
 * Validate a CSRF token against the expected hash
 * Uses timing-safe comparison to prevent timing attacks
 */
export function validateCSRFToken(
  token: string,
  expectedHash: string,
  secret: string
): boolean {
  if (!token || !expectedHash || !secret) {
    return false;
  }

  try {
    const tokenHash = hashCSRFToken(token, secret);
    
    const tokenBuffer = Buffer.from(tokenHash);
    const expectedBuffer = Buffer.from(expectedHash);

    if (tokenBuffer.length !== expectedBuffer.length) {
      return false;
    }

    return timingSafeEqual(tokenBuffer, expectedBuffer);
  } catch {
    return false;
  }
}

/**
 * Get CSRF secret from environment
 * Falls back to a default in development (NOT for production!)
 */
export function getCSRFSecret(): string {
  const secret = process.env.CSRF_SECRET;
  
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("CSRF_SECRET environment variable is required in production");
    }
    
    console.warn(
      "⚠️  WARNING: Using default CSRF secret. Set CSRF_SECRET environment variable for production!"
    );
    return "development-csrf-secret-change-in-production";
  }
  
  return secret;
}

/**
 * Extract CSRF token from request headers
 */
export function getCSRFTokenFromHeaders(headers: Headers): string | null {
  return headers.get("x-csrf-token");
}

/**
 * Create CSRF error response
 */
export function createCSRFErrorResponse() {
  return {
    error: "Invalid or missing CSRF token",
    code: "CSRF_VALIDATION_FAILED",
  };
}
