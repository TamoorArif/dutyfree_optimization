import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home/HomePage.js';
import { LoginPage } from '../../pages/auth/LoginPage.js';
import { ProfilePage } from '../../pages/profile/ProfilePage.js';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.visit();

    await expect(homePage.ageModal).toBeVisible();
    await homePage.ageConfirmButton.click();
    await expect(homePage.ageModal).not.toBeVisible();

    const loginPage = new LoginPage(page);
    await loginPage.showLoginPopup();
    await loginPage.login('support@dutyfreesmoke.com', '1589');
});

test.describe('Profile Tests', () => {
    test('Positive: Edit Profile - Fill Fields', async ({ page }) => {
        const profilePage = new ProfilePage(page);

        // Navigate to profile page
        await profilePage.gotoProfilePage();

        // Open edit profile
        await profilePage.openEditProfile();

        // Fill profile fields with values
        await profilePage.fillProfileFields({
            // name: 'Test User',
            email: 'test@example.com',
            phone: '03429465221',
            street: '123 Test Street',
            city: 'Test City',
            state: 'Test State',
            zip: '12345',
            invoiceMethod: 'email', // Options: 'email' or 'snailmail'
            electronicFormat: 'facturx', // Options: 'facturx', 'ubl_bis3', 'xrechnung', etc.
            upsNumber: '1234567890', // UPS Number Account
        });

        // Click save button
        await profilePage.clickSaveBtn();

        // Expect page to be on profile page after save
        await expect(page).toHaveURL('https://stage-dutyfree.odoo.com/my/home', { timeout: 10000 });

        // Wait to see any error messages (keep page open)
        await page.waitForTimeout(5000);
    });
});
