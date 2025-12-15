import { Metadata } from "next";
import { config } from "@/lib/config";

const baseUrl = config.baseUrl;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const isIndonesian = locale === "id";

  return {
    title: isIndonesian
      ? "Fitur Produk - TemanDifa | Aplikasi AI untuk Aksesibilitas"
      : "Product Features - TemanDifa | AI App for Accessibility",
    description: isIndonesian
      ? "Jelajahi fitur-fitur TemanDifa: Deteksi objek real-time, Voice-to-Text, Scan dokumen, dan Emergency Call. Teknologi AI untuk membantu penyandang disabilitas."
      : "Explore TemanDifa features: Real-time object detection, Voice-to-Text, Document scanning, and Emergency Call. AI technology to help people with disabilities.",
    keywords: isIndonesian
      ? [
          "fitur TemanDifa",
          "deteksi objek AI",
          "voice to text Indonesia",
          "scan dokumen tunanetra",
          "emergency call difabel",
          "aplikasi AI aksesibilitas",
          "teknologi untuk difabel",
          "fitur aplikasi tunanetra",
        ]
      : [
          "TemanDifa features",
          "AI object detection",
          "voice to text app",
          "document scanning blind",
          "emergency call disability",
          "AI accessibility app",
          "technology for disabled",
          "blind app features",
        ],
    alternates: {
      canonical: `/${locale}/produk`,
      languages: {
        id: "/id/produk",
        en: "/en/produk",
      },
    },
    openGraph: {
      title: isIndonesian
        ? "Fitur Produk - TemanDifa | Aplikasi AI Aksesibilitas"
        : "Product Features - TemanDifa | AI Accessibility App",
      description: isIndonesian
        ? "Deteksi objek, Voice-to-Text, Scan dokumen, Emergency Call"
        : "Object detection, Voice-to-Text, Document scan, Emergency Call",
      url: `${baseUrl}/${locale}/produk`,
      siteName: "TemanDifa",
      locale: isIndonesian ? "id_ID" : "en_US",
      type: "website",
      images: [
        {
          url: `${baseUrl}/images/menu-mockup.png`,
          width: 600,
          height: 800,
          alt: isIndonesian
            ? "Tampilan menu aplikasi TemanDifa"
            : "TemanDifa app menu interface",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isIndonesian
        ? "Fitur Produk - TemanDifa"
        : "Product Features - TemanDifa",
      description: isIndonesian
        ? "Teknologi AI untuk aksesibilitas penyandang disabilitas"
        : "AI technology for disability accessibility",
      images: [`${baseUrl}/images/menu-mockup.png`],
    },
  };
}

export { default } from "./ProdukPageClient";
