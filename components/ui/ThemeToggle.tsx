"use client";

/* eslint-disable */

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export function ThemeToggle() {
  const t = useTranslations("Theme");
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
    );
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={
        resolvedTheme === "dark"
          ? t("switch_to_light")
          : t("switch_to_dark")
      }
      title={resolvedTheme === "dark" ? t("light_mode") : t("dark_mode")}
    >
      {resolvedTheme === "dark" ? (
        <span className="text-2xl" role="img" aria-label={t("sun_icon")}>
          ☀️
        </span>
      ) : (
        <span className="text-2xl" role="img" aria-label={t("moon_icon")}>
          🌙
        </span>
      )}
    </button>
  );
}
