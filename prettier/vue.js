import base from "./_base.js";

/**
 * Prettier configuration for Vue.js applications.
 * Extends base configuration with Vue-specific formatting and plugins.
 *
 * Includes:
 * - prettier-plugin-packagejson: Formats package.json files
 * - @prettier/plugin-pug: Formats Pug templates for Vue.js
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
        // Pug-specific overrides when used with Vue
        printWidth: 120,
      },
    },
    {
      // Vue script blocks with TypeScript
      files: ["*.vue"],
      options: {
        parser: "vue",
      },
    },
    {
      // Package.json files in Vue projects
      files: "package.json",
      options: {
        printWidth: 80,
        tabWidth: 2,
      },
    },
    {
      // Vue configuration files
      files: [
        "vite.config.{js,ts}",
        "vue.config.{js,ts}",
        "nuxt.config.{js,ts}",
        "quasar.config.{js,ts}",
        "vitest.config.{js,ts}",
      ],
      options: {
        printWidth: 120,
        trailingComma: "es5",
      },
    },
    {
      // Vue composables and utilities
      files: [
        "composables/**/*.{js,ts}",
        "utils/**/*.{js,ts}",
        "plugins/**/*.{js,ts}",
        "middleware/**/*.{js,ts}",
        "stores/**/*.{js,ts}",
      ],
      options: {
        printWidth: 100,
        semi: false,
        singleQuote: true,
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
