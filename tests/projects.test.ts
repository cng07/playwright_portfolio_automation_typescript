import { test } from '@playwright/test'
import { HomePage } from '../page-objects/homePage'
import { ProjectsPage } from '../page-objects/projectsPage'

test.describe('Projects page', () => {
    test('Verify Projects Page via navigation', async ({ page }) => {
        const homePage = new HomePage(page)
        const projectsPage = new ProjectsPage(page)

        await homePage.goToHomePage()
        await projectsPage.goToProjectsPage()
        await projectsPage.verifyAccessibilityElements()
        await projectsPage.verifyProjectsPageHeader()
        await projectsPage.verifyProject1()
        await projectsPage.verifyProject2()
        await projectsPage.verifyProject3()
        await projectsPage.verifyProject4()
        await projectsPage.verifyRepositoryLinks()
        await projectsPage.verifyMoreProjectsComingSection()
        await projectsPage.verifyFooterSection()
    })

    test('Verify Projects Page UI via direct URL', async ({ page }) => {
        const projectsPage = new ProjectsPage(page)

        await projectsPage.goToProjectsPageDirect()
        await projectsPage.verifyAllProjectsPageElements()
    })

    test('Verify Projects Page API links', async ({ page }) => {
        const projectsPage = new ProjectsPage(page)

        await projectsPage.goToProjectsPageDirect()
        await projectsPage.verifyRepositoryLinks()
        await projectsPage.verifyAllProjectsApiChecks()
    })
})
