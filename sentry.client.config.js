import * as Sentry from "@sentry/nextjs";

const isDev = process.env.NODE_ENV === "development";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

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
});

if (isDev) {
  console.info("✅ Sentry initialized (Replay disabled in dev)");
}
