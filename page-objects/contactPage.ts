import { expect, Locator, Page } from "@playwright/test"
import { Helper } from "./helper"

export class ContactPage {
    readonly page: Page
    readonly h: Helper

    // Accessibility Elements
    readonly skipToContentLink: Locator
    readonly mainContent: Locator

    // Navigation Elements
    readonly navContactLink: Locator

    // Contact Page Elements
    readonly contactHeading: Locator
    readonly contactSubtitle: Locator
    readonly emailHeading: Locator
    readonly linkedInHeading: Locator
    readonly gitHubHeading: Locator
    readonly ieeeHeading: Locator
    readonly atsqaHeading: Locator

    // Contact Links
    readonly emailLink: Locator
    readonly linkedInLink: Locator
    readonly gitHubLink: Locator
    readonly ieeeLink: Locator
    readonly atsqaLink: Locator
    readonly linkedInCtaText: Locator
    readonly gitHubCtaText: Locator
    readonly publicationsCtaText: Locator
    readonly atsqaCtaText: Locator

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
        this.navContactLink = page.getByRole('link', { name: 'Contact' })

        // Contact Page Elements
        this.contactHeading = page.getByRole('heading', { name: 'Get in Touch', level: 1 })
        this.contactSubtitle = page.getByText("Let's connect to exchange ideas and discuss topics related to software engineering and innovation.", { exact: true })
        this.emailHeading = page.getByRole('heading', { name: 'Email', level: 3 })
        this.linkedInHeading = page.getByRole('heading', { name: 'LinkedIn', level: 3 })
        this.gitHubHeading = page.getByRole('heading', { name: 'GitHub', level: 3 })
        this.ieeeHeading = page.getByRole('heading', { name: 'IEEE Xplore', level: 3 })
        this.atsqaHeading = page.getByRole('heading', { name: 'AT*SQA Profile', level: 3 })

        // Contact Links
        this.emailLink = this.mainContent.locator('a[href="mailto:carlosng07@gmail.com"]').first()
        this.linkedInLink = this.mainContent.locator('a[href="https://www.linkedin.com/in/carlosng07"]').first()
        this.gitHubLink = this.mainContent.locator('a[href="https://github.com/cng07"]').first()
        this.ieeeLink = this.mainContent.locator('a[href="https://ieeexplore.ieee.org/author/37086553247"]').first()
        this.atsqaLink = this.mainContent.locator('a[href="https://atsqa.org/certified-testers/profile/6676da6cab1b424aa4070395ff71f490"]').first()
        this.linkedInCtaText = page.getByText('Connect on LinkedIn', { exact: true })
        this.gitHubCtaText = page.getByText('Follow on GitHub', { exact: true })
        this.publicationsCtaText = page.getByText('View Publications', { exact: true })
        this.atsqaCtaText = page.getByText('View Certified Tester Profile', { exact: true })

        // Footer Links
        this.privacyPolicyLink = page.getByRole('link', { name: 'Privacy Policy' })
        this.termsAndConditionsLink = page.getByRole('link', { name: 'Terms & Conditions' })
    }

    async goToContactPage() {
        await this.navContactLink.click()
        await this.page.waitForLoadState('domcontentloaded')
        await expect(this.page).toHaveURL(/\/contact$/)
        await expect(this.page).toHaveTitle('Carlos Ng | Contact')
    }

    async goToContactPageDirect() {
        await this.page.goto('https://carlosng07.vercel.app/contact')
        await this.page.waitForLoadState('domcontentloaded')
        await expect(this.page).toHaveURL(/\/contact$/)
        await expect(this.page).toHaveTitle('Carlos Ng | Contact')
    }

    async verifyAccessibilityElements() {
        await expect(this.skipToContentLink).toHaveAttribute('href', '#main-content')
        await expect(this.mainContent).toBeVisible()
    }

    async verifyContactPageHeader() {
        await expect(this.contactHeading).toBeVisible()
        await expect(this.contactSubtitle).toBeVisible()
    }

    async verifyContactMethodsSection() {
        await expect(this.emailHeading).toBeVisible()
        await expect(this.linkedInHeading).toBeVisible()
        await expect(this.gitHubHeading).toBeVisible()
        await expect(this.ieeeHeading).toBeVisible()
        await expect(this.atsqaHeading).toBeVisible()

        await expect(this.emailLink).toBeVisible()
        await expect(this.linkedInLink).toBeVisible()
        await expect(this.gitHubLink).toBeVisible()
        await expect(this.ieeeLink).toBeVisible()
        await expect(this.atsqaLink).toBeVisible()

        await expect(this.emailLink).toHaveAttribute('href', 'mailto:carlosng07@gmail.com')
        await expect(this.linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/carlosng07')
        await expect(this.gitHubLink).toHaveAttribute('href', 'https://github.com/cng07')
        await expect(this.ieeeLink).toHaveAttribute('href', 'https://ieeexplore.ieee.org/author/37086553247')
        await expect(this.atsqaLink).toHaveAttribute('href', 'https://atsqa.org/certified-testers/profile/6676da6cab1b424aa4070395ff71f490')

        await expect(this.linkedInCtaText).toBeVisible()
        await expect(this.gitHubCtaText).toBeVisible()
        await expect(this.publicationsCtaText).toBeVisible()
        await expect(this.atsqaCtaText).toBeVisible()
    }

    async verifyFooterSection() {
        await expect(this.privacyPolicyLink).toBeVisible()
        await expect(this.termsAndConditionsLink).toBeVisible()
        await expect(this.privacyPolicyLink).toHaveAttribute('href', '/privacy')
        await expect(this.termsAndConditionsLink).toHaveAttribute('href', '/terms')
    }

    async verifyInternalLinksApiResponses() {
        await this.h.verifyInternalPathsApiResponses(['/contact', '/privacy', '/terms'])
    }

    async verifyExternalContactLinksApiResponses() {
        const externalUrls = [
            'https://www.linkedin.com/in/carlosng07',
            'https://github.com/cng07',
            'https://ieeexplore.ieee.org/author/37086553247',
            'https://atsqa.org/certified-testers/profile/6676da6cab1b424aa4070395ff71f490'
        ]
        await this.h.verifyUrlsApiResponses(externalUrls, { timeout: 30000, urlType: 'external URL' })
    }

    async verifyAllContactPageElements() {
        await this.verifyAccessibilityElements()
        await this.verifyContactPageHeader()
        await this.verifyContactMethodsSection()
        await this.verifyFooterSection()
    }

    async verifyAllContactApiChecks() {
        await this.verifyInternalLinksApiResponses()
        await this.verifyExternalContactLinksApiResponses()
    }
}
