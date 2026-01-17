import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home/HomePage.js';
import { SingleUserCartPage } from '../../pages/checkout/SingleusercartPage.js';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.visit();

    await expect(homePage.ageModal).toBeVisible();
    await homePage.ageConfirmButton.click();

    await expect(homePage.ageModal).not.toBeVisible();
});

test.describe('Add to Cart Tests', () => {
    test('Verify first product adds to cart & cart count increases', async ({ page }) => {
        const cart = new SingleUserCartPage(page);

        // Step 1: Go to website & open New Arrivals
        await cart.visit();

        // Step 3: Add first product
        const beforeQty = Number(await cart.getCartQuantity() || 0);
        await cart.addFirstItemToCart();

        // Step 4: Verify cart quantity increased - wait for cart quantity element to become visible and update
        await expect(cart.cartQuantity).toBeVisible({ timeout: 10000 });
        // Wait for cart quantity text to update (not empty and greater than beforeQty)
        await expect(async () => {
            const qty = Number(await cart.getCartQuantity());
            expect(qty).toBeGreaterThan(beforeQty);
        }).toPass({ timeout: 10000 });
        const afterQty = Number(await cart.getCartQuantity());

        expect(afterQty).toBeGreaterThan(beforeQty);
        await cart.openCart();

    });

    // test("verify multiple products adds to cart & cart count increases", async ({ page }) => {
    //     const cart = new SingleUserCartPage(page);
    //     await cart.visit();
    //     await cart.addMultipleProductsToCart(3);
    //     await cart.openCart();
    // });
});