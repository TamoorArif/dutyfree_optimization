import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home/HomePage.js';

test('User can visit home page', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.visit();

  await expect(homePage.ageModal).toBeVisible();

  await homePage.ageConfirmButton.click();

  await expect(homePage.ageModal).not.toBeVisible();
});

