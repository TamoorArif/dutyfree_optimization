import { test, expect } from '@playwright/test';
import { BannersPage } from '../../pages/home/BannersPage.js';
import { HomePage } from '../../pages/home/HomePage.js';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.visit();

    await expect(homePage.ageModal).toBeVisible();
    await homePage.ageConfirmButton.click();

    await expect(homePage.ageModal).not.toBeVisible();
});



test.describe('Homepage Banner Tests', () => {

    test('Verify banner count, navigation, indicators, and click actions', async ({ page }) => {
      const bannerPage = new BannersPage(page);
  
      // Open homepage
      await bannerPage.bannerReady();
  
      // Validate total slides > 0
      const totalSlides = await bannerPage.slides.count();
      await expect(totalSlides).toBeGreaterThan(0);
  
      // --- 1) Indicator Click ---
      await bannerPage.indicators.nth(1).click();
      await bannerPage.verifySlideActive(1);
  
      // --- 2) Next Arrow ---
      await bannerPage.clickNext();
      await bannerPage.verifySlideActive(2);
  
      // --- 3) Previous Arrow ---
      await bannerPage.clickPrev();
      await bannerPage.verifySlideActive(1);
  
      // --- 4) Banner Click Redirect ---
      await bannerPage.clickBanner(0);
  
      // Redirect must happen (URL changes)
      await expect(page).not.toHaveURL('https://stage-dutyfree.odoo.com/');
    });
  
  });

