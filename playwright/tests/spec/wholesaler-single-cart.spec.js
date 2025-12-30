import { test, expect } from '@playwright/test';
import { WholesalerSingleCartPage } from '../../pages/checkout/WholesalerSingleCartPage.js';
import { HomePage } from '../../pages/home/HomePage.js';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.visit();

    await expect(homePage.ageModal).toBeVisible();
    await homePage.ageConfirmButton.click();

    await expect(homePage.ageModal).not.toBeVisible();
});

test.describe('Whole Seller Pages Tests', () => {
    test('Verify wholeseller can add first in-stock product to cart & complete checkout', async ({ page }) => {
        const wholesalersPage = new WholesalerSingleCartPage(page);
        await wholesalersPage.visit();
        await wholesalersPage.addFirstItemToCart();
        await wholesalersPage.checkout();
    });
});