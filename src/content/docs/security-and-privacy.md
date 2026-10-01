---
title: "Security and privacy"
order: 4
category: "Using nps"
description: "What nps checks, what it sends, and what a health signal can and cannot tell you."
---

## What nps looks up

For a registry package, nps requests package metadata from the configured registry and retrieves a package health score from `security.snyk.io`. The terminal screen is built from those package details and the health response. A private registry can be selected with `--registry` or configured through npm settings.

Package information may include a name, version, description, author, repository URL, dependency counts, and the available Snyk score categories. The score may be low, unavailable, or not parseable; nps shows a warning in those cases. A low score is a reason to review more closely, not an automatic install block.

## Local-first, with clear network requests

nps does not require an account or send telemetry. Looking up a registry package does send the package name to the configured registry and to Snyk's health endpoint. Registry credentials are used for the registry request and are not printed in status output.

For packages without a public registry record—such as local `file:` paths, GitHub shorthands, and tarball URLs—nps warns that it cannot show the same registry-based summary and passes the install through.

## Read the score as one signal

A score summarizes the available health data; it is not proof that a package is benign. A good score cannot guarantee that a package has no malicious behavior, and a weak or missing score is not by itself proof of malware. Scores can change as upstream data changes.

Use the screen to make a more informed choice, then keep using the controls that fit your project: review package source and releases, pin and inspect lockfile changes, run your normal vulnerability checks, and test the resulting code.

## What the first release does not do

The current `0.1.x` release focuses on package metadata and a user-controlled confirmation before install. It is not a code scanner, runtime sandbox, malware verdict, or replacement for `npm audit`. It does not claim to prove that a dependency is safe. The human decision remains part of the workflow by design.
