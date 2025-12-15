"use client";

import { Component, ReactNode } from "react";
import * as Sentry from "@sentry/nextjs";
import { useTranslations } from "next-intl";
import { logger } from "@/lib/logger";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

function ErrorFallback({
  error,
  onReload,
}: {
  error?: Error;
  onReload: () => void;
}) {
  const t = useTranslations("Error");

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg dark:bg-gray-800">
        <div className="mb-4 text-6xl">⚠️</div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          {t("title")}
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          {t("error_description")}
        </p>
        {process.env.NODE_ENV === "development" && error && (
          <details className="mb-6 rounded border border-red-200 bg-red-50 p-4 text-left dark:border-red-800 dark:bg-red-900/20">
            <summary className="mb-2 cursor-pointer font-semibold text-red-800 dark:text-red-300">
              {t("error_details")}
            </summary>
            <pre className="overflow-auto text-xs text-red-700 dark:text-red-400">
              {error.toString()}
              {"\n\n"}
              {error.stack}
            </pre>
          </details>
        )}
        <button
          onClick={onReload}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          {t("reload_page")}
        </button>
      </div>
    </div>
  );
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (typeof window !== "undefined" && window.Sentry) {
      Sentry.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack,
          },
        },
      });
    }

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "error_boundary", {
        category: "error",
        error_message: error.message,
        error_name: error.name,
        component_stack: errorInfo.componentStack?.slice(0, 500),
      });
    }

    this.props.onError?.(error, errorInfo);

    logger.error("ErrorBoundary caught error", error, "ErrorBoundary");
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <ErrorFallback
            error={this.state.error}
            onReload={() => window.location.reload()}
          />
        )
      );
    }

    return this.props.children;
  }
}
