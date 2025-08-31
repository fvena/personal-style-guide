import base from "./_base.js";

/**
 * Prettier configuration for browser/frontend environments.
 * Extends base configuration with frontend-specific formatting and plugins.
 */
export default {
  ...base,
  plugins: ["prettier-plugin-packagejson", "@prettier/plugin-pug"],
  pugAttributeSeparator: "none",
  pugFramework: "vue",
  pugSingleQuote: false,
  vueIndentScriptAndStyle: true,
};
