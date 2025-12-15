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
      ? "Tentang Kami - TemanDifa | Visi & Misi Aksesibilitas"
      : "About Us - TemanDifa | Accessibility Vision & Mission",
    description: isIndonesian
      ? "Kenali TemanDifa lebih dekat. Kami berkomitmen untuk memberdayakan penyandang disabilitas melalui teknologi AI yang inovatif. Pelajari visi dan misi kami."
      : "Get to know TemanDifa. We are committed to empowering people with disabilities through innovative AI technology. Learn about our vision and mission.",
    keywords: isIndonesian
      ? [
          "tentang TemanDifa",
          "visi misi aksesibilitas",
          "startup difabel Indonesia",
          "teknologi untuk tunanetra",
          "inovasi aksesibilitas",
          "pemberdayaan difabel",
          "AI untuk disabilitas",
        ]
      : [
          "about TemanDifa",
          "accessibility vision mission",
          "disability startup Indonesia",
          "technology for blind",
          "accessibility innovation",
          "disability empowerment",
          "AI for disabilities",
        ],
    alternates: {
      canonical: `/${locale}/tentang`,
      languages: {
        id: "/id/tentang",
        en: "/en/tentang",
      },
    },
    openGraph: {
      title: isIndonesian ? "Tentang Kami - TemanDifa" : "About Us - TemanDifa",
      description: isIndonesian
        ? "Memberdayakan penyandang disabilitas melalui teknologi AI inovatif"
        : "Empowering people with disabilities through innovative AI technology",
      url: `${baseUrl}/${locale}/tentang`,
      siteName: "TemanDifa",
      locale: isIndonesian ? "id_ID" : "en_US",
      type: "website",
      images: [
        {
          url: `${baseUrl}/images/logo.png`,
          width: 512,
          height: 512,
          alt: "TemanDifa Logo",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: isIndonesian ? "Tentang Kami - TemanDifa" : "About Us - TemanDifa",
      description: isIndonesian
        ? "Memberdayakan difabel melalui teknologi AI"
        : "Empowering disabled through AI technology",
    },
  };
}

export { default } from "./TentangPageClient";
