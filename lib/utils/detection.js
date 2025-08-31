import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

/**
 * Framework and environment detection utilities
 * Automatically detects project configuration based on files and dependencies
 */

/**
 * Detects if a package is installed by checking package.json dependencies
 * @param {string} packageName - Package name to check
 * @param {string} cwd - Current working directory
 * @returns {boolean} True if package is found in dependencies
 */
function hasPackage(packageName, cwd = process.cwd()) {
  try {
    const packageJsonPath = path.join(cwd, 'package.json')
    if (!existsSync(packageJsonPath)) return false
    
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
      ...packageJson.peerDependencies,
    }
    
    return packageName in allDeps
  } catch {
    return false
  }
}

/**
 * Detects if a file exists in the project
 * @param {string} filePath - File path relative to cwd
 * @param {string} cwd - Current working directory
 * @returns {boolean} True if file exists
 */
function hasFile(filePath, cwd = process.cwd()) {
  return existsSync(path.join(cwd, filePath))
}

/**
 * Detects Vue.js projects
 * @param {string} cwd - Current working directory
 * @returns {boolean} True if Vue project detected
 */
export function detectVue(cwd = process.cwd()) {
  return (
    hasPackage('vue', cwd) ||
    hasPackage('@vue/core', cwd) ||
    hasFile('vue.config.js', cwd) ||
    hasFile('vite.config.js', cwd) && hasPackage('@vitejs/plugin-vue', cwd)
  )
}

/**
 * Detects Nuxt.js projects
 * @param {string} cwd - Current working directory
 * @returns {boolean} True if Nuxt project detected
 */
export function detectNuxt(cwd = process.cwd()) {
  return (
    hasPackage('nuxt', cwd) ||
    hasFile('nuxt.config.js', cwd) ||
    hasFile('nuxt.config.ts', cwd) ||
    hasFile('nuxt.config.mjs', cwd)
  )
}

/**
 * Detects TypeScript projects
 * @param {string} cwd - Current working directory
 * @returns {boolean} True if TypeScript project detected
 */
export function detectTypeScript(cwd = process.cwd()) {
  return (
    hasPackage('typescript', cwd) ||
    hasFile('tsconfig.json', cwd) ||
    hasFile('jsconfig.json', cwd)
  )
}

/**
 * Detects Node.js environment (vs browser)
 * @param {string} cwd - Current working directory
 * @returns {boolean} True if Node.js environment detected
 */
export function detectNode(cwd = process.cwd()) {
  try {
    const packageJsonPath = path.join(cwd, 'package.json')
    if (!existsSync(packageJsonPath)) return false
    
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
    
    // Check for Node.js specific indicators
    return (
      packageJson.type === 'module' ||
      hasPackage('@types/node', cwd) ||
      hasPackage('node', cwd) ||
      hasFile('.nvmrc', cwd) ||
      hasFile('server.js', cwd) ||
      hasFile('app.js', cwd) ||
      // Check for Node.js specific dependencies
      hasPackage('express', cwd) ||
      hasPackage('fastify', cwd) ||
      hasPackage('koa', cwd)
    )
  } catch {
    return false
  }
}

/**
 * Detects browser environment
 * @param {string} cwd - Current working directory
 * @returns {boolean} True if browser environment detected
 */
export function detectBrowser(cwd = process.cwd()) {
  return (
    hasFile('index.html', cwd) ||
    hasPackage('vite', cwd) ||
    hasPackage('webpack', cwd) ||
    hasPackage('parcel', cwd) ||
    hasPackage('rollup', cwd) ||
    // Browser-specific libraries
    hasPackage('react-dom', cwd) ||
    hasPackage('@vue/runtime-dom', cwd)
  )
}

/**
 * Detects if Vitest is configured
 * @param {string} cwd - Current working directory
 * @returns {boolean} True if Vitest is detected
 */
export function detectVitest(cwd = process.cwd()) {
  return hasPackage('vitest', cwd) || 
         hasFile('vitest.config.js', cwd) || 
         hasFile('vitest.config.ts', cwd) ||
         hasFile('vitest.config.mjs', cwd)
}

/**
 * Detects all frameworks and environments
 * @param {string} cwd - Current working directory
 * @returns {object} Detection results
 */
export function detectAll(cwd = process.cwd()) {
  return {
    browser: detectBrowser(cwd),
    node: detectNode(cwd),
    nuxt: detectNuxt(cwd),
    typescript: detectTypeScript(cwd),
    vitest: detectVitest(cwd),
    vue: detectVue(cwd),
  }
}