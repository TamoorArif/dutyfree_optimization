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
        await profilePage.gotoProfilePage(); // Navigate to profile page
        await profilePage.openEditProfile(); // Open edit profile

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

        await profilePage.clickSaveBtn(); // Click save button

        await expect(page).toHaveURL('https://stage-dutyfree.odoo.com/my/home', { timeout: 10000 });
    });

    test('Negative: Edit Profile - Name Change Not Allowed', async ({ page }) => {
        const profilePage = new ProfilePage(page);
        await profilePage.gotoProfilePage(); // Navigate to profile page
        await profilePage.openEditProfile();  // Open edit profile

        await profilePage.fillProfileFields({
            name: 'Updated Test Name',
        }, 50);

        await profilePage.clickSaveBtn(); // Click save button  

        const errorVisible = await profilePage.isErrorMessageVisible(); // Wait for error message to appear
        expect(errorVisible).toBeTruthy();

        const errorText = await profilePage.getErrorMessage(); // Verify error message contains the expected text
        expect(errorText).toContain('Changing your name is not allowed');
    });
});
