import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-gray-950">
      <div className="w-full max-w-md text-center">
        <h1 className="mb-4 text-8xl font-bold text-blue-600 md:text-9xl dark:text-blue-400">
          404
        </h1>

        <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl dark:text-gray-100">
          {t("title")}
        </h2>

        <p className="mb-8 leading-relaxed text-gray-600 dark:text-gray-400">
          {t("description")}
        </p>

        <div className="mb-8 flex justify-center">
          <svg
            className="h-48 w-48 text-gray-300 dark:text-gray-700"
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
          className="inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-colors hover:bg-blue-700 hover:shadow-lg dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          {t("backHome")}
        </Link>

        <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-700">
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            {t("quickLinks")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/tentang"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              {t("aboutLink")}
            </Link>
            <Link
              href="/produk"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              {t("featuresLink")}
            </Link>
            <Link
              href="/kontak"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              {t("contactLink")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
