import { expect, Locator, Page } from "@playwright/test"
import { Helper } from "./helper"

export class EducationPage {
    readonly page: Page
    readonly h: Helper

    // Accessibility Elements
    readonly skipToContentLink: Locator
    readonly mainContent: Locator

    // Navigation Elements
    readonly navMoreButton: Locator
    readonly navEducationMenuItem: Locator

    // Education Page Elements
    readonly educationHeading: Locator
    readonly sectionCards: Locator

    // Tertiary Section
    readonly asiaPacificCollegeHeading: Locator
    readonly degreeText: Locator
    readonly tertiaryDateText: Locator
    readonly tertiaryLocationText: Locator
    readonly honorsHeading: Locator
    readonly scholarshipHeading: Locator
    readonly scholarshipOrgText: Locator

    // Leadership and Involvement
    readonly leadershipHeading: Locator
    readonly apcSeesText: Locator
    readonly iecepText: Locator
    readonly scholarsText: Locator
    readonly mathSocietyText: Locator

    // Secondary Section
    readonly secondaryEducationHeading: Locator
    readonly makatiScienceHeading: Locator
    readonly secondaryDateText: Locator
    readonly secondaryLocationText: Locator

    // Publications Section
    readonly publicationsHeading: Locator
    readonly publicationTitle: Locator
    readonly doiText: Locator
    readonly proceedingsLink: Locator
    readonly ieeeXploreLink: Locator

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
        this.navMoreButton = page.getByRole('button', { name: 'More' })
        this.navEducationMenuItem = page.getByRole('menuitem', { name: 'Education' })

        // Education Page Elements
        this.educationHeading = page.getByRole('heading', { name: 'Education', level: 1 })
        this.sectionCards = page.locator('div.glass')

        // Tertiary Section
        this.asiaPacificCollegeHeading = page.getByRole('heading', { name: 'Asia Pacific College', level: 2 })
        this.degreeText = page.getByText('BS Electronics Engineering', { exact: true })
        this.tertiaryDateText = page.getByText('June 2013', { exact: false })
        this.tertiaryLocationText = page.getByText('#3 Humabon Place, Magallanes, Makati City, Philippines', { exact: true })
        this.honorsHeading = page.getByText('Honors & Achievements', { exact: true })
        this.scholarshipHeading = page.getByText('SCHOLARSHIP', { exact: false })
        this.scholarshipOrgText = page.getByText('SM Foundation, Inc.', { exact: true })

        // Leadership and Involvement
        this.leadershipHeading = page.getByRole('heading', { name: 'Leadership & Involvement', level: 2 })
        this.apcSeesText = page.getByText('APC Society of Electronics Engineering Students', { exact: true })
        this.iecepText = page.getByText('Institute of Electronics Engineers of the Philippines (IECEP-Manila Student Chapter)', { exact: true })
        this.scholarsText = page.getByText('APC SM Foundation Inc. Scholars', { exact: true })
        this.mathSocietyText = page.getByText('APC Mathematics Society', { exact: true })

        // Secondary Section
        this.secondaryEducationHeading = page.getByRole('heading', { name: 'Secondary Education', level: 2 })
        this.makatiScienceHeading = page.getByRole('heading', { name: 'Makati Science High School', level: 2 })
        this.secondaryDateText = page.getByText('June 2009', { exact: false })
        this.secondaryLocationText = page.getByText('9 Kalayaan Ave, Makati City, Philippines', { exact: true })

        // Publications Section
        this.publicationsHeading = page.getByRole('heading', { name: 'Publications', level: 2 })
        this.publicationTitle = page.getByRole('heading', { name: 'A Development of a Low-Cost 12-Lead Electrocardiogram Monitoring Device Using Android-Based Smartphone', level: 3 })
        this.doiText = page.getByText('DOI: 10.1109/GCCE.2018.8574836', { exact: true })
        this.proceedingsLink = page.locator('a[href="https://ieeexplore.ieee.org/xpl/conhome/8555972/proceeding"]')
        this.ieeeXploreLink = page.locator('a[href="https://ieeexplore.ieee.org/document/8574836"]')

