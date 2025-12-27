import { BasePage } from '../BasePage.js';
import { HOME_SELECTORS } from '../../utils/selectors/home/index.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    // Add locators for the home page
    this.ageModal = page.locator(HOME_SELECTORS.AGE_MODAL);
    this.ageConfirmButton = page.locator(HOME_SELECTORS.AGE_CONFIRM_BUTTON);
  }

  async goto() {
    await this.page.goto('https://stage-dutyfree.odoo.com/', { waitUntil: 'domcontentloaded' });
    
    // Handle age modal - wait for it, click, then wait for it to disappear
    const modal = this.page.locator('#mc_modal');
    try {
      await modal.waitFor({ state: 'visible', timeout: 5000 });
      await this.ageConfirmButton.click();
      // Wait for modal to be hidden before proceeding
      await modal.waitFor({ state: 'hidden', timeout: 5000 });
    } catch (e) {
      console.log('Age modal not present or already dismissed');
    }
  }
}