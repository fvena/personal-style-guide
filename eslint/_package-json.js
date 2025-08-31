import packageJsonPlugin from "eslint-plugin-package-json";

/**
 * ESLint configuration for package.json files using eslint-plugin-package-json.
 * Provides comprehensive rules for consistent, readable, and valid package.json files.
 *
 * Features:
 * - Package metadata validation (name, version, description)
 * - Dependency management and validation
 * - Property ordering and formatting consistency
 * - Repository and author field validation
 * - Scripts and engines validation
 * - Comprehensive package.json best practices
 *
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  // Use the recommended configuration from eslint-plugin-package-json
  // This includes all the essential rules for package.json validation
  packageJsonPlugin.configs.recommended,

  // Additional customizations for package.json files
  {
    files: ["**/package.json"],
    settings: {
      packageJson: {
        // Apply rules to both private and public packages
        enforceForPrivate: true,
      },
    },
  },
];
