import { test, expect } from '@playwright/test'
import { Helper } from '../page-objects/helper'
import { HomePage } from '../page-objects/homePage'
import { ResumePage } from '../page-objects/resumePage';

test.describe('Home page', () => {
    test('Verify Home Page', async ({ page }) => {

        const h = new Helper(page)
        const _page = new HomePage(page)

        await _page.goToHomePage()

        await _page.verifyNavigationBarSection()
        await _page.verifyHeroSection()
        await _page.verifySocialMediaSection()
        await _page.verifySkillsSection()
        await _page.verifyExperienceSection()
    });

    test('Verify Resume Page', async ({ page }) => {

        const h = new Helper(page)
        const _page = new HomePage(page)
        const _pageResume = new ResumePage(page)

        await _page.goToHomePage()
        await _pageResume.goToResumePage()
        await _pageResume.verifyDownloadPdfButton()
        await _pageResume.downloadPdfAndVerify()
    });
});