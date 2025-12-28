import { BasePage } from '../BasePage.js';
import { FILTER_SELECTORS } from '../../utils/selectors/home/index.js';

export class FilterPage extends BasePage {
    constructor(page) {
        super(page);
        this.newArrivalsLink = page.locator(FILTER_SELECTORS.NEW_ARRIVALS_LINK);
        this.filter = page.locator(FILTER_SELECTORS.FILTER);
        this.FlavoursLabel = page.locator(FILTER_SELECTORS.FLAVOURS_LABEL);
        this.NicotinStrengthLabel = page.locator(FILTER_SELECTORS.NICOTIN_STRENGTH_LABEL);
        this.NicotinStrength2Label = page.locator(FILTER_SELECTORS.NICOTIN_STRENGTH2_LABEL);
        this.PuffCountLabel = page.locator(FILTER_SELECTORS.PUFF_COUNT_LABEL);
        this.filterapply = page.locator(FILTER_SELECTORS.FILTER_APPLY);
        this.filterreset = page.locator(FILTER_SELECTORS.FILTER_RESET);
    }

    async openFilter() {
        await this.newArrivalsLink.click();
        await this.page.waitForTimeout(1000);
        await this.filter.waitFor({ state: 'visible', timeout: 10000 });
        await this.filter.scrollIntoViewIfNeeded();
        await this.filter.click({ force: true, timeout: 10000 });
        // Wait for filter panel to open and be ready
        await this.page.waitForTimeout(500);
    }

    async selectFlavour() {
        // Try input first, then fallback to label
        const inputLocator = this.page.locator('input[id="10-1"]');
        const labelLocator = this.page.locator('label[for="10-1"], label[for="attrgroup_10_1"]');
        
        try {
            await inputLocator.waitFor({ state: 'visible', timeout: 10000 });
            await inputLocator.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(300);
            await inputLocator.click({ force: true });
        } catch (e) {
            // Fallback to label if input not found
            await labelLocator.waitFor({ state: 'visible', timeout: 10000 });
            await labelLocator.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(300);
            await labelLocator.click({ force: true });
        }
    }

    async selectNicotine() {
        await this.NicotinStrengthLabel.waitFor({state:'attached',timeout:10000})
        await this.NicotinStrengthLabel.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(300);
        await this.NicotinStrengthLabel.click({ force: true });
    }

    async selectNicotine2() {
        await this.NicotinStrength2Label.waitFor({ state: 'attached', timeout: 10000 })
        await this.NicotinStrength2Label.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(300);
        await this.NicotinStrength2Label.click({ force: true });
    }

    async selectPuffCount() {
        await this.PuffCountLabel.waitFor({ state: 'attached', timeout: 10000 })
        await this.PuffCountLabel.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(300);
        await this.PuffCountLabel.click({ force: true });
    }

    async applyFilter() {
        await this.filterapply.waitFor({ state: 'visible', timeout: 10000 });
        await this.filterapply.click();
        await this.page.waitForLoadState('networkidle');
    }

    async resetFilter() {
        await this.filterreset.waitFor({ state: 'attached', timeout: 10000 });
        await this.filterreset.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(300);
        await this.filterreset.click({ force: true });
        await this.page.waitForLoadState('networkidle');
    }

    async filterProducts({ flavour = false, nicotine = false, nicotine2 = false, puff = false }) {
        await this.openFilter();
        if (flavour) await this.selectFlavour();
        if (nicotine) await this.selectNicotine();
        if (nicotine2) await this.selectNicotine2();
        if (puff) await this.selectPuffCount();
        await this.applyFilter();
    }
}