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