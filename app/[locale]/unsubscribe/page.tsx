"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function UnsubscribePage() {
  const t = useTranslations("Unsubscribe");
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleUnsubscribe = async () => {
    if (!email) {
      setStatus("error");
      setMessage(t("email_required"));
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || t("success_default"));
      } else {
        setStatus("error");
        setMessage(data.error || t("error_default"));
      }
    } catch {
      setStatus("error");
      setMessage(t("error_occurred"));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            {t("title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{t("subtitle")}</p>
        </div>

        {email && (
          <div className="mb-6 rounded-lg bg-gray-100 p-4 dark:bg-gray-700">
            <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
              {t("email_label")}
            </p>
            <p className="font-medium text-gray-900 dark:text-white">{email}</p>
          </div>
        )}

        {status === "idle" && email && (
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              {t("confirmation_text")}
            </p>
            <button
              onClick={handleUnsubscribe}
              className="w-full rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-red-700"
            >
              {t("btn_unsubscribe")}
            </button>
            <Link
              href="/"
              className="block w-full rounded-lg bg-gray-200 px-4 py-3 text-center font-semibold text-gray-900 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              {t("btn_cancel")}
            </Link>
          </div>
        )}

        {status === "loading" && (
          <div className="py-8 text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              {t("loading_text")}
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="py-8 text-center">
            <div className="mb-4">
              <svg
                className="mx-auto h-16 w-16 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
              {t("success_title")}
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">{message}</p>
            <Link
              href="/"
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              {t("btn_home")}
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="py-8 text-center">
            <div className="mb-4">
              <svg
                className="mx-auto h-16 w-16 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
              {t("error_title")}
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">{message}</p>
            <button
              onClick={() => setStatus("idle")}
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              {t("btn_retry")}
            </button>
          </div>
        )}

        {!email && (
          <div className="py-8 text-center">
            <p className="mb-4 text-red-600 dark:text-red-400">
              {t("no_email_error")}
            </p>
            <Link
              href="/"
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              {t("btn_home")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
