import { expect } from '@playwright/test';
import { BasePage } from '../BasePage.js';          
import { SEARCH_SELECTORS } from '../../utils/selectors/home/index.js';

export class SearchPage extends BasePage {
  constructor(page) {
    super(page);
    this.searchInput = page.locator(SEARCH_SELECTORS.SEARCH_INPUT);
    this.dropdown = page.locator(SEARCH_SELECTORS.DROPDOWN);
    this.resultItems = page.locator(SEARCH_SELECTORS.RESULT_ITEMS);
    this.noResultText = page.locator(SEARCH_SELECTORS.NO_RESULT_TEXT);
    this.itemImage = page.locator(SEARCH_SELECTORS.ITEM_IMAGE);
    this.itemTitle = page.locator(SEARCH_SELECTORS.ITEM_TITLE);
    this.itemCategory = page.locator(SEARCH_SELECTORS.ITEM_CATEGORY);
    this.itemPrice = page.locator(SEARCH_SELECTORS.ITEM_PRICE);
  }

  async openSearch() {
    await expect(this.searchInput).toBeVisible();
  }

  async typeSearch(query) {
    await this.searchInput.click();
    await this.searchInput.pressSequentially(query, { delay: 100 });
    await this.page.waitForTimeout(500);
    await this.dropdown.waitFor({ state: 'visible', timeout: 10000 });
  }

  async resultCount() {
    const count = await this.resultItems.count();
    // For debug
    console.log("Dropdown item count:", count);
    return count;  // return for test validation
  }

  async itemClick() {
    const hrefValue = await this.resultItems.nth(1).getAttribute('href');
    
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'load', timeout: 10000 }).catch(() => {}), 
      this.resultItems.nth(1).click()
    ]);

    // For SPA/hash URLs, wait a short time and verify manually
    await this.page.waitForTimeout(500);
    const currentUrl = this.page.url();
    expect(currentUrl).toContain(hrefValue); // hash URL check
  }

  async getResultCount() {
    return await this.resultItems.count();
  }

  async verifyResultItemStructure(index) {
    const item = this.resultItems.nth(index);
    await expect(item.locator(this.itemImage)).toBeVisible();
    await expect(item.locator(this.itemTitle)).toBeVisible();
    await expect(item.locator(this.itemCategory)).toBeVisible();
    await expect(item.locator(this.itemPrice)).toBeVisible();
  }

  async clickResult(index) {
    await this.resultItems.nth(index).click();
  }

  async closeDropdownByESC() {
    await this.page.keyboard.press('Escape');
  }

  async clickOutside() {
    await this.page.click('body');
  }
}