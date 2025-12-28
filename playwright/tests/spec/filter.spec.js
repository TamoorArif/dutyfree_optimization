import { test, expect } from '@playwright/test';
import { FilterPage } from '../../pages/home/FilterPage.js';
import { HomePage } from '../../pages/home/HomePage.js';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.visit();
  
    await expect(homePage.ageModal).toBeVisible();
    await homePage.ageConfirmButton.click();
  
    await expect(homePage.ageModal).not.toBeVisible();
  });

test.describe('Filter Tests', () => {
    // test('Open filter panel', async ({ page }) => {
    //     const filter = new FilterPage(page);
    //     await filter.visit();
    //     await filter.openFilter();
    //     await expect(filter.FlavoursLabel).toBeVisible();
    // });

    // test('Select Flavour and apply filter', async ({ page }) => {
    //     const filter = new FilterPage(page);
    //     await filter.visit();
    //     await filter.openFilter();
    //     await filter.selectFlavour();
    //     await filter.applyFilter();
    //     await expect(page).toHaveURL(/category=9.*attribute_group_value=10-1/);

    // });

    // test('Select Nicotine Strength and apply filter', async ({ page }) => {
    //     const filter = new FilterPage(page);
    //     await filter.visit();
    //     await filter.openFilter();
    //     await filter.selectNicotine();
    //     await filter.applyFilter();
    //     await expect(page).toHaveURL(/category=9.*(attribute_group_value|attribute_value)=13-517/);
    //     ;
    // });

    // test('Select Nicotine Strength 2 and apply filter', async ({ page }) => {
    //     const filter = new FilterPage(page);
    //     await filter.visit();
    //     await filter.openFilter();
    //     await filter.selectNicotine2();
    //     await filter.applyFilter();
    //     await expect(page).toHaveURL(/category=9.*(attribute_group_value|attribute_value)=14-15/)
    // });

    // test('Select Puff Count and apply filter', async ({ page }) => {
    //     const filter = new FilterPage(page);
    //     await filter.visit();
    //     await filter.openFilter();
    //     await filter.selectPuffCount();
    //     await filter.applyFilter();
    //     // Puff Count
    //     await expect(page).toHaveURL(/category=9.*(attribute_group_value|attribute_value|filters)=1-1/);

    // });

    // test('Reset filter', async ({ page }) => {
    //     const filter = new FilterPage(page);
    //     await filter.visit();
    //     await filter.openFilter();
    //     await filter.resetFilter();
    //     await expect(page).toHaveURL(/category=9/); // Reset ke baad sirf category param check
    // });

    test('Apply multiple filters sequentially (Flavour, Nicotine Strength, Second Strength, Puff Count)', async ({ page }) => {
        const filter = new FilterPage(page);
        await filter.visit();
        
        // Open filter panel
        await filter.openFilter();
        
        // Step 1: Apply flavour filter
        await filter.selectFlavour();
        
        // Step 2: Apply nicotine strength filter
        await filter.selectNicotine();
        
        // Step 3: Apply second strength filter
        await filter.selectNicotine2();
        
        // Step 4: Apply puff count filter
        await filter.selectPuffCount();
        
        // Step 5: Submit/Apply all filters
        await filter.applyFilter();
        
        // Verify URL contains all applied filter parameters
        const url = page.url();
        expect(url).toMatch(/category=9/);
        expect(url).toMatch(/(attribute_group_value|attribute_value)=10-1/); // Flavour
        expect(url).toMatch(/(attribute_group_value|attribute_value)=13-517/); // Nicotine Strength
        expect(url).toMatch(/(attribute_group_value|attribute_value)=14-15/); // Second Strength
        expect(url).toMatch(/(attribute_group_value|attribute_value|filters)=1-1/); // Puff Count
    });
});
