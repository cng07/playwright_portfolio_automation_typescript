import { expect, Locator, Page } from "@playwright/test"
import { Helper } from "./helper"

export class ExperiencePage {
    readonly page: Page
    readonly h: Helper

    // Accessibility Elements
    readonly skipToContentLink: Locator
    readonly mainContent: Locator

    // Navigation Elements
    readonly navExperienceLink: Locator

    // Experience Page Elements
    readonly experienceHeading: Locator
    readonly experienceCards: Locator

    // Company Headings
    readonly datacomHeading: Locator
    readonly planitHeading: Locator
    readonly dxcHeading: Locator
    readonly daviHeading: Locator
    readonly accentureHeading1: Locator
    readonly accentureHeading2: Locator

    // Role/Date/Location Elements
    readonly currentRoleText: Locator
    readonly currentDateRangeText: Locator
    readonly taguigLocationText: Locator
    readonly pasigLocationText: Locator
    readonly mandaluyongLocationText: Locator

    // Company Links
    readonly datacomLink: Locator
    readonly planitLink: Locator
    readonly dxcLink: Locator
    readonly daviLink: Locator
    readonly accentureLink1: Locator
    readonly accentureLink2: Locator

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
        this.navExperienceLink = page.getByRole('link', { name: 'Experience' })

        // Experience Page Elements
        this.experienceHeading = page.getByRole('heading', { name: 'Work Experience', level: 1 })
        this.experienceCards = page.locator('div.glass')

        // Company Headings
        this.datacomHeading = page.getByRole('heading', { name: 'Datacom', level: 3 })
        this.planitHeading = page.getByRole('heading', { name: 'Planit', level: 3 })
        this.dxcHeading = page.getByRole('heading', { name: 'DXC Technology', level: 3 })
        this.daviHeading = page.getByRole('heading', { name: 'Data Analytics Ventures, Inc.', level: 3 })
        this.accentureHeading1 = page.getByRole('heading', { name: 'Accenture', level: 3 }).nth(0)
        this.accentureHeading2 = page.getByRole('heading', { name: 'Accenture', level: 3 }).nth(1)

        // Role/Date/Location Elements
        this.currentRoleText = page.getByText('Senior Quality Assurance Automation Engineer', { exact: false })
        this.currentDateRangeText = page.getByText('April 2025', { exact: false })
        this.taguigLocationText = page.getByText('Taguig City, Philippines', { exact: true }).nth(0)
        this.pasigLocationText = page.getByText('Pasig City, Philippines', { exact: true })
        this.mandaluyongLocationText = page.getByText('Mandaluyong City, Philippines', { exact: true }).nth(0)

        // Company Links
        this.datacomLink = page.getByRole('link', { name: 'Datacom', exact: true })
        this.planitLink = page.getByRole('link', { name: 'Planit', exact: true })
        this.dxcLink = page.getByRole('link', { name: 'DXC Technology', exact: true })
        this.daviLink = page.getByRole('link', { name: 'Data Analytics Ventures, Inc.', exact: true })
        this.accentureLink1 = page.getByRole('link', { name: 'Accenture', exact: true }).nth(0)
        this.accentureLink2 = page.getByRole('link', { name: 'Accenture', exact: true }).nth(1)

