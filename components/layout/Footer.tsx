"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import NewsletterForm from "@/components/forms/NewsletterForm";
import { config } from "@/lib/config";
import { useAnalytics } from "@/hooks/useAnalytics";
import { blurDataURL } from "@/lib/seo/image-placeholders";

export default function Footer() {
  const t = useTranslations("Footer");
  const navT = useTranslations("Navbar");
  const newsletterT = useTranslations("Newsletter");
  const { trackSocial, trackNavigation } = useAnalytics();

  return (
    <footer
      className="relative overflow-hidden border-t border-white/10 bg-linear-to-br from-slate-900 via-slate-900 to-slate-950 pt-20 pb-10 text-white"
      role="contentinfo"
      aria-label="Footer situs"
    >
      {/* Decorative Blur Elements */}
      <div className="pointer-events-none absolute top-0 left-0 h-[500px] w-[500px] -translate-x-1/2 translate-y-[-50%] rounded-full bg-blue-600/20 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[500px] w-[500px] translate-x-1/3 translate-y-1/3 rounded-full bg-purple-600/20 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 border-b border-white/10 pb-12 md:grid-cols-[1.5fr_1fr_1fr_1.5fr] lg:gap-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-purple-600 p-0.5 shadow-lg shadow-blue-500/20">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white dark:bg-slate-950">
                  <Image
                    src="/images/logo.png"
                    alt="Logo Teman Difa"
                    width={32}
                    height={32}
                    className="object-contain"
                    placeholder="blur"
                    blurDataURL={blurDataURL.logo}
                  />
                </div>
              </div>
              <div className="text-2xl font-bold tracking-tight text-white">
                Teman
                <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Difa
                </span>
              </div>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              {t.rich("tagline", {
                br: () => <br />,
              })}
            </p>
          </div>

          <div>
            <h4 className="mb-6 max-w-max border-b-2 border-blue-500 pb-2 text-lg font-bold text-white">
              {t("menu_title")}
            </h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-blue-400"
                  onClick={() => trackNavigation("Home", "/")}
                >
                  {navT("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang"
                  className="transition-colors hover:text-blue-400"
                  onClick={() => trackNavigation("About", "/tentang")}
                >
                  {navT("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/produk"
                  className="transition-colors hover:text-blue-400"
                  onClick={() => trackNavigation("Features", "/produk")}
                >
                  {navT("features")}
                </Link>
              </li>
              <li>
                <Link
                  href="/kontak"
                  className="transition-colors hover:text-blue-400"
                  onClick={() => trackNavigation("Contact", "/kontak")}
                >
                  {navT("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 max-w-max border-b-2 border-purple-500 pb-2 text-lg font-bold text-white">
              {t("social_title")}
            </h4>
            <div className="flex items-center gap-3">
              {(
                [
                  {
                    icon: "instagram",
                    url: config.social.instagram,
                    label: "Instagram",
                  },
                  {
                    icon: "tiktok",
                    url: config.social.tiktok,
                    label: "TikTok",
                  },
                  {
                    icon: "linkedin",
                    url: config.social.linkedin,
                    label: "LinkedIn",
                  },
                ] as const
              ).map((social) => (
                <a
                  key={social.icon}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-all hover:bg-linear-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/30"
                  aria-label={`Kunjungi ${social.icon} TemanDifa`}
                  onClick={() => trackSocial(social.icon)}
                >
                  {social.icon === "instagram" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  )}
                  {social.icon === "tiktok" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    </svg>
                  )}
                  {social.icon === "linkedin" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-6 max-w-max border-b-2 border-green-500 pb-2 text-lg font-bold text-white">
              {newsletterT("title")}
            </h4>
            <p className="mb-6 text-sm text-slate-400">
              {newsletterT("description")}
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-sm text-slate-500">{t("copyright")}</p>
          <div className="flex gap-6 text-sm font-medium text-slate-500">
            <Link href="#" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
