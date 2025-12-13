/**
 * Centralized configuration for the application
 * All hardcoded values should be moved here
 */

export const config = {
  // Base URL
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://temandifa.com",

  // Email configuration
  email: {
    from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
    contact: process.env.CONTACT_EMAIL || "hello@temandifa.com",
  },

  // Social media links
  social: {
    instagram: "https://instagram.com/temandifa",
    tiktok: "https://tiktok.com/@temandifa",
    linkedin: "https://linkedin.com/company/temandifa-com",
  },

  // Rate limiting
  rateLimit: {
    maxRequests: 3,
    windowMs: 60 * 1000, // 60 seconds
  },

  // Locales
  locales: ["en", "id"] as const,
  defaultLocale: "id" as const,
} as const;

export type Locale = (typeof config.locales)[number];
