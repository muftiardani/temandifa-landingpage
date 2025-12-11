"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

let sentryInitialized = false;

/**
 * Sentry Initializer Component
 * Manually initializes Sentry on the client side
 */
export default function SentryInitializer() {
  useEffect(() => {
    // Only initialize once
    if (sentryInitialized) {
      console.log("⚠️ Sentry already initialized, skipping");
      return;
    }

    const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

    if (!dsn) {
      console.error("❌ Sentry DSN not configured");
      return;
    }

    try {
      Sentry.init({
        dsn: dsn,
        
        // Adjust this value in production
        tracesSampleRate: 1.0,
        
        // Debug mode for troubleshooting
        debug: true,
        
        // Environment
        environment: process.env.NODE_ENV || "development",
        
        // Session Replay
        replaysOnErrorSampleRate: 1.0,
        replaysSessionSampleRate: 0.1,
        
        integrations: [
          Sentry.replayIntegration({
            maskAllText: true,
            blockAllMedia: true,
          }),
        ],
        
        // Ignore common browser extension errors
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
      
      console.log("✅ Sentry manually initialized", {
        dsn: `${dsn.substring(0, 30)}...`,
        environment: process.env.NODE_ENV,
        debug: true,
      });

      // Make Sentry globally available
      if (typeof window !== "undefined") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).Sentry = Sentry;
      }
    } catch (error) {
      console.error("❌ Failed to initialize Sentry:", error);
    }
  }, []);

  return null; // This component doesn't render anything
}
