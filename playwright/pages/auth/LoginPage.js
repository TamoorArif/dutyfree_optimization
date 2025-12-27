import { LOGIN_SELECTORS } from '../../utils/selectors/auth/index.js';
import { HOME_SELECTORS } from '../../utils/selectors/home/index.js';

export class LoginPage {
  constructor(page) {
    this.page = page;

    this.ageActionButton = page.locator(HOME_SELECTORS.AGE_CONFIRM_BUTTON);
    this.loginButton = page.locator(LOGIN_SELECTORS.USER_LOGIN_POPUP);
    this.username = page.locator(LOGIN_SELECTORS.USER_EMAIL);
    this.password = page.locator(LOGIN_SELECTORS.USER_PASSWORD);
    this.submitButton = page.locator(LOGIN_SELECTORS.SUBMIT_BTN);
    this.emailVerified = page.locator(LOGIN_SELECTORS.EMAIL_VERIFIED);
    this.errorMessage = page.locator(LOGIN_SELECTORS.ERROR_MESSAGE);
  }

  async showLoginPopup() {
    await this.loginButton.click();
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.submitButton.click();
  }
}
