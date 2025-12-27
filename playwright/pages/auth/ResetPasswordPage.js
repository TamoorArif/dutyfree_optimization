import { BasePage } from '../BasePage.js';
import { HOME_SELECTORS } from '../../utils/selectors/home/index.js';
import { RESET_PASSWORD_SELECTORS } from '../../utils/selectors/auth/index.js';

export class ResetPasswordPage extends BasePage {
    constructor(page) {
        super(page);

        this.loginButton = page.locator(RESET_PASSWORD_SELECTORS.LOGIN_BTN);
        this.forgotLink = page.locator(RESET_PASSWORD_SELECTORS.FORGOT_LINK);
        this.successMessage = page.locator(RESET_PASSWORD_SELECTORS.SUCCESS_MSG);
    }

    async showResetPasswordPopup() {
        await this.loginButton.click();
        await this.forgotLink.click();

        // Wait for Forgot Password modal
        const modal = this.page.locator('.modal-dialog');
        await modal.first().waitFor({ state: 'visible', timeout: 15000 });

        // Shadow piercing + fallback
        this.emailInput = this.page.locator('oe-reset-password >> input#forgotlogin')
            .or(this.page.locator('input#forgotlogin'));

        this.continueBtn = this.page.locator('oe-reset-password >> button:has-text("Continue")')
            .or(this.page.locator('button:has-text("Continue")'));

        await this.emailInput.waitFor({ state: 'visible', timeout: 10000 });
    }

    async resetEmail(useremail) {
        await this.emailInput.fill(useremail);
        await this.continueBtn.click();
    }

    async verifySuccess() {
        await this.page.waitForURL('', { timeout: 10000 });
        await expect(this.page).toHaveURL('');
    }
}