---
title: "Core Features"
order: 3
category: "Overview"
---

# Core Features of @hort/nps

`@hort/nps` is not just another wrapper around `npm audit`. It's a comprehensive security suite for modern Node.js ecosystems, designed to provide deeper insights and automated fixes without breaking your app.

## 1. Deep Security Audit (`nps audit`)

Unlike traditional audits that only scratch the surface of your `package.json`, `@hort/nps` performs a **Deep Security Audit**.

- **Multi-Database Cross-Referencing**: We cross-reference vulnerabilities across the GitHub Advisory Database, Snyk, and the National Vulnerability Database (NVD).
- **Transitive Dependency Analysis**: Easily pinpoint exactly *why* a vulnerable package was installed (e.g., `A -> B -> Vulnerable C`).
- **Context-Aware Severity**: Vulnerabilities are graded not just by CVSS scores, but by how your code interacts with the affected methods.

## 2. Automated Smart Fixes (`--fix`)

Manually updating packages and fixing lockfile conflicts can waste hours. `nps audit --fix` automatically resolves vulnerabilities.

- **Non-Breaking Patches**: We ensure that minor and patch version bumps adhere to semantic versioning safely.
- **Lockfile Resolution**: If a sub-dependency is vulnerable but the root dependency hasn't updated yet, `@hort/nps` can patch your `package-lock.json` directly (similar to `npm overrides`).

## 3. Cryptographic Integrity Verification (`nps verify`)

Supply chain attacks are a growing threat. The `verify` command ensures you're running the code you think you're running.

- **Signature Matching**: Verifies the cryptographic hashes of every installed package against the NPM registry's signed provenance records.
- **Tamper Detection**: Detects if post-install scripts or malicious actors have modified `node_modules` code post-installation.

## 4. Interactive Upgrades (`nps update`)

When a major version bump is required to fix a vulnerability, automated fixes aren't enough because APIs might have changed.

- **Breaking Change Analysis**: `@hort/nps` scans your source code AST (Abstract Syntax Tree) to see if you are actually using the deprecated or changed methods.
- **Interactive CLI**: Choose exactly which major upgrades to apply via an intuitive terminal UI.

## 5. CI/CD Integration

`@hort/nps` is built for pipelines. By using `nps audit --json`, you get a structured JSON response that can be piped into your favorite reporting tools. 

You can also enforce strict policies by running `nps verify --strict` to fail builds immediately if a signature mismatch is detected.
