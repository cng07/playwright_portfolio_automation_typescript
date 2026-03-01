import { expect, Locator, Page } from "@playwright/test"
import { Helper } from "./helper"

export class ProjectsPage {
    readonly page: Page
    readonly h: Helper


    readonly textHighlights: Locator
    readonly textTechnologies: Locator
    readonly navProjectsLink: Locator

    // Navigation Helper
    readonly projectsButton: Locator

    constructor(page: Page) {
        this.page = page
        this.h = new Helper(page)

        this.textHighlights = page.getByText('Highlights')
        this.textTechnologies = page.getByText('Technologies')
        this.navProjectsLink = page.getByRole('link', { name: 'Projects', exact: true })
        this.projectsButton = page.getByText('projects')
    }

    async goToProjectsPage() {
        await this.navProjectsLink.click()
        await this.page.waitForLoadState('domcontentloaded')
        await expect(this.page).toHaveTitle("Carlos Ng | Portfolio")
    }

    async verifyProject1() {
        await expect(this.page.getByText('Portfolio Website Automation (JavaScript)')).toBeVisible()
        await expect(this.page.getByText('Comprehensive Playwright automation test suite for this portfolio website. Tests critical user flows including navigation, form submissions, and responsive design across browsers.')).toBeVisible()
        await expect(this.textHighlights.nth(0)).toBeVisible()
        await expect(this.page.getByText('Cross-browser testing (Chrome, Firefox, Safari, Edge)')).toBeVisible()
        await expect(this.page.getByText('Link integrity checks')).toBeVisible()
        await expect(this.page.getByText('CI/CD integration with GitHub Actions')).toBeVisible()
        await expect(this.textTechnologies.nth(0)).toBeVisible()
    }

    async verifyProject2() {
        await expect(this.page.getByText('Portfolio Website Automation (TypeScript)')).toBeVisible()
        await expect(this.page.getByText('Advanced Playwright automation framework using TypeScript with containerization and CI/CD support. Implements Page Object Model (POM) architecture for better scalability, type safety, and maintainability. Features Docker containerization and flexible CI/CD options with Jenkins and GitHub Actions.')).toBeVisible()
        await expect(this.textHighlights.nth(1)).toBeVisible()
        await expect(this.page.getByText('Strongly typed test architecture with TypeScript')).toBeVisible()
        await expect(this.page.getByText('Page Object Model (POM) implementation')).toBeVisible()
        await expect(this.page.getByText('Multi-platform CI/CD support (Jenkins & GitHub Actions)')).toBeVisible()
        await expect(this.textTechnologies.nth(1)).toBeVisible()
    }

    async verifyProject3() {
        await expect(this.page.getByText('QA Practice Framework')).toBeVisible()
        await expect(this.page.getByText('Automated end-to-end test suites written in TypeScript using Playwright. Features a structured approach to testing web applications with reusable components and data-driven tests.')).toBeVisible()
        await expect(this.textHighlights.nth(2)).toBeVisible()
        await expect(this.page.getByText('Data-driven testing via CSV integration')).toBeVisible()
        await expect(this.page.getByText('Page Object Model (POM) architecture').nth(1)).toBeVisible()
        await expect(this.page.getByText('Automated form validation & edge case handling')).toBeVisible()
        await expect(this.textTechnologies.nth(2)).toBeVisible()
    }




}