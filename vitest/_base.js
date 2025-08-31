/**
 * Base Vitest configuration for all environments.
 * Provides optimized performance settings and common utilities.
 *
 * @type {import('vitest').UserConfig}
 */
export default {
  test: {
    // Mock configuration
    clearMocks: true, // Clear mocks between tests

    // Coverage configuration (optional, non-blocking)
    coverage: {
      exclude: [
        "**/*.d.ts",
        "**/node_modules/**",
        "**/dist/**",
        "**/build/**",
        "**/.nuxt/**",
        "**/.output/**",
        "**/coverage/**",
        "**/test/**",
        "**/tests/**",
        "**/*.config.{js,ts}",
        "**/setupTest.{js,ts}",
      ],
      provider: "v8", // Faster than c8
      reporter: ["text", "json"], // Basic reporters, can be extended
      // No thresholds by default - show info but don't fail builds
      thresholds: {
        // Uncomment and adjust these values if you want to enforce coverage
        // statements: 80,
        // branches: 80,
        // functions: 80,
        // lines: 80,
      },
    },

    // Environment detection and optimization
    environment: "node", // Default, can be overridden by specific configs
    // Exclude patterns
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.nuxt/**",
      "**/.output/**",
      "**/e2e/**", // E2E tests handled by other tools
    ],

    // Global test configuration
    globals: true, // Enable global test APIs (describe, it, expect)
    hookTimeout: 10_000,

    // Test file patterns
    include: [
      "src/**/*.{test,spec}.{js,ts}",
      "test/**/*.{test,spec}.{js,ts}",
      "tests/**/*.{test,spec}.{js,ts}",
    ],

    // Isolation configuration
    isolate: true, // Ensure test isolation

    outputFile: process.env.CI
      ? {
          json: "./test-results.json",
          junit: "./test-results.xml",
        }
      : undefined,

    // Performance optimization
    pool: "threads", // Use threads for better performance

    poolOptions: {
      threads: {
        maxThreads: process.env.CI ? undefined : 4, // Unlimited in CI, limited in dev
        minThreads: 2,
      },
    },

    // Reporter configuration
    reporter: process.env.CI
      ? ["verbose", "junit", "json"] // CI needs detailed reports
      : ["default"], // Development needs clean output

    restoreMocks: true, // Restore original implementations
    // Retry configuration for flaky tests
    retry: process.env.CI ? 2 : 0, // Retry in CI, not in development

    // Setup files for common utilities and mocks
    setupFiles: ["personal-style-guide/vitest/setup/base"],

    // Timeout configuration
    testTimeout: 10_000, // 10 seconds for unit tests

    // Watch mode optimization (development)
    watch: !process.env.CI,
    watchExclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.nuxt/**",
      "**/.output/**",
    ],
  },
};
