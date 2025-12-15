"use client";

import { useCallback } from "react";
import { usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import {
  trackEvent,
  trackCTAClick,
  trackDownloadClick,
  trackNavigationClick,
  trackLanguageSwitch,
  trackThemeSwitch,
  trackSocialClick,
  trackFormEvent,
  trackNewsletterSubscribe,
  trackContactSubmit,
  trackScrollDepth,
  trackError,
  EventName,
  EventCategory,
} from "@/lib/analytics/events";

export function useAnalytics() {
  const pathname = usePathname();
  const locale = useLocale();

  const trackCTA = useCallback(
    (ctaName: string, destination?: string) => {
      trackCTAClick(ctaName, pathname, destination);
    },
    [pathname]
  );

  const trackDownload = useCallback(
    (platform: "android" | "ios" | "both") => {
      trackDownloadClick(platform, pathname);
    },
    [pathname]
  );

  const trackNavigation = useCallback(
    (linkName: string, destination: string, isMobile: boolean = false) => {
      trackNavigationClick(linkName, destination, isMobile);
    },
    []
  );

  const trackLanguage = useCallback(
    (toLocale: string) => {
      trackLanguageSwitch(locale, toLocale);
    },
    [locale]
  );

  const trackTheme = useCallback((theme: "light" | "dark") => {
    trackThemeSwitch(theme);
  }, []);

  const trackSocial = useCallback(
    (platform: "instagram" | "tiktok" | "linkedin" | "email") => {
      trackSocialClick(platform, pathname);
    },
    [pathname]
  );

  const trackForm = useCallback(
    (
      formName: string,
      action: "start" | "submit" | "success" | "error",
      errorMessage?: string
    ) => {
      trackFormEvent(formName, action, errorMessage);
    },
    []
  );

  const trackNewsletter = useCallback((success: boolean) => {
    trackNewsletterSubscribe(success);
  }, []);

  const trackContact = useCallback((success: boolean) => {
    trackContactSubmit(success);
  }, []);

  const trackScroll = useCallback((depth: 25 | 50 | 75 | 100) => {
    trackScrollDepth(depth);
  }, []);

  const trackErrorEvent = useCallback(
    (errorType: "boundary" | "api", message: string, stack?: string) => {
      trackError(errorType, message, stack);
    },
    []
  );

  const track = useCallback(
    (eventName: string, params?: Record<string, unknown>) => {
      trackEvent(eventName, {
        ...params,
        page_path: pathname,
        locale,
      });
    },
    [pathname, locale]
  );

  return {
    trackCTA,
    trackDownload,
    trackNavigation,
    trackLanguage,
    trackTheme,
    trackSocial,
    trackForm,
    trackNewsletter,
    trackContact,
    trackScroll,
    trackErrorEvent,
    track,
    EventName,
    EventCategory,
  };
}

export default useAnalytics;
