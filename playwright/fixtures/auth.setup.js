import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/auth/LoginPage';

/**
 * Authentication setup fixture
 * This file authenticates a user and saves the authentication state
 * to be reused in other tests, avoiding repeated login operations.
 */

// Get credentials from environment variables or use defaults
const username = process.env.TEST_USERNAME || 'student';
const password = process.env.TEST_PASSWORD || 'Password123';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Navigate to login page
  await loginPage.visit();

  // Perform login
  await loginPage.login(username, password);

  // Wait for successful login - verify we're redirected to the success page
  await expect(page).toHaveURL(/logged-in-successfully/);

  // Save the authentication state to a file
  // This will be reused in other tests via storageState in playwright.config.js
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});

