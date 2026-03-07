import { expect, Locator, Page } from "@playwright/test"
import { Helper } from "./helper"

export class CertificationsPage {
    readonly page: Page
    readonly h: Helper

    // Navigation Elements
    readonly navMore: Locator
    readonly navCertificationsLink: Locator

    // Page Header
    readonly certificationsHeading: Locator

    // Certification Headings
    readonly ctflHeading: Locator
    readonly devOpsHeading: Locator
    readonly accentureAgileHeading: Locator
    readonly automationAnywhereHeading: Locator

    // Certification Details
    readonly ctflDate: Locator
    readonly ctflExpiry: Locator
    readonly ctflIssuer: Locator
    readonly ctflCredentialIdLabel: Locator
    readonly ctflCredentialIdValue: Locator

    readonly devOpsDate: Locator
    readonly devOpsExpiry: Locator
    readonly devOpsIssuer: Locator
    readonly devOpsCredentialIdLabel: Locator
    readonly devOpsCredentialIdValue: Locator

    readonly accentureSubHeading: Locator
    readonly accentureDate: Locator
    readonly accentureExpiry: Locator
    readonly accentureIssuer: Locator
    readonly accentureCertificateNumberLabel: Locator
    readonly accentureCertificateNumberValue: Locator

    readonly automationAnywhereSubHeading: Locator
    readonly automationAnywhereDate: Locator
    readonly automationAnywhereExpiry: Locator
    readonly automationAnywhereIssuer: Locator
    readonly automationAnywhereCertificateNumberLabel: Locator
    readonly automationAnywhereCertificateNumberValue: Locator

    readonly officialProfileLink: Locator
    readonly viewCertificateLinks: Locator

    constructor(page: Page) {
        this.page = page
        this.h = new Helper(page)

        // Navigation Elements
        this.navMore = page.getByRole('button', { name: 'More' })
        this.navCertificationsLink = page.getByRole('menuitem', { name: 'Certifications' })

        // Page Header
        this.certificationsHeading = page.getByRole('heading', { name: 'Certifications', level: 1 })

        // Certification Headings
        this.ctflHeading = page.getByRole('heading', { name: 'ISTQB Certified Tester Foundation Level (CTFL)', level: 2 })
        this.devOpsHeading = page.getByRole('heading', { name: 'Certified Tester, AT*SQA DevOps Testing', level: 2 })
        this.accentureAgileHeading = page.getByRole('heading', { name: 'Accenture Agile Certification Program', level: 2 })
        this.automationAnywhereHeading = page.getByRole('heading', { name: 'Automation Anywhere Certified Advanced RPA Professional', level: 2 })

        // Certification Details
        this.ctflDate = page.getByText('April 2024', { exact: true })
        this.ctflExpiry = page.getByText('No Expiry', { exact: true }).nth(0)
        this.ctflIssuer = page.getByText('ASTQB - ISTQB in the U.S.', { exact: true }).nth(0)
        this.ctflCredentialIdLabel = page.getByText('Credential ID:', { exact: true }).nth(0)
        this.ctflCredentialIdValue = page.getByText('24-CTFL-01347-USA', { exact: true })

        this.devOpsDate = page.getByText('January 2023').first()
        this.devOpsExpiry = page.getByText('Expired', { exact: true }).nth(0)
        this.devOpsIssuer = page.getByText('ASTQB - ISTQB in the U.S.', { exact: true }).nth(1)
        this.devOpsCredentialIdLabel = page.getByText('Credential ID:', { exact: true }).nth(1)
        this.devOpsCredentialIdValue = page.getByText('23-AT*DevOps-00002-USA', { exact: true })

        this.accentureSubHeading = page.getByText('Agile Professional Certified', { exact: true })
        this.accentureDate = page.getByText('June 2020', { exact: true })
        this.accentureExpiry = page.getByText('No Expiry', { exact: true }).nth(1)
        this.accentureIssuer = page.getByText('Accenture', { exact: true })
        this.accentureCertificateNumberLabel = page.getByText('Certificate Number:', { exact: true }).nth(0)
        this.accentureCertificateNumberValue = page.getByText('CNAG0000009961', { exact: true })

        this.automationAnywhereSubHeading = page.getByText('Robotic Process Automation Professional (V11.0)', { exact: true })
        this.automationAnywhereDate = page.getByText('July 2020').first()
        this.automationAnywhereExpiry = page.getByText('Expired', { exact: true }).nth(1)
        this.automationAnywhereIssuer = page.getByText('Automation Anywhere', { exact: true })
        this.automationAnywhereCertificateNumberLabel = page.getByText('Certificate Number:', { exact: true }).nth(1)
        this.automationAnywhereCertificateNumberValue = page.getByText('AAADVC-21147163', { exact: true })

        this.officialProfileLink = page.getByRole('link', { name: 'Official U.S. List of Certified & Credentialed Software Testers' })
        this.viewCertificateLinks = page.locator('a:has-text("View Certificate")')
    }

