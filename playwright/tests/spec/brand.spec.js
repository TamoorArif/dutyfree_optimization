import { test, expect } from '@playwright/test';
import { BrandPage } from '../../pages/home/BrandPage.js';
import { HomePage } from '../../pages/home/HomePage.js';

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.visit();

  // Handle age confirmation
  await expect(homePage.ageModal).toBeVisible();
  await homePage.ageConfirmButton.click();
  await expect(homePage.ageModal).not.toBeVisible();
});

test.describe('Brand Page Tests', () => {

  test('Positive: Verify brand page navigation and products display', async ({ page }) => {
    const brandPage = new BrandPage(page);

    // Navigate to brand page (using first available brand)
    await brandPage.showBrandPage();

    // Verify products are displayed on brand page
    await brandPage.verifyBrandProducts();

    // Verify URL contains /brand/
    await expect(page).toHaveURL(/\/brand\//, { timeout: 10000 });
  });

  test('Negative: Verify brand page handles invalid brand name', async ({ page }) => {
    const brandPage = new BrandPage(page);

    // Try to navigate to a non-existent brand
    const invalidBrandName = 'InvalidBrandName12345';

    // Click on Brand dropdown toggle
    await expect(brandPage.brandLink).toBeVisible();
    await brandPage.brandLink.click();

    // Wait for dropdown to appear
    await page.waitForTimeout(500);

    // Try to find the invalid brand item
    const brandItem = brandPage.brandNameItems.filter({ hasText: invalidBrandName });
    
    // Verify that the invalid brand item is not visible (doesn't exist)
    const isVisible = await brandItem.isVisible({ timeout: 2000 }).catch(() => false);
    expect(isVisible).toBeFalsy();

    // Verify dropdown still has valid brand items
    const brandItemsCount = await brandPage.brandNameItems.count();
    expect(brandItemsCount).toBeGreaterThan(0);
  });
});


