/**
 * Base Stylelint configuration for all environments.
 * Contains core CSS/SCSS linting rules that apply universally.
 */

/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-recommended", "stylelint-config-recess-order"],
  rules: {
    "no-descending-specificity": [true, { severity: "warning" }],
    "no-empty-source": [true, { severity: "warning" }],
  },
};
