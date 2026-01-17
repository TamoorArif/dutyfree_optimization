import { expect } from '@playwright/test';
import { BasePage } from '../BasePage.js';
import { PROFILE_SELECTORS } from '../../utils/selectors/profile/index.js';
import { COMMON_SELECTORS } from '../../utils/selectors/common/index.js';

export class ProfilePage extends BasePage {
    constructor(page) {
        super(page);
        // Buttons
        this.headerProfileBtn = page.locator(COMMON_SELECTORS.HEADER_PROFILE_BTN);
        this.headerProfileMenu = page.locator(COMMON_SELECTORS.HEADER_PROFILE_MENU);
        this.editProfileBtn = page.locator(PROFILE_SELECTORS.EDIT_PROFILE_BTN);
        this.discardBtn = page.locator(PROFILE_SELECTORS.DISCARD_BTN);
        this.saveBtn = page.locator(PROFILE_SELECTORS.SAVE_BTN);
        // Fields
        this.nameField = page.locator(PROFILE_SELECTORS.NAME_FIELD);
        this.emailField = page.locator(PROFILE_SELECTORS.EMAIL_FIELD);
        this.phoneField = page.locator(PROFILE_SELECTORS.PHONE_FIELD);
        this.streetField = page.locator(PROFILE_SELECTORS.STREET_FIELD);
        this.cityField = page.locator(PROFILE_SELECTORS.CITY_FIELD);
        this.zipField = page.locator(PROFILE_SELECTORS.ZIP_FIELD);
        this.countryField = page.locator(PROFILE_SELECTORS.COUNTRY_FIELD);
        // Dropdowns
        this.invoiceMethodDropdown = page.locator(PROFILE_SELECTORS.INVOICE_METHOD_FIELD);
        this.electronicFormatDropdown = page.locator(PROFILE_SELECTORS.ELECTRONIC_FORMAT_FIELD);
        this.upsNumberDropdown = page.locator(PROFILE_SELECTORS.UPS_NUMBER_FIELD);
    }

    async gotoProfilePage() {
        await this.headerProfileBtn.click();
        await expect(this.headerProfileMenu).toBeVisible();
        
        await Promise.all([
            this.page.waitForURL(/\/my\/(account|home)/, { timeout: 15000 }),
            this.headerProfileMenu.locator('#header_my_account_link').first().click()
        ]).catch(() => {});
        
        await expect(this.editProfileBtn).toBeVisible({ timeout: 15000 });
    }

    async openEditProfile() {
        await this.editProfileBtn.click();
    }

    async fillProfileFields(profileData) {
        // if (profileData.name) await this.nameField.fill(profileData.name);
        // if (profileData.email) await this.emailField.fill(profileData.email);
        if (profileData.phone) await this.phoneField.fill(profileData.phone);
        if (profileData.street) await this.streetField.fill(profileData.street);
        if (profileData.city) await this.cityField.fill(profileData.city);
        if (profileData.zip) await this.zipField.fill(profileData.zip);
        
        // Dropdown selections
        if (profileData.invoiceMethod) await this.invoiceMethodDropdown.selectOption(profileData.invoiceMethod);
        if (profileData.electronicFormat) await this.electronicFormatDropdown.selectOption(profileData.electronicFormat);
       
        if (profileData.upsNumber) await this.upsNumberDropdown.fill(profileData.upsNumber);
    }

    async clickSaveBtn() {
        await this.saveBtn.click();
    }
}