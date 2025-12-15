"use client";

import { useSyncExternalStore } from "react";

export function useReducedMotion(): boolean {
  const getSnapshot = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };

  const getServerSnapshot = () => false;

  const subscribe = (callback: () => void) => {
    if (typeof window === "undefined") return () => {};

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", callback);
      return () => mediaQuery.removeEventListener("change", callback);
    } else {
      mediaQuery.addListener(callback);
      return () => mediaQuery.removeListener(callback);
    }
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
