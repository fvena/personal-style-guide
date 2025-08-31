import { defineConfig, mergeConfig } from "vitest/config";
import baseConfig from "./_base.js";

/**
 * Vitest configuration for Node.js applications.
 * Optimized for APIs, servers, and backend logic testing.
 *
 * @type {import('vitest').UserConfig}
 */
export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      // Coverage for Node.js projects
      coverage: {
        ...baseConfig.test.coverage,
        exclude: [...baseConfig.test.coverage.exclude, "src/types/**", "**/*.d.ts"],
        include: [
          "src/**/*.{js,ts}",
          "lib/**/*.{js,ts}",
          "api/**/*.{js,ts}",
          "server/**/*.{js,ts}",
        ],
      },

      // Node.js specific environment
      environment: "node",

      // Include Node.js specific test patterns
      include: [
        ...baseConfig.test.include,
        "api/**/*.{test,spec}.{js,ts}",
        "server/**/*.{test,spec}.{js,ts}",
        "lib/**/*.{test,spec}.{js,ts}",
      ],

      // Node.js specific setup
      setupFiles: [
        "personal-style-guide/vitest/setup/base",
        "personal-style-guide/vitest/setup/node",
      ],

      // API testing specific timeouts
      testTimeout: 15_000, // APIs might need more time
    },
  }),
);
