import { config } from "./config";

export type Locale = (typeof config.locales)[number];

export function isValidLocale(locale: string): locale is Locale {
  return config.locales.includes(locale as Locale);
}
