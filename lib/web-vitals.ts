import type { Metric } from "web-vitals";

/**
 * Web Vitals Reporter
 * Sends performance metrics to Google Analytics and console
 */

interface AnalyticsEvent extends Record<string, unknown> {
  event: string;
  event_category: string;
  event_label: string;
  value: number;
  metric_id: string;
  metric_value: number;
  metric_delta: number;
  metric_rating: string;
}

/**
 * Send metric to Google Analytics via gtag
 */
function sendToGoogleAnalytics(metric: Metric) {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }

  const eventData: AnalyticsEvent = {
    event: "web_vitals",
    event_category: "Web Vitals",
    event_label: metric.id,
    value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
    metric_id: metric.id,
    metric_value: metric.value,
    metric_delta: metric.delta,
    metric_rating: metric.rating,
  };

  window.gtag("event", metric.name, eventData);
}

/**
 * Send metric to Sentry (if available)
 */
function sendToSentry(metric: Metric) {
  if (typeof window === "undefined" || !window.Sentry) {
    return;
  }

  window.Sentry.setMeasurement(metric.name, metric.value, "millisecond");
}

/**
 * Log metric to console in development
 */
function logToConsole(metric: Metric) {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const emoji = metric.rating === "good" ? "✅" : metric.rating === "needs-improvement" ? "⚠️" : "❌";
  
  console.log(
    `${emoji} ${metric.name}:`,
    metric.value.toFixed(2),
    `(${metric.rating})`,
    metric
  );
}

/**
 * Main Web Vitals reporter function
 * Called by Next.js when metrics are available
 */
export function reportWebVitals(metric: Metric) {
  // Send to multiple destinations
  sendToGoogleAnalytics(metric);
  sendToSentry(metric);
  logToConsole(metric);
}

/**
 * Get rating color for UI display
 */
export function getMetricColor(rating: string): string {
  switch (rating) {
    case "good":
      return "green";
    case "needs-improvement":
      return "orange";
    case "poor":
      return "red";
    default:
      return "gray";
  }
}

/**
 * Format metric value for display
 */
export function formatMetricValue(name: string, value: number): string {
  if (name === "CLS") {
    return value.toFixed(3);
  }
  return `${Math.round(value)}ms`;
}

// Type declarations for global objects
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      eventParams?: Record<string, unknown>
    ) => void;
    Sentry?: {
      setMeasurement: (name: string, value: number, unit: string) => void;
    };
  }
}
