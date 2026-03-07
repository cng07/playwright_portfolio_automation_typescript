import { test } from '@playwright/test'
import { HomePage } from '../page-objects/homePage'
import { CertificationsPage } from '../page-objects/certificationsPage'

test.describe('Certifications page @runSolo', () => {
    test('Verify Certifications Page via navigation menu', async ({ page }) => {
        const homePage = new HomePage(page)
        const certificationsPage = new CertificationsPage(page)

        await homePage.goToHomePage()
        await certificationsPage.goToCertificationsPageFromHomeNavigation()
        // await certificationsPage.verifyAllCertificationsPageElements()
        await certificationsPage.verifyCertificationsPageHeader()
        await certificationsPage.verifyCTFLCertification()
        await certificationsPage.verifyDevOpsCertification()
        await certificationsPage.verifyAccentureAgileCertification()
        await certificationsPage.verifyAutomationAnywhereCertification()
        await certificationsPage.verifyCertificationLinks()
    })

    test('Verify Certifications Page via direct URL', async ({ page }) => {
        const certificationsPage = new CertificationsPage(page)

        await certificationsPage.goToCertificationsPage()
        // await certificationsPage.verifyAllCertificationsPageElements()
        await certificationsPage.verifyCertificationsPageHeader()
        await certificationsPage.verifyCTFLCertification()
        await certificationsPage.verifyDevOpsCertification()
        await certificationsPage.verifyAccentureAgileCertification()
        await certificationsPage.verifyAutomationAnywhereCertification()
        await certificationsPage.verifyCertificationLinks()
    })
})
