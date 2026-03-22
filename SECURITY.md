# Security Policy

## Supported Versions

Only the latest minor version of `@franvena/kata` receives security updates.

| Version      | Supported |
| ------------ | --------- |
| 1.x (latest) | ✅        |
| < 1.0        | ❌        |

## Reporting a Vulnerability

If you discover a security vulnerability in this project or in any of the bundled ESLint plugins, please report it privately.

**Do not open a public GitHub issue for security vulnerabilities.**

To report a vulnerability:

1. Go to the [Security tab](../../security/advisories/new) of this repository
2. Click "Report a vulnerability"
3. Provide a description of the issue and steps to reproduce

You can expect a response within 7 days. If the vulnerability is confirmed, a patch will be released as soon as possible and you will be credited in the release notes.

## Scope

This package is a collection of linting configurations. Security vulnerabilities in bundled ESLint plugins should be reported to their respective maintainers. This policy covers the configuration code in this repository only.

## Supply Chain Security

This project follows supply chain security best practices:

- **CI-only publishing.** Humans do not publish to npm manually. Every release is published by GitHub Actions, triggered only by `chore(release):` commits on the `main` branch.
- **npm provenance.** Every published version includes a provenance attestation linking the package to the exact commit and workflow that produced it. Verify at [npmjs.com](https://www.npmjs.com/package/@franvena/kata).
- **Dependency monitoring.** Dependabot is configured with monthly updates and grouped PRs for related dependencies. `npm audit` runs on every CI build.
- **Minimal install scripts.** `npm ci --ignore-scripts` is used in CI to prevent execution of lifecycle scripts from dependencies.
