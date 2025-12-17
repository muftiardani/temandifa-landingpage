import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const isProduction = process.env.NODE_ENV === "production";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    rules: {
      "no-console": [
        isProduction ? "error" : "warn",
        {
          allow: [
            "warn",
            "error",
            "info",
            "debug",
            "group",
            "groupEnd",
            "table",
            "time",
            "timeEnd",
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