        // Footer Links
        this.privacyPolicyLink = page.getByRole('link', { name: 'Privacy Policy' })
        this.termsAndConditionsLink = page.getByRole('link', { name: 'Terms & Conditions' })
    }

    async goToEducationPage() {
        await expect(this.navMoreButton).toBeVisible()
        await this.navMoreButton.click()
        await expect(this.navEducationMenuItem).toBeVisible()
        await this.navEducationMenuItem.click()
        await this.page.waitForLoadState('domcontentloaded')
        await expect(this.page).toHaveURL(/\/education$/)
        await expect(this.page).toHaveTitle('Carlos Ng | Education')
    }

    async goToEducationPageDirect() {
        await this.page.goto('https://carlosng07.vercel.app/education')
        await this.page.waitForLoadState('domcontentloaded')
        await expect(this.page).toHaveURL(/\/education$/)
        await expect(this.page).toHaveTitle('Carlos Ng | Education')
    }

    async verifyAccessibilityElements() {
        await expect(this.skipToContentLink).toHaveAttribute('href', '#main-content')
        await expect(this.mainContent).toBeVisible()
    }

    async verifyEducationPageHeader() {
        await expect(this.educationHeading).toBeVisible()

        const sectionCardCount = await this.sectionCards.count()
        expect(sectionCardCount).toBeGreaterThanOrEqual(4)
    }

    async verifyTertiarySection() {
        await expect(this.asiaPacificCollegeHeading).toBeVisible()
        await expect(this.degreeText).toBeVisible()
        await expect(this.tertiaryDateText).toBeVisible()
        await expect(this.tertiaryLocationText).toBeVisible()
        await expect(this.honorsHeading).toBeVisible()
        await expect(this.scholarshipHeading).toBeVisible()
        await expect(this.scholarshipOrgText).toBeVisible()
    }

    async verifyLeadershipAndInvolvementSection() {
        await expect(this.leadershipHeading).toBeVisible()
        await expect(this.apcSeesText).toBeVisible()
        await expect(this.iecepText).toBeVisible()
        await expect(this.scholarsText).toBeVisible()
        await expect(this.mathSocietyText).toBeVisible()
    }

    async verifySecondarySection() {
        await expect(this.secondaryEducationHeading).toBeVisible()
        await expect(this.makatiScienceHeading).toBeVisible()
        await expect(this.secondaryDateText).toBeVisible()
        await expect(this.secondaryLocationText).toBeVisible()
    }

    async verifyPublicationsSection() {
        await expect(this.publicationsHeading).toBeVisible()
        await expect(this.publicationTitle).toBeVisible()
        await expect(this.doiText).toBeVisible()
        await expect(this.proceedingsLink).toBeVisible()
        await expect(this.ieeeXploreLink).toBeVisible()
        await expect(this.proceedingsLink).toHaveAttribute('href', 'https://ieeexplore.ieee.org/xpl/conhome/8555972/proceeding')
        await expect(this.ieeeXploreLink).toHaveAttribute('href', 'https://ieeexplore.ieee.org/document/8574836')
    }

    async verifyFooterSection() {
        await expect(this.privacyPolicyLink).toBeVisible()
        await expect(this.termsAndConditionsLink).toBeVisible()
        await expect(this.privacyPolicyLink).toHaveAttribute('href', '/privacy')
        await expect(this.termsAndConditionsLink).toHaveAttribute('href', '/terms')
    }

    async verifyInternalLinksApiResponses() {
        const origin = new URL(this.page.url()).origin
        const internalUrls = [`${origin}/education`, `${origin}/privacy`, `${origin}/terms`]

        for (const url of internalUrls) {
            const response = await this.page.request.get(url, { timeout: 15000 })
            expect(response.status(), `Expected internal URL to be reachable: ${url}`).toBeGreaterThanOrEqual(200)
            expect(response.status(), `Expected internal URL to be reachable: ${url}`).toBeLessThan(400)
        }
    }

    async verifyPublicationLinksApiResponses() {
        const publicationUrls = [
            'https://ieeexplore.ieee.org/xpl/conhome/8555972/proceeding',
            'https://ieeexplore.ieee.org/document/8574836'
        ]

        for (const url of publicationUrls) {
            const response = await this.page.request.get(url, { timeout: 30000 })
            expect(response.status(), `Expected publication URL to be reachable: ${url}`).toBeGreaterThanOrEqual(200)
            expect(response.status(), `Expected publication URL to be reachable: ${url}`).toBeLessThan(400)
        }
    }

    async verifyAllEducationPageElements() {
        await this.verifyAccessibilityElements()
        await this.verifyEducationPageHeader()
        await this.verifyTertiarySection()
        await this.verifyLeadershipAndInvolvementSection()
        await this.verifySecondarySection()
        await this.verifyPublicationsSection()
        await this.verifyFooterSection()
    }

    async verifyAllEducationApiChecks() {
        await this.verifyInternalLinksApiResponses()
        await this.verifyPublicationLinksApiResponses()
    }
}
