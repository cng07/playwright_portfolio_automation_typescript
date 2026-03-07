import { test } from '@playwright/test'
import { HomePage } from '../page-objects/homePage'
import { EducationPage } from '../page-objects/educationPage'

test.describe('Education page', () => {
    test('Verify Education Page UI via navigation', async ({ page }) => {
        const homePage = new HomePage(page)
        const educationPage = new EducationPage(page)

        await homePage.goToHomePage()
        await educationPage.goToEducationPage()
        await educationPage.verifyAllEducationPageElements()
    })

    test('Verify Education Page UI via direct URL', async ({ page }) => {
        const educationPage = new EducationPage(page)

        await educationPage.goToEducationPageDirect()
        await educationPage.verifyAllEducationPageElements()
    })

    test('Verify Education Page API links', async ({ page }) => {
        const educationPage = new EducationPage(page)

        await educationPage.goToEducationPageDirect()
        await educationPage.verifyAllEducationApiChecks()
    })
})
