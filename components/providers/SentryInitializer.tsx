"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { logger } from "@/lib/logger";

let sentryInitialized = false;

/**
 * Sentry Initializer Component
 * Manually initializes Sentry on the client side
 */
export default function SentryInitializer() {
  useEffect(() => {
    if (sentryInitialized) {
      logger.info("Sentry already initialized, skipping", null, "Sentry");
      return;
    }

    const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

    if (!dsn) {
      logger.error("Sentry DSN not configured", null, "Sentry");
      return;
    }

    try {
      Sentry.init({
        dsn: dsn,
        
        environment: process.env.NODE_ENV || "development",
        
        tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
        
        debug: process.env.NODE_ENV === "development",
        
        replaysOnErrorSampleRate: 1.0,
        replaysSessionSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
        
        integrations: [
          Sentry.replayIntegration({
            maskAllText: true,
            blockAllMedia: true,
          }),
        ],
        
        ignoreErrors: [
          "top.GLOBALS",
          "originalCreateNotification",
          "canvas.contentDocument",
          "MyApp_RemoveAllHighlights",
          "fb_xd_fragment",
          "bmi_SafeAddOnload",
          "EBCallBackMessageReceived",
          "conduitPage",
        ],
      });

      sentryInitialized = true;
      
      logger.success("Sentry manually initialized", {
        dsn: `${dsn.substring(0, 30)}...`,
        environment: process.env.NODE_ENV,
        debug: process.env.NODE_ENV === "development",
      }, "Sentry");

      if (typeof window !== "undefined") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).Sentry = Sentry;
      }
    } catch (error) {
      logger.error("Failed to initialize Sentry", error, "Sentry");
    }
  }, []);

  return null;
}
