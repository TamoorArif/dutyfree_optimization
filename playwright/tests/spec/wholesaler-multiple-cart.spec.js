import { test, expect } from '@playwright/test';
import { WholesalerMultipleCartPage } from '../../pages/checkout/WholesalerMultipleCartPage.js';
import { HomePage } from '../../pages/home/HomePage.js';

test.describe('Wholesaler Multiple Items Tests', () => {
    test.beforeEach(async ({ page, context }) => {
        // Clear browser cache, cookies, and permissions first
        await context.clearCookies();
        await context.clearPermissions();
        
        // Navigate to base URL first to enable storage access
        await page.goto('https://stage-dutyfree.odoo.com/', { waitUntil: 'domcontentloaded' });
        
        // Clear storage after navigation
        await page.evaluate(() => {
            localStorage.clear();
            sessionStorage.clear();
        });

        // Handle age modal
        const homePage = new HomePage(page);
        await expect(homePage.ageModal).toBeVisible();
        await homePage.ageConfirmButton.click();
        await expect(homePage.ageModal).not.toBeVisible();
    });

    test('Verify wholeseller can add multiple products with multiple items to cart & complete checkout', async ({ page }) => {
        const wholesellersPage = new WholesalerMultipleCartPage(page);
        await wholesellersPage.visit();
        
        // Add 3 products with 3 items each (default)
        const addedProducts = await wholesellersPage.addMultipleItemsToCart();
        await page.waitForLoadState('networkidle');
        expect(addedProducts).toBeGreaterThan(0);
        
        await wholesellersPage.checkout();
    });

    test('Verify wholeseller can add 3 products with 2 items each to cart & complete checkout', async ({ page }) => {
        const wholesellersPage = new WholesalerMultipleCartPage(page);
        await wholesellersPage.visit();
        
        // Add 3 products with 2 items each
        const addedProducts = await wholesellersPage.addMultipleItemsToCart(3, 2);
        expect(addedProducts).toBeGreaterThan(0);
        
        await wholesellersPage.checkout();
    });
});
