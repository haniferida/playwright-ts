# Playwright TypeScript Example

A simple end-to-end test project using [Playwright](https://playwright.dev/) with TypeScript and a Page Object Model structure.

## Project Structure

- `tests/` - test specs
- `pages/` - page object classes
- `playwright.config.ts` - Playwright configuration
- `test-results/` - raw test artifacts (generated)
- `playwright-report/` - HTML report (generated)

## Prerequisites

- Node.js 18+ (recommended)
- npm

## Installation

```bash
npm install
npx playwright install
```

## Run Tests

```bash
npm test
```

Run in headed mode:

```bash
npm run test:headed
```

Open Playwright UI mode:

```bash
npm run test:ui
```

## Notes

- Browser binaries are installed with `npx playwright install`.
- `node_modules/`, `playwright-report/`, and `test-results/` are ignored via `.gitignore`.
