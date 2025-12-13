"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import NewsletterForm from "@/components/forms/NewsletterForm";
import { config } from "@/lib/config";

export default function Footer() {
  const t = useTranslations("Footer");
  const navT = useTranslations("Navbar");
  const newsletterT = useTranslations("Newsletter");

  return (
    <footer
      className="bg-[#3b82f6] dark:bg-gray-900 text-white pt-16 pb-8 px-4 sm:px-8 border-t border-blue-400 dark:border-gray-700 transition-colors"
      role="contentinfo"
      aria-label="Footer situs"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1.5fr] gap-8 lg:gap-12 border-b border-blue-400 dark:border-gray-700 pb-12 mb-8">
          <div className="space-y-4">
            <div className="text-2xl font-bold text-white dark:text-blue-400">
              Teman
              <span className="text-yellow-500 dark:text-yellow-400">Difa</span>
            </div>
            <p className="text-blue-100 dark:text-gray-300 text-sm font-semibold leading-relaxed">
              {t.rich("tagline", {
                br: () => <br />,
              })}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">{t("menu_title")}</h4>
            <ul className="space-y-3 text-blue-100 dark:text-gray-300 font-semibold text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-white hover:underline transition"
                >
                  {navT("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang"
                  className="hover:text-white hover:underline transition"
                >
                  {navT("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/produk"
                  className="hover:text-white hover:underline transition"
                >
                  {navT("features")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">{t("social_title")}</h4>
            <div className="flex items-center gap-4">
              <a
                href={config.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all hover:scale-110"
                aria-label="Kunjungi Instagram TemanDifa"
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
                  className="w-5 h-5"
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
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all hover:scale-110"
                aria-label="Kunjungi TikTok TemanDifa"
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
                  className="w-5 h-5"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>

              <a
                href={config.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all hover:scale-110"
                aria-label="Kunjungi LinkedIn TemanDifa"
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
                  className="w-5 h-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="font-bold text-lg mb-4">{newsletterT("title")}</h4>
            <p className="text-blue-100 dark:text-gray-300 text-sm mb-4">
              {newsletterT("description")}
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="text-center text-blue-200 dark:text-gray-400 text-sm font-medium">
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}

