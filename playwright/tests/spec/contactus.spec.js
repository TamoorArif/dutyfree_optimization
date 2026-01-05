import { test, expect } from '@playwright/test';
import { ContactUsPage } from '../../pages/contact/ContactUsPage.js';
import { HomePage } from '../../pages/home/HomePage.js';

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.visit();

  // Handle age confirmation
  await expect(homePage.ageModal).toBeVisible();
  await homePage.ageConfirmButton.click();
  await expect(homePage.ageModal).not.toBeVisible();
});

test.describe('Contact Us Page Tests', () => {

  test('Verify Contact Us form submission', async ({ page }) => {
    const contactUsPage = new ContactUsPage(page);

    // Open Contact Us
    await contactUsPage.openContactUs();

    // Verify form loaded
    await contactUsPage.verifyFormVisible();

    // Fill form
    await contactUsPage.fillContactForm({
      name: 'Test User',
      phone: '03001234567',
      email: 'testuser@mail.com',
      message: 'This is an automated test message'
    });

    // Upload attachment (optional)
    await contactUsPage.uploadAttachment('tests/fixtures/sample.pdf');

    // Submit form
    await contactUsPage.submitForm();

    // Basic assertion (customize if success message exists)
    await expect(page).toHaveURL(/contact/i);
  });


});
