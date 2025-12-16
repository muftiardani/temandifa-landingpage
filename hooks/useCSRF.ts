"use client";

import { useState, useEffect, useCallback } from "react";
import { logger } from "@/lib/logger";

interface CSRFData {
  token: string;
  hash: string;
  expiresAt: number;
  isReady: boolean;
  error: string | null;
}

interface UseCSRFOptions {
  refreshInterval?: number;
  autoRefresh?: boolean;
  context?: string;
}

const DEFAULT_REFRESH_INTERVAL = 4 * 60 * 1000;

export function useCSRF(options: UseCSRFOptions = {}) {
  const {
    refreshInterval = DEFAULT_REFRESH_INTERVAL,
    autoRefresh = true,
    context = "CSRF",
  } = options;

  const [csrfData, setCSRFData] = useState<CSRFData>({
    token: "",
    hash: "",
    expiresAt: 0,
    isReady: false,
    error: null,
  });

  const fetchCSRFToken = useCallback(async () => {
    try {
      const res = await fetch("/api/csrf");

      if (!res.ok) {
        throw new Error(`Failed to fetch CSRF token: ${res.status}`);
      }

      const data = await res.json();

      setCSRFData({
        token: data.token,
        hash: data.hash,
        expiresAt: data.expiresAt,
        isReady: true,
        error: null,
      });

      logger.debug("CSRF token fetched successfully", null, context);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      logger.error("Failed to fetch CSRF token", error, context);

      setCSRFData((prev) => ({
        ...prev,
        isReady: false,
        error: errorMessage,
      }));
    }
  }, [context]);

  useEffect(() => {
    fetchCSRFToken();
  }, [fetchCSRFToken]);

  useEffect(() => {
    if (!autoRefresh) return;

    const intervalId = setInterval(fetchCSRFToken, refreshInterval);

    return () => clearInterval(intervalId);
  }, [fetchCSRFToken, autoRefresh, refreshInterval]);

  useEffect(() => {
    if (!csrfData.expiresAt || !autoRefresh) return;

    const timeUntilExpiry = csrfData.expiresAt - Date.now();
    const refreshBuffer = 60 * 1000;

    if (timeUntilExpiry > 0 && timeUntilExpiry < refreshBuffer) {
      logger.debug("CSRF token about to expire, refreshing...", null, context);
      fetchCSRFToken();
    }
  }, [csrfData.expiresAt, autoRefresh, fetchCSRFToken, context]);

  return {
    token: csrfData.token,
    hash: csrfData.hash,
    expiresAt: csrfData.expiresAt,
    isReady: csrfData.isReady,
    error: csrfData.error,
    refresh: fetchCSRFToken,
  };
}

export default useCSRF;
