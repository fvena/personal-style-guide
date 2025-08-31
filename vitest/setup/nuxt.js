/**
 * Nuxt.js specific test setup.
 * Extends Vue setup with Nuxt-specific testing utilities and auto-imports.
 */

import { vi } from "vitest";

// Nuxt specific test utilities
globalThis.nuxtTestUtils = {
  /**
   * Mock Nuxt app context
   */
  createMockNuxtApp: (options = {}) => {
    return {
      $config: {
        private: {},
        public: {},
        ...options.config,
      },
      $route: {
        meta: {},
        params: {},
        path: "/",
        query: {},
        ...options.route,
      },
      $router: globalThis.vueTestUtils.createMockRouter(options.routes || []),
      isHydrating: options.isHydrating || false,
      payload: options.payload || {},
      ssrContext: options.ssrContext || {},
      ...options,
    };
  },

  /**
   * Mock Nuxt composables
   */
  mockNuxtComposables: {
    $fetch: vi.fn(),
    abortNavigation: vi.fn(),
    clearError: vi.fn(),
    createError: (options) => new Error(options.statusMessage || "Nuxt Error"),
    navigateTo: vi.fn(),
    refresh: vi.fn(),
    showError: vi.fn(),
    useCookie: (name, options = {}) => {
      const cookieStore = new Map();
      return {
        deserialize: vi.fn(),
        serialize: vi.fn(),
        value: cookieStore.get(name) || options.default || null,
      };
    },
    useFetch: (url, options = {}) =>
      globalThis.nuxtTestUtils.mockNuxtComposables.useLazyFetch(url, options),
    useHead: vi.fn(),
    useLazyFetch: (url, options = {}) => ({
      data: { value: null },
      error: { value: null },
      execute: vi.fn(),
      pending: { value: false },
      refresh: vi.fn(),
      ...options,
    }),
    useNuxtApp: () => globalThis.nuxtTestUtils.createMockNuxtApp(),
    useRequestHeaders: () => ({}),
    useRequestURL: () => new URL("http://localhost:3000/"),
    useRoute: () => ({
      fullPath: "/",
      hash: "",
      matched: [],
      meta: {},
      name: undefined,
      params: {},
      path: "/",
      query: {},
      redirectedFrom: undefined,
    }),
    useRouter: () => globalThis.vueTestUtils.createMockRouter(),
    useRuntimeConfig: (config = {}) => ({
      public: {},
      ...config,
    }),
    useSeoMeta: vi.fn(),
    useServerSeoMeta: vi.fn(),
  },

  /**
   * Mock server-side utilities
   */
  mockServerUtils: {
    deleteCookie: vi.fn(),
    getCookie: vi.fn(),
    getHeaders: vi.fn(() => ({})),
    getQuery: vi.fn(() => ({})),
    getRouterParams: vi.fn(() => ({})),
    readBody: vi.fn(),
    sendRedirect: vi.fn(),
    setCookie: vi.fn(),
    setResponseHeaders: vi.fn(),
    setResponseStatus: vi.fn(),
  },

  /**
   * Page testing helpers
   */
  pageHelpers: {
    /**
     * Mock layout
     */
    mockLayout: (name = "default") => ({
      component: { template: "<div><slot /></div>" },
      name,
    }),

    /**
     * Mock page meta
     */
    mockPageMeta: (meta = {}) => ({
      description: "Test page description",
      layout: "default",
      middleware: [],
      title: "Test Page",
      ...meta,
    }),

    /**
     * Test page navigation
     */
    testNavigation: async (wrapper, to) => {
      const router = wrapper.vm.$router;
      await router.push(to);
      await wrapper.vm.$nextTick();
    },
  },
};

// Nuxt specific global mocks
globalThis.nuxtMocks = {
  /**
   * Mock Nuxt auto-imports
   */
  mockAutoImports: () => {
    // Mock common Nuxt auto-imports
    for (const [name, mock] of Object.entries(globalThis.nuxtTestUtils.mockNuxtComposables)) {
      global[name] = mock;
    }

    // Mock utility functions that Nuxt auto-imports
    globalThis.useState = vi.fn((key, init) => {
      const state = new Map();
      if (!state.has(key) && init) {
        state.set(key, typeof init === "function" ? init() : init);
      }
      return {
        value: state.get(key) || null,
      };
    });

    globalThis.useAsyncData = vi.fn((key, handler, options = {}) => ({
      data: { value: null },
      error: { value: null },
      execute: vi.fn(),
      pending: { value: false },
      refresh: vi.fn(),
      ...options,
    }));
  },

  /**
   * Mock Nuxt modules
   */
  mockModules: () => {
    // Mock @pinia/nuxt if used
    vi.mock("@pinia/nuxt", () => ({
      storeToRefs: vi.fn((store) => store),
    }));

    // Mock @nuxtjs/i18n if used
    vi.mock("@nuxtjs/i18n", () => ({
      defineI18nConfig: vi.fn((config) => config),
      useI18n: () => globalThis.vueTestUtils.mockComposables.useI18n(),
    }));
  },

  /**
   * Mock Nuxt plugins
   */
  mockPlugins: () => {
    // Mock common Nuxt plugins
    vi.mock("#app", () => ({
      defineNuxtPlugin: vi.fn((plugin) => plugin),
      useNuxtApp: vi.fn(() => globalThis.nuxtTestUtils.createMockNuxtApp()),
    }));

    vi.mock("#imports", () => ({
      ...globalThis.nuxtTestUtils.mockNuxtComposables,
    }));
  },

  /**
   * Mock Nuxt server API
   */
  mockServerApi: () => {
    vi.mock("h3", () => ({
      createError: globalThis.nuxtTestUtils.mockNuxtComposables.createError,
      defineEventHandler: vi.fn((handler) => handler),
      getQuery: globalThis.nuxtTestUtils.mockServerUtils.getQuery,
      getRouterParams: globalThis.nuxtTestUtils.mockServerUtils.getRouterParams,
      readBody: globalThis.nuxtTestUtils.mockServerUtils.readBody,
      sendRedirect: globalThis.nuxtTestUtils.mockServerUtils.sendRedirect,
      setResponseStatus: globalThis.nuxtTestUtils.mockServerUtils.setResponseStatus,
    }));
  },
};

// Setup Nuxt testing environment
beforeEach(() => {
  // Mock Nuxt auto-imports
  globalThis.nuxtMocks.mockAutoImports();

  // Mock common Nuxt plugins and modules
  globalThis.nuxtMocks.mockPlugins();
  globalThis.nuxtMocks.mockServerApi();

  // Set up Nuxt-specific globals
  globalThis.process = {
    ...globalThis.process,
    client: false,
    env: {
      NODE_ENV: "test",
      ...globalThis.process?.env,
    },
    server: true,
    static: false,
  };
});

afterEach(() => {
  // Clean up Nuxt-specific globals
  for (const key of Object.keys(globalThis.nuxtTestUtils.mockNuxtComposables)) {
    delete global[key];
  }

  delete globalThis.useState;
  delete globalThis.useAsyncData;
});
