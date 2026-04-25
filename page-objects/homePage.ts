import { expect, Locator, Page } from "@playwright/test"
import { Helper } from "./helper"

export class HomePage {
    readonly page: Page
    readonly h: Helper

    // Accessibility Elements
    readonly skipToContentLink: Locator
    readonly mainContent: Locator

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
    readonly heroNameHeading: Locator
    readonly heroTaglineHeading: Locator
    readonly heroRoleText: Locator
    readonly heroIntroText: Locator

    // Social Media Buttons
    readonly linkedInButton: Locator
    readonly gitHubButton: Locator
    readonly ieeeButton: Locator
    readonly astqbButton: Locator

    // Featured Projects Section Elements
    readonly featuredProjectsSectionTitle: Locator
    readonly portfolioTypeScriptProjectTitle: Locator
    readonly portfolioPythonProjectTitle: Locator
    readonly projectRepositoryLinks: Locator
    readonly viewAllProjectsLink: Locator

    // Skills Section Elements
    readonly skillsSectionTitle: Locator
    readonly testAutomationCard: Locator
    readonly programmingLanguagesCard: Locator
    readonly cicdCard: Locator
    readonly manualTestingCard: Locator
    readonly otherToolsCard: Locator
    readonly aiToolsCard: Locator

    // Certifications Preview Section Elements
    readonly certificationsSectionTitle: Locator
    readonly ctflCertificationPreview: Locator
    readonly viewCertificateLink: Locator
    readonly viewAllCertificationsLink: Locator

    // Publication Section Elements
    readonly publicationSectionTitle: Locator
    readonly publicationTitle: Locator
    readonly publicationDate: Locator
    readonly viewPaperLink: Locator

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

        // Accessibility Elements
        this.skipToContentLink = page.getByRole('link', { name: 'Skip to content' })
        this.mainContent = page.locator('#main-content')

        // Navigation Bar Elements
        this.navLogo = page.locator('a.nav-logo')
        this.navHomeLink = page.getByRole('link', { name: 'Home' })
        this.navProjectsLink = page.getByRole('link', { name: 'Projects', exact: true })
        this.navResumeLink = page.getByRole('menuitem', { name: 'Resume' })
        this.navCertificationsLink = page.getByRole('menuitem', { name: 'Certifications' })
        this.navEducationLink = page.getByRole('menuitem', { name: 'Education' })
        this.navAboutLink = page.getByRole('link', { name: 'About' })
        this.navContactLink = page.getByRole('link', { name: 'Contact' })
        this.navMore = page.getByRole('button', { name: 'More' })
        this.mobileMenuBtn = page.locator('button.mobile-menu-btn')

        // Hero Section Elements
        this.profileImage = page.getByAltText('Carlos Angelo E. Ng')
        this.heroNameHeading = page.getByRole('heading', { name: 'Carlos Angelo E. Ng', level: 2 })
        this.heroTaglineHeading = page.getByRole('heading', { name: 'Automating Quality Delivering Excellence', level: 1 })
        this.heroRoleText = page.getByText('Senior Quality Assurance Automation Engineer at Datacom')
        this.heroIntroText = page.getByText("Hi, I'm Carlos Ng.", { exact: false })

        // Social Media Buttons
        this.linkedInButton = page.getByAltText('LinkedIn Logo')
        this.gitHubButton = page.getByAltText('GitHub Logo')
        this.ieeeButton = page.getByAltText('IEEE Logo')
        this.astqbButton = page.getByAltText('ASTQB Logo')

        // Featured Projects Section Elements
        this.featuredProjectsSectionTitle = page.getByRole('heading', { name: 'Featured Projects', level: 2 })
        this.portfolioTypeScriptProjectTitle = page.getByRole('heading', { name: 'Portfolio Website Automation (TypeScript)', level: 3 })
        this.portfolioPythonProjectTitle = page.getByRole('heading', { name: 'Portfolio Website Automation (Python)', level: 3 })
        this.projectRepositoryLinks = page.getByRole('link', { name: 'Repository' })
        this.viewAllProjectsLink = page.getByRole('link', { name: 'View All Projects' })

        // Skills Section Elements
        this.skillsSectionTitle = page.locator('h2:has-text("Technical Skills")')
        this.testAutomationCard = page.locator('h3:has-text("Test Automation")')
        this.programmingLanguagesCard = page.locator('h3:has-text("Programming Languages")')
        this.cicdCard = page.locator('h3:has-text("CI/CD")')
        this.manualTestingCard = page.locator('h3:has-text("Manual Testing")')
        this.otherToolsCard = page.locator('h3:has-text("Other Tools")')
        this.aiToolsCard = page.locator('h3:has-text("AI Tools")')

