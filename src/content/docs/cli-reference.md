---
title: "CLI Reference"
order: 2
category: "Core Guides"
---

# CLI Reference

The `@hort/nps` CLI provides several commands to manage and secure your dependencies. 

## Commands

### `nps audit`

Scans your project for vulnerabilities.

**Options:**
- `--fix`: Automatically apply non-breaking patches and minor updates.
- `--json`: Output the audit report in JSON format (useful for CI/CD).
- `--ignore <pkg>`: Ignore vulnerabilities from a specific package.

### `nps verify`

Verifies the integrity of your installed dependencies against the lockfile and registry signatures to ensure no packages have been tampered with.

**Options:**
- `--strict`: Fails the build if any mismatch is found.

### `nps update`

Interactively helps you upgrade vulnerable dependencies, even if they require a major version bump, by analyzing your code for potential breaking changes.

## Global Configuration

You can configure default behaviors by creating an `.npsrc` file in your home directory or project root.

```json
{
  "autoFix": false,
  "ignorePackages": ["legacy-utils"]
}
```
