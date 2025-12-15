import { logger } from "@/lib/logger";

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "set",
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

export const EventCategory = {
  ENGAGEMENT: "engagement",
  CONVERSION: "conversion",
  NAVIGATION: "navigation",
  DOWNLOAD: "download",
  FORM: "form",
  CTA: "cta",
  SOCIAL: "social",
  ERROR: "error",
} as const;

export type EventCategoryType =
  (typeof EventCategory)[keyof typeof EventCategory];

export const EventName = {
  CTA_CLICK: "cta_click",
  DOWNLOAD_CLICK: "download_click",
  LEARN_MORE_CLICK: "learn_more_click",

  PAGE_VIEW: "page_view",
  NAVIGATION_CLICK: "navigation_click",
  LANGUAGE_SWITCH: "language_switch",
  THEME_SWITCH: "theme_switch",

  FORM_START: "form_start",
  FORM_SUBMIT: "form_submit",
  FORM_ERROR: "form_error",
  FORM_SUCCESS: "form_success",

  SOCIAL_CLICK: "social_click",
  SHARE_CLICK: "share_click",

  NEWSLETTER_SUBSCRIBE: "newsletter_subscribe",
  NEWSLETTER_UNSUBSCRIBE: "newsletter_unsubscribe",

  CONTACT_SUBMIT: "contact_submit",
  EMAIL_CLICK: "email_click",

  SCROLL_DEPTH: "scroll_depth",

  ERROR_BOUNDARY: "error_boundary",
  API_ERROR: "api_error",
} as const;

export type EventNameType = (typeof EventName)[keyof typeof EventName];

interface EventParams {
  category?: EventCategoryType;
  label?: string;
  value?: number;
  [key: string]: unknown;
}

export function trackEvent(
  eventName: EventNameType | string,
  params: EventParams = {}
): void {
  if (typeof window === "undefined") {
    return;
  }

  const eventParams = {
    event_category: params.category || EventCategory.ENGAGEMENT,
    event_label: params.label,
    value: params.value,
    timestamp: new Date().toISOString(),
    page_path: window.location.pathname,
    page_title: document.title,
    ...params,
  };

  if (window.gtag) {
    window.gtag("event", eventName, eventParams);
    logger.debug(`Analytics event: ${eventName}`, eventParams, "Analytics");
  }

  if (window.Sentry) {
    window.Sentry.addBreadcrumb({
      category: "analytics",
      message: `Event: ${eventName}`,
      level: "info",
      data: eventParams,
    });
  }
}

export function trackCTAClick(
  ctaName: string,
  location: string,
  destination?: string
): void {
  trackEvent(EventName.CTA_CLICK, {
    category: EventCategory.CTA,
    label: ctaName,
    cta_name: ctaName,
    cta_location: location,
    cta_destination: destination,
  });
}

export function trackDownloadClick(
  platform: "android" | "ios" | "both",
  location: string
): void {
  trackEvent(EventName.DOWNLOAD_CLICK, {
    category: EventCategory.DOWNLOAD,
    label: `Download ${platform}`,
    platform,
    download_location: location,
  });
}

export function trackNavigationClick(
  linkName: string,
  destination: string,
  isMobile: boolean = false
): void {
  trackEvent(EventName.NAVIGATION_CLICK, {
    category: EventCategory.NAVIGATION,
    label: linkName,
    destination,
    is_mobile: isMobile,
  });
}

export function trackLanguageSwitch(
  fromLocale: string,
  toLocale: string
): void {
  trackEvent(EventName.LANGUAGE_SWITCH, {
    category: EventCategory.NAVIGATION,
    label: `${fromLocale} → ${toLocale}`,
    from_locale: fromLocale,
    to_locale: toLocale,
  });
}

export function trackThemeSwitch(theme: "light" | "dark"): void {
  trackEvent(EventName.THEME_SWITCH, {
    category: EventCategory.ENGAGEMENT,
    label: theme,
    theme,
  });
}

export function trackSocialClick(
  platform: "instagram" | "tiktok" | "linkedin" | "email",
  location: string
): void {
  trackEvent(EventName.SOCIAL_CLICK, {
    category: EventCategory.SOCIAL,
    label: platform,
    platform,
    click_location: location,
  });
}

export function trackFormEvent(
  formName: string,
  action: "start" | "submit" | "success" | "error",
  errorMessage?: string
): void {
  const eventMap = {
    start: EventName.FORM_START,
    submit: EventName.FORM_SUBMIT,
    success: EventName.FORM_SUCCESS,
    error: EventName.FORM_ERROR,
  };

  trackEvent(eventMap[action], {
    category: EventCategory.FORM,
    label: `${formName} - ${action}`,
    form_name: formName,
    form_action: action,
    ...(errorMessage && { error_message: errorMessage }),
  });
}

export function trackNewsletterSubscribe(success: boolean): void {
  trackEvent(EventName.NEWSLETTER_SUBSCRIBE, {
    category: EventCategory.CONVERSION,
    label: success ? "success" : "failed",
    value: success ? 1 : 0,
    success,
  });
}

export function trackContactSubmit(success: boolean): void {
  trackEvent(EventName.CONTACT_SUBMIT, {
    category: EventCategory.CONVERSION,
    label: success ? "success" : "failed",
    value: success ? 1 : 0,
    success,
  });
}

export function trackScrollDepth(depth: 25 | 50 | 75 | 100): void {
  trackEvent(EventName.SCROLL_DEPTH, {
    category: EventCategory.ENGAGEMENT,
    label: `${depth}%`,
    value: depth,
    scroll_depth: depth,
  });
}

export function trackError(
  errorType: "boundary" | "api",
  errorMessage: string,
  errorStack?: string
): void {
  const eventName =
    errorType === "boundary" ? EventName.ERROR_BOUNDARY : EventName.API_ERROR;

  trackEvent(eventName, {
    category: EventCategory.ERROR,
    label: errorMessage,
    error_type: errorType,
    error_message: errorMessage,
    error_stack: errorStack,
  });
}