    async goToCertificationsPage() {
        await this.page.goto('https://carlosng07.vercel.app/certifications')
        await this.page.waitForLoadState('domcontentloaded')
        await expect(this.page).toHaveTitle('Carlos Ng | Certifications')
    }

    async goToCertificationsPageFromHomeNavigation() {
        await expect(this.navMore).toBeVisible()
        await this.navMore.click()
        await expect(this.navCertificationsLink).toBeVisible()
        await this.navCertificationsLink.click()
        await this.page.waitForLoadState('domcontentloaded')
        await expect(this.page).toHaveURL(/\/certifications$/)
        await expect(this.page).toHaveTitle('Carlos Ng | Certifications')
    }

    async verifyCertificationsPageHeader() {
        await expect(this.certificationsHeading).toBeVisible()
    }

    async verifyCTFLCertification() {
        await expect(this.ctflHeading).toBeVisible()
        await expect(this.ctflDate).toBeVisible()
        await expect(this.ctflExpiry).toBeVisible()
        await expect(this.ctflIssuer).toBeVisible()
        await expect(this.ctflCredentialIdLabel).toBeVisible()
        await expect(this.ctflCredentialIdValue).toBeVisible()
    }

    async verifyDevOpsCertification() {
        await expect(this.devOpsHeading).toBeVisible()
        await expect(this.devOpsDate).toBeVisible()
        await expect(this.devOpsExpiry).toBeVisible()
        await expect(this.devOpsIssuer).toBeVisible()
        await expect(this.devOpsCredentialIdLabel).toBeVisible()
        await expect(this.devOpsCredentialIdValue).toBeVisible()
    }

    async verifyAccentureAgileCertification() {
        await expect(this.accentureAgileHeading).toBeVisible()
        await expect(this.accentureSubHeading).toBeVisible()
        await expect(this.accentureDate).toBeVisible()
        await expect(this.accentureExpiry).toBeVisible()
        await expect(this.accentureIssuer).toBeVisible()
        await expect(this.accentureCertificateNumberLabel).toBeVisible()
        await expect(this.accentureCertificateNumberValue).toBeVisible()
    }

    async verifyAutomationAnywhereCertification() {
        await expect(this.automationAnywhereHeading).toBeVisible()
        await expect(this.automationAnywhereSubHeading).toBeVisible()
        await expect(this.automationAnywhereDate).toBeVisible()
        await expect(this.automationAnywhereExpiry).toBeVisible()
        await expect(this.automationAnywhereIssuer).toBeVisible()
        await expect(this.automationAnywhereCertificateNumberLabel).toBeVisible()
        await expect(this.automationAnywhereCertificateNumberValue).toBeVisible()
    }

    async verifyCertificationLinks() {
        await expect(this.officialProfileLink).toBeVisible()
        await expect(this.viewCertificateLinks).toHaveCount(4)
    }

    async verifyAllCertificationsPageElements() {
        await this.verifyCertificationsPageHeader()
        await this.verifyCTFLCertification()
        await this.verifyDevOpsCertification()
        await this.verifyAccentureAgileCertification()
        await this.verifyAutomationAnywhereCertification()
        await this.verifyCertificationLinks()
    }
}
