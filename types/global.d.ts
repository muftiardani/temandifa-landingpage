declare global {
  interface Window {
    Sentry?: typeof import("@sentry/nextjs");

    gtag?: (
      command: "event" | "config" | "set" | "js",
      targetIdOrEventName: string,
      params?: Record<string, unknown>
    ) => void;

    dataLayer?: unknown[];
  }
}

export {};
