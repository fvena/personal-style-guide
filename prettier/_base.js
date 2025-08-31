/**
 * Base Prettier configuration for all environments.
 * Contains core formatting rules that apply universally.
 *
 * Some of Prettier's defaults can be overridden by an EditorConfig file. We
 * define those here to ensure that doesn't happen.
 *
 * See: https://github.com/prettier/prettier/blob/main/docs/configuration.md#editorconfig
 */

/**
 * @typedef {import('prettier').Config} PrettierConfig
 */

/**
 * Core formatting defaults that cannot be overridden by EditorConfig
 * @type {Partial<PrettierConfig>}
 */
const overridableDefaults = {
  endOfLine: "lf",
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
};

/**
 * Base Prettier configuration with universal formatting rules
 * @type {PrettierConfig}
 */
const config = {
  ...overridableDefaults,
  arrowParens: "avoid",
  bracketSpacing: true,
  htmlWhitespaceSensitivity: "strict",
  jsxSingleQuote: true,
  proseWrap: "preserve",
  quoteProps: "as-needed",
  semi: false,
  singleQuote: true,
  trailingComma: "none",
};

export default config;
