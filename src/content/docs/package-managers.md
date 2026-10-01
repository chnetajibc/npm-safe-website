---
title: "Package-manager detection"
order: 2
category: "Using nps"
description: "Keep your current package manager; nps detects it or lets you choose explicitly."
---

## Keep the manager your project already uses

nps is the command you run to get the information screen. After you confirm, it hands the install to the manager used by your project. You do not need to convert lockfiles or move the project to npm.

Detection checks the current directory's lockfiles in this order: `pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`, then `bun.lock`. If no lockfile identifies a manager, nps checks the `packageManager` field in `package.json`; if that is absent, it defaults to npm.

You can override detection with `--pm npm`, `--pm pnpm`, `--pm bun`, or `--pm yarn`.

## npm

In a project using `package-lock.json`, this runs the information screen and then installs with npm if you confirm:

```bash
nps install express
```

To make the choice explicit, or to work in a folder without a lockfile:

```bash
nps --pm npm install express
```

nps uses npm's Arborist library for this install path. To inspect only, use `nps --pm npm install express --dry-run`.

## Other package managers

nps also detects pnpm, bun, and yarn from the project lockfile. After you confirm an install, it calls the selected manager's command-line binary. You can let detection choose the manager or use the `--pm` option described in the [command reference](/docs/cli-reference).

## Run your existing scripts

Commands that are not dependency installs pass through to your package manager. For example:

```bash
nps run test
nps run dev
```

Use the manager-specific command directly if you prefer. nps is intended to add context to package installation, not to replace your package manager's full command line.

## Where manager behavior differs

For npm, nps uses the official Arborist API; for pnpm, bun, and yarn it calls their installed command-line binaries. The manager still controls the resulting lockfile and install behavior. Non-registry specs such as `file:../shared`, GitHub shorthands, and tarball URLs do not have the same public registry information, so nps warns and skips the information screen for those specs.
