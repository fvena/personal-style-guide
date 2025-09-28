/**
 * Vue.js specific test setup.
 * Extends base setup with Vue Test Utils and Vue-specific testing utilities.
 */

import { config } from "@vue/test-utils";
import { afterEach, beforeEach, vi } from "vitest";

// Configure Vue Test Utils globally
config.global = {
  directives: {},

  // Global plugins and directives
  plugins: [],
  // Global properties available to all components in tests
  properties: {
    $t: (key) => key, // Mock i18n translation function
  },

  // Global component stubs
  stubs: {
    // Stub transitions for faster testing
    transition: true,
    "transition-group": true,
    // Add other commonly stubbed components here
  },
};

// Vue specific test utilities
globalThis.vueTestUtils = {
  /**
   * Component testing helpers
   */
  componentHelpers: {
    /**
     * Find all components by test attribute
     */
    findAllByTestId: (wrapper, testId) => wrapper.findAll(`[data-testid="${testId}"]`),

    /**
     * Find component by test attribute
     */
    findByTestId: (wrapper, testId) => wrapper.find(`[data-testid="${testId}"]`),

    /**
     * Trigger event and wait for update
     */
    triggerAndWait: async (wrapper, element, event, payload) => {
      await element.trigger(event, payload);
      await wrapper.vm.$nextTick();
    },

    /**
     * Wait for component to be updated
     */
    waitForUpdate: async (wrapper) => {
      await wrapper.vm.$nextTick();
      await vi.waitFor(() => true);
    },
  },

  /**
   * Create a mock router
   */
  createMockRouter: (routes = []) => {
    const currentRoute = {
      meta: {},
      name: "home",
      params: {},
      path: "/",
      query: {},
    };

    return {
      afterEach: vi.fn(),
      back: vi.fn(),
      beforeEach: vi.fn(),
      currentRoute: { value: currentRoute },
      forward: vi.fn(),
      go: vi.fn(),
      push: vi.fn().mockResolvedValue(),
      replace: vi.fn().mockResolvedValue(),
      routes,
    };
  },

  /**
   * Create a mock store (Pinia)
   */
  createMockStore: (initialState = {}) => {
    return {
      ...initialState,
      $onAction: vi.fn(),
      $patch: vi.fn(),
      $reset: vi.fn(),
      $subscribe: vi.fn(),
    };
  },

  /**
   * Mock composables
   */
  mockComposables: {
    useI18n: () => ({
      locale: { value: "en" },
      locales: [{ code: "en", name: "English" }],
      setLocale: vi.fn(),
      t: vi.fn((key) => key),
    }),
    useRoute: () => ({
      meta: {},
      params: {},
      path: "/",
      query: {},
    }),
    useRouter: () => globalThis.vueTestUtils.createMockRouter(),
  },

  /**
   * Mock Vue APIs
   */
  mockVueApis: () => {
    // Mock ref and reactive
    vi.mock("vue", async (importOriginal) => {
      const vue = await importOriginal();
      return {
        ...vue,
        // Add any specific Vue API mocks here if needed
      };
    });
  },
};

// Vue specific global mocks
globalThis.vueMocks = {
  /**
   * Mock Vue Router
   */
  mockVueRouter: () => {
    vi.mock("vue-router", () => ({
      createRouter: vi.fn(() => globalThis.vueTestUtils.createMockRouter()),
      createWebHistory: vi.fn(),
      useRoute: vi.fn(() => globalThis.vueTestUtils.mockComposables.useRoute()),
      useRouter: vi.fn(() => globalThis.vueTestUtils.mockComposables.useRouter()),
    }));
  },

  /**
   * Mock window APIs commonly used in Vue apps
   */
  mockWindowApis: () => {
    // Mock IntersectionObserver
    globalThis.IntersectionObserver = vi.fn(() => ({
      disconnect: vi.fn(),
      observe: vi.fn(),
      unobserve: vi.fn(),
    }));

    // Mock ResizeObserver
    globalThis.ResizeObserver = vi.fn(() => ({
      disconnect: vi.fn(),
      observe: vi.fn(),
      unobserve: vi.fn(),
    }));

    // Mock matchMedia
    globalThis.matchMedia = vi.fn((query) => ({
      addEventListener: vi.fn(),
      addListener: vi.fn(),
      dispatchEvent: vi.fn(),
      matches: undefined,
      media: query,
      onchange: undefined,
      removeEventListener: vi.fn(),
      removeListener: vi.fn(),
    }));

    // Mock requestAnimationFrame
    globalThis.requestAnimationFrame = vi.fn((callback) => setTimeout(callback, 16));
    globalThis.cancelAnimationFrame = vi.fn(clearTimeout);
  },
};

// Setup Vue testing environment
beforeEach(() => {
  // Mock common Window APIs
  globalThis.vueMocks.mockWindowApis();

  // Clear Vue Test Utils cache
  config.global.components = {};
  config.global.mixins = [];
});

afterEach(() => {
  // Clean up Vue Test Utils
  config.global = {
    directives: {},
    plugins: [],
    properties: {
      $t: (key) => key,
    },
    stubs: {
      transition: true,
      "transition-group": true,
    },
  };
});
