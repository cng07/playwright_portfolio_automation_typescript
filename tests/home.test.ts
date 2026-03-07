import { test } from '@playwright/test'
import { HomePage } from '../page-objects/homePage'

test.describe('Home page @runSolo', () => {
    test('Verify Home Page', async ({ page }) => {
        const _page = new HomePage(page)

        await _page.goToHomePage()

        await _page.verifyAccessibilityElements()
        await _page.verifyNavigationBarSection()
        await _page.verifyHeroSection()
        await _page.verifySocialMediaSection()
        await _page.verifyFeaturedProjectsSection()
        await _page.verifySkillsSection()
        await _page.verifyCertificationsSection()
        await _page.verifyPublicationSection()
        await _page.verifyExperienceSection()
        await _page.verifyFooterSection()
    })
})