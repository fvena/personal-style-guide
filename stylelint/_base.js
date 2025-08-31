/**
 * Base Stylelint configuration for all environments.
 * Contains core CSS/SCSS linting rules that apply universally.
 */

/**
 * Base Stylelint configuration with essential rules and ordering
 * @type {import('stylelint').Config}
 */
const config = {
  extends: ["stylelint-config-recommended", "stylelint-config-recess-order"],
  rules: {
    "no-descending-specificity": [true, { severity: "warning" }],
    "no-empty-source": [true, { severity: "warning" }],
  },
};

export default config;
