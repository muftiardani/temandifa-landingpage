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
      ? "Hubungi Kami - TemanDifa | Kontak & Dukungan"
      : "Contact Us - TemanDifa | Support & Inquiries",
    description: isIndonesian
      ? "Hubungi tim TemanDifa untuk pertanyaan, masukan, atau kerjasama. Kami siap membantu Anda dengan aplikasi aksesibilitas terbaik untuk penyandang disabilitas."
      : "Contact the TemanDifa team for questions, feedback, or partnerships. We're ready to help you with the best accessibility app for people with disabilities.",
    keywords: isIndonesian
      ? [
          "kontak TemanDifa",
          "hubungi TemanDifa",
          "customer service aksesibilitas",
          "dukungan aplikasi difabel",
          "email TemanDifa",
          "alamat TemanDifa",
        ]
      : [
          "contact TemanDifa",
          "reach TemanDifa",
          "accessibility customer service",
          "disability app support",
          "TemanDifa email",
          "TemanDifa address",
        ],
    alternates: {
      canonical: `/${locale}/kontak`,
      languages: {
        id: "/id/kontak",
        en: "/en/kontak",
      },
    },
    openGraph: {
      title: isIndonesian
        ? "Hubungi Kami - TemanDifa"
        : "Contact Us - TemanDifa",
      description: isIndonesian
        ? "Hubungi tim TemanDifa untuk pertanyaan dan dukungan"
        : "Contact the TemanDifa team for questions and support",
      url: `${baseUrl}/${locale}/kontak`,
      siteName: "TemanDifa",
      locale: isIndonesian ? "id_ID" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: isIndonesian
        ? "Hubungi Kami - TemanDifa"
        : "Contact Us - TemanDifa",
      description: isIndonesian
        ? "Hubungi tim TemanDifa untuk pertanyaan dan dukungan"
        : "Contact the TemanDifa team for questions and support",
    },
  };
}

export { default } from "./KontakPageClient";