        // Certifications Preview Section Elements
        this.certificationsSectionTitle = page.getByRole('heading', { name: 'Certifications', level: 2 })
        this.ctflCertificationPreview = page.getByText('ISTQB Certified Tester Foundation Level (CTFL)', { exact: true })
        this.viewCertificateLink = page.getByRole('link', { name: 'View Certificate' })
        this.viewAllCertificationsLink = page.getByRole('link', { name: 'View All 4 Certifications' })

        // Publication Section Elements
        this.publicationSectionTitle = page.getByRole('heading', { name: 'Publication', level: 2 })
        this.publicationTitle = page.getByText('A Development of a Low-Cost 12-Lead Electrocardiogram Monitoring Device Using Android-based Smartphone', { exact: true })
        this.publicationDate = page.getByText('Published in IEEE, 2018', { exact: true })
        this.viewPaperLink = page.getByRole('link', { name: 'View Paper' })

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

    // Accessibility Verification
    async verifyAccessibilityElements() {
        await expect(this.skipToContentLink).toHaveAttribute('href', '#main-content')
        await expect(this.mainContent).toBeVisible()
    }

    // Navigation Bar Section Verification
    async verifyNavigationBarSection() {
        await expect(this.navLogo).toBeVisible()
        await expect(this.navHomeLink).toBeVisible()
        await expect(this.navProjectsLink).toBeVisible()
        await expect(this.navAboutLink).toBeVisible()
        await expect(this.navContactLink).toBeVisible()
        await expect(this.navProjectsLink).toHaveAttribute('href', '/projects')
        await expect(this.navAboutLink).toHaveAttribute('href', '/about')
        await expect(this.navContactLink).toHaveAttribute('href', '/contact')
        await expect(this.navMore).toBeVisible()
        await this.navMore.click()
        await expect(this.navResumeLink).toBeVisible()
        await expect(this.navCertificationsLink).toBeVisible()
        await expect(this.navEducationLink).toBeVisible()
        await expect(this.navResumeLink).toHaveAttribute('href', '/resume')
        await expect(this.navCertificationsLink).toHaveAttribute('href', '/certifications')
        await expect(this.navEducationLink).toHaveAttribute('href', '/education')
        // await expect(this.mobileMenuBtn).toBeVisible() only visible on mobile
    }

    // Hero Section Verification
    async verifyHeroSection() {
        await expect(this.profileImage).toBeVisible()
        await expect(this.heroNameHeading).toBeVisible()
        await expect(this.heroTaglineHeading).toBeVisible()
        await expect(this.heroRoleText).toBeVisible()
        await expect(this.heroIntroText).toBeVisible()
    }

    // Social Media Section Verification
    async verifySocialMediaSection() {
        await expect(this.linkedInButton).toBeVisible()
        await expect(this.gitHubButton).toBeVisible()
        await expect(this.ieeeButton).toBeVisible()
        await expect(this.astqbButton).toBeVisible()
    }

    // Featured Projects Section Verification
    async verifyFeaturedProjectsSection() {
        await expect(this.featuredProjectsSectionTitle).toBeVisible()
        await expect(this.portfolioTypeScriptProjectTitle).toBeVisible()
        await expect(this.viewAllProjectsLink).toBeVisible()
        await expect(this.viewAllProjectsLink).toHaveAttribute('href', '/projects')

        const repositoryLinkCount = await this.projectRepositoryLinks.count()
        expect(repositoryLinkCount).toBeGreaterThanOrEqual(1)
        await expect(this.projectRepositoryLinks.nth(0)).toBeVisible()
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

    // Certifications Preview Section Verification
    async verifyCertificationsSection() {
        await expect(this.certificationsSectionTitle).toBeVisible()
        await expect(this.ctflCertificationPreview).toBeVisible()
        await expect(this.viewCertificateLink).toBeVisible()
        await expect(this.viewAllCertificationsLink).toBeVisible()
        await expect(this.viewAllCertificationsLink).toHaveAttribute('href', '/certifications')
    }

    // Publication Section Verification
    async verifyPublicationSection() {
        await expect(this.publicationSectionTitle).toBeVisible()
        await expect(this.publicationTitle).toBeVisible()
        await expect(this.publicationDate).toBeVisible()
        await expect(this.viewPaperLink).toBeVisible()
        await expect(this.viewPaperLink).toHaveAttribute('href', /ieeexplore\.ieee\.org/)
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

    // Footer Section Verification
    async verifyFooterSection() {
        await expect(this.page.getByRole('link', { name: 'Privacy Policy' })).toBeVisible()
        await expect(this.page.getByRole('link', { name: 'Terms & Conditions' })).toBeVisible()
        await expect(this.page.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy')
        await expect(this.page.getByRole('link', { name: 'Terms & Conditions' })).toHaveAttribute('href', '/terms')
    }
}
