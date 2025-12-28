import { test, expect } from '@playwright/test';
import { NewArrivalsPage } from '../../pages/home/NewArrivalPage.js';
import { HomePage } from '../../pages/home/HomePage.js';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.visit();

    await expect(homePage.ageModal).toBeVisible();
    await homePage.ageConfirmButton.click();

    await expect(homePage.ageModal).not.toBeVisible();
});

test.describe('New Arrivals Tests', () => {
    test('Verify New Arrivals link opens and products are visible', async ({ page }) => {
        const newArrivals = new NewArrivalsPage(page);

        await newArrivals.showNewArrivalsPage(); // Navigate + handle modal + load products
        await newArrivals.verifyNewArrivalProducts(); // Assert product count > 0
    });

    test('Verify first product opens with correct details', async ({ page }) => {
        const newArrivals = new NewArrivalsPage(page);

        await newArrivals.showNewArrivalsPage();
        await newArrivals.openFirstProduct(); // Match title after click
    });
});
