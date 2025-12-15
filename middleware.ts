import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { config as i18nConfig } from "@/lib/config";

const intlMiddleware = createMiddleware({
  locales: i18nConfig.locales,
  defaultLocale: i18nConfig.defaultLocale,
});

export default function middleware(request: NextRequest) {
  const nonceBytes = crypto.getRandomValues(new Uint8Array(16));
  const nonce = Buffer.from(nonceBytes).toString("base64");
  
  const response = intlMiddleware(request);
  
  response.headers.set("x-nonce", nonce);
  
  const isDev = process.env.NODE_ENV === "development";
  
  if (!isDev) {
    const cspHeader = [
      "default-src 'self'",
      `script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://www.google-analytics.com https://*.sentry.io`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://*.sentry.io https://*.upstash.io https://api.resend.com",
      "worker-src 'self' blob:",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "child-src 'self' blob:",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; ");
    
    response.headers.set("Content-Security-Policy", cspHeader);
    
    response.headers.set("Content-Security-Policy-Report-Only", cspHeader);
  }
  
  return response;
}

export const config = {
  matcher: [
    '/',
    '/(id|en)',
    '/(id|en)/tentang',
    '/(id|en)/produk',
    '/(id|en)/kontak',
    '/(id|en)/unsubscribe',
  ],
};
