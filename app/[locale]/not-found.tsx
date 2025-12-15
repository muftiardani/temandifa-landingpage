import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-gray-950">
      <div className="max-w-md w-full text-center">
        <h1 className="text-8xl md:text-9xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {t("title")}
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          {t("description")}
        </p>

        <div className="mb-8 flex justify-center">
          <svg
            className="w-48 h-48 text-gray-300 dark:text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <Link
          href="/"
          className="inline-block bg-blue-600 dark:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors shadow-md hover:shadow-lg"
        >
          {t("backHome")}
        </Link>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {t("quickLinks")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/tentang"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {t("aboutLink")}
            </Link>
            <Link
              href="/produk"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {t("featuresLink")}
            </Link>
            <Link
              href="/kontak"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {t("contactLink")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
