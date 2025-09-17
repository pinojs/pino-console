# pino-console is an OPEN Open Source Project

## What?

Individuals making significant and valuable contributions are given commit-access to the project to contribute as they see fit. This project is more like an open wiki than a standard guarded open source project.

## Rules

Before you start coding, please read [Contributing to projects with git](https://jrfom.com/posts/2017/03/08/a-primer-on-contributing-to-projects-with-git/).

Notice that as long as you don't have commit-access to the project, you have to fork the project and open PRs from the feature branches of the forked project.

There are a few basic ground-rules for contributors:

1. **No `--force` pushes** on `main` or modifying the Git history in any way after a PR has been merged.
1. **Non-main branches** ought to be used for ongoing work.
1. **Non-trivial changes** ought to be subject to an **internal pull-request** to solicit feedback from other contributors.
1. All pull-requests for new features **must** target the `main` branch. PRs to fix bugs in releases are also allowed.
1. Contributors should attempt to adhere to the prevailing code-style.
1. 100% code coverage

## Development Setup

```bash
git clone https://github.com/your-org/pino-console.git
cd pino-console
npm install
```

## Running Tests

```bash
npm test           # Run all tests
npm run test:watch # Watch mode for development
```

## Code Style

We use [neostandard](https://github.com/neostandard/neostandard) for code formatting:

```bash
npm run lint       # Check code style
npm run lint:fix   # Fix style issues
```

## Submitting Changes

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass and linting is clean
5. Submit a pull request

## Releases

Declaring formal releases remains the prerogative of the project maintainer.

## Changes to this arrangement

This is an experiment and feedback is welcome! This document may also be subject to pull-requests or changes by contributors where you believe you have something valuable to add or change.