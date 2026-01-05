import { BasePage } from '../BasePage.js';
import { CONTACT_US_SELECTORS } from '../../utils/selectors/contact/index.js';
import { expect } from '@playwright/test';

export class ContactUsPage extends BasePage {
  constructor(page) {
    super(page);

    this.contactUsLink = page.locator(CONTACT_US_SELECTORS.contact_us_LINK);
    this.nameInput = page.locator(CONTACT_US_SELECTORS.Name);
    this.phoneInput = page.locator(CONTACT_US_SELECTORS.Phone_Number);
    this.emailInput = page.locator(CONTACT_US_SELECTORS.Email);
    this.messageInput = page.locator(CONTACT_US_SELECTORS.Massege);
    this.attachmentInput = page.locator(CONTACT_US_SELECTORS.Attachment);
    this.submitButton = page.locator(CONTACT_US_SELECTORS.Submit_Button);
  }

  async openContactUs() {
    await this.contactUsLink.click();
  }

  async fillContactForm({ name, phone, email, message }) {
    await this.nameInput.fill(name);
    await this.phoneInput.fill(phone);
    await this.emailInput.fill(email);
    await this.messageInput.fill(message);
  }

  async uploadAttachment(filePath) {
    await this.attachmentInput.setInputFiles(filePath);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async verifyFormVisible() {
    await expect(this.nameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }
}


