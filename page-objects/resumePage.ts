import { expect, Locator, Page } from "@playwright/test"
import { Helper } from "./helper"
import fs from "fs"

export class ResumePage {
    readonly page: Page
    readonly h: Helper

    // Accessibility Elements
    readonly skipToContentLink: Locator
    readonly mainContent: Locator

    // Navigation Elements
    readonly resumePage: Locator

    // Resume Page Elements
    readonly resumeHeading: Locator
    readonly downloadPdfButton: Locator
    readonly resumePdfObject: Locator
    readonly resumePdfIframe: Locator

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
        this.resumePage = page.getByRole('link', { name: 'Resume' })

        // Resume Page Elements
        this.resumeHeading = page.getByRole('heading', { name: 'Resume', level: 1 })
        this.downloadPdfButton = page.getByRole('button', { name: 'Download PDF' })
        this.resumePdfObject = page.locator('object[type="application/pdf"]')
        this.resumePdfIframe = page.locator('object iframe[title="Carlos Ng Resume"]')

        // Footer Links
        this.privacyPolicyLink = page.getByRole('link', { name: 'Privacy Policy' })
        this.termsAndConditionsLink = page.getByRole('link', { name: 'Terms & Conditions' })
    }

    async goToResumePage() {
        await this.resumePage.click()
        await this.page.waitForLoadState('domcontentloaded')
        await expect(this.page).toHaveURL(/\/resume$/)
        await expect(this.page).toHaveTitle('Carlos Ng | Resume')
    }

    async goToResumePageDirect() {
        await this.page.goto('https://carlosng07.vercel.app/resume')
        await this.page.waitForLoadState('domcontentloaded')
        await expect(this.page).toHaveURL(/\/resume$/)
        await expect(this.page).toHaveTitle('Carlos Ng | Resume')
    }

    async verifyAccessibilityElements() {
        await expect(this.skipToContentLink).toHaveAttribute('href', '#main-content')
        await expect(this.mainContent).toBeVisible()
    }

    async verifyResumePageHeader() {
        await expect(this.resumeHeading).toBeVisible()
    }

    async verifyDownloadPdfButton() {
        await expect(this.downloadPdfButton).toBeVisible()
        await expect(this.downloadPdfButton).toBeEnabled()
    }

    async verifyResumeViewerSection() {
        await expect(this.resumePdfObject).toBeVisible()
        await expect(this.resumePdfObject).toHaveAttribute('data', '/Carlos_Ng_Resume.pdf')
        await expect(this.resumePdfIframe).toBeVisible()
        await expect(this.resumePdfIframe).toHaveAttribute('src', /docs\.google\.com\/viewer/)
        await expect(this.resumePdfIframe).toHaveAttribute('src', /Carlos_Ng_Resume\.pdf/)
    }

    async downloadPdfAndVerify() {
        const downloadPromise = this.page.waitForEvent('download')
        await this.downloadPdfButton.click()
        const download = await downloadPromise

        // Verify download metadata
        const filename = download.suggestedFilename()
        expect(filename).toBe('Carlos_Ng_Resume.pdf')
        expect(download.url()).toContain('/Carlos_Ng_Resume.pdf')

        const apiResponse = await this.page.request.get(download.url(), { timeout: 30000 })
        expect(apiResponse.status()).toBe(200)
        expect(apiResponse.headers()['content-type']).toContain('application/pdf')

        // Get file path and verify it is in a reasonable expected size range
        const filePath = await download.path()
        expect(filePath).toBeTruthy()

        if (!filePath) {
            throw new Error('Download path is empty')
        }

        const stats = fs.statSync(filePath)
        const fileSizeInKB = stats.size / 1024

        expect(fileSizeInKB).toBeGreaterThan(500)
        expect(fileSizeInKB).toBeLessThan(1000)

        // Delete the downloaded file
        fs.unlinkSync(filePath)
    }

    async verifyFooterSection() {
        await expect(this.privacyPolicyLink).toBeVisible()
        await expect(this.termsAndConditionsLink).toBeVisible()
        await expect(this.privacyPolicyLink).toHaveAttribute('href', '/privacy')
        await expect(this.termsAndConditionsLink).toHaveAttribute('href', '/terms')
    }

    async verifyResumePdfApiResponse() {
        const response = await this.page.request.get('https://carlosng07.vercel.app/Carlos_Ng_Resume.pdf', { timeout: 30000 })
        expect(response.status()).toBe(200)
        expect(response.headers()['content-type']).toContain('application/pdf')

        const contentLength = Number(response.headers()['content-length'] || '0')
        expect(contentLength).toBeGreaterThan(500000)
    }

    async verifyResumeInternalLinksApiResponses() {
        const origin = new URL(this.page.url()).origin
        const internalUrls = [`${origin}/resume`, `${origin}/privacy`, `${origin}/terms`]

        for (const url of internalUrls) {
            const response = await this.page.request.get(url, { timeout: 15000 })
            expect(response.status(), `Expected internal URL to be reachable: ${url}`).toBeGreaterThanOrEqual(200)
            expect(response.status(), `Expected internal URL to be reachable: ${url}`).toBeLessThan(400)
        }
    }

    async verifyAllResumePageElements() {
        await this.verifyAccessibilityElements()
        await this.verifyResumePageHeader()
        await this.verifyDownloadPdfButton()
        await this.verifyResumeViewerSection()
        await this.verifyFooterSection()
    }

    async verifyAllResumeApiChecks() {
        await this.verifyResumePdfApiResponse()
        await this.verifyResumeInternalLinksApiResponses()
    }

}
