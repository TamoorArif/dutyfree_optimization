import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/auth/LoginPage';

test('User can open login page', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.visit();
  await expect(page).toHaveURL(/practice-test-login/);
  await expect(loginPage.username).toBeVisible();
  await expect(loginPage.password).toBeVisible();
  await expect(loginPage.submitButton).toBeVisible();
});

test('User can login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.visit();
  await loginPage.login('student', 'Password123');
  await expect(page).toHaveURL(/logged-in-successfully/);
});
