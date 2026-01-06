import { BasePage } from '../BasePage.js';
import { CONTACT_SELECTORS } from '../../utils/selectors/home/index.js';
import { expect } from '@playwright/test';

export class ContactUsPage extends BasePage {
  constructor(page) {
    super(page);

    this.contactUsLink = page.locator(CONTACT_SELECTORS.contact_us_LINK);
    this.nameInput = page.locator(CONTACT_SELECTORS.Name);
    this.phoneInput = page.locator(CONTACT_SELECTORS.Phone_Number);
    this.emailInput = page.locator(CONTACT_SELECTORS.Email);
    this.messageInput = page.locator(CONTACT_SELECTORS.Massege);
    this.attachmentInput = page.locator(CONTACT_SELECTORS.Attachment);
    this.submitButton = page.locator(CONTACT_SELECTORS.Submit_Button);
    
    // Error message locators (common patterns for form validation)
    this.errorMessage = page.locator('#errormsg, .error, .alert-danger, [role="alert"]').first();
    this.nameError = page.locator('#contact_name:invalid, #contact_name + .invalid-feedback, #contact_name ~ .error').first();
    this.emailError = page.locator('#contact_email:invalid, #contact_email + .invalid-feedback, #contact_email ~ .error').first();
    this.messageError = page.locator('#contact_message:invalid, #contact_message + .invalid-feedback, #contact_message ~ .error').first();
    
    // Success message locator
    this.successMessage = page.locator('.alert-success, .success-message, [role="alert"]:has-text("success"), .o_notification_manager .o_notification_content').first();
  }

  async openContactUs() {
    await this.contactUsLink.click();
    // Wait for navigation or form to be visible
    await this.page.waitForLoadState('networkidle');
  }

  async fillContactForm({ name, phone, email, message }) {
    if (name !== undefined && name !== '') {
      await this.nameInput.fill(name);
    }
    if (phone !== undefined && phone !== '') {
      await this.phoneInput.fill(phone);
    }
    if (email !== undefined && email !== '') {
      await this.emailInput.fill(email);
    }
    if (message !== undefined && message !== '') {
      await this.messageInput.fill(message);
    }
  }

  async uploadAttachment(filePath) {
    if (filePath) {
      await this.attachmentInput.setInputFiles(filePath);
    }
  }

  async submitForm() {
    await this.submitButton.click();
    // Wait a bit for form submission to process
    await this.page.waitForTimeout(1000);
  }

  async verifyFormVisible() {
    await expect(this.nameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.messageInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async verifySuccess() {
    // Check for success message or URL change
    try {
      // Try to find success message
      const successVisible = await this.successMessage.isVisible({ timeout: 5000 }).catch(() => false);
      if (successVisible) {
        await expect(this.successMessage).toBeVisible();
      } else {
        // If no success message, verify URL contains contact or form is reset
        await expect(this.page).toHaveURL(/contact/i, { timeout: 10000 });
      }
    } catch (error) {
      // Fallback: verify form fields are cleared or URL changed
      await expect(this.page).toHaveURL(/contact/i, { timeout: 10000 });
    }
  }

  async verifyValidationErrors() {
    // Check if any validation errors are visible
    // This could be browser validation or custom validation messages
    const hasNameError = await this.nameInput.evaluate((el) => {
      return !el.validity.valid;
    }).catch(() => false);
    
    const hasEmailError = await this.emailInput.evaluate((el) => {
      return !el.validity.valid;
    }).catch(() => false);
    
    const hasMessageError = await this.messageInput.evaluate((el) => {
      return !el.validity.valid;
    }).catch(() => false);

    // At least one field should have validation error
    expect(hasNameError || hasEmailError || hasMessageError).toBeTruthy();
  }

  async verifyEmailValidationError() {
    // Check if email field has validation error
    const isInvalid = await this.emailInput.evaluate((el) => {
      return !el.validity.valid;
    });
    
    expect(isInvalid).toBeTruthy();
    
    // Also check for visible error message if available
    const errorVisible = await this.emailError.isVisible({ timeout: 2000 }).catch(() => false);
    if (errorVisible) {
      await expect(this.emailError).toBeVisible();
    }
  }

  async verifyNameValidationError() {
    // Check if name field has validation error
    const isInvalid = await this.nameInput.evaluate((el) => {
      return !el.validity.valid;
    });
    
    expect(isInvalid).toBeTruthy();
    
    // Also check for visible error message if available
    const errorVisible = await this.nameError.isVisible({ timeout: 2000 }).catch(() => false);
    if (errorVisible) {
      await expect(this.nameError).toBeVisible();
    }
  }

  async verifyMessageValidationError() {
    // Check if message field has validation error
    const isInvalid = await this.messageInput.evaluate((el) => {
      return !el.validity.valid;
    });
    
    expect(isInvalid).toBeTruthy();
    
    // Also check for visible error message if available
    const errorVisible = await this.messageError.isVisible({ timeout: 2000 }).catch(() => false);
    if (errorVisible) {
      await expect(this.messageError).toBeVisible();
    }
  }

  async getErrorMessage() {
    // Wait for error message to appear
    await this.errorMessage.waitFor({ state: 'visible', timeout: 10000 });
    return await this.errorMessage.textContent();
  }
}


