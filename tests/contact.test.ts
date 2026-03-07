import { test } from '@playwright/test'
import { HomePage } from '../page-objects/homePage'
import { ContactPage } from '../page-objects/contactPage'

test.describe('Contact page', () => {
    test('Verify Contact Page UI via navigation', async ({ page }) => {
        const homePage = new HomePage(page)
        const contactPage = new ContactPage(page)

        await homePage.goToHomePage()
        await contactPage.goToContactPage()
        await contactPage.verifyAllContactPageElements()
    })

    test('Verify Contact Page UI via direct URL', async ({ page }) => {
        const contactPage = new ContactPage(page)

        await contactPage.goToContactPageDirect()
        await contactPage.verifyAllContactPageElements()
    })

    test('Verify Contact Page API links', async ({ page }) => {
        const contactPage = new ContactPage(page)

        await contactPage.goToContactPageDirect()
        await contactPage.verifyAllContactApiChecks()
    })
})
