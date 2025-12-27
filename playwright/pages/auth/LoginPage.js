import { LOGIN_SELECTORS } from '../../utils/selectors/auth';

export class LoginPage {
  constructor(page) {
    this.page = page;

    this.username = page.locator(LOGIN_SELECTORS.USERNAME);
    this.password = page.locator(LOGIN_SELECTORS.PASSWORD);
    this.submitButton = page.locator(LOGIN_SELECTORS.SUBMIT_BTN);
  }

  async visit() {
    await this.page.goto('/practice-test-login');
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.submitButton.click();
  }
}
