---
title: "Start here"
order: 1
category: "Start here"
description: "Install nps, inspect your first package, and understand the confirmation step."
---

## What you need

`nps` runs on Node.js 18 or later. Install it once as a global command, then run it from the root of the project where you want to add a dependency. The command checks the package metadata first and shows you a report before it writes or installs anything.

Install nps globally with the package manager you already use:

```bash
npm install --global @hort/nps
```

The package exposes the `nps` command. If you only want to try it once with npm, run `npx -y @hort/nps --version` without adding a global install.

## Inspect before installing

From your project directory, ask `nps` to install the package you are considering:

```bash
nps install express
```

Before the install starts, nps looks up package information and presents a safety screen. The screen includes the package version and description, its author and repository, dependency counts, and a Snyk health score with category breakdowns. Review the information, then accept the `[y/N]` prompt to continue. Press Enter or answer `n` to stop.

To inspect the report without installing anything, add `--dry-run`:

```bash
nps install express --dry-run
```

That is a good first run if you want to see the flow before changing a project.

## Add a development dependency

Use the familiar nps flags to select how a package is recorded:

```bash
nps install vitest --dev
```

`--dev` saves as a development dependency; `--peer` and `--optional` select the corresponding dependency type. You can ask for more package detail with `--all`, or machine-readable output with `--json`.

## What happens after you confirm?

nps installs through the package manager it detects in your project. It checks lockfiles first, then the `packageManager` field in `package.json`, and defaults to npm if it cannot identify one. You can choose the manager yourself with `--pm`.

The package manager still performs the install and updates the project files it normally owns. nps adds an information and confirmation step before that action; it does not replace your lockfile or decide whether a package is safe for every use.

## Next

- [Learn how nps chooses your package manager](/docs/package-managers)
- [Understand the commands and options](/docs/cli-reference)
- [Read the v1 scope and security notes](/docs/security-and-privacy)
