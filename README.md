# Portfolio Automation Testing

Automated testing framework for the [Portfolio website](https://carlos-ng-portfolio.vercel.app/) using **Playwright** and **TypeScript**.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/carlosng07/playwright_portfolio_automation_typescript.git
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

## 🛠️ Usage

### Run Tests

Run all tests:
```bash
npx playwright test
```

Run with UI mode (interactive):
```bash
npx playwright test --ui
```

Run with headed mode (visible browser):
```bash
npx playwright test --headed
```

Run specific test file:
```bash
npx playwright test tests/home.test.ts
```

Run specific test by tag:
```bash
npx playwright test --grep "@runSolo"
```

### View Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

## 🐳 Docker Support

Run tests in Docker containers for consistent, isolated execution:

### Quick Start with Docker:
```bash
# Build Docker image
npm run docker:build

# Run tests in Docker
npm run docker:run

# Or use Docker Compose
npm run docker:compose:up
```

### Manual Docker Commands:
```bash
# Build image
docker build -t playwright-portfolio-tests .

# Run all tests
docker run --rm \
  -v ${PWD}/playwright-report:/app/playwright-report \
  -v ${PWD}/test-results:/app/test-results \
  playwright-portfolio-tests

# Run specific browser
docker run --rm playwright-portfolio-tests npx playwright test --project=chromium
```

## 🔄 CI/CD with Jenkins

This project is fully configured for Jenkins CI/CD with Docker integration.

### Features:
- ✅ **Parallel Execution** - Runs tests across Chromium, Firefox, WebKit simultaneously
- ✅ **Docker Isolation** - Clean environment for each test run
- ✅ **HTML Reports** - Interactive reports with screenshots/videos
- ✅ **Email Notifications** - Alerts on success/failure
- ✅ **Scheduled Runs** - Automated nightly testing
- ✅ **GitHub Integration** - Trigger on push/PR

### Setup Guide:
📖 **See [JENKINS_SETUP.md](./JENKINS_SETUP.md)** for complete setup instructions

### Quick Setup:
1. Install required Jenkins plugins (Docker Pipeline, HTML Publisher, Email-ext)
2. Create new Pipeline job pointing to `Jenkinsfile`
3. Configure email notifications
4. Run your first build!

### Video Tutorials:
- [Jenkins + Playwright Setup](https://www.youtube.com/watch?v=RBVswbsRDMQ) - Complete walkthrough
- [Docker Integration](https://www.youtube.com/watch?v=7uKo-xnNXu0) - Pipeline setup
- [Email Notifications](https://www.youtube.com/watch?v=FX322RVNGj4) - Config guide

## 📜 Available npm Scripts

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

# CI/CD
npm run ci                  # Run tests with CI reporters (HTML, JSON, JUnit)


## 📂 Project Structure

```
playwright_portfolio_automation_typescript/
├── page-objects/          # Page Object Models (POM)
│   ├── helper.ts          # Utility functions and common actions
│   ├── homePage.ts        # Landing page interactions
│   └── resumePage.ts      # Resume page interactions
├── tests/                 # Test specifications
│   └── home.test.ts       # Main test suite (Home & Resume tests)
├── test-data/             # Data used for testing
├── playwright-report/     # Generated HTML test reports
├── test-results/          # Artifacts from test runs
├── node_modules/          # Project dependencies
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── playwright.config.ts   # Playwright configuration
```

## 🧪 Test Coverage

The framework currently covers the following scenarios:

### Home Page
- **Navigation**: Verifies presence of navigation bar.
- **Hero Section**: Checks main introductory content.
- **Social Media**: Validates social links.
- **Skills**: Verifies the technical skills section.
- **Experience**: Checks the work experience timeline.

### Resume Page
- **Navigation**: Verifies transition to existing Resume page.
- **PDF Download**: Tests the functionality of the "Download PDF" button and verifies the download.

## 📝 Notes

- **Page Object Model (POM)**: The project strictly follows the POM design pattern for maintainability.
- **Live Testing**: Tests are executed against the live production URL.
- **TypeScript**: Fully typed for better developer experience and reliability.

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.