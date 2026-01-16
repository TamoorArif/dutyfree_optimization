import { expect } from '@playwright/test';
import { BasePage } from '../BasePage.js';
import { PROFILE_SELECTORS } from '../../utils/selectors/profile/index.js';
import { COMMON_SELECTORS } from '../../utils/selectors/common/index.js';

export class ProfilePage extends BasePage {
    constructor(page) {
        super(page);
        this.headerProfileBtn = page.locator(COMMON_SELECTORS.HEADER_PROFILE_BTN);
        this.headerProfileMenu = page.locator(COMMON_SELECTORS.HEADER_PROFILE_MENU);
        this.headerProfileMenuItem = page.locator(COMMON_SELECTORS.HEADER_PROFILE_MENU_ITEM);
        this.editProfileBtn = page.locator(PROFILE_SELECTORS.EDIT_PROFILE_BTN);
        this.nameField = page.locator(PROFILE_SELECTORS.NAME_FIELD);
        this.emailField = page.locator(PROFILE_SELECTORS.EMAIL_FIELD);
        this.phoneField = page.locator(PROFILE_SELECTORS.PHONE_FIELD);
        this.streetField = page.locator(PROFILE_SELECTORS.STREET_FIELD);
        this.cityField = page.locator(PROFILE_SELECTORS.CITY_FIELD);
        this.street2Field = page.locator(PROFILE_SELECTORS.STREET2_FIELD);
        this.stateField = page.locator(PROFILE_SELECTORS.STATE_FIELD);
        this.zipField = page.locator(PROFILE_SELECTORS.ZIP_FIELD);
        this.countryField = page.locator(PROFILE_SELECTORS.COUNTRY_FIELD);
        this.invoiceMethodField = page.locator(PROFILE_SELECTORS.INVOICE_METHOD_FIELD);
        this.electronicFormatField = page.locator(PROFILE_SELECTORS.ELECTRONIC_FORMAT_FIELD);
        this.upsNumberField = page.locator(PROFILE_SELECTORS.UPS_NUMBER_FIELD);
        this.saveBtn = page.locator(PROFILE_SELECTORS.SAVE_BTN);
        this.discardBtn = page.locator(PROFILE_SELECTORS.DISCARD_BTN);
    }
    async gotoProfilePage() {
        // Click profile button to open dropdown menu
        await this.headerProfileBtn.click();
        
        // Wait for menu to be visible
        await expect(this.headerProfileMenu).toBeVisible();
        
        // Click the menu item to navigate to profile page
        // Scope the selector within the menu to avoid multiple matches
        await Promise.all([
            this.page.waitForURL(/\/my\/(account|home)/, { timeout: 15000 }),
            this.headerProfileMenu.locator('#header_my_account_link').first().click()
        ]).catch(() => {});
        
        // Wait for profile page to load by waiting for the edit button to be visible
        // This is more reliable than waiting for fields which might be disabled initially
        await expect(this.editProfileBtn).toBeVisible({ timeout: 15000 });
        
        // Additional wait for page to be fully loaded
        await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    }
    async editProfile() {
        await this.editProfileBtn.click();
    }
    async saveProfile() {
        await this.saveBtn.click();
    }

    async discardProfile() {
        await this.discardBtn.click();
    }

    async fillProfileFields(profileData) {
        if (profileData.name !== undefined) {
            await this.nameField.fill(profileData.name);
        }
        if (profileData.email !== undefined) {
            await this.emailField.fill(profileData.email);
        }
        if (profileData.phone !== undefined) {
            await this.phoneField.fill(profileData.phone);
        }
        if (profileData.street !== undefined) {
            await this.streetField.fill(profileData.street);
        }
        if (profileData.street2 !== undefined) {
            await this.street2Field.fill(profileData.street2);
        }
        if (profileData.city !== undefined) {
            await this.cityField.fill(profileData.city);
        }
        if (profileData.state !== undefined) {
            await this.stateField.fill(profileData.state);
        }
        if (profileData.zip !== undefined) {
            await this.zipField.fill(profileData.zip);
        }
        if (profileData.country !== undefined) {
            await this.countryField.fill(profileData.country);
        }
        if (profileData.invoiceMethod !== undefined) {
            await this.invoiceMethodField.fill(profileData.invoiceMethod);
        }
        if (profileData.electronicFormat !== undefined) {
            await this.electronicFormatField.fill(profileData.electronicFormat);
        }
        if (profileData.upsNumber !== undefined) {
            await this.upsNumberField.fill(profileData.upsNumber);
        }
    }

