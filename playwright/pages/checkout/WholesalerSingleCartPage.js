import { BasePage } from '../BasePage.js';
import { WHOLESALER_ADD_TO_CART_SELECTORS } from '../../utils/selectors/cart/index.js';
import { expect } from '@playwright/test';

export class WholesalerSingleCartPage extends BasePage {
    constructor(page) {
        super(page);
        this.profileBtn = page.locator(WHOLESALER_ADD_TO_CART_SELECTORS.PROFILE_BTN);
        this.loginFiled = page.locator(WHOLESALER_ADD_TO_CART_SELECTORS.LOGIN_FILED);
        this.passwordFiled = page.locator(WHOLESALER_ADD_TO_CART_SELECTORS.PASSWORD_FILED);
        this.loginSubmitBtn = page.locator(WHOLESALER_ADD_TO_CART_SELECTORS.LOGIN_SUBMIT_BTN);

        this.newArrivalsLink = page.locator(WHOLESALER_ADD_TO_CART_SELECTORS.NEW_ARRIVALS_LINK);

        this.gridItem = page.locator(WHOLESALER_ADD_TO_CART_SELECTORS.GRID_ITEM);
        this.firstProduct = page.locator(WHOLESALER_ADD_TO_CART_SELECTORS.FIRST_PRODUCT);
        this.cartButton = page.locator(WHOLESALER_ADD_TO_CART_SELECTORS.CART_BUTTON);
        this.cartQuantity = page.locator(WHOLESALER_ADD_TO_CART_SELECTORS.CART_QUANTITY);

        this.checkoutModal = page.locator(WHOLESALER_ADD_TO_CART_SELECTORS.CHECKOUT_MODAL);
        this.checkSubmitBtn = page.locator(WHOLESALER_ADD_TO_CART_SELECTORS.CHECK_SUBMIT_BTN);

        this.demoRadioBtn = page.locator(WHOLESALER_ADD_TO_CART_SELECTORS.DEMO_RADIO_BTN);
        this.paymentSubmitBtn = page.locator(WHOLESALER_ADD_TO_CART_SELECTORS.PAYMENT_SUBMIT_BTN);

        this.successMessage = page.locator(WHOLESALER_ADD_TO_CART_SELECTORS.SUCCESS_MESSAGE);
    }

    async visit() {
        await this.profileBtn.click();
        await this.loginFiled.fill('support@dutyfreesmoke.com');
        await this.passwordFiled.fill('1589');
        await this.loginSubmitBtn.click();
    }

    async addFirstItemToCart() {
        await this.newArrivalsLink.click();
        await expect(this.page).toHaveURL(/new-arrivals-duty-free-smoke/, { timeout: 20000 });
        await expect(this.newArrivalsLink).toBeVisible({ timeout: 10000 });

        // Get all products
        const products = await this.gridItem.all();

        for (const product of products) {
            try {
                // Click on "Select flavours" button for current product
                const selectBtn = product.locator('a.select_flavours');
                await selectBtn.click();

                // Wait for modal to appear
                const modal = this.page.locator('.modal.df-select-flavour');
                await modal.waitFor({ state: 'visible', timeout: 10000 });

                // Check all plus buttons in the modal
                const plusButtons = modal.locator('[name="sale_quantity_button_plus"]');
                const count = await plusButtons.count();
                let allDisabled = true;
                for (let i = 0; i < count; i++) {
                    const isDisabled = await plusButtons.nth(i).isDisabled();
                    if (!isDisabled) {
                        allDisabled = false;
                        break;
                    }
                }

                if (allDisabled) {
                    // Close modal and continue to next product
                    await modal.locator('.btn-close.as_close').click();
                    await modal.waitFor({ state: 'hidden', timeout: 5000 });
                    continue;
                } else {
                    // Find first enabled plus button and click it
                    for (let i = 0; i < count; i++) {
                        const button = plusButtons.nth(i);
                        const isDisabled = await button.isDisabled();
                        if (!isDisabled) {
                            await button.click();
                            break;
                        }
                    }

                    // Click Add to Cart button
                    await modal.locator('.add_to_cart').click();
                    try {
                        await expect(this.successMessage).toBeVisible({ timeout: 5000 });
                        await expect(this.successMessage).toHaveText('Item successfully added into the cart.');
                    } catch {}
                    return true;
                }
            } catch (error) {
                console.log(`Error processing product: ${error}`);
            }
        }
    }

    //checkout flow
    async checkout() {
        await this.cartButton.click();
        await expect(this.checkoutModal).toBeVisible();

        await this.checkSubmitBtn.click();
        await expect(this.page).toHaveURL(/\/shop\/payment/);

        await this.demoRadioBtn.click({ force: true });
        await this.paymentSubmitBtn.click();

        await expect(this.page).toHaveURL(/confirmation|success/, {
            timeout: 20000
        });
    }
}