        // Footer Links
        this.privacyPolicyLink = page.getByRole('link', { name: 'Privacy Policy' })
        this.termsAndConditionsLink = page.getByRole('link', { name: 'Terms & Conditions' })
    }

    async goToExperiencePage() {
        await this.navExperienceLink.click()
        await this.page.waitForLoadState('domcontentloaded')
        await expect(this.page).toHaveURL(/\/experience$/)
        await expect(this.page).toHaveTitle('Carlos Ng | Experience')
    }

    async goToExperiencePageDirect() {
        await this.page.goto('https://carlosng07.vercel.app/experience')
        await this.page.waitForLoadState('domcontentloaded')
        await expect(this.page).toHaveURL(/\/experience$/)
        await expect(this.page).toHaveTitle('Carlos Ng | Experience')
    }

    async verifyAccessibilityElements() {
        await expect(this.skipToContentLink).toHaveAttribute('href', '#main-content')
        await expect(this.mainContent).toBeVisible()
    }

    async verifyExperiencePageHeader() {
        await expect(this.experienceHeading).toBeVisible()

        const cardsCount = await this.experienceCards.count()
        expect(cardsCount).toBeGreaterThanOrEqual(6)
    }

    async verifyExperienceEntries() {
        await expect(this.datacomHeading).toBeVisible()
        await expect(this.planitHeading).toBeVisible()
        await expect(this.dxcHeading).toBeVisible()
        await expect(this.daviHeading).toBeVisible()
        await expect(this.accentureHeading1).toBeVisible()
        await expect(this.accentureHeading2).toBeVisible()

        await expect(this.currentRoleText).toBeVisible()
        await expect(this.currentDateRangeText).toBeVisible()
        await expect(this.taguigLocationText).toBeVisible()
        await expect(this.pasigLocationText).toBeVisible()
        await expect(this.mandaluyongLocationText).toBeVisible()
    }

    async verifyCompanyLinks() {
        await expect(this.datacomLink).toBeVisible()
        await expect(this.planitLink).toBeVisible()
        await expect(this.dxcLink).toBeVisible()
        await expect(this.daviLink).toBeVisible()
        await expect(this.accentureLink1).toBeVisible()
        await expect(this.accentureLink2).toBeVisible()

        await expect(this.datacomLink).toHaveAttribute('href', 'https://datacom.com/nz/en')
        await expect(this.planitLink).toHaveAttribute('href', 'https://www.planit.com/')
        await expect(this.dxcLink).toHaveAttribute('href', 'https://dxc.com/')
        await expect(this.daviLink).toHaveAttribute('href', 'https://www.davi.com.ph/')
        await expect(this.accentureLink1).toHaveAttribute('href', 'https://www.accenture.com/ph-en')
        await expect(this.accentureLink2).toHaveAttribute('href', 'https://www.accenture.com/ph-en')
    }

    async verifyFooterSection() {
        await expect(this.privacyPolicyLink).toBeVisible()
        await expect(this.termsAndConditionsLink).toBeVisible()
        await expect(this.privacyPolicyLink).toHaveAttribute('href', '/privacy')
        await expect(this.termsAndConditionsLink).toHaveAttribute('href', '/terms')
    }

    async verifyInternalLinksApiResponses() {
        const origin = new URL(this.page.url()).origin
        const internalUrls = [`${origin}/experience`, `${origin}/privacy`, `${origin}/terms`]

        for (const url of internalUrls) {
            const response = await this.page.request.get(url, { timeout: 15000 })
            expect(response.status(), `Expected internal URL to be reachable: ${url}`).toBeGreaterThanOrEqual(200)
            expect(response.status(), `Expected internal URL to be reachable: ${url}`).toBeLessThan(400)
        }
    }

    async verifyExternalCompanyLinksApiResponses() {
        const externalUrls = [
            'https://datacom.com/nz/en',
            'https://www.planit.com/',
            'https://dxc.com/',
            'https://www.davi.com.ph/',
            'https://www.accenture.com/ph-en'
        ]

        for (const url of externalUrls) {
            const response = await this.page.request.get(url, { timeout: 30000 })
            expect(response.status(), `Expected external URL to be reachable: ${url}`).toBeGreaterThanOrEqual(200)
            // Some sites block automated clients and respond with 403 even when the endpoint is valid.
            expect(response.status(), `Expected external URL to be reachable: ${url}`).toBeLessThan(500)
            expect(response.status(), `Expected external URL not to be missing: ${url}`).not.toBe(404)
        }
    }

    async verifyAllExperiencePageElements() {
        await this.verifyAccessibilityElements()
        await this.verifyExperiencePageHeader()
        await this.verifyExperienceEntries()
        await this.verifyCompanyLinks()
        await this.verifyFooterSection()
    }

    async verifyAllExperienceApiChecks() {
        await this.verifyInternalLinksApiResponses()
        await this.verifyExternalCompanyLinksApiResponses()
    }
}
