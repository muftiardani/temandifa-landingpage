import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { logger } from "@/lib/logger";
import { getEnv } from "@/lib/env";

const CSRF_TOKEN_TTL = 15 * 60 * 1000;

export interface CSRFTokenData {
  token: string;
  expiresAt: number;
}

export function generateCSRFToken(): CSRFTokenData {
  return {
    token: randomBytes(32).toString("base64url"),
    expiresAt: Date.now() + CSRF_TOKEN_TTL,
  };
}

export function hashCSRFToken(token: string, secret: string): string {
  return createHmac("sha256", secret).update(token).digest("base64url");
}

export function validateCSRFToken(
  token: string,
  expectedHash: string,
  secret: string,
  expiresAt?: number
): boolean {
  if (!token || !expectedHash || !secret) {
    return false;
  }

  if (expiresAt && Date.now() > expiresAt) {
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

export function getCSRFSecret(): string {
  const env = getEnv();
  const secret = env.CSRF_SECRET;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "CSRF_SECRET environment variable is required in production"
      );
    }

    logger.warn(
      "Using default CSRF secret. Set CSRF_SECRET environment variable for production!",
      null,
      "CSRF"
    );
    return "development-csrf-secret-change-in-production";
  }

  return secret;
}

export function getCSRFTokenFromHeaders(headers: Headers): string | null {
  return headers.get("x-csrf-token");
}

export function createCSRFErrorResponse() {
  return {
    error: "Invalid or missing CSRF token",
    code: "CSRF_VALIDATION_FAILED",
  };
}

const SIGNED_URL_TTL = 7 * 24 * 60 * 60 * 1000;

export function generateSignedUnsubscribeUrl(
  email: string,
  baseUrl: string
): string {
  const secret = getCSRFSecret();
  const timestamp = Date.now();
  const data = `${email}:${timestamp}`;

  const signature = createHmac("sha256", secret)
    .update(data)
    .digest("base64url");

  const params = new URLSearchParams({
    email: email,
    t: timestamp.toString(),
    sig: signature,
  });

  return `${baseUrl}/unsubscribe?${params.toString()}`;
}

export function validateSignedUnsubscribeUrl(
  email: string,
  timestamp: number,
  signature: string
): { valid: boolean; error?: string } {
  if (!email || !timestamp || !signature) {
    return { valid: false, error: "Missing required parameters" };
  }

  const secret = getCSRFSecret();

  const age = Date.now() - timestamp;
  if (age > SIGNED_URL_TTL) {
    return { valid: false, error: "Unsubscribe link has expired" };
  }

  if (age < 0) {
    return { valid: false, error: "Invalid timestamp" };
  }

  try {
    const data = `${email}:${timestamp}`;
    const expectedSignature = createHmac("sha256", secret)
      .update(data)
      .digest("base64url");

    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (sigBuffer.length !== expectedBuffer.length) {
      return { valid: false, error: "Invalid signature" };
    }

    if (!timingSafeEqual(sigBuffer, expectedBuffer)) {
      return { valid: false, error: "Invalid signature" };
    }

    return { valid: true };
  } catch {
    return { valid: false, error: "Signature validation failed" };
  }
}
