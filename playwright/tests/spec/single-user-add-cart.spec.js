import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home/HomePage.js';
import { SingleUserCartPage } from '../../pages/checkout/SingleusercartPage.js';

test.describe('Add to Cart Tests', () => {

    test('Verify first product adds to cart & cart count increases', async ({ page }) => {
        const cart = new AddCartPage(page);

        // Step 1: Go to website & open New Arrivals
        await cart.visit();

        // Step 3: Add first product
        const beforeQty = Number(await cart.getCartQuantity() || 0);
        await cart.addFirstItemToCart();

        // Step 4: Verify cart quantity increased
        await page.waitForTimeout(2000); // Odoo delay
        const afterQty = Number(await cart.getCartQuantity());

        expect(afterQty).toBeGreaterThan(beforeQty);
        await cart.openCart();

    });

    test("verify multiple products adds to cart & cart count increases", async ({ page }) => {
        const cart = new SingleUserCartPage(page);
        await cart.visit();
        await cart.addMultipleProductsToCart(3);
        await cart.openCart();
    });
});