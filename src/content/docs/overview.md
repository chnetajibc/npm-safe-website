---
title: "What nps does"
order: 0
category: "Start here"
description: "A plain-language overview of the nps package safety screen and its first release scope."
---

## A little context before `install`

Adding a dependency is usually a one-line command. Deciding whether a package belongs in a project takes more context: who maintains it, where its source lives, how large its dependency tree is, and whether there are obvious health concerns.

`@hort/nps`—the `nps` command—is a small wrapper around that moment. Run `nps install <package>` and it gathers a package's public registry details and Snyk health score, shows you a readable summary, then asks before the package manager installs it.

```text
your command → package information → your decision → package-manager install
```

The order matters: the summary and prompt happen before nps starts the install. If the information does not look right, decline and investigate the package another way.

## What the first version is for

The first version is deliberately focused on the install decision. It aims to make a few useful facts visible at the point where you choose a dependency:

- **Identity:** package name, selected version, description, author, and repository URL.
- **Size of the dependency tree:** direct, transitive, and total dependency counts.
- **A health signal:** a Snyk score out of 100, with security, popularity, maintenance, and community categories when available.
- **A deliberate install:** a `[y/N]` confirmation, with a dry-run option when you only want to inspect.
- **Your existing workflow:** npm, pnpm, bun, and yarn projects can keep using their package manager.

The package currently publishes as `@hort/nps` version `0.1.x`. “V1” here describes the initial product scope: a clear package-information screen before install. It does not mean the package is already a stable `1.0.0` release.

## What it does not claim

nps is an extra decision aid, not a malware verdict or a replacement for your other checks. A health score is a signal from Snyk, not a guarantee. The first version does not promise that every package is safe, prove what code will do at runtime, or replace lockfile review, vulnerability scanning, tests, and code review.

The point is more modest and useful: pause before installation, put some package context on screen, and let you decide whether to continue.

## Who it helps

- **Maintainers** who want more context before a new direct dependency enters a project.
- **Teams** who want a consistent, reviewable install step during day-to-day development.
- **Developers exploring a package** who want a quick dry run before deciding whether to add it.

For commands and setup, continue to [Start here](/docs/getting-started). For the exact data nps requests and its limits, read [Security and privacy](/docs/security-and-privacy).
