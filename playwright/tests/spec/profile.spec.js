import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home/HomePage.js';
import { LoginPage } from '../../pages/auth/LoginPage.js';
import { ProfilePage } from '../../pages/profile/ProfilePage.js';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.visit();

    await expect(homePage.ageModal).toBeVisible();
    await homePage.ageConfirmButton.click();

    await expect(homePage.ageModal).not.toBeVisible();

    // Login user (required for profile access)
    const loginPage = new LoginPage(page);
    await loginPage.showLoginPopup();
    await loginPage.login('support@dutyfreesmoke.com', '1589');
});

test.describe('Profile Tests', () => {
    test('Positive: View Profile Information', async ({ page }) => {
        const profilePage = new ProfilePage(page);

        // Navigate to profile page
        await profilePage.gotoProfilePage();

        // Verify all profile fields are visible
        await profilePage.verifyFieldsVisible();

        // Verify fields are populated (at least name and email should have values)
        await profilePage.verifyFieldsPopulated();

        // Verify fields are in read-only mode initially
        await profilePage.verifyFieldsReadOnly();
    });

    // test('Positive: Edit Profile - Update Name', async ({ page }) => {
    //     const profilePage = new ProfilePage(page);

    //     // Navigate to profile page
    //     await profilePage.gotoProfilePage();

    //     // Get the current name value
    //     const originalName = await profilePage.getFieldValue('name');

    //     // Click edit button
    //     await profilePage.editProfile();

    //     // Verify fields are now editable
    //     await profilePage.verifyFieldsEditable();

    //     // Update name field with a new value
    //     const updatedName = 'Updated Test Name';
    //     await profilePage.fillProfileFields({ name: updatedName });

    //     // Save changes
    //     await profilePage.saveProfile();

    //     // Wait for the save to complete and fields to become read-only again
    //     await profilePage.verifyFieldsReadOnly();

    //     // Verify name is updated
    //     const savedName = await profilePage.getFieldValue('name');
    //     expect(savedName.trim()).toBe(updatedName);
    // });

    // test('Positive: Edit Profile - Update Address Fields', async ({ page }) => {
    //     const profilePage = new ProfilePage(page);

    //     // Navigate to profile page
    //     await profilePage.gotoProfilePage();

    //     // Click edit button
    //     await profilePage.editProfile();

    //     // Verify fields are now editable
    //     await profilePage.verifyFieldsEditable();

    //     // Update address fields with new values
    //     const updatedAddress = {
    //         street: '123 Updated Street',
    //         city: 'Updated City',
    //         state: 'Updated State',
    //         zip: '12345',
    //         country: 'Updated Country'
    //     };
    //     await profilePage.fillProfileFields(updatedAddress);

    //     // Save changes
    //     await profilePage.saveProfile();

    //     // Wait for the save to complete and fields to become read-only again
    //     await profilePage.verifyFieldsReadOnly();

    //     // Verify address fields are updated
    //     const savedStreet = await profilePage.getFieldValue('street');
    //     const savedCity = await profilePage.getFieldValue('city');
    //     const savedState = await profilePage.getFieldValue('state');
    //     const savedZip = await profilePage.getFieldValue('zip');
    //     const savedCountry = await profilePage.getFieldValue('country');

    //     expect(savedStreet.trim()).toBe(updatedAddress.street);
    //     expect(savedCity.trim()).toBe(updatedAddress.city);
    //     expect(savedState.trim()).toBe(updatedAddress.state);
    //     expect(savedZip.trim()).toBe(updatedAddress.zip);
    //     expect(savedCountry.trim()).toBe(updatedAddress.country);
    // });

    // test('Positive: Edit Profile - Update Contact Information', async ({ page }) => {
    //     const profilePage = new ProfilePage(page);

    //     // Navigate to profile page
    //     await profilePage.gotoProfilePage();

    //     // Get the current phone value
    //     const originalPhone = await profilePage.getFieldValue('phone');

    //     // Click edit button
    //     await profilePage.editProfile();

    //     // Verify fields are now editable
    //     await profilePage.verifyFieldsEditable();

    //     // Update phone field with a new value
    //     const updatedPhone = '123-456-7890';
    //     await profilePage.fillProfileFields({ phone: updatedPhone });

    //     // Save changes
    //     await profilePage.saveProfile();

    //     // Wait for the save to complete and fields to become read-only again
    //     await profilePage.verifyFieldsReadOnly();

    //     // Verify phone is updated
    //     const savedPhone = await profilePage.getFieldValue('phone');
    //     expect(savedPhone.trim()).toBe(updatedPhone);
    // });

    // test('Positive: Edit Profile - Update Invoice Preferences', async ({ page }) => {
    //     const profilePage = new ProfilePage(page);

    //     // Navigate to profile page
    //     await profilePage.gotoProfilePage();

    //     // Click edit button
    //     await profilePage.editProfile();

    //     // Verify fields are now editable
    //     await profilePage.verifyFieldsEditable();

    //     // Update invoice preferences with new values
    //     const updatedInvoicePreferences = {
    //         invoiceMethod: 'Email',
    //         electronicFormat: 'PDF'
    //     };
    //     await profilePage.fillProfileFields(updatedInvoicePreferences);

    //     // Save changes
    //     await profilePage.saveProfile();

    //     // Wait for the save to complete and fields to become read-only again
    //     await profilePage.verifyFieldsReadOnly();

    //     // Verify invoice preferences are updated
    //     const savedInvoiceMethod = await profilePage.getFieldValue('invoiceMethod');
    //     const savedElectronicFormat = await profilePage.getFieldValue('electronicFormat');

    //     expect(savedInvoiceMethod.trim()).toBe(updatedInvoicePreferences.invoiceMethod);
    //     expect(savedElectronicFormat.trim()).toBe(updatedInvoicePreferences.electronicFormat);
    // });

    // test('Positive: Discard Profile Changes', async ({ page }) => {
    //     const profilePage = new ProfilePage(page);

    //     // Navigate to profile page
    //     await profilePage.gotoProfilePage();

    //     // Get original values
    //     const originalName = await profilePage.getFieldValue('name');
    //     const originalCity = await profilePage.getFieldValue('city');
    //     const originalPhone = await profilePage.getFieldValue('phone');

    //     // Click edit button
    //     await profilePage.editProfile();

    //     // Verify fields are now editable
    //     await profilePage.verifyFieldsEditable();

    //     // Make changes to multiple fields
    //     await profilePage.fillProfileFields({
    //         name: 'Changed Name',
    //         city: 'Changed City',
    //         phone: '999-999-9999'
    //     });

    //     // Click discard button
    //     await profilePage.discardProfile();

    //     // Wait for fields to become read-only again
    //     await profilePage.verifyFieldsReadOnly();

    //     // Verify changes are not saved (original values restored)
    //     const savedName = await profilePage.getFieldValue('name');
    //     const savedCity = await profilePage.getFieldValue('city');
    //     const savedPhone = await profilePage.getFieldValue('phone');

    //     expect(savedName.trim()).toBe(originalName.trim());
    //     expect(savedCity.trim()).toBe(originalCity.trim());
    //     expect(savedPhone.trim()).toBe(originalPhone.trim());
    // });

    // test('Negative: Edit Profile - Invalid Email Format', async ({ page }) => {
    //     const profilePage = new ProfilePage(page);

    //     // Navigate to profile page
    //     await profilePage.gotoProfilePage();

    //     // Click edit button
    //     await profilePage.editProfile();

    //     // Verify fields are now editable
    //     await profilePage.verifyFieldsEditable();

    //     // Enter invalid email format
    //     await profilePage.fillProfileFields({ email: 'invalid-email-format' });

    //     // Attempt to save
    //     await profilePage.saveProfile();

    //     // Verify error message appears (HTML5 validation)
    //     await profilePage.verifyFieldValidationError('email');
    // });

    // test('Negative: Edit Profile - Invalid Phone Format', async ({ page }) => {
    //     const profilePage = new ProfilePage(page);

    //     // Navigate to profile page
    //     await profilePage.gotoProfilePage();

    //     // Click edit button
    //     await profilePage.editProfile();

    //     // Verify fields are now editable
    //     await profilePage.verifyFieldsEditable();

    //     // Enter invalid phone format (if there's a pattern validation)
    //     await profilePage.fillProfileFields({ phone: 'abc123' });

    //     // Attempt to save
    //     await profilePage.saveProfile();

    //     // Verify error message appears (HTML5 validation)
    //     await profilePage.verifyFieldValidationError('phone');
    // });

    // test('Negative: Edit Profile - Required Field Validation', async ({ page }) => {
    //     const profilePage = new ProfilePage(page);

    //     // Navigate to profile page
    //     await profilePage.gotoProfilePage();

    //     // Click edit button
    //     await profilePage.editProfile();

    //     // Verify fields are now editable
    //     await profilePage.verifyFieldsEditable();

    //     // Clear required fields (name and email)
    //     await profilePage.fillProfileFields({
    //         name: '',
    //         email: ''
    //     });

    //     // Attempt to save
    //     await profilePage.saveProfile();

    //     // Verify validation errors appear for required fields
    //     await profilePage.verifyRequiredFieldError('name');
    //     await profilePage.verifyRequiredFieldError('email');
    // });

    // test('Negative: Edit Profile - Invalid ZIP Code Format', async ({ page }) => {
    //     const profilePage = new ProfilePage(page);

    //     // Navigate to profile page
    //     await profilePage.gotoProfilePage();

    //     // Click edit button
    //     await profilePage.editProfile();

    //     // Verify fields are now editable
    //     await profilePage.verifyFieldsEditable();

    //     // Enter invalid ZIP code format
    //     await profilePage.fillProfileFields({ zip: 'abc123' });

    //     // Attempt to save
    //     await profilePage.saveProfile();

    //     // Verify error message appears (HTML5 validation)
    //     await profilePage.verifyFieldValidationError('zip');
    // });
});
