import { expect, Locator, Page } from "@playwright/test"
import { Helper } from "./helper"

export class HomePage {
    readonly page: Page
    readonly h: Helper

    // Navigation Bar Elements
    readonly navLogo: Locator
    readonly navHomeLink: Locator
    readonly navProjectsLink: Locator
    readonly navResumeLink: Locator
    readonly navCertificationsLink: Locator
    readonly navEducationLink: Locator
    readonly navAboutLink: Locator
    readonly navContactLink: Locator
    readonly mobileMenuBtn: Locator
    readonly navMore: Locator

    // Hero Section Elements
    readonly profileImage: Locator

    // Social Media Buttons
    readonly linkedInButton: Locator
    readonly gitHubButton: Locator
    readonly ieeeButton: Locator
    readonly astqbButton: Locator

    // Skills Section Elements
    readonly skillsSectionTitle: Locator
    readonly testAutomationCard: Locator
    readonly programmingLanguagesCard: Locator
    readonly cicdCard: Locator
    readonly manualTestingCard: Locator
    readonly otherToolsCard: Locator
    readonly aiToolsCard: Locator

    // Experience Section Elements
    readonly experienceSectionTitle: Locator
    readonly datacomCompanyLink: Locator
    readonly planitCompanyLink: Locator
    readonly dxcCompanyLink: Locator
    readonly daviCompanyLink: Locator
    readonly accentureCompanyLink1: Locator
    readonly accentureCompanyLink2: Locator

    // Navigation Helper
    readonly homeButton: Locator

    constructor(page: Page) {
        this.page = page
        this.h = new Helper(page)

        // Navigation Bar Elements
        this.navLogo = page.locator('a.nav-logo')
        this.navHomeLink = page.getByRole('link', { name: 'Home' })
        this.navProjectsLink = page.getByRole('link', { name: 'Projects', exact: true })
        this.navResumeLink = page.getByRole('link', { name: 'Resume' })
        this.navCertificationsLink = page.getByRole('menuitem', { name: 'Certifications' })
        this.navEducationLink = page.getByRole('menuitem', { name: 'Education' })
        this.navAboutLink = page.getByRole('link', { name: 'About' })
        this.navContactLink = page.getByRole('link', { name: 'Contact' })
        this.navMore = page.getByRole('button', { name: 'More' })
        this.mobileMenuBtn = page.locator('button.mobile-menu-btn')

        // Hero Section Elements
        this.profileImage = page.getByAltText('Carlos Angelo E. Ng')

        // Social Media Buttons
        this.linkedInButton = page.getByAltText('LinkedIn Logo')
        this.gitHubButton = page.getByAltText('GitHub Logo')
        this.ieeeButton = page.getByAltText('IEEE Logo')
        this.astqbButton = page.getByAltText('ASTQB Logo')

        // Skills Section Elements
        this.skillsSectionTitle = page.locator('h2:has-text("Technical Skills")')
        this.testAutomationCard = page.locator('h3:has-text("Test Automation")')
        this.programmingLanguagesCard = page.locator('h3:has-text("Programming Languages")')
        this.cicdCard = page.locator('h3:has-text("CI/CD")')
        this.manualTestingCard = page.locator('h3:has-text("Manual Testing")')
        this.otherToolsCard = page.locator('h3:has-text("Other Tools")')
        this.aiToolsCard = page.locator('h3:has-text("AI Tools")')

        // Experience Section Elements
        this.experienceSectionTitle = page.locator('h2:has-text("Experience")')
        this.datacomCompanyLink = page.getByRole('link', { name: 'Datacom', exact: true })
        this.planitCompanyLink = page.getByRole('link', { name: 'Planit', exact: true })
        this.dxcCompanyLink = page.getByRole('link', { name: 'DXC Technology', exact: true })
        this.daviCompanyLink = page.getByRole('link', { name: 'Data Analytics Ventures, Inc.', exact: true })
        this.accentureCompanyLink1 = page.getByRole('link', { name: 'Accenture', exact: true }).nth(0)
        this.accentureCompanyLink2 = page.getByRole('link', { name: 'Accenture', exact: true }).nth(1)

        // Navigation Helper
        this.homeButton = page.getByText('home')
    }

    async goToHomePage() {
        await this.page.goto('https://carlosng07.vercel.app/')
        await this.page.waitForLoadState('domcontentloaded')
        await expect(this.page).toHaveTitle('Carlos Ng | Portfolio')
        await expect(this.homeButton).toBeVisible()
        await expect(this.linkedInButton).toBeVisible()
    }

    // Navigation Bar Section Verification
    async verifyNavigationBarSection() {
        await expect(this.navLogo).toBeVisible()
        await expect(this.navHomeLink).toBeVisible()
        await expect(this.navResumeLink).toBeVisible()
        await expect(this.navAboutLink).toBeVisible()
        await expect(this.navContactLink).toBeVisible()
        await expect(this.navMore).toBeVisible()
        await this.navMore.click()
        await expect(this.navCertificationsLink).toBeVisible()
        await expect(this.navEducationLink).toBeVisible()
        // await expect(this.mobileMenuBtn).toBeVisible() only visible on mobile
    }

    // Hero Section Verification
    async verifyHeroSection() {
        await expect(this.profileImage).toBeVisible()
    }

    // Social Media Section Verification
    async verifySocialMediaSection() {
        await expect(this.linkedInButton).toBeVisible()
        await expect(this.gitHubButton).toBeVisible()
        await expect(this.ieeeButton).toBeVisible()
        await expect(this.astqbButton).toBeVisible()
    }

    // Skills Section Verification
    async verifySkillsSection() {
        await expect(this.skillsSectionTitle).toBeVisible()
        await expect(this.skillsSectionTitle).toContainText('Technical Skills')
        await expect(this.testAutomationCard).toBeVisible()
        await expect(this.programmingLanguagesCard).toBeVisible()
        await expect(this.cicdCard).toBeVisible()
        await expect(this.manualTestingCard).toBeVisible()
        await expect(this.otherToolsCard).toBeVisible()
        await expect(this.aiToolsCard).toBeVisible()
    }

    // Experience Section Verification
    async verifyExperienceSection() {
        await expect(this.experienceSectionTitle).toBeVisible()
        await expect(this.experienceSectionTitle).toContainText('Experience')
        await expect(this.datacomCompanyLink).toBeVisible()
        await expect(this.planitCompanyLink).toBeVisible()
        await expect(this.dxcCompanyLink).toBeVisible()
        await expect(this.daviCompanyLink).toBeVisible()
        await expect(this.accentureCompanyLink1).toBeVisible()
        await expect(this.accentureCompanyLink2).toBeVisible()
    }
}
