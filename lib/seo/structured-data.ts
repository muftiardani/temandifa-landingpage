import { config } from "../config";

export interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
  contactPoint: {
    "@type": "ContactPoint";
    email: string;
    contactType: string;
    availableLanguage: string[];
  };
}

export interface WebSiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
  inLanguage: string[];
  potentialAction: {
    "@type": "SearchAction";
    target: {
      "@type": "EntryPoint";
      urlTemplate: string;
    };
    "query-input": string;
  };
}

export interface SoftwareApplicationSchema {
  "@context": "https://schema.org";
  "@type": "SoftwareApplication";
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    "@type": "Offer";
    price: string;
    priceCurrency: string;
  };
  description: string;
  featureList: string[];
  screenshot?: string;
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: string;
    ratingCount: string;
  };
}

export interface BreadcrumbListSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item?: string;
  }>;
}

export function generateOrganizationSchema(locale: string): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TemanDifa",
    url: config.baseUrl,
    logo: `${config.baseUrl}/logo.png`,
    description:
      locale === "id"
        ? "Aplikasi aksesibilitas berbasis AI untuk penyandang disabilitas"
        : "AI-powered accessibility app for people with disabilities",
    sameAs: [
      "https://instagram.com/temandifa",
      "https://tiktok.com/@temandifa",
      "https://linkedin.com/company/temandifa",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@temandifa.com",
      contactType: "Customer Service",
      availableLanguage: ["Indonesian", "English"],
    },
  };
}

export function generateWebSiteSchema(locale: string): WebSiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TemanDifa",
    url: `${config.baseUrl}/${locale}`,
    description:
      locale === "id"
        ? "Platform aksesibilitas berbasis AI untuk penyandang disabilitas dengan fitur deteksi objek, voice-to-text, scan dokumen, dan emergency call"
        : "AI-powered accessibility platform for people with disabilities with object detection, voice-to-text, document scanning, and emergency call features",
    inLanguage: ["id-ID", "en-US"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${config.baseUrl}/${locale}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateSoftwareApplicationSchema(
  locale: string
): SoftwareApplicationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "TemanDifa",
    applicationCategory: "AccessibilityApplication",
    operatingSystem: "Android, iOS",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "IDR",
    },
    description:
      locale === "id"
        ? "Aplikasi yang dirancang untuk memberdayakan penyandang disabilitas dengan fitur AI: deteksi objek real-time, voice-to-text, scan dokumen, dan emergency call"
        : "An app designed to empower people with disabilities with AI features: real-time object detection, voice-to-text, document scanning, and emergency call",
    featureList: [
      locale === "id"
        ? "Deteksi Objek Real-Time"
        : "Real-Time Object Detection",
      locale === "id" ? "Voice to Text" : "Voice to Text",
      locale === "id" ? "Scan & Deteksi Teks" : "Scan & Text Detection",
      locale === "id" ? "Emergency Call" : "Emergency Call",
    ],
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>
): BreadcrumbListSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  };
}

export function renderJsonLd(data: object) {
  return {
    __html: JSON.stringify(data),
  };
}
