import { NextRequest } from "next/server";

const TRUSTED_HEADERS = [
  "cf-connecting-ip",
  "x-real-ip",
  "x-forwarded-for",
];

const PRIVATE_IP_PATTERNS = [
  /^10\./,
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
  /^192\.168\./,
  /^127\./,
  /^::1$/,
  /^fc00:/,
  /^fe80:/,
  /^fd/,
];

function isPrivateIp(ip: string): boolean {
  return PRIVATE_IP_PATTERNS.some((pattern) => pattern.test(ip));
}

export function getClientIp(request: NextRequest): string {
  for (const header of TRUSTED_HEADERS) {
    const value = request.headers.get(header);
    if (value) {
      const ips = value.split(",").map((ip) => ip.trim());

      for (const ip of ips) {
        if (!isPrivateIp(ip) && isValidIp(ip)) {
          return ip;
        }
      }

      if (ips.length > 0 && isValidIp(ips[0])) {
        return ips[0];
      }
    }
  }

  return "unknown";
}

export function isValidIp(ip: string): boolean {
  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::(?:[0-9a-fA-F]{1,4}:){0,6}[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,6}::(?:[0-9a-fA-F]{1,4}:){0,5}[0-9a-fA-F]{1,4}$|^::1$/;

  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

export function anonymizeIp(ip: string): string {
  if (!ip || ip === "unknown") {
    return ip;
  }

  if (ip.includes(".")) {
    const parts = ip.split(".");
    if (parts.length === 4) {
      parts[3] = "0";
      return parts.join(".");
    }
  }

  if (ip.includes(":")) {
    const parts = ip.split(":");
    if (parts.length >= 4) {
      return parts.slice(0, 3).join(":") + "::";
    }
  }

  return ip;
}

export function createRateLimitIdentifier(
  request: NextRequest,
  prefix?: string
): string {
  const ip = getClientIp(request);
  return prefix ? `${prefix}:${ip}` : ip;
}