    async getFieldValue(fieldName) {
        const fieldMap = {
            'name': this.nameField,
            'email': this.emailField,
            'phone': this.phoneField,
            'street': this.streetField,
            'street2': this.street2Field,
            'city': this.cityField,
            'state': this.stateField,
            'zip': this.zipField,
            'country': this.countryField,
            'invoiceMethod': this.invoiceMethodField,
            'electronicFormat': this.electronicFormatField,
            'upsNumber': this.upsNumberField
        };

        const field = fieldMap[fieldName.toLowerCase()];
        if (!field) {
            throw new Error(`Unknown field name: ${fieldName}`);
        }

        return await field.inputValue();
    }

    async verifyFieldsReadOnly() {
        await expect(this.nameField).toBeDisabled();
        await expect(this.emailField).toBeDisabled();
        await expect(this.phoneField).toBeDisabled();
        await expect(this.streetField).toBeDisabled();
        await expect(this.street2Field).toBeDisabled();
        await expect(this.cityField).toBeDisabled();
        await expect(this.stateField).toBeDisabled();
        await expect(this.zipField).toBeDisabled();
        await expect(this.countryField).toBeDisabled();
        await expect(this.invoiceMethodField).toBeDisabled();
        await expect(this.electronicFormatField).toBeDisabled();
        await expect(this.upsNumberField).toBeDisabled();
    }

    async verifyFieldsEditable() {
        await expect(this.nameField).toBeEnabled();
        await expect(this.emailField).toBeEnabled();
        await expect(this.phoneField).toBeEnabled();
        await expect(this.streetField).toBeEnabled();
        await expect(this.street2Field).toBeEnabled();
        await expect(this.cityField).toBeEnabled();
        await expect(this.stateField).toBeEnabled();
        await expect(this.zipField).toBeEnabled();
        await expect(this.countryField).toBeEnabled();
        await expect(this.invoiceMethodField).toBeEnabled();
        await expect(this.electronicFormatField).toBeEnabled();
        await expect(this.upsNumberField).toBeEnabled();
    }

    async verifyFieldsVisible() {
        await expect(this.nameField).toBeVisible();
        await expect(this.emailField).toBeVisible();
        await expect(this.phoneField).toBeVisible();
        await expect(this.streetField).toBeVisible();
        await expect(this.street2Field).toBeVisible();
        await expect(this.cityField).toBeVisible();
        await expect(this.stateField).toBeVisible();
        await expect(this.zipField).toBeVisible();
        await expect(this.countryField).toBeVisible();
        await expect(this.invoiceMethodField).toBeVisible();
        await expect(this.electronicFormatField).toBeVisible();
        await expect(this.upsNumberField).toBeVisible();
    }

    async verifyFieldsPopulated() {
        // Check that required fields have values (email and name should always have values)
        const nameValue = await this.nameField.inputValue();
        const emailValue = await this.emailField.inputValue();
        
        expect(nameValue.trim()).not.toBe('');
        expect(emailValue.trim()).not.toBe('');
    }

    async verifyFieldValidationError(fieldName) {
        const fieldMap = {
            'name': this.nameField,
            'email': this.emailField,
            'phone': this.phoneField,
            'zip': this.zipField
        };

        const field = fieldMap[fieldName.toLowerCase()];
        if (!field) {
            throw new Error(`Unknown field name for validation: ${fieldName}`);
        }

        // Check HTML5 validation
        const isInvalid = await field.evaluate((el) => {
            return !el.validity.valid;
        });
        
        expect(isInvalid).toBeTruthy();
    }

    async verifyRequiredFieldError(fieldName) {
        const fieldMap = {
            'name': this.nameField,
            'email': this.emailField
        };

        const field = fieldMap[fieldName.toLowerCase()];
        if (!field) {
            throw new Error(`Unknown required field name: ${fieldName}`);
        }

        // Check HTML5 validation for required fields
        const isInvalid = await field.evaluate((el) => {
            return !el.validity.valid;
        });
        
        expect(isInvalid).toBeTruthy();
    }
}