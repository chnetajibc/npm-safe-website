---
title: "Commands and options"
order: 3
category: "Using nps"
description: "Common install forms, package details, workspace targets, and manager selection."
---

## Install packages

The clearest form is `nps install` followed by one or more package names:

```bash
nps install express
nps install express zod
nps install express@5
```

Bare package names are also accepted as a shorthand:

```bash
nps express zod
```

If you provide no package names, `nps install` installs the dependencies already declared by the project. That project install has no new-package information screen.

## Preview or confirm

```bash
nps install express --dry-run
nps install express --yes
```

- `--dry-run` displays package information without installing.
- `--yes` skips the confirmation prompt and proceeds. Use it only when the decision has already been made or when an automated workflow needs it.

Without `--yes`, the prompt is `[y/N]`: the default is to stop.

## Choose dependency type

```bash
nps install vitest --dev
nps install plugin-api --peer
nps install optional-adapter --optional
```

`--dev` adds a development dependency. `--peer` adds a peer dependency, and `--optional` adds an optional dependency. nps does not allow `--dev` combined with `--peer` or `--optional`.

## Ask for more detail

```bash
nps install express --all
nps install express --json
```

- `--all` includes dependency names, a transitive sample, license, and score breakdown.
- `--json` prints machine-readable package information instead of the colored terminal card.

You can install several names in one command; with three or more, nps uses compact rows to keep the review screen readable.

## Select the package manager or workspace

```bash
nps --pm npm install express
nps install date-fns --workspace web
```

`--pm` accepts `npm`, `pnpm`, `bun`, `yarn`, or `brew`. Without it, nps detects the project manager from the lockfile and package metadata. `--workspace` targets a named workspace consistently across managers.

## Pass-through commands

Use `nps run`, `nps test`, `nps exec`, and similar commands to pass through to the selected manager. These are ordinary package-manager commands; they do not display package information. Uninstalls are also direct pass-throughs:

```bash
nps run build
nps uninstall express
```

Run `nps --help` in your terminal for the options supported by the installed version.
