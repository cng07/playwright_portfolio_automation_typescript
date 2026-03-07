# Portfolio Automation Testing

Automated testing framework for the live portfolio website [carlosng07.vercel.app](https://carlosng07.vercel.app/) using Playwright and TypeScript.

## Overview

- Page Object Model (POM) architecture for maintainable test code.
- Cross-browser test execution on Chromium, Firefox, and WebKit.
- Coverage for UI validation, direct URL checks, download checks, and API/link health checks.
- CI/CD support with Jenkins and GitHub Actions.
- Docker support for consistent test execution environments.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/cng07/playwright_portfolio_automation_typescript.git
cd playwright_portfolio_automation_typescript
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

## Usage

### Run Tests

Run all tests:

```bash
npx playwright test
```

Run in UI mode (interactive):

```bash
npx playwright test --ui
```

Run in headed mode (visible browser):

```bash
npx playwright test --headed
```

Run a specific suite:

```bash
npx playwright test tests/education.test.ts
```

Run tests by tag (example):

```bash
npx playwright test --grep "@runSolo"
```

### View Reports

```bash
npx playwright show-report
```

## Available npm Scripts

```bash
# Test execution
npm test                    # Run all tests
npm run test:headed         # Run with visible browser
npm run test:ui             # Run in interactive UI mode
npm run test:chrome         # Run only Chromium tests
npm run test:firefox        # Run only Firefox tests
npm run test:webkit         # Run only WebKit tests
npm run test:debug          # Run in debug mode
npm run test:smoke          # Run tests tagged @smoke

# Reports
npm run report              # Show HTML report

# Docker
npm run docker:build        # Build Docker image
npm run docker:run          # Run tests in Docker
npm run docker:compose:up   # Run with Docker Compose
npm run docker:compose:down # Stop Docker Compose

# CI/CD style local run
npm run ci                  # Run tests with HTML, JSON, and JUnit reporters

# MCP
npm run mcp:playwright            # Start Playwright MCP server
npm run mcp:playwright:headless   # Start Playwright MCP server in headless Chromium
```

## Test Coverage

Current suites:

- `tests/home.test.ts`
- `tests/about.test.ts`
- `tests/projects.test.ts`
- `tests/resume.test.ts`
- `tests/contact.test.ts`
- `tests/experience.test.ts`
- `tests/education.test.ts`
- `tests/certifications.test.ts`

Coverage includes:

- Navigation and page-level UI assertions across all main pages.
- Accessibility checks such as `Skip to content` and `#main-content` visibility.
- Direct URL validation for page entry points.
- API/link checks for internal routes (`/privacy`, `/terms`, etc.).
- External link reachability checks (GitHub, LinkedIn, IEEE, company links, and publication links).
- Resume PDF viewer and download validation (metadata, content-type, and file-size checks).

## Docker Support

Quick start:

```bash
npm run docker:build
npm run docker:run
npm run docker:compose:up
```

Manual commands:

```bash
docker build -t playwright-portfolio-tests .

docker run --rm \
  -v ${PWD}/playwright-report:/app/playwright-report \
  -v ${PWD}/test-results:/app/test-results \
  playwright-portfolio-tests

docker run --rm playwright-portfolio-tests npx playwright test --project=chromium
```

## CI/CD

### Jenkins

- Pipeline is defined in `Jenkinsfile`.
- Setup guide: [JENKINS_SETUP.md](./JENKINS_SETUP.md)
- Quick command reference: [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)

### GitHub Actions

- Workflow file: `.github/workflows/playwright.yml`
- Triggered on pushes and pull requests to `main`/`master`.
- Uploads Playwright HTML report as a build artifact.

## Project Structure

```text
playwright_portfolio_automation_typescript/
|-- page-objects/
|   |-- helper.ts
|   |-- homePage.ts
|   |-- aboutPage.ts
|   |-- projectsPage.ts
|   |-- resumePage.ts
|   |-- contactPage.ts
|   |-- experiencePage.ts
|   |-- educationPage.ts
|   `-- certificationsPage.ts
|-- tests/
|   |-- home.test.ts
|   |-- about.test.ts
|   |-- projects.test.ts
|   |-- resume.test.ts
|   |-- contact.test.ts
|   |-- experience.test.ts
|   |-- education.test.ts
|   `-- certifications.test.ts
|-- .github/workflows/playwright.yml
|-- Dockerfile
|-- docker-compose.yml
|-- Jenkinsfile
|-- JENKINS_SETUP.md
|-- QUICK_REFERENCE.md
|-- package.json
|-- playwright.config.ts
`-- README.md
```

## Notes

- Tests run against the live production URL.
- Test helpers centralize reusable API/link validation logic.
- Framework is fully typed with TypeScript.

## License

This project is licensed under the MIT License.
