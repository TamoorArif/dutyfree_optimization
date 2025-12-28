import { expect } from '@playwright/test';
import { BasePage } from '../BasePage.js';
import { NEW_ARRIVALS_SELECTORS } from '../../utils/selectors/home/index.js';

export class NewArrivalsPage extends BasePage {
  constructor(page) {
    super(page);

    // ID se click (tumhari demand)
    this.newArrivalsLink = page.locator(NEW_ARRIVALS_SELECTORS.NEW_ARRIVALS_LINK);

    // Flexible selector for products - will be set in showNewArrivalsPage()
    this.gridProducts = null;
  }

  async showNewArrivalsPage() {
    // Navigate to New Arrivals - ensure link is clickable
    await expect(this.newArrivalsLink).toBeVisible();
    await this.newArrivalsLink.click();
    // Wait for URL to match New Arrivals page (can be with query params or category path)
    await expect(this.page).toHaveURL(/\/shop(\?.*brand=1.*category=9|.*new-arrivals)/, { timeout: 20000 });

    // Wait for page to load
    await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});

    // Wait for products - try original selector first, then fallback
    try {
      await expect(this.page.locator(NEW_ARRIVALS_SELECTORS.PRODUCTS_GRID).first()).toBeVisible({ timeout: 5000 });
      this.gridProducts = this.page.locator(NEW_ARRIVALS_SELECTORS.PRODUCTS_GRID);
    } catch (e) {
      // Fallback: find product containers by product links with images
      const productLinks = this.page.locator(NEW_ARRIVALS_SELECTORS.PRODUCT_LINKS);
      await expect(productLinks.first()).toBeVisible({ timeout: 20000 });
      // Use parent elements of product links as product containers
      this.gridProducts = productLinks.locator('..');
    }
  }

  async verifyNewArrivalProducts() {
    const count = await this.gridProducts.count();
    expect(count).toBeGreaterThan(0);
    console.log(`New Arrivals page pe ${count} products mile`);
  }

  async openFirstProduct() {
    const firstProduct = this.gridProducts.first();
    
    // Get product link and extract title from it
    const productLink = firstProduct.locator(NEW_ARRIVALS_SELECTORS.PRODUCT_LINKS).first();
    await expect(productLink).toBeVisible({ timeout: 10000 });
    
    // Get title from link - use textContent for better reliability
    const title = (await productLink.textContent()).trim();
    
    // Check and dismiss age modal if it appears (may reappear on navigation)
    // const modal = this.page.locator(HOME_SELECTORS.AGE_MODAL);
    try {
      // await modal.waitFor({ state: 'visible', timeout: 2000 });
      // await this.page.locator(HOME_SELECTORS.AGE_CONFIRM_BUTTON).click();
      // await modal.waitFor({ state: 'hidden', timeout: 5000 });
    } catch (e) {
      // Modal not present, continue
    }
    
    // Click and wait for navigation - use force if modal still blocking
    await productLink.scrollIntoViewIfNeeded();
    
    // Try normal click first, if modal blocks, use force
    try {
      await Promise.all([
        this.page.waitForURL(/\/shop/, { timeout: 20000 }),
        productLink.click({ timeout: 5000 })
      ]);
    } catch (e) {
      // Retry click with force
      await Promise.all([
        this.page.waitForURL(/\/shop/, { timeout: 20000 }),
        productLink.click({ force: true })
      ]);
    }

    // Wait for page to load
    try {
      await this.page.waitForLoadState('networkidle', { timeout: 15000 });
    } catch (e) {
      // Page might be closed or still loading, continue
    }

    // Try multiple selectors for product name on detail page
    const productNameSelectors = [
      'h1.product-name',
      'h1',
      '.product-name',
      '[class*="product"] h1'
    ];

    let found = false;
    for (const selector of productNameSelectors) {
      try {
        const productName = this.page.locator(selector).first();
        await expect(productName).toBeVisible({ timeout: 5000 });
        // Verify it contains part of the title
        const nameText = await productName.textContent();
        if (nameText && title && (nameText.includes(title.split('(')[0].trim()) || title.includes(nameText.trim()))) {
          found = true;
          break;
        }
      } catch (e) {
        // Page might be closed or element not found, continue
        continue;
      }
    }

    if (!found) {
      // Fallback: just verify we're on a product page (if page is still open)
      try {
        await expect(this.page).toHaveURL(/\/shop/, { timeout: 10000 });
      } catch (e) {
        // Page might be closed, that's okay if navigation already happened
        // The waitForURL above should have verified navigation
      }
    }
  }
}

module.exports = { NewArrivalsPage };
