import base from "./_base.js";

/**
 * Prettier configuration for browser/frontend environments.
 * Extends base configuration with frontend-specific formatting and plugins.
 *
 * Includes:
 * - prettier-plugin-packagejson: Formats package.json files
 * - @prettier/plugin-pug: Formats Pug templates for Vue.js
 *
 * @type {import('prettier').Config}
 */
const config = {
  ...base,
  plugins: ["prettier-plugin-packagejson", "@prettier/plugin-pug"],
  pugAttributeSeparator: "none",
  pugFramework: "vue",
  pugSingleQuote: false,
  vueIndentScriptAndStyle: true,
};

export default config;
