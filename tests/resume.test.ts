import { test } from '@playwright/test'
import { HomePage } from '../page-objects/homePage'
import { ResumePage } from '../page-objects/resumePage'

test.describe('Resume page', () => {
    test('Verify Resume Page UI via navigation', async ({ page }) => {
        const homePage = new HomePage(page)
        const resumePage = new ResumePage(page)

        await homePage.goToHomePage()
        await resumePage.goToResumePage()
        await resumePage.verifyAllResumePageElements()
    })

    test('Verify Resume PDF download', async ({ page }) => {
        const resumePage = new ResumePage(page)

        await resumePage.goToResumePageDirect()
        await resumePage.verifyDownloadPdfButton()
        await resumePage.downloadPdfAndVerify()
    })

    test('Verify Resume Page API links', async ({ page }) => {
        const resumePage = new ResumePage(page)

        await resumePage.goToResumePageDirect()
        await resumePage.verifyAllResumeApiChecks()
    })
})
