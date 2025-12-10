"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");

  useEffect(() => {
    // Log error to console in development
    console.error("Error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-gray-950">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Error Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {t("title")}
        </h2>

        {/* Error Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          {t("description")}
        </p>

        {/* Error Details (Development only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left">
            <p className="text-sm font-mono text-red-600 dark:text-red-400 break-all">
              {error.message}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors shadow-md hover:shadow-lg"
          >
            {t("retry")}
          </button>
          <Link
            href="/"
            className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-center"
          >
            {t("backHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
