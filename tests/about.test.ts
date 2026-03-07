import { test } from '@playwright/test'
import { HomePage } from '../page-objects/homePage'
import { AboutPage } from '../page-objects/aboutPage'

test.describe('About page', () => {
    test('Verify About Page UI via navigation', async ({ page }) => {
        const homePage = new HomePage(page)
        const aboutPage = new AboutPage(page)

        await homePage.goToHomePage()
        await aboutPage.goToAboutPage()
        await aboutPage.verifyAllAboutPageElements()
    })

    test('Verify About Page UI via direct URL', async ({ page }) => {
        const aboutPage = new AboutPage(page)

        await aboutPage.goToAboutPageDirect()
        await aboutPage.verifyAllAboutPageElements()
    })

    test('Verify About Page API links', async ({ page }) => {
        const aboutPage = new AboutPage(page)

        await aboutPage.goToAboutPageDirect()
        await aboutPage.verifyInternalLinksApiResponses()
    })
})
