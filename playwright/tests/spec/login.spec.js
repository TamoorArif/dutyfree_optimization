import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/auth/LoginPage.js';
import { HomePage } from '../../pages/home/HomePage.js';

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.visit();

  await expect(homePage.ageModal).toBeVisible();
  await homePage.ageConfirmButton.click();

  await expect(homePage.ageModal).not.toBeVisible();
});

test('should login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.showLoginPopup();
  await loginPage.login('test@yopmail.com', 'Test@123');
});

test('should show error with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.showLoginPopup();
  await loginPage.login('wrongemail12@yopmail.com', 'wrongPassword');

  await expect(loginPage.errorMessage).toBeVisible();
  
  const errorText = await loginPage.errorMessage.textContent();
  
  if (errorText.includes('Wrong login/password')) {
    expect(errorText).toContain('Wrong login');
  } else if (errorText.includes('Too many login failures, please wait a bit before trying again.')) {
    expect(errorText).toContain('Too many login failures');
  } else {
    throw new Error(`Unexpected error message: ${errorText}`);
  }
});