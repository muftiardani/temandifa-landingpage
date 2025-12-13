import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.ts",
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/e2e/**", // E2E tests require dev server
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "tests/",
        "**/*.config.*",
        "**/types.ts",
        ".next/",
        "public/",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
