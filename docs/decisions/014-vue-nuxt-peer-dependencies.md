# ADR-014: Vue and Nuxt plugins as optional peer dependencies

**Status:** Accepted
**Date:** 2026-03

## Context

Kata's vision states: "No reemplaza lo que el generador ofrece. Lo extiende y lo blinda." However, Vue and Nuxt-specific packages (`eslint-plugin-vue`, `@vue/eslint-config-typescript`, `eslint-plugin-vuejs-accessibility`, `@nuxt/eslint-config`) were shipped as direct `dependencies`. This created two problems:

1. **Version divergence risk.** When a consumer uses kata alongside a project generator (create-vue, nuxi), both install the same packages independently. If kata pins `eslint-plugin-vue@^10.8.0` and the generator installs `^10.9.0`, npm hoisting typically deduplicates them. But when versions are incompatible (e.g., a major version bump), npm installs two copies with different object references, and ESLint flat config throws `TypeError: Cannot redefine plugin "vue"` — because it uses strict reference equality (`===`) when merging plugin registrations.

2. **"Replace" instead of "extend."** With plugins bundled in kata, guides instructed users to replace the generator's config entirely and uninstall its dependencies. This contradicted the vision and made kata feel invasive rather than additive.

## Decision

Move four Vue/Nuxt-specific packages from `dependencies` to `peerDependencies` with `optional: true`:

- `eslint-plugin-vue`
- `@vue/eslint-config-typescript`
- `eslint-plugin-vuejs-accessibility`
- `@nuxt/eslint-config`

This follows the same pattern already established for other opt-in packages: `eslint-plugin-playwright`, `@vitest/eslint-plugin`, `eslint-plugin-testing-library`, and `eslint-config-turbo`.

Keep `eslint-config-prettier` as a direct dependency — it is used by `base.js` (universal, not Vue-specific).

## How it works

**With a generator (create-vue, nuxi):** The generator installs `eslint-plugin-vue` and `@vue/eslint-config-typescript` as the user's devDependencies. Kata's config imports from these same packages — since there is only one installed copy, the plugin references are identical. The user adds kata's preset after the generator's config; ESLint flat config's "last wins" semantics upgrade rules from `flat/essential` to `flat/recommended` and from `recommended` to `strictTypeChecked`.

**Standalone (no generator):** The user installs the peer dependencies manually alongside kata, as documented in the README. This is the same experience as using `eslint/playwright` or `eslint/vitest`.

## Consequences

- Eliminates the version divergence risk entirely — one copy of each package, controlled by the consumer
- Guides now say "extend" instead of "replace", aligning with the vision
- Consumers who only use `eslint/node` or `eslint/browser` don't install Vue-specific packages at all
- Slightly more verbose install command for Vue/Nuxt users (must list peer deps explicitly)
- The CLI (`kata init`) handles peer dependency installation automatically, mitigating the verbosity for users who prefer guided setup
