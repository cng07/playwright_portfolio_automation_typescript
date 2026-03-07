import { test } from '@playwright/test'
import { HomePage } from '../page-objects/homePage'
import { ExperiencePage } from '../page-objects/experiencePage'

test.describe('Experience page', () => {
    test('Verify Experience Page UI via navigation', async ({ page }) => {
        const homePage = new HomePage(page)
        const experiencePage = new ExperiencePage(page)

        await homePage.goToHomePage()
        await experiencePage.goToExperiencePage()
        await experiencePage.verifyAllExperiencePageElements()
    })

    test('Verify Experience Page UI via direct URL', async ({ page }) => {
        const experiencePage = new ExperiencePage(page)

        await experiencePage.goToExperiencePageDirect()
        await experiencePage.verifyAllExperiencePageElements()
    })

    test('Verify Experience Page API links', async ({ page }) => {
        const experiencePage = new ExperiencePage(page)

        await experiencePage.goToExperiencePageDirect()
        await experiencePage.verifyAllExperienceApiChecks()
    })
})
