import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home/HomePage.js';
import { SingleUserSignupPage } from '../../pages/auth/SingleUserSignupPage.js';
import  generateRandomEmail from '../../utils/helpers/random-email-generator.js';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.visit();

    await expect(homePage.ageModal).toBeVisible();
    await homePage.ageConfirmButton.click();

    await expect(homePage.ageModal).not.toBeVisible();
});

test.describe('Signup Tests', () => {
    test('Positive: Single User Sign Up', async ({ page }) => {
        const signupPage = new SingleUserSignupPage(page);

        // Generate random email and store name
        const singleUserEmail = generateRandomEmail();
        const singleUserName = "Tamoor";
        const password = 'Test@123';
        const confirmPassword = 'Test@123';

        await signupPage.showSignupPopup();
        await signupPage.signup(singleUserEmail, singleUserName, password, confirmPassword);

        //   const verifiedEmail = await signupPage.getEmailVerified();
        //   expect(verifiedEmail.trim()).toContain(singleUserEmail);
    });

    test('Negative: Duplicate Email Sign Up', async ({ page }) => {
        const signupPage = new SingleUserSignupPage(page);
        const email = 'Test@yopmail.com'; // Existing user email

        await signupPage.showSignupPopup();
        await signupPage.signup(email, 'Tamoor', 'Test@123', 'Test@123');

        // Capture error message for duplicate email
        const errorText = await signupPage.getErrorMessage();
        expect(errorText.trim()).toContain(
            'Another user is already registered using this email address.'
        );
    });
});