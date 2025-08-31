import { defineConfig, mergeConfig } from "vitest/config";
import baseConfig from "./_base.js";

/**
 * Vitest configuration for Nuxt.js 4 applications.
 * Optimized for SSR component testing, server-side APIs, and Nuxt auto-imports.
 *
 * @type {import('vitest').UserConfig}
 */
export default mergeConfig(
  baseConfig,
  defineConfig({
    // Define global constants for Nuxt testing
    define: {
      __NUXT_VERSION__: JSON.stringify("4.0.0"),
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    },

    // Nuxt-specific resolve configuration
    resolve: {
      alias: {
        "#app": "/node_modules/nuxt/dist/app",
        "#build": "/.nuxt",
        "#components": "/.nuxt/components",
        "#head": "/node_modules/nuxt/dist/head/runtime",
        "#imports": "/.nuxt/imports",
        "@": "/",
        "~": "/",
      },
    },

    test: {
      // Coverage for Nuxt projects
      coverage: {
        ...baseConfig.test.coverage,
        exclude: [
          ...baseConfig.test.coverage.exclude,
          "app.vue",
          "nuxt.config.{js,ts}",
          "**/*.d.ts",
          ".nuxt/**",
          ".output/**",
        ],
        include: [
          "components/**/*.{js,ts,vue}",
          "composables/**/*.{js,ts}",
          "utils/**/*.{js,ts}",
          "plugins/**/*.{js,ts}",
          "middleware/**/*.{js,ts}",
          "pages/**/*.vue",
          "layouts/**/*.vue",
          "server/**/*.{js,ts}",
          "stores/**/*.{js,ts}",
        ],
      },

      // Nuxt environment - use nuxt for auto-imports and SSR context
      environment: "nuxt",

      // Exclude Nuxt generated files and directories
      exclude: [...baseConfig.test.exclude, ".nuxt/**", ".output/**", "dist/**"],

      // Include Nuxt specific test patterns
      include: [
        ...baseConfig.test.include,
        "components/**/*.{test,spec}.{js,ts}",
        "composables/**/*.{test,spec}.{js,ts}",
        "utils/**/*.{test,spec}.{js,ts}",
        "plugins/**/*.{test,spec}.{js,ts}",
        "middleware/**/*.{test,spec}.{js,ts}",
        "pages/**/*.{test,spec}.{js,ts}",
        "layouts/**/*.{test,spec}.{js,ts}",
        "server/**/*.{test,spec}.{js,ts}",
        "stores/**/*.{test,spec}.{js,ts}",
      ],

      // Nuxt specific setup
      setupFiles: [
        "personal-style-guide/vitest/setup/base",
        "personal-style-guide/vitest/setup/vue",
        "personal-style-guide/vitest/setup/nuxt",
      ],

      // Extended timeout for SSR rendering
      testTimeout: 20_000,

      // Nuxt specific transformations
      transformMode: {
        ssr: [/\.[jt]sx?$/, /\.vue$/],
        web: [/\.[jt]sx?$/, /\.vue$/],
      },
    },
  }),
);
