"use client";

/* eslint-disable */

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
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
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      title={resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
    >
      {resolvedTheme === "dark" ? (
        <span className="text-2xl" role="img" aria-label="Sun">
          ☀️
        </span>
      ) : (
        <span className="text-2xl" role="img" aria-label="Moon">
          🌙
        </span>
      )}
    </button>
  );
}
