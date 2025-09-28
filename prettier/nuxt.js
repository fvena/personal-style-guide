import vue from "./vue.js";

/**
 * Prettier configuration for Nuxt.js applications.
 * Extends Vue configuration with Nuxt-specific formatting and plugins.
 *
 * Includes:
 * - All Vue.js configurations and plugins
 * - Nuxt-specific file patterns and formatting rules
 *
 * @type {import('prettier').Config}
 */
const config = {
  ...vue,
  overrides: [
    ...vue.overrides,
    {
      // Nuxt configuration files
      files: [
        "nuxt.config.{js,ts}",
        "app.config.{js,ts}",
        "nitro.config.{js,ts}",
        "vitest.config.{js,ts}",
      ],
      options: {
        printWidth: 120,
        trailingComma: "es5",
      },
    },
    {
      // Nuxt composables, utils, and middleware
      files: [
        "composables/**/*.{js,ts}",
        "utils/**/*.{js,ts}",
        "plugins/**/*.{js,ts}",
        "middleware/**/*.{js,ts}",
        "server/**/*.{js,ts}",
      ],
      options: {
        printWidth: 100,
        semi: false,
        singleQuote: true,
      },
    },
    {
      // Nuxt pages and layouts
      files: ["pages/**/*.vue", "layouts/**/*.vue", "components/**/*.vue"],
      options: {
        htmlWhitespaceSensitivity: "ignore",
        printWidth: 100,
        vueIndentScriptAndStyle: true,
      },
    },
  ],
};

export default config;
