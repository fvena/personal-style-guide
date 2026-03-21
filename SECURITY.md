# Security Policy

## Supported Versions

| Version | Supported |
| ------- | --------- |
| 1.x     | ✅        |
| < 1.0   | ❌        |

## Reporting a Vulnerability

If you discover a security vulnerability in `@franvena/kata` or any of its bundled plugin configurations, please report it privately.

**Do not open a public GitHub issue for security vulnerabilities.**

Report via GitHub's private vulnerability reporting:
[Report a vulnerability](https://github.com/fvena/kata/security/advisories/new)

You can expect:

- Acknowledgment within 48 hours
- A fix or mitigation plan within 14 days for confirmed vulnerabilities
- Credit in the release notes if you'd like

## Scope

This package bundles ESLint plugins as dependencies. If a vulnerability is in a bundled plugin (e.g., `eslint-plugin-vue`, `typescript-eslint`), please report it to the upstream plugin maintainers. We will update the dependency as soon as a fix is available.
