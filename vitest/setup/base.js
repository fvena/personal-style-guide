/**
 * Base test setup file with common utilities and global mocks.
 * This file is loaded before all tests and provides common functionality.
 */

// Global test utilities
globalThis.testUtils = {
  /**
   * Create a mock function with common patterns
   */
  createMockFn: () => vi.fn(),

  /**
   * Flush all pending promises
   */
  flushPromises: () => new Promise((resolve) => setTimeout(resolve, 0)),

  /**
   * Generate test data factory
   */
  generateTestData: {
    apiError: (message = "Test error", code = 400) => ({
      error: {
        code,
        message,
        timestamp: new Date().toISOString(),
      },
      success: false,
    }),

    apiResponse: (data, overrides = {}) => ({
      data,
      message: "Success",
      success: true,
      timestamp: new Date().toISOString(),
      ...overrides,
    }),

    user: (overrides = {}) => ({
      email: "test@example.com",
      id: Math.floor(Math.random() * 1000),
      name: "Test User",
      ...overrides,
    }),
  },

  /**
   * Create a delay for async testing
   * @param {number} ms - milliseconds to wait
   */
  sleep: (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms)),
};

// Common mock patterns
globalThis.commonMocks = {
  /**
   * Mock console methods to avoid noise in tests
   */
  mockConsole: () => {
    globalThis.console = {
      ...globalThis.console,
      debug: vi.fn(),
      error: vi.fn(),
      info: vi.fn(),
      log: vi.fn(),
      warn: vi.fn(),
    };
  },

  /**
   * Mock fetch with customizable responses
   */
  mockFetch: (response, options = {}) => {
    const mockResponse = {
      json: () => Promise.resolve(response),
      ok: options.ok ?? true,
      status: options.status ?? 200,
      text: () =>
        Promise.resolve(typeof response === "string" ? response : JSON.stringify(response)),
      ...options,
    };

    globalThis.fetch = vi.fn().mockResolvedValue(mockResponse);
    return globalThis.fetch;
  },

  /**
   * Mock localStorage
   */
  mockLocalStorage: () => {
    const store = new Map();
    globalThis.localStorage = {
      clear: vi.fn(() => store.clear()),
      getItem: vi.fn((key) => store.get(key) || null),
      key: vi.fn(),
      length: 0,
      removeItem: vi.fn((key) => store.delete(key)),
      setItem: vi.fn((key, value) => store.set(key, String(value))),
    };
  },

  /**
   * Mock sessionStorage
   */
  mockSessionStorage: () => {
    const store = new Map();
    globalThis.sessionStorage = {
      clear: vi.fn(() => store.clear()),
      getItem: vi.fn((key) => store.get(key) || null),
      key: vi.fn(),
      length: 0,
      removeItem: vi.fn((key) => store.delete(key)),
      setItem: vi.fn((key, value) => store.set(key, String(value))),
    };
  },
};

// Setup default mocks that are commonly needed
beforeEach(() => {
  // Clear all mocks between tests
  vi.clearAllMocks();

  // Reset modules between tests to ensure isolation
  vi.resetModules();
});

afterEach(() => {
  // Clean up any side effects
  vi.useRealTimers();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
