import { expect, Locator, Page } from "@playwright/test"
import { Helper } from "./helper"

export class AboutPage {
    readonly page: Page
    readonly h: Helper

    // Accessibility Elements
    readonly skipToContentLink: Locator
    readonly mainContent: Locator

    // Navigation Elements
    readonly navAboutLink: Locator

    // About Page Elements
    readonly aboutHeading: Locator
    readonly introHeading: Locator
    readonly qaPhilosophyHeading: Locator
    readonly nameHeading: Locator
    readonly aboutIntroParagraph: Locator
    readonly mainToolText: Locator
    readonly roleText: Locator

    // Images
    readonly profileImage: Locator
    readonly originalImage: Locator

    // Highlights
    readonly fastExecutionTitle: Locator
    readonly fastExecutionDescription: Locator
    readonly maintainedCodeTitle: Locator
    readonly maintainedCodeDescription: Locator
    readonly qaPhilosophyDescription: Locator

    // Contact Links
    readonly githubLink: Locator
    readonly linkedInLink: Locator
    readonly emailLink: Locator

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
        this.navAboutLink = page.getByRole('link', { name: 'About' })

        // About Page Elements
        this.aboutHeading = page.getByRole('heading', { name: 'About Me', level: 1 })
        this.introHeading = page.getByRole('heading', { name: "I'm Carlos Ng", level: 2 })
        this.qaPhilosophyHeading = page.getByRole('heading', { name: 'QA Philosophy', level: 3 })
        this.nameHeading = page.getByRole('heading', { name: 'Carlos Angelo E. Ng', level: 3 })
        this.aboutIntroParagraph = page.getByText('A Test Automation Engineer with 7+ years of experience in software testing', { exact: false })
        this.mainToolText = page.getByText('Main tool I use these days: Playwright - TypeScript', { exact: false })
        this.roleText = page.getByText('Senior Quality Assurance Automation Engineer', { exact: false })

        // Images
        this.profileImage = page.getByAltText('Carlos Angelo E. Ng - Professional')
        this.originalImage = page.getByAltText('Carlos Angelo E. Ng - Original')

        // Highlights
        this.fastExecutionTitle = page.getByText('Fast Execution', { exact: true })
        this.fastExecutionDescription = page.getByText('Reduced execution time from 19 hours to 4 hours for 300+ test cases.', { exact: true })
        this.maintainedCodeTitle = page.getByText('Maintained Code', { exact: true })
        this.maintainedCodeDescription = page.getByText('Stable, clean, and reliable test suites.', { exact: true })
        this.qaPhilosophyDescription = page.getByText('My goal in QA is simple: reduce risk, increase confidence, and keep releases smooth.', { exact: true })

        // Contact Links
        this.githubLink = page.getByRole('link', { name: '@cng07' })
        this.linkedInLink = page.getByRole('link', { name: '@carlosng07' })
        this.emailLink = page.getByRole('link', { name: 'carlosng07@gmail.com' })

        // Footer Links
        this.privacyPolicyLink = page.getByRole('link', { name: 'Privacy Policy' })
        this.termsAndConditionsLink = page.getByRole('link', { name: 'Terms & Conditions' })
    }

    async goToAboutPage() {
        await this.navAboutLink.click()
        await this.page.waitForLoadState('domcontentloaded')
        await expect(this.page).toHaveURL(/\/about$/)
        await expect(this.page).toHaveTitle('Carlos Ng | About')
    }

    async goToAboutPageDirect() {
        await this.page.goto('https://carlosng07.vercel.app/about')
        await this.page.waitForLoadState('domcontentloaded')
        await expect(this.page).toHaveURL(/\/about$/)
        await expect(this.page).toHaveTitle('Carlos Ng | About')
    }

    async verifyAccessibilityElements() {
        await expect(this.skipToContentLink).toHaveAttribute('href', '#main-content')
        await expect(this.mainContent).toBeVisible()
    }

    async verifyAboutPageHeader() {
        await expect(this.aboutHeading).toBeVisible()
        await expect(this.introHeading).toBeVisible()
    }

    async verifyAboutProfileSection() {
        await expect(this.aboutIntroParagraph).toBeVisible()
        await expect(this.mainToolText).toBeVisible()
        await expect(this.nameHeading).toBeVisible()
        await expect(this.roleText).toBeVisible()
        await expect(this.profileImage).toBeVisible()
        await expect(this.originalImage).toBeVisible()
    }

    async verifyHighlightsAndPhilosophy() {
        await expect(this.fastExecutionTitle).toBeVisible()
        await expect(this.fastExecutionDescription).toBeVisible()
        await expect(this.maintainedCodeTitle).toBeVisible()
        await expect(this.maintainedCodeDescription).toBeVisible()
        await expect(this.qaPhilosophyHeading).toBeVisible()
        await expect(this.qaPhilosophyDescription).toBeVisible()
    }

    async verifyContactLinks() {
        await expect(this.githubLink).toBeVisible()
        await expect(this.linkedInLink).toBeVisible()
        await expect(this.emailLink).toBeVisible()

        await expect(this.githubLink).toHaveAttribute('href', 'https://github.com/cng07')
        await expect(this.linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/carlosng07')
        await expect(this.emailLink).toHaveAttribute('href', 'mailto:carlosng07@gmail.com')
    }

    async verifyFooterSection() {
        await expect(this.privacyPolicyLink).toBeVisible()
        await expect(this.termsAndConditionsLink).toBeVisible()
        await expect(this.privacyPolicyLink).toHaveAttribute('href', '/privacy')
        await expect(this.termsAndConditionsLink).toHaveAttribute('href', '/terms')
    }

    async verifyInternalLinksApiResponses() {
        const origin = new URL(this.page.url()).origin
        const internalUrls = [`${origin}/about`, `${origin}/privacy`, `${origin}/terms`]

        for (const url of internalUrls) {
            const response = await this.page.request.get(url, { timeout: 15000 })
            expect(response.status(), `Expected internal URL to be reachable: ${url}`).toBeGreaterThanOrEqual(200)
            expect(response.status(), `Expected internal URL to be reachable: ${url}`).toBeLessThan(400)
        }
    }

    async verifyAllAboutPageElements() {
        await this.verifyAccessibilityElements()
        await this.verifyAboutPageHeader()
        await this.verifyAboutProfileSection()
        await this.verifyHighlightsAndPhilosophy()
        await this.verifyContactLinks()
        await this.verifyFooterSection()
    }
}
