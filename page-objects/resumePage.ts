import { expect, Locator, Page } from "@playwright/test"
import { Helper } from "./helper"
import fs from "fs"

export class ResumePage {
    readonly page: Page
    readonly h: Helper

    readonly resumePage: Locator
    readonly downloadPdfButton: Locator

    constructor(page: Page) {
        this.page = page
        this.h = new Helper(page)

        this.resumePage = page.getByRole('link', { name: 'Resume' })
        this.downloadPdfButton = page.getByRole('button', { name: 'Download PDF' })

    }

    async goToResumePage() {
        await this.resumePage.click()
        await this.page.waitForLoadState('domcontentloaded')
        await expect(this.page).toHaveTitle(/Carlos Ng | Portfolio/)
    }

    async verifyDownloadPdfButton() {
        await expect(this.downloadPdfButton).toBeVisible()
    }

    async downloadPdfAndVerify() {
        const downloadPromise = this.page.waitForEvent('download')
        await this.downloadPdfButton.click()
        const download = await downloadPromise

        // Verify filename
        const filename = download.suggestedFilename()
        expect(filename).toContain('Carlos_Ng_Resume')

        // Get file path and verify size (646 KB = 661504 bytes)
        const filePath = await download.path()
        const stats = fs.statSync(filePath)
        const fileSizeInKB = stats.size / 1024

        expect(fileSizeInKB).toBeCloseTo(646, 0)

        // Delete the downloaded file
        fs.unlinkSync(filePath)
    }

}