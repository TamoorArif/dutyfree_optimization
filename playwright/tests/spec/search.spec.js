import { test, expect } from '@playwright/test';
import { SearchPage } from '../../pages/home/SearchPage.js';
import { HomePage } from '../../pages/home/HomePage.js';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.visit();

    await expect(homePage.ageModal).toBeVisible();
    await homePage.ageConfirmButton.click();

    await expect(homePage.ageModal).not.toBeVisible();
});

test.describe('Search Dropdown Tests', () => {

    test('Verify complete search dropdown functionality', async ({ page }) => {
        const searchPage = new SearchPage(page);
        await searchPage.visit();

        await searchPage.typeSearch('vel');
        const count = await searchPage.resultCount();

        expect(count).toBeGreaterThan(0);   // Should show suggestions
        await searchPage.itemClick()
    });

    //     test('Verify no result case', async ({ page }) => {
    //       const searchPage = new SearchPage(page);
    //       await searchPage.visit();

    //       await searchPage.typeSearch('xyzabc123');
    //       const count= await searchPage.resultCount();

    //       expect(count).toBe(0);    // No suggestions
    //   });

    // test('Close dropdown - ESC + outside click', async ({ page }) => {
    //   const searchPage = new SearchPage(page);

    //   await searchPage.visit();
    //   await searchPage.typeSearch('vel');

    //   // ESC close
    //   await searchPage.closeDropdownByESC();
    //   await expect(searchPage.dropdown).not.toBeVisible();

    //   // Again open
    //   await searchPage.typeSearch('vel');

    //   // Outside click close
    //   await searchPage.clickOutside();
    //   await expect(searchPage.dropdown).not.toBeVisible();
    // });

});
