import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home/HomePage.js';
import { ResetPasswordPage } from '../../pages/auth/ResetPasswordPage.js';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.visit();

    await expect(homePage.ageModal).toBeVisible();
    await homePage.ageConfirmButton.click();

    await expect(homePage.ageModal).not.toBeVisible();
});

test('Positive: Reset password with valid email', async ({ page }) => {
    const reset = new ResetPasswordPage(page);

    await reset.showResetPasswordPopup(); // Go to page + open Forgot Password popup
    await reset.resetEmail('Test@yopmail.com'); // Enter email & submit
    await reset.verifySuccess(); // Verify success message
});