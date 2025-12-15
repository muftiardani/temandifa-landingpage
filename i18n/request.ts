import { getRequestConfig } from "next-intl/server";
import { config } from "@/lib/config";
import { isValidLocale } from "@/lib/i18n-utils";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !isValidLocale(locale)) {
    locale = config.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
