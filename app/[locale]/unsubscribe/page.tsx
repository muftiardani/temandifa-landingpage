"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function UnsubscribePage() {
  const t = useTranslations("Unsubscribe");
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t("title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t("subtitle")}
          </p>
        </div>

        {email && (
          <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {t("email_label")}
            </p>
            <p className="font-medium text-gray-900 dark:text-white">
              {email}
            </p>
          </div>
        )}

        {status === "idle" && email && (
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              {t("confirmation_text")}
            </p>
            <button
              onClick={handleUnsubscribe}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              {t("btn_unsubscribe")}
            </button>
            <Link
              href="/"
              className="block w-full text-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              {t("btn_cancel")}
            </Link>
          </div>
        )}

        {status === "loading" && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              {t("loading_text")}
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center py-8">
            <div className="mb-4">
              <svg className="mx-auto h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t("success_title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {message}
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {t("btn_home")}
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="text-center py-8">
            <div className="mb-4">
              <svg className="mx-auto h-16 w-16 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t("error_title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {message}
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {t("btn_retry")}
            </button>
          </div>
        )}

        {!email && (
          <div className="text-center py-8">
            <p className="text-red-600 dark:text-red-400 mb-4">
              {t("no_email_error")}
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {t("btn_home")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
