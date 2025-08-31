import base from "./_base.js";

/**
 * Prettier configuration for Node.js environments.
 * Extends base configuration with Node.js-specific formatting preferences.
 */
export default {
  ...base,
  plugins: ["prettier-plugin-packagejson"],
};
