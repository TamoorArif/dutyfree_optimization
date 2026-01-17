import { expect } from '@playwright/test';
import { BasePage } from '../BasePage.js';
import { ADD_TO_CART_SELECTORS } from '../../utils/selectors/cart/index.js';

export class SingleUserCartPage extends BasePage {
    constructor(page) {
        super(page);
        this.profileBtn = page.locator(ADD_TO_CART_SELECTORS.PROFILE_BTN);
        this.loginFiled = page.locator(ADD_TO_CART_SELECTORS.LOGIN_FILED);
        this.passwordFiled = page.locator(ADD_TO_CART_SELECTORS.PASSWORD_FILED);
        this.loginSubmitBtn = page.locator(ADD_TO_CART_SELECTORS.LOGIN_SUBMIT_BTN);

        this.newArrivalsLink = page.locator(ADD_TO_CART_SELECTORS.NEW_ARRIVALS_LINK);
        this.gridItem = page.locator(ADD_TO_CART_SELECTORS.GRID_ITEM);
        this.firstProduct = page.locator(ADD_TO_CART_SELECTORS.FIRST_PRODUCT);
        this.cartButton = page.locator(ADD_TO_CART_SELECTORS.CART_BUTTON);
        this.cartQuantity = page.locator(ADD_TO_CART_SELECTORS.CART_QUANTITY);
        this.checkoutModal = page.locator(ADD_TO_CART_SELECTORS.CHECKOUT_MODAL);
        this.checkSubmitBtn = page.locator(ADD_TO_CART_SELECTORS.CHECK_SUBMIT_BTN);
        this.demoRadioBtn = page.locator(ADD_TO_CART_SELECTORS.DEMO_RADIO_BTN);
        this.paymentSubmitBtn = page.locator(ADD_TO_CART_SELECTORS.PAYMENT_SUBMIT_BTN);
    }

    async visit() {
            await this.profileBtn.click();
        await this.loginFiled.fill('support@dutyfreesmoke.com');
        await this.passwordFiled.fill('1589');
        await this.loginSubmitBtn.click();
        // await this.appbtn.click();
        // await this.websitebtn.click();
        // await this.configurationbtn.click();
        // await this.paymentprovidersbtn.click();
        // await this.demopaymentBtn.click();

        // Navigate to New Arrivals - ensure link is click
        await this.newArrivalsLink.click();
        await expect(this.page).toHaveURL(/new-arrivals-duty-free-smoke/, { timeout: 20000 });

        // Wait for page to load
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => { });
    }

    async addFirstItemToCart() {
        await expect(this.gridItem.first()).toBeVisible({ timeout: 5000 });
        await this.firstProduct.click();
    }

    async getCartQuantity() {
        // Check if cart quantity element is visible (might be hidden when cart is empty)
        const isVisible = await this.cartQuantity.isVisible().catch(() => false);
        if (!isVisible) {
            return '0';
        }
        // Try getting text from the element first, then from parent if element is an icon
        let text = await this.cartQuantity.textContent();
        if (!text || text.trim() === '') {
            // If element has no text (e.g., it's an icon), try getting text from parent element
            text = await this.cartQuantity.evaluate((el) => {
                const parent = el.parentElement;
                return parent ? parent.textContent : null;
            }).catch(() => null);
        }
        // Extract numbers from the text (in case there's extra text)
        if (text) {
            const match = text.trim().match(/\d+/);
            return match ? match[0] : '0';
        }
        return '0';
    }

    async openCart() {
        await this.cartButton.click();
        await expect(this.checkoutModal).toBeVisible({ timeout: 5000 });
        await this.checkSubmitBtn.click();
        await expect(this.page).toHaveURL(/\/shop\/payment$/, {
            timeout: 20000
        });

        await expect(this.demoRadioBtn).toBeVisible({ timeout: 15000 });
        await this.demoRadioBtn.scrollIntoViewIfNeeded();
        await this.demoRadioBtn.click({ force: true });

        await this.paymentSubmitBtn.click();
        await expect(this.page).toHaveURL(/\/shop\/payment$/, {
            timeout: 20000
        });
        await expect(this.page).toHaveURL(/\/shop\/(confirmation|payment\/success)$/, {
            timeout: 20000
        });
    }

    async addMultipleProductsToCart(count = 3) {
        // Wait for first product to be visible
        await expect(this.gridItem.first()).toBeVisible({ timeout: 10000 });

        const totalProducts = await this.gridItem.count();

        for (let i = 0; i < count && i < totalProducts; i++) {
            const productCard = this.gridItem.nth(i);
            const addToCartBtn = productCard.locator('#add_to_cart');

            // Scroll to product
            await productCard.scrollIntoViewIfNeeded();

            // Wait and click Add to Cart
            await expect(addToCartBtn).toBeVisible({ timeout: 5000 });
            await addToCartBtn.click();

            // Small wait for cart update
            await this.page.waitForTimeout(800);
        }
    }
}