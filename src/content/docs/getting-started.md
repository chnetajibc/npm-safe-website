---
title: "Getting Started"
order: 1
---

# Getting Started with @hort/nps

`@hort/nps` is a lightning-fast, highly configurable tool designed to secure your Node.js ecosystem. This guide will walk you through the installation and basic usage.

## Installation

You can install `@hort/nps` globally via npm:

```bash
npm install -g @hort/nps
```

## Basic Usage

To audit your current project directory:

```bash
nps audit
```

This will quickly analyze your `package.json` and `node_modules` for known vulnerabilities against multiple databases, giving you a comprehensive report.

### Fixing Vulnerabilities

To automatically apply fixes for detected issues:

```bash
nps audit --fix
```

## Next Steps

Check out the [CLI Reference](/docs/cli-reference) to learn more about advanced commands and configuration options.
