"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import NewsletterForm from "@/components/forms/NewsletterForm";
import { config } from "@/lib/config";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function Footer() {
  const t = useTranslations("Footer");
  const navT = useTranslations("Navbar");
  const newsletterT = useTranslations("Newsletter");
  const { trackSocial, trackNavigation } = useAnalytics();

  return (
    <footer
      className="border-t border-blue-400 bg-[#3b82f6] px-4 pt-16 pb-8 text-white transition-colors sm:px-8 dark:border-gray-700 dark:bg-gray-900"
      role="contentinfo"
      aria-label="Footer situs"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 grid grid-cols-1 gap-8 border-b border-blue-400 pb-12 md:grid-cols-[1.5fr_1fr_1fr_1.5fr] lg:gap-12 dark:border-gray-700">
          <div className="space-y-4">
            <div className="text-2xl font-bold text-white dark:text-blue-400">
              Teman
              <span className="text-yellow-500 dark:text-yellow-400">Difa</span>
            </div>
            <p className="text-sm leading-relaxed font-semibold text-blue-100 dark:text-gray-300">
              {t.rich("tagline", {
                br: () => <br />,
              })}
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-bold">{t("menu_title")}</h4>
            <ul className="space-y-3 text-sm font-semibold text-blue-100 dark:text-gray-300">
              <li>
                <Link
                  href="/"
                  className="transition hover:text-white hover:underline"
                  onClick={() => trackNavigation("Home", "/")}
                >
                  {navT("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang"
                  className="transition hover:text-white hover:underline"
                  onClick={() => trackNavigation("About", "/tentang")}
                >
                  {navT("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/produk"
                  className="transition hover:text-white hover:underline"
                  onClick={() => trackNavigation("Features", "/produk")}
                >
                  {navT("features")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold">{t("social_title")}</h4>
            <div className="flex items-center gap-4">
              <a
                href={config.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 p-2 transition-all hover:scale-110 hover:bg-white/20"
                aria-label="Kunjungi Instagram TemanDifa"
                onClick={() => trackSocial("instagram")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              <a
                href={config.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 p-2 transition-all hover:scale-110 hover:bg-white/20"
                aria-label="Kunjungi TikTok TemanDifa"
                onClick={() => trackSocial("tiktok")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>

              <a
                href={config.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 p-2 transition-all hover:scale-110 hover:bg-white/20"
                aria-label="Kunjungi LinkedIn TemanDifa"
                onClick={() => trackSocial("linkedin")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-bold">{newsletterT("title")}</h4>
            <p className="mb-4 text-sm text-blue-100 dark:text-gray-300">
              {newsletterT("description")}
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="text-center text-sm font-medium text-blue-200 dark:text-gray-400">
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
