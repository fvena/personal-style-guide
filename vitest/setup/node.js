/**
 * Node.js specific test setup.
 * Extends base setup with Node.js API and server testing utilities.
 */

import { beforeEach, vi } from "vitest";

// Node.js specific global utilities
globalThis.nodeTestUtils = {
  /**
   * Create HTTP request mock
   */
  createHttpRequest: (options = {}) => ({
    body: undefined,
    headers: {},
    method: "GET",
    params: {},
    query: {},
    url: "/test",
    ...options,
  }),

  /**
   * Create HTTP response mock
   */
  createHttpResponse: () => {
    const response = {
      cookie: vi.fn().mockReturnThis(),
      end: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
      setHeader: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis(),
    };
    return response;
  },

  /**
   * Mock environment variables
   * @param {Record<string, string>} envVars
   */
  mockEnv: (envVariables) => {
    for (const [key, value] of Object.entries(envVariables)) {
      vi.stubEnv(key, value);
    }
  },

  /**
   * Mock file system operations
   */
  mockFs: () => {
    vi.mock("fs/promises", () => ({
      access: vi.fn(),
      mkdir: vi.fn(),
      readFile: vi.fn(),
      rmdir: vi.fn(),
      stat: vi.fn(),
      unlink: vi.fn(),
      writeFile: vi.fn(),
    }));

    vi.mock("fs", () => ({
      existsSync: vi.fn(),
      mkdirSync: vi.fn(),
      readFileSync: vi.fn(),
      rmSync: vi.fn(),
      writeFileSync: vi.fn(),
    }));
  },

  /**
   * Mock path operations
   */
  mockPath: () => {
    vi.mock("path", () => ({
      basename: vi.fn((path) => path.split("/").pop()),
      dirname: vi.fn((path) => path.split("/").slice(0, -1).join("/")),
      extname: vi.fn((path) => "." + path.split(".").pop()),
      join: vi.fn((...arguments_) => arguments_.join("/")),
      resolve: vi.fn((...arguments_) => "/" + arguments_.join("/")),
    }));
  },

  /**
   * Mock process methods
   */
  mockProcess: () => {
    const mockExit = vi.fn();
    vi.stubGlobal("process", {
      ...process,
      env: { ...process.env },
      exit: mockExit,
    });
    return { exit: mockExit };
  },
};

// Node.js specific mocks that are commonly needed
globalThis.nodeMocks = {
  /**
   * Mock database connection
   */
  mockDatabase: () => {
    return {
      close: vi.fn(),
      connect: vi.fn(),
      execute: vi.fn(),
      query: vi.fn(),
      transaction: vi.fn(),
    };
  },

  /**
   * Mock email service
   */
  mockEmailService: () => {
    return {
      send: vi.fn().mockResolvedValue({ messageId: "test-123" }),
      sendBulk: vi.fn().mockResolvedValue({ failed: 0, sent: 5 }),
      verify: vi.fn().mockResolvedValue(true),
    };
  },

  /**
   * Mock logger
   */
  mockLogger: () => {
    return {
      debug: vi.fn(),
      error: vi.fn(),
      info: vi.fn(),
      trace: vi.fn(),
      warn: vi.fn(),
    };
  },

  /**
   * Mock Redis client
   */
  mockRedis: () => {
    return {
      connect: vi.fn(),
      del: vi.fn(),
      disconnect: vi.fn(),
      exists: vi.fn(),
      expire: vi.fn(),
      get: vi.fn(),
      set: vi.fn(),
    };
  },
};

// Default Node.js environment setup
beforeEach(() => {
  // Ensure Node.js environment
  globalThis.window = undefined;
  globalThis.document = undefined;
  globalThis.navigator = undefined;

  // Mock common Node.js globals if they don't exist
  if (globalThis.Buffer === undefined) {
    globalThis.Buffer = Buffer;
  }

  if (globalThis.process === undefined) {
    globalThis.process = process;
  }
});
