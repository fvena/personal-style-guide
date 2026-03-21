import pluginVitest from "eslint-plugin-vitest";
import { defineConfig } from "eslint/config";

const testFiles = [
  "**/*.test.ts",
  "**/*.test.js",
  "**/*.spec.ts",
  "**/*.spec.js",
  "**/__tests__/**/*.[jt]s",
];

export default defineConfig([
  {
    ...pluginVitest.configs.recommended,
    files: testFiles,
    name: "fvena/vitest/recommended",
  },
  {
    files: testFiles,
    name: "fvena/vitest/overrides",
    rules: {
      // Allow console statements for test debugging
      "no-console": "off",
      // Every test must contain at least one assertion
      "vitest/expect-expect": "error",
      // Flag skipped tests as warnings without blocking CI
      "vitest/no-disabled-tests": "warn",
      // Prevent .only from reaching CI
      "vitest/no-focused-tests": "error",
    },
  },
]);
