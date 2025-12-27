import { BasePage } from '../BasePage.js';
import { WHOLESALER_SIGNUP_SELECTORS } from '../../utils/selectors/auth/index.js';

export class WholesalerSignupPage extends BasePage {
  constructor(page) {
    super(page);

    this.profileBtn = page.locator(WHOLESALER_SIGNUP_SELECTORS.PROFILE_CLICK);
    this.wholeselleruserhyperlink = page.locator(WHOLESALER_SIGNUP_SELECTORS.WHOLESALER_HYPERLINK);
    this.firstname = page.locator(WHOLESALER_SIGNUP_SELECTORS.FIRST_NAME);
    this.lastname = page.locator(WHOLESALER_SIGNUP_SELECTORS.LAST_NAME);
    this.contactnumber = page.locator(WHOLESALER_SIGNUP_SELECTORS.CONTACT_NUMBER);
    this.email = page.locator(WHOLESALER_SIGNUP_SELECTORS.EMAIL);
    this.street = page.locator(WHOLESALER_SIGNUP_SELECTORS.STREET);
    this.country = page.locator(WHOLESALER_SIGNUP_SELECTORS.COUNTRY);
    this.City = page.locator(WHOLESALER_SIGNUP_SELECTORS.CITY);
    this.PostalCode = page.locator(WHOLESALER_SIGNUP_SELECTORS.POSTAL_CODE);
    this.StoreName = page.locator(WHOLESALER_SIGNUP_SELECTORS.STORE_NAME);
    this.TypeofBusiness = page.locator(WHOLESALER_SIGNUP_SELECTORS.TYPE_OF_BUSINESS);
    this.submitBtn = page.locator(WHOLESALER_SIGNUP_SELECTORS.SUBMIT_BTN);
  }

  async showSignupPopup() {
    await this.profileBtn.click();
    await this.wholeselleruserhyperlink.click();
  }

  async wholesellerSignupPage(firstname, lastname, contact_number, email, street, city, zip, storename) {
    await this.firstname.fill(firstname);
    await this.lastname.fill(lastname);
    await this.contactnumber.fill(contact_number);
    await this.email.fill(email);
    await this.street.fill(street);

    // Country
    await this.country.selectOption({ label: 'Pakistan' });

    // Province - Custom Input
    await this.page.locator('#custom_state_id').waitFor({ state: 'visible' });
    await this.page.locator('#custom_state_id').fill('Punjab');

    await this.City.fill(city);
    await this.PostalCode.fill(zip);
    await this.StoreName.fill(storename);

    // Type of Business
    await this.TypeofBusiness.selectOption({ label: 'Distributor' });

    // Interest in - Select2 Multi-Select
    await this.page.locator('#s2id_interest_types').click({ force: true });
    await this.page.locator('.select2-input').type('Vapes');
    await this.page.keyboard.press('Enter');
    await this.page.locator('.select2-input').type('Cigarettes');
    await this.page.keyboard.press('Enter');
    await this.page.keyboard.press('Escape');
    
    // Submit
    await this.submitBtn.click();
  }
}