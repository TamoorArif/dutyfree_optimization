import { test, expect } from '@playwright/test';
import { ContactUsPage } from '../../pages/home/ContactusPage.js';
import { HomePage } from '../../pages/home/HomePage.js';
import path from 'path';

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.visit();

  // Handle age confirmation
  await expect(homePage.ageModal).toBeVisible();
  await homePage.ageConfirmButton.click();
  await expect(homePage.ageModal).not.toBeVisible();
});

test.describe('Contact Us Page Tests', () => {

  test('Positive: Verify Contact Us form submission with all fields', async ({ page }) => {
    const contactUsPage = new ContactUsPage(page);

    // Open Contact Us
    await contactUsPage.openContactUs();

    // Verify form loaded
    await contactUsPage.verifyFormVisible();

    // Fill form with valid data
    await contactUsPage.fillContactForm({
      name: 'Test User',
      phone: '03001234567',
      email: 'testuser@mail.com',
      message: 'This is an automated test message'
    });

    // Upload attachment (optional)
    // Path is relative to project root where tests are run
    const filePath = path.join(process.cwd(), 'playwright/fixtures/sample.pdf');
    await contactUsPage.uploadAttachment(filePath);

    // Submit form
    await contactUsPage.submitForm();

    // Verify success (check for success message or URL change)
    await contactUsPage.verifySuccess();
  });

  test('Positive: Verify Contact Us form submission without attachment', async ({ page }) => {
    const contactUsPage = new ContactUsPage(page);

    // Open Contact Us
    await contactUsPage.openContactUs();

    // Verify form loaded
    await contactUsPage.verifyFormVisible();

    // Fill form with valid data
    await contactUsPage.fillContactForm({
      name: 'John Doe',
      phone: '03009876543',
      email: 'johndoe@mail.com',
      message: 'Test message without attachment'
    });

    // Submit form without attachment
    await contactUsPage.submitForm();

    // Verify success
    await contactUsPage.verifySuccess();
  });

  test('Negative: Verify form validation with empty required fields', async ({ page }) => {
    const contactUsPage = new ContactUsPage(page);

    // Open Contact Us
    await contactUsPage.openContactUs();

    // Verify form loaded
    await contactUsPage.verifyFormVisible();

    // Try to submit form without filling any fields
    await contactUsPage.submitForm();

    // Verify validation errors are shown
    await contactUsPage.verifyValidationErrors();
  });

  test('Negative: Verify form validation with invalid email format', async ({ page }) => {
    const contactUsPage = new ContactUsPage(page);

    // Open Contact Us
    await contactUsPage.openContactUs();

    // Verify form loaded
    await contactUsPage.verifyFormVisible();

    // Fill form with invalid email
    await contactUsPage.fillContactForm({
      name: 'Test User',
      phone: '03001234567',
      email: 'invalid-email-format',
      message: 'Test message with invalid email'
    });

    // Submit form
    await contactUsPage.submitForm();

    // Verify email validation error
    await contactUsPage.verifyEmailValidationError();
  });

  test('Negative: Verify form validation with missing name field', async ({ page }) => {
    const contactUsPage = new ContactUsPage(page);

    // Open Contact Us
    await contactUsPage.openContactUs();

    // Verify form loaded
    await contactUsPage.verifyFormVisible();

    // Fill form without name
    await contactUsPage.fillContactForm({
      name: '',
      phone: '03001234567',
      email: 'testuser@mail.com',
      message: 'Test message without name'
    });

    // Submit form
    await contactUsPage.submitForm();

    // Verify name field validation error
    await contactUsPage.verifyNameValidationError();
  });

  test('Negative: Verify form validation with missing message field', async ({ page }) => {
    const contactUsPage = new ContactUsPage(page);

    // Open Contact Us
    await contactUsPage.openContactUs();

    // Verify form loaded
    await contactUsPage.verifyFormVisible();

    // Fill form without message
    await contactUsPage.fillContactForm({
      name: 'Test User',
      phone: '03001234567',
      email: 'testuser@mail.com',
      message: ''
    });

    // Submit form
    await contactUsPage.submitForm();

    // Verify message field validation error
    await contactUsPage.verifyMessageValidationError();
  });
});
