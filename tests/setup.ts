import React from "react";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi, beforeAll } from "vitest";

afterEach(() => {
  cleanup();
});

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next-themes
vi.mock("next-themes", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
  useTheme: () => ({
    theme: "light",
    setTheme: vi.fn(),
    resolvedTheme: "light",
  }),
}));

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => props,
}));

// Mock useAnalytics hook
vi.mock("@/hooks/useAnalytics", () => ({
  useAnalytics: () => ({
    trackForm: vi.fn(),
    trackContact: vi.fn(),
    trackNewsletter: vi.fn(),
    trackTheme: vi.fn(),
    trackEvent: vi.fn(),
  }),
}));

// Mock IntersectionObserver for animation tests
beforeAll(() => {
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    takeRecords() {
      return [];
    }
    unobserve() {}
  } as unknown as typeof IntersectionObserver;

  // Mock window.matchMedia for responsive tests
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // Mock window.gtag for analytics tests
  Object.defineProperty(window, "gtag", {
    writable: true,
    value: vi.fn(),
  });
});
