import { BasePage } from '../BasePage.js';
import { BANNER_SELECTORS } from '../../utils/selectors/home/index.js';
import { expect } from '@playwright/test';

export class BannersPage extends BasePage {
    constructor(page) {
        super(page);
        this.carousel = page.locator(BANNER_SELECTORS.CAROUSEL);
        this.slides = page.locator(BANNER_SELECTORS.SLIDES);
        this.indicators = page.locator(BANNER_SELECTORS.INDICATORS);
        this.nextArrow = page.locator(BANNER_SELECTORS.NEXT_ARROW);
        this.prevArrow = page.locator(BANNER_SELECTORS.PREV_ARROW);
    }
    
    async bannerReady() {
        await this.carousel.waitFor({ state: 'visible', timeout: 10000 });
    }

  async clickNext() {
    await this.nextArrow.click();
  }

  async clickPrev() {
    await this.prevArrow.click();
  }

  async verifySlideActive(index) {
    const slide = this.slides.nth(index);

    await this.page.waitForFunction(el => el.classList.contains('active'), await slide.elementHandle());

    await expect(slide).toHaveClass(/active/);
  }


  async clickBanner(index) {
    const banner = this.slides.nth(index).locator('a');
    await banner.click();
  }
}
