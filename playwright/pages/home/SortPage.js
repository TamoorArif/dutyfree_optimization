import { BasePage } from '../BasePage.js';
import { SORT_SELECTORS } from '../../utils/selectors/home/index.js';

export class SortPage extends BasePage {
    constructor(page) {
        super(page);
        this.newArrivalsLink = page.locator(SORT_SELECTORS.NEW_ARRIVALS_LINK);
        this.sortButton = page.locator(SORT_SELECTORS.SORT_BUTTON);
        this.sortMenu = page.locator(SORT_SELECTORS.SORT_MENU);
        this.featured = page.locator(SORT_SELECTORS.FEATURED);
        this.newest = page.locator(SORT_SELECTORS.NEWEST);
        this.az = page.locator(SORT_SELECTORS.AZ);
        this.lowHigh = page.locator(SORT_SELECTORS.LOW_HIGH);
        this.highLow = page.locator(SORT_SELECTORS.HIGH_LOW);
    }

    async openSort() {
        await this.newArrivalsLink.click();
        await this.sortButton.scrollIntoViewIfNeeded();
        await this.sortButton.click();
        await this.page.waitForTimeout(500);
        // await expect(this.sortmenu).toBeVisible({ timeout: 5000 });
    }

    getOption(optionText) {
        switch (optionText) {
            case "Featured": return this.featured;
            case "Newest Arrivals": return this.newest;
            case "Name (A-Z)": return this.az;
            case "Price - Low to High": return this.lowHigh;
            case "Price - High to Low": return this.highLow;
            default: throw new Error(`Option "${optionText}" not found`);
        }
    }
}