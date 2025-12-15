"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { logger } from "@/lib/logger";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");

  useEffect(() => {
    logger.error("Error page caught error", error, "ErrorPage");
  }, [error]);

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-gray-950"
      role="main"
      aria-labelledby="error-title"
    >
      <div className="w-full max-w-md text-center">
        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <svg
              className="h-10 w-10 text-red-600 dark:text-red-400"
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
        <h2
          id="error-title"
          className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl dark:text-gray-100"
        >
          {t("title")}
        </h2>

        {/* Error Description */}
        <p className="mb-8 leading-relaxed text-gray-600 dark:text-gray-400">
          {t("description")}
        </p>

        {/* Error Details */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-6 rounded-lg bg-gray-100 p-4 text-left dark:bg-gray-800">
            <p className="font-mono text-sm break-all text-red-600 dark:text-red-400">
              {error.message}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-blue-700 hover:shadow-lg dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            {t("retry")}
          </button>
          <Link
            href="/"
            className="rounded-lg bg-gray-200 px-6 py-3 text-center font-semibold text-gray-900 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
          >
            {t("backHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
