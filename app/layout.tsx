import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "./providers/ThemeProvider";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
  ],
  authors: [{ name: "TemanDifa Team" }],
  creator: "TemanDifa",
  openGraph: {
    title: "TemanDifa - Aksesibilitas Nyata, Inklusi Tanpa Batas",
    description:
      "Menjadi mata, telinga dan asisten bantu bagi penyandang disabilitas",
    url: "https://temandifa.com",
    siteName: "TemanDifa",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TemanDifa - Aksesibilitas Nyata, Inklusi Tanpa Batas",
    description: "Aplikasi AI untuk penyandang disabilitas",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TemanDifa",
    url: "https://temandifa.com",
    logo: "https://temandifa.com/images/logo.png",
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

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Footer />
          <GoogleAnalytics
            gaId={process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
