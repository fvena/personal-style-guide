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
  // Line endings - use Unix-style (LF) for consistency across platforms
  // Prevents Git issues with mixed line endings
  endOfLine: "lf",

  // Maximum line length before wrapping
  // 100 characters provides good readability on modern screens
  printWidth: 100,

  // Number of spaces per indentation level
  // 2 spaces is common in JavaScript/TypeScript ecosystems
  tabWidth: 2,

  // Use spaces instead of tabs for consistency
  // Spaces render consistently across all editors
  useTabs: false,
};

/**
 * Base Prettier configuration with universal formatting rules
 * @type {PrettierConfig}
 */
const config = {
  ...overridableDefaults,

  // Arrow function parentheses - avoid when possible for cleaner syntax
  // (x) => x becomes x => x
  arrowParens: "avoid",

  // Spaces inside object literals - improves readability
  // { foo: bar } instead of {foo: bar}
  bracketSpacing: true,

  // HTML whitespace sensitivity - strict preserves intended formatting
  // Critical for Vue templates and JSX
  htmlWhitespaceSensitivity: "strict",

  // Use single quotes in JSX attributes for consistency
  // <Component prop='value' /> instead of <Component prop="value" />
  jsxSingleQuote: true,

  // Prose wrapping - preserve original wrapping in markdown
  // Respects the author's intended line breaks
  proseWrap: "preserve",

  // Object property quotes - only when necessary
  // { foo: 1, "foo-bar": 2 } instead of { "foo": 1, "foo-bar": 2 }
  quoteProps: "as-needed",

  // Semicolons - omit for cleaner code (relies on ASI)
  // Modern JavaScript style, especially in Vue/Nuxt ecosystems
  semi: false,

  // String quotes - use single quotes for consistency
  // 'string' instead of "string" (except when string contains ')
  singleQuote: true,

  // Trailing commas - none for cleaner diffs and compatibility
  // No comma after last element in objects/arrays
  trailingComma: "none",
};

export default config;
