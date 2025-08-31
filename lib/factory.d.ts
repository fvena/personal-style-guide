type environments = 'node' | 'browser' | 'vue' | 'nuxt'

/**
 * Configuration options for StyleGuide factory function
 */
export interface StyleGuideOptions {
  /**
   * Environments to include ['node', 'browser', 'vue', 'nuxt'] or true for auto-detect
   */
  environments?: environments[] | boolean

  /**
   * Enable TypeScript support (auto-detected if not specified)
   */
  typescript?: boolean

  /**
   * Enable Vitest testing support (auto-detected if not specified)
   */
  vitest?: boolean

  /**
   * Enable JSON support (default: true)
   */
  json?: boolean

  /**
   * Enable package.json support (default: true)
   */
  packageJson?: boolean

  /**
   * Current working directory for detection
   */
  cwd?: string

  /**
   * Enable auto-detection (default: true)
   */
  autoDetect?: boolean
}

/**
 * Detection results from framework analysis
 */
export interface DetectionResults {
  vue: boolean
  nuxt: boolean
  typescript: boolean
  node: boolean
  browser: boolean
  vitest: boolean
}

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
 */
export declare function createStyleGuide(options?: StyleGuideOptions): Array<any>

/**
 * Convenience function for quick setup with sensible defaults
 * Equivalent to createStyleGuide() with auto-detection enabled
 *
 * @example
 * export default quickSetup()
 */
export declare function quickSetup(options?: StyleGuideOptions): Array<any>

/**
 * Creates a minimal configuration with only base rules
 * Useful for projects that want to gradually adopt the style guide
 *
 * @example
 * export default minimal()
 */
export declare function minimal(): Array<any>

// Default export for convenience
declare const _default: typeof createStyleGuide
export default _default

// Framework detection utilities
export declare function detectVue(cwd?: string): boolean
export declare function detectNuxt(cwd?: string): boolean
export declare function detectTypeScript(cwd?: string): boolean
export declare function detectNode(cwd?: string): boolean
export declare function detectBrowser(cwd?: string): boolean
export declare function detectVitest(cwd?: string): boolean
export declare function detectAll(cwd?: string): DetectionResults
