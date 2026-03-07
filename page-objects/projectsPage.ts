import { expect, Locator, Page } from "@playwright/test"
import { Helper } from "./helper"

export class ProjectsPage {
    readonly page: Page
    readonly h: Helper

    // Accessibility Elements
    readonly skipToContentLink: Locator
    readonly mainContent: Locator

    // Navigation Elements
    readonly navProjectsLink: Locator

    // Projects Page Elements
    readonly projectsHeading: Locator
    readonly textHighlights: Locator
    readonly textTechnologies: Locator
    readonly projectTitles: Locator
    readonly projectStatusActive: Locator
    readonly repositoryLinks: Locator

    // Project Card Titles
    readonly projectJavaScriptTitle: Locator
    readonly projectJavaScriptCard: Locator
    readonly projectTypeScriptTitle: Locator
    readonly projectTypeScriptCard: Locator
    readonly projectPythonTitle: Locator
    readonly projectPythonCard: Locator
    readonly projectQaPracticeTitle: Locator
    readonly projectQaPracticeCard: Locator

    // More Projects Section
    readonly moreProjectsComingHeading: Locator
    readonly moreProjectsComingText: Locator

    // Footer Links
    readonly privacyPolicyLink: Locator
    readonly termsAndConditionsLink: Locator

    constructor(page: Page) {
        this.page = page
        this.h = new Helper(page)

        // Accessibility Elements
        this.skipToContentLink = page.getByRole('link', { name: 'Skip to content' })
        this.mainContent = page.locator('#main-content')

        // Navigation Elements
        this.navProjectsLink = page.getByRole('link', { name: 'Projects', exact: true })

        // Projects Page Elements
        this.projectsHeading = page.getByRole('heading', { name: 'Projects', level: 1 })
        this.textHighlights = page.getByText('Highlights')
        this.textTechnologies = page.getByText('Technologies')
        this.projectTitles = page.locator('h3')
        this.projectStatusActive = page.getByText('Active', { exact: true })
        this.repositoryLinks = page.getByRole('link', { name: 'Repository' })

        // Project Card Titles
        this.projectJavaScriptTitle = page.getByRole('heading', { name: 'Portfolio Website Automation (JavaScript)', level: 3 })
        this.projectJavaScriptCard = page.locator('div.glass').filter({ has: this.projectJavaScriptTitle })
        this.projectTypeScriptTitle = page.getByRole('heading', { name: 'Portfolio Website Automation (TypeScript)', level: 3 })
        this.projectTypeScriptCard = page.locator('div.glass').filter({ has: this.projectTypeScriptTitle })
        this.projectPythonTitle = page.getByRole('heading', { name: 'Portfolio Website Automation (Python)', level: 3 })
        this.projectPythonCard = page.locator('div.glass').filter({ has: this.projectPythonTitle })
        this.projectQaPracticeTitle = page.getByRole('heading', { name: 'QA Practice Framework', level: 3 })
        this.projectQaPracticeCard = page.locator('div.glass').filter({ has: this.projectQaPracticeTitle })

        // More Projects Section
        this.moreProjectsComingHeading = page.getByRole('heading', { name: 'More Projects Coming', level: 2 })
        this.moreProjectsComingText = page.getByText('Check back soon for updates!', { exact: true })

        // Footer Links
        this.privacyPolicyLink = page.getByRole('link', { name: 'Privacy Policy' })
        this.termsAndConditionsLink = page.getByRole('link', { name: 'Terms & Conditions' })
    }

    async goToProjectsPage() {
        await this.navProjectsLink.click()
        await this.page.waitForLoadState('domcontentloaded')
        await expect(this.page).toHaveURL(/\/projects$/)
        await expect(this.page).toHaveTitle("Carlos Ng | Projects")
    }

    async goToProjectsPageDirect() {
        await this.page.goto('https://carlosng07.vercel.app/projects')
        await this.page.waitForLoadState('domcontentloaded')
        await expect(this.page).toHaveURL(/\/projects$/)
        await expect(this.page).toHaveTitle("Carlos Ng | Projects")
    }

    async verifyAccessibilityElements() {
        await expect(this.skipToContentLink).toHaveAttribute('href', '#main-content')
        await expect(this.mainContent).toBeVisible()
    }

    async verifyProjectsPageHeader() {
        await expect(this.projectsHeading).toBeVisible()
        await expect(this.projectTitles).toHaveCount(4)
        await expect(this.projectStatusActive).toHaveCount(4)
        await expect(this.textHighlights).toHaveCount(4)
        await expect(this.textTechnologies).toHaveCount(4)
    }

    async verifyProject1() {
        await expect(this.projectJavaScriptTitle).toBeVisible()
        await expect(this.projectJavaScriptCard.getByText('Comprehensive Playwright automation test suite for this portfolio website.', { exact: false })).toBeVisible()
        await expect(this.textHighlights.nth(0)).toBeVisible()
        await expect(this.projectJavaScriptCard.getByText('Cross-browser testing (Chrome, Firefox, Safari, Edge)')).toBeVisible()
        await expect(this.projectJavaScriptCard.getByText('Link integrity checks')).toBeVisible()
        await expect(this.projectJavaScriptCard.getByText('CI/CD integration with GitHub Actions')).toBeVisible()
        await expect(this.textTechnologies.nth(0)).toBeVisible()
        await expect(this.projectJavaScriptCard.getByText('JavaScript', { exact: true })).toBeVisible()
        await expect(this.projectJavaScriptCard.getByText('GitHub Actions', { exact: true })).toBeVisible()
    }

