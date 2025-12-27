import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home/HomePage.js';
import { WholesalerSignupPage } from '../../pages/auth/WholesalerSignupPage.js';
import generateRandomEmail from '../../utils/helpers/random-email-generator.js';
import generateUniqueStoreName from '../../utils/helpers/uniq-store-generator.js';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.visit();

    await expect(homePage.ageModal).toBeVisible();
    await homePage.ageConfirmButton.click();

    await expect(homePage.ageModal).not.toBeVisible();
});

test.describe('Wholesaler Signup Test', () => {
    test('Positive: Wholesaler Signup - Pakistan', async ({ page }) => {
        const signup = new WholesalerSignupPage(page);
        await signup.showSignupPopup();

        await signup.wholesellerSignupPage(
            'Ali',
            'Khan',
            '03001234567',
            generateRandomEmail(),
            'Main Market',
            'Lahore',
            '54000',
            generateUniqueStoreName()
        );

        await expect(page.locator('span.h1.fw-bolder')).toHaveText('Thank You!', { timeout: 15000 });
    })

    test('Nagetive: Wholesaler Signup - Pakistan', async ({ page }) => {
        const signup = new WholesalerSignupPage(page);
        await signup.showSignupPopup();

        await signup.wholesellerSignupPage(
            'Ali',
            'Khan',
            '03001234567',
            'test@yopmail.com',
            'Main Market',
            'Lahore',
            '54000',
            'PK Duty-Free'
        );
        
        await expect(page.getByText('Email should be unique.')).toBeVisible();
    });
});