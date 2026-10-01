---
title: "A little more context before npm install"
date: "2026-10-01"
excerpt: "What nps does, why the first release stays focused on the install moment, and what a package health score can—and cannot—tell you."
category: "Product notes"
readTime: "5 min read"
---

## The moment this is for

Most dependency installs are routine. A feature needs a date picker, a test needs a runner, a bug report points to a small utility—and the package is in the project before anyone has looked much past its name.

That is not careless. The details are simply spread across registry pages, source repositories, dependency trees, and health reports. I wanted a small pause in the place where the decision already happens: the terminal.

That is what **nps** is for.

## What nps does

`nps` is a command-line wrapper for package installs. Instead of going straight to `npm install express`, run:

```bash
nps install express
```

Before an install starts, nps gathers the package's public details—its version, description, author, repository, dependency counts, and an available Snyk health score—then shows them in a terminal screen. You can accept the `[y/N]` prompt to continue, or decline and take a closer look.

If you want to see the screen without changing your project, add `--dry-run`:

```bash
nps install express --dry-run
```

There is no new package manager to learn. In a project with a pnpm or bun lockfile, nps can use that manager after you confirm. It can also be told which manager to use with `--pm`.

## Why start with an install screen?

I did not want the first version to pretend it could solve supply-chain security. A terminal tool that calls a package “safe” would be making a promise it cannot keep.

The narrower problem is easier to explain: before changing the project, show a few useful facts in one place and ask for a deliberate yes. Package metadata and a third-party health score are imperfect signals, but seeing them is more useful than installing on name recognition alone.

So the first release aims to do one job well: add context to an install without asking a team to replace its existing workflow.

## What “v1” means here

The package currently ships as `@hort/nps` version `0.1.x`. When I talk about the first version of the product, I mean this initial slice of the idea—not a claim that the package is already at `1.0.0` or that every planned feature is finished.

That first slice covers:

- a package summary before registry installs;
- dependency counts and an available Snyk score;
- a default-no confirmation and a `--dry-run` path;
- npm, pnpm, bun, and yarn project workflows;
- a way to see more detail or request JSON output when you need it.

It does not inspect every line of a package, sandbox its code, or replace vulnerability scanners. A score is a prompt to investigate, not a verdict. Packages installed from local paths or GitHub shorthands do not have the same registry summary, so nps warns and passes those installs through.

## A reasonable way to use it

Start in a project directory and preview a package:

```bash
nps install express --dry-run
```

Read the source link and the summary. If it is a package you want, repeat without `--dry-run` and confirm. Keep reviewing the lockfile change and using the security checks your project already relies on.

That is the whole idea for now: one extra look before one easy-to-miss decision.
