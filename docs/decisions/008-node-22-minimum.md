# ADR-008: Require Node >=22.11.0

**Status:** Accepted
**Date:** 2026-03-21

## Context

A shared config package must declare a minimum Node.js version. This version determines which JavaScript features the config source code can use and which environments consumers must have in their development toolchain.

## Decision

Require Node >=22.11.0. This decision has three parts:

1. **`import.meta.dirname` requires Node 21.2+, stable in Node 22.** The ESLint configs use `import.meta.dirname` to set `tsconfigRootDir` relative to the package's own directory. This API landed in Node 21.2 and became stable in Node 22.0. Without it, the configs would need `fileURLToPath(new URL('.', import.meta.url))` -- a workaround for a problem Node 22 solved natively.

2. **22.11.0 is the first LTS release of Node 22.** Pinning to a pre-LTS release would be irresponsible for a shared config that teams depend on. LTS guarantees security patches and stability for the support window. Node 22 entered LTS on 2024-10-29 with v22.11.0.

3. **Linting tools run in the developer's environment, not in production.** This is the critical distinction: requiring Node 22 for the linting toolchain does not constrain the consumer's runtime target. A project can lint with Node 22 and deploy to Node 18 or any other target. The `engines` constraint applies to `npm install` and `npx eslint`, not to the consumer's application.

## Alternatives Considered

- **Node >=18 or >=20** -- would require polyfilling `import.meta.dirname` or using the `fileURLToPath` workaround. Adds complexity to support environments that are either EOL (Node 18 EOL April 2025) or approaching maintenance-only status.
- **Node >=22.0.0 (pre-LTS)** -- technically functional, but pre-LTS releases lack the stability guarantees that a shared dependency should require.

## Consequences

- Consumers must have Node 22.11.0+ installed in their development environment. This does **not** affect their application's deployment target -- a project can target Node 18 at runtime while using Node 22 for linting.
- CI pipelines must use Node 22+. Most CI providers offer Node 22 images; this is not a practical blocker for actively maintained projects.
- The config source code uses modern Node APIs without workarounds, keeping the codebase clean and forward-looking.
- Projects still on Node 20 or earlier for their development toolchain cannot adopt this package until they upgrade.
