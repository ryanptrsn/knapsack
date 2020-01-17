---
title: Add a New Pattern
id: add-new-pattern
---
## Anatomy of a Pattern

Knapsack will start tracking and documenting your patterns by simply adding the following files to pattern-specific (e.g. `/button`) directory in your Patterns directory.

1. `knapsack.pattern.js` - defines a unique ID for the given pattern, as well as an array of templates that create the pattern and their associated schema files.
2. `knapsack.pattern-meta.json` - defines meta data about the pattern including its human friendly name, type, and description.
3. `your-pattern.schema.js` - A json schema for the pattern.
4. Template file(s). (e.g. `your-pattern.twig`, `your-pattern.html`, `your-pattern.js`).
5. Assets. Every system will handle this differently, so this may not always apply, but you can include pattern-specific images, styles, javascript, etc. in the specific pattern directory.
6. *Optional & Encouraged* `README.md` - Optional documentation for the pattern.

## Add a new Pattern

Make the files listed above. You can find examples of the file contents in the following examples for a [Button](/docs/example-button) and a [Card](/docs/example-nesting-patterns). You can also look in the `/examples` directory of the Knapsack repository, where you'll find various design system we've built to illustrate ways Knapsack can function. Start by looking in [`/examples/simple/assets/patterns`](https://github.com/basaltinc/knapsack/tree/master/examples/simple/assets/patterns) — you'll find a few simple patterns with the correct contents to get you started.
