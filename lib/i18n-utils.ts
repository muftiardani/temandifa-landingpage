import { config } from "./config";

export type Locale = (typeof config.locales)[number];

export function formatNumber(
  value: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions
): string {
  const localeCode = locale === "id" ? "id-ID" : "en-US";
  return new Intl.NumberFormat(localeCode, options).format(value);
}

export function formatCompactNumber(value: number, locale: Locale): string {
  const localeCode = locale === "id" ? "id-ID" : "en-US";
  return new Intl.NumberFormat(localeCode, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatPercent(value: number, locale: Locale): string {
  const localeCode = locale === "id" ? "id-ID" : "en-US";
  return new Intl.NumberFormat(localeCode, {
    style: "percent",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatDate(
  date: Date,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions
): string {
  const localeCode = locale === "id" ? "id-ID" : "en-US";
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat(localeCode, options || defaultOptions).format(
    date
  );
}

export function formatRelativeTime(
  value: number,
  unit: Intl.RelativeTimeFormatUnit,
  locale: Locale
): string {
  const localeCode = locale === "id" ? "id-ID" : "en-US";
  return new Intl.RelativeTimeFormat(localeCode, { numeric: "auto" }).format(
    value,
    unit
  );
}

export function getLocaleCode(locale: Locale): string {
  const localeMap: Record<Locale, string> = {
    id: "id-ID",
    en: "en-US",
  };
  return localeMap[locale];
}

export function getLocaleDisplayName(
  targetLocale: Locale,
  displayLocale: Locale
): string {
  const localeCode = getLocaleCode(displayLocale);
  const displayNames = new Intl.DisplayNames([localeCode], { type: "language" });
  return displayNames.of(getLocaleCode(targetLocale)) || targetLocale;
}

export function isValidLocale(locale: string): locale is Locale {
  return config.locales.includes(locale as Locale);
}

export function getOppositeLocale(locale: Locale): Locale {
  return locale === "id" ? "en" : "id";
}

export const localeConstants = {
  id: {
    code: "id-ID",
    name: "Bahasa Indonesia",
    shortName: "ID",
    flag: "🇮🇩",
    dir: "ltr" as const,
  },
  en: {
    code: "en-US",
    name: "English",
    shortName: "EN",
    flag: "🇺🇸",
    dir: "ltr" as const,
  },
} as const;
