import base from '../eslint/_base.js'
import jsonConfig from '../eslint/_json.js'
import packageJsonConfig from '../eslint/_package-json.js'
import testConfig from '../eslint/_test.js'
import browserConfig from '../eslint/browser.js'
import nodeConfig from '../eslint/node.js'
import vueConfig from '../eslint/vue.js'
import { detectAll } from './utils/detection.js'
// import nuxtConfig from '../eslint/nuxt.js' // TODO: Fix Nuxt config and re-enable

/**
 * @typedef {Object} StyleGuideOptions
 * @property {string[]|boolean} [environments] - Environments to include ['node', 'browser', 'vue', 'nuxt'] or true for auto-detect
 * @property {boolean} [typescript] - Enable TypeScript support (auto-detected if not specified)
 * @property {boolean} [vitest] - Enable Vitest testing support (auto-detected if not specified)
 * @property {boolean} [json] - Enable JSON support (default: true)
 * @property {boolean} [packageJson] - Enable package.json support (default: true)
 * @property {string} [cwd] - Current working directory for detection
 * @property {boolean} [autoDetect] - Enable auto-detection (default: true)
 */

/**
 * Creates a comprehensive ESLint configuration with automatic framework detection
 * 
 * @example
 * // Auto-detect everything
 * export default createStyleGuide()
 * 
 * @example  
 * // Specify environments
 * export default createStyleGuide({
 *   environments: ['node', 'vue'],
 *   typescript: true
 * })
 * 
 * @example
 * // Disable auto-detection
 * export default createStyleGuide({
 *   autoDetect: false,
 *   environments: ['browser']
 * })
 * 
 * @param {StyleGuideOptions} [options={}] - Configuration options
 * @returns {Array} ESLint flat configuration array
 */
export function createStyleGuide(options = {}) {
  const {
    autoDetect = true,
    cwd = process.cwd(),
    environments,
    json = true,
    packageJson = true,
    vitest
  } = options

  // Auto-detect project configuration if enabled
  const detected = autoDetect ? detectAll(cwd) : {}
  
  console.log('🔍 Detection results:', detected)
  
  // Determine which configurations to include
  const config = []
  
  // Always include base configuration
  config.push(...base)
  
  // Add JSON configurations
  if (json) {
    config.push(...jsonConfig)
  }
  
  if (packageJson) {
    config.push(...packageJsonConfig)
  }
  
  // Handle environments
  const environments_ = Array.isArray(environments) ? environments : 
               (environments === true || (!environments && autoDetect) ? 
               getDetectedEnvironments(detected) : [])
  
  console.log('🛠️  Loading environments:', environments_)
  
  // Load environment-specific configurations
  for (const env of environments_) {
    try {
      const envConfig = getEnvironmentConfig(env)
      config.push(...envConfig)
      console.log(`✅ Loaded ${env} configuration`)
    } catch (error) {
      console.warn(`⚠️  Warning: Could not load ${env} configuration:`, error.message)
    }
  }
  
  // Handle Vitest configuration
  const enableVitest = vitest === true || (vitest !== false && autoDetect && detected.vitest)
  
  if (enableVitest) {
    config.push(testConfig)
    console.log(`✅ Loaded Vitest testing configuration`)
  }
  
  console.log(`🎯 Final configuration: ${config.length} entries`)
  
  return config
}

/**
 * Gets detected environments as array
 * @param {object} detected - Detection results
 * @returns {string[]} Array of detected environments
 */
function getDetectedEnvironments(detected) {
  const environments = []
  
  // Temporarily disable Nuxt detection due to config issues
  // TODO: Fix Nuxt configuration and re-enable
  if (detected.vue) {
    environments.push('vue')
  }
  
  // Add Node.js or browser environment
  if (detected.node) {
    environments.push('node')
  } else if (detected.browser) {
    environments.push('browser')
  }
  
  return environments
}

/**
 * Gets environment-specific configuration (synchronous)
 * @param {string} environment - Environment name
 * @returns {Array} Configuration array
 */
function getEnvironmentConfig(environment) {
  switch (environment) {
    case 'browser': {
      return browserConfig
    }
    case 'nuxt': {
      // TODO: Fix Nuxt configuration and re-enable
      throw new Error(`Nuxt environment temporarily disabled due to configuration issues`)
    }
    case 'node': {
      return nodeConfig
    }
    case 'vue': {
      return vueConfig
    }
    default: {
      throw new Error(`Unknown environment: ${environment}`)
    }
  }
}

/**
 * Convenience function for quick setup with sensible defaults
 * Equivalent to createStyleGuide() with auto-detection enabled
 * 
 * @example
 * export default quickSetup()
 * 
 * @param {StyleGuideOptions} [options={}] - Configuration options
 * @returns {Array} ESLint flat configuration array
 */
export function quickSetup(options = {}) {
  return createStyleGuide({
    autoDetect: true,
    ...options
  })
}

/**
 * Creates a minimal configuration with only base rules
 * Useful for projects that want to gradually adopt the style guide
 * 
 * @example
 * export default minimal()
 * 
 * @returns {Array} ESLint flat configuration array
 */
export function minimal() {
  return createStyleGuide({
    autoDetect: false,
    environments: [],
    json: false,
    packageJson: false,
    vitest: false
  })
}

// Default export for convenience
export default createStyleGuide