    async verifyProject2() {
        await expect(this.projectTypeScriptTitle).toBeVisible()
        await expect(this.projectTypeScriptCard.getByText('Advanced Playwright automation framework using TypeScript with containerization and CI/CD support.', { exact: false })).toBeVisible()
        await expect(this.textHighlights.nth(1)).toBeVisible()
        await expect(this.projectTypeScriptCard.getByText('Strongly typed test architecture with TypeScript')).toBeVisible()
        await expect(this.projectTypeScriptCard.getByText('Page Object Model (POM) implementation')).toBeVisible()
        await expect(this.projectTypeScriptCard.getByText('Docker containerization for consistent test environments')).toBeVisible()
        await expect(this.projectTypeScriptCard.getByText('Multi-platform CI/CD support (Jenkins & GitHub Actions)')).toBeVisible()
        await expect(this.textTechnologies.nth(1)).toBeVisible()
        await expect(this.projectTypeScriptCard.getByText('TypeScript', { exact: true })).toBeVisible()
        await expect(this.projectTypeScriptCard.getByText('Jenkins', { exact: true })).toBeVisible()
        await expect(this.projectTypeScriptCard.getByText('Docker', { exact: true })).toBeVisible()
    }

    async verifyProject3() {
        await expect(this.projectPythonTitle).toBeVisible()
        await expect(this.projectPythonCard.getByText('UI automation for this portfolio site using Playwright and pytest.', { exact: false })).toBeVisible()
        await expect(this.textHighlights.nth(2)).toBeVisible()
        await expect(this.projectPythonCard.getByText('Page Object Model (POM) for Home & Projects pages')).toBeVisible()
        await expect(this.projectPythonCard.getByText('pytest + playwright integration')).toBeVisible()
        await expect(this.projectPythonCard.getByText('HTML report generation via pytest-html')).toBeVisible()
        await expect(this.textTechnologies.nth(2)).toBeVisible()
        await expect(this.projectPythonCard.getByText('Python', { exact: true })).toBeVisible()
        await expect(this.projectPythonCard.getByText('pytest', { exact: true })).toBeVisible()
    }

    async verifyProject4() {
        await expect(this.projectQaPracticeTitle).toBeVisible()
        await expect(this.projectQaPracticeCard.getByText('Automated end-to-end test suites written in TypeScript using Playwright.', { exact: false })).toBeVisible()
        await expect(this.textHighlights.nth(3)).toBeVisible()
        await expect(this.projectQaPracticeCard.getByText('Data-driven testing via CSV integration')).toBeVisible()
        await expect(this.projectQaPracticeCard.getByText('Page Object Model (POM) architecture')).toBeVisible()
        await expect(this.projectQaPracticeCard.getByText('Automated form validation & edge case handling')).toBeVisible()
        await expect(this.textTechnologies.nth(3)).toBeVisible()
    }

    async verifyRepositoryLinks() {
        await expect(this.repositoryLinks).toHaveCount(4)

        const repositoryHrefs = await this.repositoryLinks.evaluateAll((links) =>
            links.map((link) => link.getAttribute('href'))
        )

        expect(repositoryHrefs).toEqual([
            'https://github.com/cng07/playwright_portfolio_automation_javascript',
            'https://github.com/cng07/playwright_portfolio_automation_typescript',
            'https://github.com/cng07/playwright_portfolio_automation_python',
            'https://github.com/cng07/qaPractice'
        ])
    }

    async verifyRepositoryLinksApiResponses() {
        const repositoryHrefs = await this.repositoryLinks.evaluateAll((links) =>
            links
                .map((link) => link.getAttribute('href'))
                .filter((href): href is string => Boolean(href))
        )
        await this.h.verifyUrlsApiResponses(repositoryHrefs, { timeout: 30000, urlType: 'repository URL' })
    }

    async verifyMoreProjectsComingSection() {
        await expect(this.moreProjectsComingHeading).toBeVisible()
        await expect(this.moreProjectsComingText).toBeVisible()
    }

    async verifyFooterSection() {
        await expect(this.privacyPolicyLink).toBeVisible()
        await expect(this.termsAndConditionsLink).toBeVisible()
        await expect(this.privacyPolicyLink).toHaveAttribute('href', '/privacy')
        await expect(this.termsAndConditionsLink).toHaveAttribute('href', '/terms')
    }

    async verifyInternalLinksApiResponses() {
        await this.h.verifyInternalPathsApiResponses(['/projects', '/privacy', '/terms'])
    }

    async verifyAllProjectsPageElements() {
        await this.verifyAccessibilityElements()
        await this.verifyProjectsPageHeader()
        await this.verifyProject1()
        await this.verifyProject2()
        await this.verifyProject3()
        await this.verifyProject4()
        await this.verifyRepositoryLinks()
        await this.verifyMoreProjectsComingSection()
        await this.verifyFooterSection()
    }

    async verifyAllProjectsApiChecks() {
        await this.verifyRepositoryLinksApiResponses()
        await this.verifyInternalLinksApiResponses()
    }
}
