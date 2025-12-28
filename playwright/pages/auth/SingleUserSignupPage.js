import { BasePage } from '../BasePage.js';
import { SINGLE_USER_SIGNUP_SELECTORS } from '../../utils/selectors/auth/index.js';

export class SingleUserSignupPage extends BasePage {
  constructor(page) {
    super(page);
    this.profileBtn = page.locator(SINGLE_USER_SIGNUP_SELECTORS.PROFILE_CLICK);
    this.singleuserhyperlink = page.locator(SINGLE_USER_SIGNUP_SELECTORS.SINGLE_USER_HYPERLINK);
    this.emailforsingleUser = page.locator(SINGLE_USER_SIGNUP_SELECTORS.EMAIL_FOR_SINGLE_USER);
    this.nameforsingleUser = page.locator(SINGLE_USER_SIGNUP_SELECTORS.NAME_FOR_SINGLE_USER);
    this.password = page.locator(SINGLE_USER_SIGNUP_SELECTORS.PASSWORD);
    this.confirmPassword = page.locator(SINGLE_USER_SIGNUP_SELECTORS.CONFIRM_PASSWORD);
    this.signupBtn = page.locator(SINGLE_USER_SIGNUP_SELECTORS.SIGNUP_BTN);
    this.emailVerifiedSignup = page.locator(SINGLE_USER_SIGNUP_SELECTORS.EMAIL_VERIFIED_SIGNUP);
    this.errorMessage = page.locator(SINGLE_USER_SIGNUP_SELECTORS.ERROR_MESSAGE);
  }

  async showSignupPopup() {
    await this.profileBtn.click();
    await this.singleuserhyperlink.click();
  }

  async signup(singleUserEmail, singleUserName, password, confirmPassword) {
    await this.emailforsingleUser.fill(singleUserEmail);
    await this.nameforsingleUser.fill(singleUserName);
    await this.password.fill(password);
    await this.confirmPassword.fill(confirmPassword);
    await this.signupBtn.click();
  }

  async getEmailVerified() {
    // Wait until the email element is visible
    await this.emailVerified.waitFor({ state: 'visible', timeout: 15000 });

    // Return the first matched email text
    const emails = await this.emailVerified.allTextContents();
    return emails.length > 0 ? emails[0].trim() : null;
  }

  //   Get error message text (negative assertion)
  async getErrorMessage() {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 10000 });
    return await this.errorMessage.textContent();
  }
}
