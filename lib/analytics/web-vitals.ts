import type { Metric } from "web-vitals";
import { logger } from "@/lib/logger";

/**
 * Web Vitals Reporter
 * Sends performance metrics to Google Analytics, Sentry, and console
 * Tracks: LCP, FID, CLS, FCP, TTFB, INP
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
 * Performance thresholds for Core Web Vitals
 * Based on Google's recommendations
 */
const THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 },
  FID: { good: 100, needsImprovement: 300 },
  CLS: { good: 0.1, needsImprovement: 0.25 },
  FCP: { good: 1800, needsImprovement: 3000 },
  TTFB: { good: 800, needsImprovement: 1800 },
  INP: { good: 200, needsImprovement: 500 },
};

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
  
  window.gtag("event", "performance_metric", {
    metric_name: metric.name,
    metric_value: metric.value,
    metric_rating: metric.rating,
  });
}

/**
 * Send metric to Sentry (if available)
 */
function sendToSentry(metric: Metric) {
  if (typeof window === "undefined" || !window.Sentry) {
    return;
  }

  window.Sentry.setMeasurement(metric.name, metric.value, "millisecond");
  
  if (metric.rating === "poor") {
    window.Sentry.addBreadcrumb({
      category: "performance",
      message: `Poor ${metric.name}: ${metric.value}`,
      level: "warning",
      data: {
        metric: metric.name,
        value: metric.value,
        rating: metric.rating,
        id: metric.id,
      },
    });
  }
}

/**
 * Log metric to console in development
 */
function logToConsole(metric: Metric) {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const emoji = metric.rating === "good" ? "✅" : metric.rating === "needs-improvement" ? "⚠️" : "❌";
  const threshold = THRESHOLDS[metric.name as keyof typeof THRESHOLDS];
  
  logger.group(`${emoji} ${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`, () => {
    logger.debug("Value", metric.value, "WebVitals");
    logger.debug("Rating", metric.rating, "WebVitals");
    logger.debug("Delta", metric.delta, "WebVitals");
    logger.debug("ID", metric.id, "WebVitals");
    
    if (threshold) {
      logger.debug("Thresholds", {
        good: `≤ ${threshold.good}ms`,
        needsImprovement: `≤ ${threshold.needsImprovement}ms`,
        poor: `> ${threshold.needsImprovement}ms`,
      }, "WebVitals");
    }
  });
}

/**
 * Send performance data to custom endpoint (optional)
 */
function sendToCustomEndpoint(metric: Metric) {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  const endpoint = "/api/analytics/performance";
  
  if (navigator.sendBeacon) {
    const body = JSON.stringify({
      metric: metric.name,
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    });
    
    navigator.sendBeacon(endpoint, body);
  }
}

/**
 * Main Web Vitals reporter function
 * Called by Next.js when metrics are available
 */
export function reportWebVitals(metric: Metric) {
  sendToGoogleAnalytics(metric);
  sendToSentry(metric);
  logToConsole(metric);
  sendToCustomEndpoint(metric);
  
  if (process.env.NODE_ENV === "development" && metric.rating === "poor") {
    logger.warn(
      `Poor ${metric.name} detected! Value: ${metric.value}. Consider optimizing for better performance.`,
      null,
      "WebVitals"
    );
  }
}

declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      eventParams?: Record<string, unknown>
    ) => void;
    Sentry?: {
      captureException: (error: Error) => void;
      setMeasurement: (name: string, value: number, unit: string) => void;
      addBreadcrumb: (breadcrumb: {
        category: string;
        message: string;
        level: string;
        data?: Record<string, unknown>;
      }) => void;
    };
  }
}
