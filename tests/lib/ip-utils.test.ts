import { describe, it, expect, vi, beforeEach } from "vitest";

const mockHeaders = new Map<string, string>();
const mockRequest = {
  headers: {
    get: (name: string) => mockHeaders.get(name.toLowerCase()) || null,
  },
};

vi.mock("next/server", () => ({
  NextRequest: vi.fn(),
}));

import {
  getClientIp,
  isValidIp,
  anonymizeIp,
  createRateLimitIdentifier,
} from "@/lib/security/ip-utils";

describe("IP Utilities", () => {
  beforeEach(() => {
    mockHeaders.clear();
  });

  describe("isValidIp", () => {
    it("should return true for valid IPv4 addresses", () => {
      expect(isValidIp("192.168.1.1")).toBe(true);
      expect(isValidIp("10.0.0.1")).toBe(true);
      expect(isValidIp("172.16.0.1")).toBe(true);
      expect(isValidIp("8.8.8.8")).toBe(true);
      expect(isValidIp("255.255.255.255")).toBe(true);
      expect(isValidIp("0.0.0.0")).toBe(true);
    });

    it("should return false for invalid IPv4 addresses", () => {
      expect(isValidIp("256.1.1.1")).toBe(false);
      expect(isValidIp("192.168.1")).toBe(false);
      expect(isValidIp("192.168.1.1.1")).toBe(false);
      expect(isValidIp("not-an-ip")).toBe(false);
      expect(isValidIp("")).toBe(false);
    });

    it("should return true for valid IPv6 addresses", () => {
      expect(isValidIp("::1")).toBe(true);
      expect(isValidIp("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toBe(true);
    });
  });

  describe("anonymizeIp", () => {
    it("should anonymize IPv4 by zeroing last octet", () => {
      expect(anonymizeIp("192.168.1.100")).toBe("192.168.1.0");
      expect(anonymizeIp("10.20.30.40")).toBe("10.20.30.0");
    });

    it("should return 'unknown' for unknown IP", () => {
      expect(anonymizeIp("unknown")).toBe("unknown");
      expect(anonymizeIp("")).toBe("");
    });

    it("should anonymize IPv6 addresses", () => {
      const result = anonymizeIp("2001:0db8:85a3:0000:0000:8a2e:0370:7334");
      expect(result).toBe("2001:0db8:85a3::");
    });
  });

  describe("getClientIp", () => {
    it("should extract IP from cf-connecting-ip header", () => {
      mockHeaders.set("cf-connecting-ip", "203.0.113.50");

      // @ts-expect-error - Mock request type
      const ip = getClientIp(mockRequest);

      expect(ip).toBe("203.0.113.50");
    });

    it("should extract IP from x-real-ip header", () => {
      mockHeaders.set("x-real-ip", "203.0.113.51");

      // @ts-expect-error - Mock request type
      const ip = getClientIp(mockRequest);

      expect(ip).toBe("203.0.113.51");
    });

    it("should extract first non-private IP from x-forwarded-for", () => {
      mockHeaders.set("x-forwarded-for", "10.0.0.1, 192.168.1.1, 203.0.113.52");

      // @ts-expect-error - Mock request type
      const ip = getClientIp(mockRequest);

      expect(ip).toBe("203.0.113.52");
    });

    it("should return 'unknown' when no headers present", () => {
      // @ts-expect-error - Mock request type
      const ip = getClientIp(mockRequest);

      expect(ip).toBe("unknown");
    });

    it("should prefer cf-connecting-ip over other headers", () => {
      mockHeaders.set("cf-connecting-ip", "203.0.113.50");
      mockHeaders.set("x-real-ip", "203.0.113.51");
      mockHeaders.set("x-forwarded-for", "203.0.113.52");

      // @ts-expect-error - Mock request type
      const ip = getClientIp(mockRequest);

      expect(ip).toBe("203.0.113.50");
    });
  });

  describe("createRateLimitIdentifier", () => {
    it("should create identifier with IP only", () => {
      mockHeaders.set("x-real-ip", "203.0.113.50");

      // @ts-expect-error - Mock request type
      const identifier = createRateLimitIdentifier(mockRequest);

      expect(identifier).toBe("203.0.113.50");
    });

    it("should create identifier with prefix", () => {
      mockHeaders.set("x-real-ip", "203.0.113.50");

      // @ts-expect-error - Mock request type
      const identifier = createRateLimitIdentifier(mockRequest, "contact");

      expect(identifier).toBe("contact:203.0.113.50");
    });
  });
});
