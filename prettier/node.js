import base from "./_base.js";

/**
 * Prettier configuration for Node.js environments.
 * Extends base configuration with Node.js-specific formatting preferences.
 *
 * Includes:
 * - prettier-plugin-packagejson: Formats package.json files
 *
 * @type {import('prettier').Config}
 */
const config = {
  ...base,
  plugins: ["prettier-plugin-packagejson"],
};

export default config;
