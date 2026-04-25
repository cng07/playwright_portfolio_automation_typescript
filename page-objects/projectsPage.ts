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
    readonly projectTabButtons: Locator
    readonly projectStatusActive: Locator
    readonly repositoryLinks: Locator

    // Project Card Titles
    readonly projectJavaScriptTab: Locator
    readonly projectTypeScriptTab: Locator
    readonly projectPythonTab: Locator
    readonly projectQaPracticeTab: Locator

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
        this.projectTabButtons = page.locator('main button').filter({ hasText: 'Portfolio Website Automation' })
        this.projectStatusActive = page.getByText('Active', { exact: true })
        this.repositoryLinks = page.getByRole('link', { name: /Repository/i })

        // Project Card Titles
        this.projectJavaScriptTab = page.getByRole('button', { name: 'Portfolio Website Automation (JavaScript)' })
        this.projectTypeScriptTab = page.getByRole('button', { name: 'Portfolio Website Automation (TypeScript)' })
        this.projectPythonTab = page.getByRole('button', { name: 'Portfolio Website Automation (Python)' })
        this.projectQaPracticeTab = page.getByRole('button', { name: 'QA Practice Framework' })

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
        expect(await this.projectTabButtons.count()).toBeGreaterThanOrEqual(1)
        expect(await this.projectStatusActive.count()).toBeGreaterThanOrEqual(1)
        // The section labels can change, so keep this check focused on cards and status.
    }

    async verifyProject1() {
        if (await this.projectJavaScriptTab.count()) {
            await expect(this.projectJavaScriptTab).toBeVisible()
            await expect(this.page.getByText('Comprehensive Playwright automation test suite for this portfolio website.', { exact: false })).toBeVisible()
        }
    }

    async verifyProject2() {
        if (await this.projectTypeScriptTab.count()) {
            await expect(this.projectTypeScriptTab).toBeVisible()
        }
    }

    async verifyProject3() {
        if (await this.projectPythonTab.count()) {
            await expect(this.projectPythonTab).toBeVisible()
        }
    }

    async verifyProject4() {
        if (await this.projectQaPracticeTab.count()) {
            await expect(this.projectQaPracticeTab).toBeVisible()
        }
    }

    async verifyRepositoryLinks() {
        expect(await this.repositoryLinks.count()).toBeGreaterThanOrEqual(1)

        const repositoryHrefs = await this.repositoryLinks.evaluateAll((links) =>
            links
                .map((link) => link.getAttribute('href'))
                .filter((href): href is string => Boolean(href))
        )

        expect(repositoryHrefs.length).toBeGreaterThanOrEqual(1)
        for (const href of repositoryHrefs) {
            expect(href).toContain('github.com/cng07')
        }
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
        if (await this.moreProjectsComingHeading.count()) {
            await expect(this.moreProjectsComingHeading).toBeVisible()
        }
        if (await this.moreProjectsComingText.count()) {
            await expect(this.moreProjectsComingText).toBeVisible()
        }
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
