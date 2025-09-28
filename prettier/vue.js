import base from "./base.js";

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

  // File-specific formatting overrides for Vue ecosystem
  overrides: [
    {
      // Vue Single File Components
      files: "*.vue",
      options: {
        // HTML whitespace handling - ignore for better template formatting
        // Allows Prettier to format templates more aggressively
        htmlWhitespaceSensitivity: "ignore",

        // Line width for Vue files - consistent with base config
        printWidth: 100,

        // Multiple attributes on same line when possible
        // Reduces vertical space in templates
        singleAttributePerLine: false,

        // Indentation - consistent 2 spaces
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

  // Plugins for enhanced Vue ecosystem formatting
  plugins: [
    "prettier-plugin-packagejson", // Sorts and formats package.json
    "@prettier/plugin-pug", // Formats Pug templates
  ],

  // Pug template options for Vue components
  // No separator between attributes for cleaner Pug syntax
  pugAttributeSeparator: "none",

  // Pug framework - Vue specific handling
  pugFramework: "vue",

  // Use double quotes in Pug (HTML standard)
  pugSingleQuote: false,

  // Indent <script> and <style> blocks in Vue SFCs
  // Improves readability by showing they're nested in the component
  vueIndentScriptAndStyle: true,
};

export default config;
