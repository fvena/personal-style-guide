/* eslint-disable security/detect-non-literal-fs-filename -- Dynamic file paths are required for validation script */
/**
 * Configuration validation script for personal-style-guide
 * Validates that all configuration files are syntactically correct and properly structured
 */

import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.join(__dirname, "..");

/**
 * Validate configuration file can be imported and has expected structure
 * @param {string} configPath - Path to configuration file relative to root
 * @param {string} description - Human-readable description for logging
 * @returns {Promise<boolean>} Validation success
 */
async function validateConfig(configPath, description) {
  const fullPath = path.join(rootDirectory, configPath);

  if (!existsSync(fullPath)) {
    console.error(`❌ ${description}: File not found at ${configPath}`);
    return false;
  }

  try {
    const config = await import(fullPath);

    if (!config.default) {
      console.error(`❌ ${description}: Missing default export`);
      return false;
    }

    console.log(`✅ ${description}: Valid configuration`);
    return true;
  } catch (error) {
    console.error(`❌ ${description}: Import failed - ${error.message}`);
    return false;
  }
}

/**
 * Main validation routine
 */
async function validateAllConfigs() {
  console.log("🔍 Validating personal-style-guide configurations...\n");

  const validations = [
    // ESLint configurations
    validateConfig("eslint/_base.js", "ESLint base config"),
    validateConfig("eslint/node.js", "ESLint Node.js config"),
    validateConfig("eslint/browser.js", "ESLint browser config"),
    validateConfig("eslint/vue.js", "ESLint Vue config"),
    validateConfig("eslint/nuxt.js", "ESLint Nuxt config"),

    // Prettier configurations
    validateConfig("prettier/base.js", "Prettier base config"),
    validateConfig("prettier/vue.js", "Prettier Vue config"),
    validateConfig("prettier/nuxt.js", "Prettier Nuxt config"),

    // Stylelint configurations
    validateConfig("stylelint/base.js", "Stylelint base config"),
    validateConfig("stylelint/vue.js", "Stylelint Vue config"),
    validateConfig("stylelint/nuxt.js", "Stylelint Nuxt config"),
  ];

  const results = await Promise.all(validations);
  const successCount = results.filter(Boolean).length;
  const totalCount = results.length;

  console.log(`\n📊 Validation Results: ${successCount}/${totalCount} configurations valid`);

  if (successCount === totalCount) {
    console.log("🎉 All configurations are valid!");
    return true;
  } else {
    console.log("💥 Some configurations have issues - see errors above");
    throw new Error("Configuration validation failed");
  }
}

// Run validation
try {
  await validateAllConfigs();
} catch (error) {
  console.error("💥 Validation script failed:", error.message);
  throw error;
}

/* eslint-enable security/detect-non-literal-fs-filename */
