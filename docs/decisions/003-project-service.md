# ADR-003: Use `projectService` over `project: [...]`

**Status:** Accepted
**Date:** 2025-01-10

## Context

typescript-eslint needs access to TypeScript's program information to power type-aware rules. Two approaches exist: `project` (explicit path arrays pointing to tsconfig files) and `projectService` (automatic discovery). A shared config consumed across different project structures must minimize per-project configuration.

## Decision

Use `projectService: true` in the parser options. This auto-discovers `tsconfig.json` files relative to each linted file:

```text
languageOptions: {
  parserOptions: {
    projectService: true,
    tsconfigRootDir: import.meta.dirname,
  },
},
```

`tsconfigRootDir` is set to `import.meta.dirname` -- the package's own directory, not the consumer's project root. This is intentional: the config package's own TypeScript configuration is the reference for parser behavior.

## Alternatives Considered

- **`project: ['./tsconfig.json']`** -- explicit path arrays require manual maintenance. In monorepos with multiple packages, each package needs its own path configuration. This creates friction that a shared config should eliminate.
- **`project: true`** -- shorthand that searches for the nearest tsconfig, but `projectService` is the newer, recommended approach that handles edge cases better (e.g., files not included in any tsconfig).

## Consequences

- Monorepos, nested packages, and workspace setups work without additional configuration.
- `tsconfigRootDir` pointing to the package root (not the consumer's project) means the config resolves its own tsconfig for internal linting. Consumers' projects resolve their own tsconfigs via the project service's auto-discovery.
- Files not covered by any tsconfig are handled gracefully by the project service rather than throwing parser errors.
