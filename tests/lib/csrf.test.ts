import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createHmac } from "crypto";
import {
  generateCSRFToken,
  hashCSRFToken,
  validateCSRFToken,
  getCSRFTokenFromHeaders,
  createCSRFErrorResponse,
  generateSignedUnsubscribeUrl,
  validateSignedUnsubscribeUrl,
} from "@/lib/security/csrf";

vi.mock("@/lib/logger", () => ({
  logger: {
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
  },
}));

describe("CSRF Security Functions", () => {
  const testSecret = "test-secret-key-that-is-at-least-32-chars";

  describe("generateCSRFToken", () => {
    it("should generate a token with correct structure", () => {
      const result = generateCSRFToken();

      expect(result).toHaveProperty("token");
      expect(result).toHaveProperty("expiresAt");
      expect(typeof result.token).toBe("string");
      expect(typeof result.expiresAt).toBe("number");
    });

    it("should generate unique tokens on each call", () => {
      const token1 = generateCSRFToken();
      const token2 = generateCSRFToken();

      expect(token1.token).not.toBe(token2.token);
    });

    it("should set expiration 15 minutes in the future", () => {
      const before = Date.now();
      const result = generateCSRFToken();
      const after = Date.now();

      const expectedMin = before + 15 * 60 * 1000;
      const expectedMax = after + 15 * 60 * 1000;

      expect(result.expiresAt).toBeGreaterThanOrEqual(expectedMin);
      expect(result.expiresAt).toBeLessThanOrEqual(expectedMax);
    });
  });

  describe("hashCSRFToken", () => {
    it("should return a consistent hash for the same token and secret", () => {
      const token = "test-token";
      const hash1 = hashCSRFToken(token, testSecret);
      const hash2 = hashCSRFToken(token, testSecret);

      expect(hash1).toBe(hash2);
    });

    it("should return different hashes for different tokens", () => {
      const hash1 = hashCSRFToken("token1", testSecret);
      const hash2 = hashCSRFToken("token2", testSecret);

      expect(hash1).not.toBe(hash2);
    });

    it("should return different hashes for different secrets", () => {
      const token = "test-token";
      const hash1 = hashCSRFToken(token, "secret1");
      const hash2 = hashCSRFToken(token, "secret2");

      expect(hash1).not.toBe(hash2);
    });
  });

  describe("validateCSRFToken", () => {
    it("should return true for valid token and hash", () => {
      const token = "test-token";
      const hash = hashCSRFToken(token, testSecret);
      const expiresAt = Date.now() + 60000;

      const isValid = validateCSRFToken(token, hash, testSecret, expiresAt);

      expect(isValid).toBe(true);
    });

    it("should return false for invalid token", () => {
      const hash = hashCSRFToken("original-token", testSecret);
      const expiresAt = Date.now() + 60000;

      const isValid = validateCSRFToken(
        "wrong-token",
        hash,
        testSecret,
        expiresAt
      );

      expect(isValid).toBe(false);
    });

    it("should return false for expired token", () => {
      const token = "test-token";
      const hash = hashCSRFToken(token, testSecret);
      const expiresAt = Date.now() - 1000;

      const isValid = validateCSRFToken(token, hash, testSecret, expiresAt);

      expect(isValid).toBe(false);
    });

    it("should return false for empty token", () => {
      const isValid = validateCSRFToken("", "hash", testSecret);

      expect(isValid).toBe(false);
    });

    it("should return false for empty hash", () => {
      const isValid = validateCSRFToken("token", "", testSecret);

      expect(isValid).toBe(false);
    });

    it("should return false for empty secret", () => {
      const isValid = validateCSRFToken("token", "hash", "");

      expect(isValid).toBe(false);
    });
  });

  describe("getCSRFSecret", () => {
    const originalEnv = process.env;

    beforeEach(() => {
      vi.resetModules();
      process.env = { ...originalEnv };
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    it("should return CSRF_SECRET from environment", async () => {
      process.env.CSRF_SECRET = testSecret;

      const { getCSRFSecret } = await import("@/lib/security/csrf");
      const secret = getCSRFSecret();

      expect(secret).toBe(testSecret);
    });

    it("should return fallback secret in development", async () => {
      delete process.env.CSRF_SECRET;
      vi.stubEnv("NODE_ENV", "development");

      const { getCSRFSecret } = await import("@/lib/security/csrf");
      const secret = getCSRFSecret();

      expect(secret).toBe("development-csrf-secret-change-in-production");
    });

    it("should throw error in production without secret", async () => {
      delete process.env.CSRF_SECRET;
      vi.stubEnv("NODE_ENV", "production");

      const { getCSRFSecret } = await import("@/lib/security/csrf");
      expect(() => getCSRFSecret()).toThrow();
    });
  });

  describe("getCSRFTokenFromHeaders", () => {
    it("should extract token from headers", () => {
      const headers = new Headers();
      headers.set("x-csrf-token", "test-token");

      const token = getCSRFTokenFromHeaders(headers);

      expect(token).toBe("test-token");
    });

    it("should return null if header not present", () => {
      const headers = new Headers();

      const token = getCSRFTokenFromHeaders(headers);

      expect(token).toBeNull();
    });
  });

  describe("createCSRFErrorResponse", () => {
    it("should return error object with correct structure", () => {
      const response = createCSRFErrorResponse();

      expect(response).toEqual({
        error: "Invalid or missing CSRF token",
        code: "CSRF_VALIDATION_FAILED",
      });
    });
  });

  describe("generateSignedUnsubscribeUrl", () => {
    it("should generate URL with required parameters", () => {
      process.env.CSRF_SECRET = testSecret;

      const url = generateSignedUnsubscribeUrl(
        "test@example.com",
        "https://example.com"
      );

      expect(url).toContain("https://example.com/unsubscribe");
      expect(url).toContain("email=test%40example.com");
      expect(url).toContain("t=");
      expect(url).toContain("sig=");
    });
  });

  describe("validateSignedUnsubscribeUrl", () => {
    it("should validate a correctly signed URL", () => {
      process.env.CSRF_SECRET = testSecret;
      const email = "test@example.com";
      const timestamp = Date.now();

      const data = `${email}:${timestamp}`;
      const signature = createHmac("sha256", testSecret)
        .update(data)
        .digest("base64url");

      const result = validateSignedUnsubscribeUrl(email, timestamp, signature);

      expect(result.valid).toBe(true);
    });

    it("should reject expired signature", () => {
      process.env.CSRF_SECRET = testSecret;
      const email = "test@example.com";
      const timestamp = Date.now() - 8 * 24 * 60 * 60 * 1000;

      const result = validateSignedUnsubscribeUrl(
        email,
        timestamp,
        "any-signature"
      );

      expect(result.valid).toBe(false);
      expect(result.error).toBe("Unsubscribe link has expired");
    });

    it("should reject missing parameters", () => {
      const result = validateSignedUnsubscribeUrl("", 0, "");

      expect(result.valid).toBe(false);
      expect(result.error).toBe("Missing required parameters");
    });
  });
});
