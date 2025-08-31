import base from "./_base.js";

/**
 * Prettier configuration for Nuxt.js applications.
 * Extends base configuration with Nuxt-specific formatting and plugins.
 *
 * Includes:
 * - prettier-plugin-packagejson: Formats package.json files
 * - @prettier/plugin-pug: Formats Pug templates for Vue.js/Nuxt
 *
 * @type {import('prettier').Config}
 */
const config = {
  ...base,
  overrides: [
    {
      files: "*.vue",
      options: {
        // Ensure proper template formatting
        htmlWhitespaceSensitivity: "ignore",
        // Force consistent formatting in Vue SFC
        printWidth: 100,
        // Better attribute formatting for Vue components
        singleAttributePerLine: false,
        tabWidth: 2,
        useTabs: false,
      },
    },
    {
      files: "*.pug",
      options: {
        parser: "pug",
        // Pug-specific overrides when used with Nuxt
        printWidth: 120,
      },
    },
    {
      // Package.json files in Nuxt projects
      files: "package.json",
      options: {
        printWidth: 80,
        tabWidth: 2,
      },
    },
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
  plugins: ["prettier-plugin-packagejson", "@prettier/plugin-pug"],
  pugAttributeSeparator: "none",
  pugFramework: "vue",
  pugSingleQuote: false,
  vueIndentScriptAndStyle: true,
};

export default config;
