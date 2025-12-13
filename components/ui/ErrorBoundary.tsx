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

function ErrorFallback({ error, onReload }: { error?: Error; onReload: () => void }) {
  const t = useTranslations("Error");
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t("title")}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {t("error_description")}
        </p>
        {process.env.NODE_ENV === "development" && error && (
          <details className="text-left mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
            <summary className="cursor-pointer font-semibold text-red-800 dark:text-red-300 mb-2">
              {t("error_details")}
            </summary>
            <pre className="text-xs text-red-700 dark:text-red-400 overflow-auto">
              {error.toString()}
              {"\n\n"}
              {error.stack}
            </pre>
          </details>
        )}
        <button
          onClick={onReload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
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
