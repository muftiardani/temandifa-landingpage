export const config = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://temandifa.com",

  email: {
    from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
    contact: process.env.CONTACT_EMAIL || "hello@temandifa.com",
  },

  social: {
    instagram: "https://instagram.com/temandifa",
    tiktok: "https://tiktok.com/@temandifa",
    linkedin: "https://linkedin.com/company/temandifa-com",
  },

  rateLimit: {
    maxRequests: 3,
    windowMs: 60 * 1000,
  },

  locales: ["en", "id"] as const,
  defaultLocale: "id" as const,
} as const;

export type Locale = (typeof config.locales)[number];
