import { defineConfig, mergeConfig } from "vitest/config";
import baseConfig from "./_base.js";

/**
 * Vitest configuration for Vue.js 3 applications.
 * Optimized for component testing, composables, and Vue-specific features.
 *
 * @type {import('vitest').UserConfig}
 */
export default mergeConfig(
  baseConfig,
  defineConfig({
    // Define global constants for Vue testing
    define: {
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    },

    // Resolve Vue components and composables
    resolve: {
      alias: {
        "@": "/src",
        "~": "/",
      },
    },

    test: {
      // Coverage for Vue projects
      coverage: {
        ...baseConfig.test.coverage,
        exclude: [
          ...baseConfig.test.coverage.exclude,
          "src/main.{js,ts}",
          "src/App.vue",
          "**/*.stories.{js,ts}",
          "**/*.d.ts",
        ],
        include: [
          "src/**/*.{js,ts,vue}",
          "components/**/*.{js,ts,vue}",
          "composables/**/*.{js,ts}",
          "utils/**/*.{js,ts}",
          "stores/**/*.{js,ts}",
        ],
      },

      // Browser-like environment for Vue components
      environment: "jsdom",

      // Vue component testing specific configuration
      globals: true, // Required for Vue Test Utils

      // Include Vue specific test patterns
      include: [
        ...baseConfig.test.include,
        "components/**/*.{test,spec}.{js,ts}",
        "composables/**/*.{test,spec}.{js,ts}",
        "stores/**/*.{test,spec}.{js,ts}",
        "utils/**/*.{test,spec}.{js,ts}",
      ],

      // Vue specific setup
      setupFiles: [
        "personal-style-guide/vitest/setup/base",
        "personal-style-guide/vitest/setup/vue",
      ],

      // Vue specific transformations
      transformMode: {
        web: [/\.[jt]sx?$/, /\.vue$/],
      },
    },
  }),
);
