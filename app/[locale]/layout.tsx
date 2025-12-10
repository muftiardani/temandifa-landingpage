import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "./providers/ThemeProvider";
import { SkipToContent } from "@/components/ui/SkipToContent";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["monospace"],
});

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const baseUrl = "https://temandifa.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: new URL(baseUrl),
    title: "TemanDifa - Aksesibilitas Nyata, Inklusi Tanpa Batas",
    description:
      "Aplikasi yang dirancang untuk memberdayakan penyandang disabilitas dengan fitur AI: deteksi objek real-time, voice-to-text, scan dokumen, dan emergency call. Menjadi mata, telinga dan asisten bantu.",
    keywords: [
      "difabel",
      "aksesibilitas",
      "tunanetra",
      "tunarungu",
      "AI",
      "assistive technology",
      "Indonesia",
      "aplikasi difabel",
      "teknologi aksesibilitas",
      "AI untuk tunanetra",
      "voice to text Indonesia",
      "emergency call difabel",
      "deteksi objek real-time",
      "scan dokumen tunanetra",
    ],
    authors: [{ name: "TemanDifa Team" }],
    creator: "TemanDifa",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        id: "/id",
        en: "/en",
      },
    },
    openGraph: {
      title: "TemanDifa - Aksesibilitas Nyata, Inklusi Tanpa Batas",
      description:
        "Menjadi mata, telinga dan asisten bantu bagi penyandang disabilitas",
      url: baseUrl,
      siteName: "TemanDifa",
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "website",
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "TemanDifa - Aksesibilitas Nyata, Inklusi Tanpa Batas",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "TemanDifa - Aksesibilitas Nyata, Inklusi Tanpa Batas",
      description: "Aplikasi AI untuk penyandang disabilitas",
      images: [`${baseUrl}/twitter-card.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!["en", "id"].includes(locale as "en" | "id")) {
    notFound();
  }

  const messages = await getMessages();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TemanDifa",
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    description:
      "Aplikasi AI untuk aksesibilitas penyandang disabilitas di Indonesia",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@temandifa.com",
      contactType: "Customer Service",
    },
    sameAs: [
      "https://instagram.com/temandifa",
      "https://tiktok.com/@temandifa",
      "https://linkedin.com/company/temandifa-com",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TemanDifa",
    url: baseUrl,
    description:
      "Platform aksesibilitas berbasis AI untuk penyandang disabilitas",
    inLanguage: [locale === "id" ? "id-ID" : "en-US"],
    publisher: {
      "@type": "Organization",
      name: "TemanDifa",
    },
  };

  const mobileAppSchema = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "TemanDifa",
    operatingSystem: "Android, iOS",
    applicationCategory: "UtilitiesApplication",
    description:
      "Aplikasi aksesibilitas dengan fitur deteksi objek, voice-to-text, scan dokumen, dan emergency call",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "IDR",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
    },
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(mobileAppSchema),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <ScrollProgress />
        <SkipToContent />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main id="main-content">{children}</main>
            <Footer />
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
