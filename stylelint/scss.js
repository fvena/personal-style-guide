import base from "./_base.js";

/**
 * Stylelint configuration for SCSS environments.
 * Extends base configuration with SCSS-specific rules and plugins.
 */

/** @type {import('stylelint').Config} */
export default {
  ...base,
  extends: [...base.extends, "stylelint-config-recommended-scss"],
  rules: {
    ...base.rules,
    "scss/comment-no-empty": [true, { severity: "warning" }],
  },
};
