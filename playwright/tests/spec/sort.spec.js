import { test, expect } from '@playwright/test';
import { SortPage } from '../../pages/home/SortPage.js';
import { HomePage } from '../../pages/home/HomePage.js';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.visit();

    await expect(homePage.ageModal).toBeVisible();
    await homePage.ageConfirmButton.click();

    await expect(homePage.ageModal).not.toBeVisible();
});

test.describe('Sort By Dropdown Tests', () => {
    test('Verify dropdown opens & all options are visible', async ({ page }) => {
        const sp = new SortPage(page);

        await sp.visit();
        await sp.openSort();
        await sp.dropdownDelay

        await expect(sp.getOption("Featured")).toBeVisible();
        await expect(sp.getOption("Newest Arrivals")).toBeVisible();
        await expect(sp.getOption("Name (A-Z)")).toBeVisible();
        await expect(sp.getOption("Price - Low to High")).toBeVisible();
        await expect(sp.getOption("Price - High to Low")).toBeVisible();
    });

    test('Verify clicking Price Low to High', async ({ page }) => {
        const sp = new SortPage(page);

        await sp.visit();
        await sp.openSort();

        await sp.getOption("Price - Low to High").click();

        // URL should include correct query
        await expect(page).toHaveURL(/order=list_price\+asc/); //order=list_price+asc
    });

    test('Verify clicking Name (A-Z)', async ({ page }) => {
        const sp = new SortPage(page);

        await sp.visit();
        await sp.openSort();

        await sp.getOption("Name (A-Z)").click();

        // order=name+asc
        // await expect(page).toHaveURL(/order=name\+asc.*category=9/);
    });
});