"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { logger } from "@/lib/logger";

let sentryInitialized = false;

export default function SentryInitializer() {
  useEffect(() => {
    if (sentryInitialized) {
      logger.info("Sentry already initialized, skipping", null, "Sentry");
      return;
    }

    const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
    const isDev = process.env.NODE_ENV === "development";

    if (!dsn) {
      logger.error("Sentry DSN not configured", null, "Sentry");
      return;
    }

    try {
      Sentry.init({
        dsn: dsn,

        environment: process.env.NODE_ENV || "development",

        tracesSampleRate: isDev ? 0.1 : 0.1,

        debug: false,

        replaysOnErrorSampleRate: isDev ? 0 : 1.0,
        replaysSessionSampleRate: isDev ? 0 : 0.1,

        integrations: isDev
          ? []
          : [
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

      logger.success(
        "Sentry initialized",
        {
          dsn: `${dsn.substring(0, 30)}...`,
          environment: process.env.NODE_ENV,
          replayEnabled: !isDev,
        },
        "Sentry"
      );

      if (typeof window !== "undefined") {
        window.Sentry = Sentry;
      }
    } catch (error) {
      logger.error("Failed to initialize Sentry", error, "Sentry");
    }
  }, []);

  return null;
}
