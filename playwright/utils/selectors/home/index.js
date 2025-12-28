// Home page selectors
export const HOME_SELECTORS = {
    AGE_MODAL: '#mc_modal',
    AGE_CONFIRM_BUTTON: '.age-actions .btn.btn-over',
};

// New arival selectors
export const NEW_ARRIVALS_SELECTORS = {
    NEW_ARRIVALS_LINK: '#auto_id_20',
    PRODUCTS_GRID: '#products_grid .col-lg-3',
    PRODUCT_LINKS: 'a[href*="/shop/"]:has(img)',
    PRODUCT_NAME_SELECTORS: [
        'h1.product-name',
        'h1',
        '.product-name',
        '[class*="product"] h1'
    ],
};

// Filter selectors
export const FILTER_SELECTORS = {
    NEW_ARRIVALS_LINK: '#auto_id_20',
    FILTER: ".btn.btn-secondary.border",
    FLAVOURS_LABEL: 'input[id="10-1"]',
    NICOTIN_STRENGTH_LABEL: 'input[id="13-517"]',
    NICOTIN_STRENGTH2_LABEL: 'label[for="attrgroup_14_15"]',
    PUFF_COUNT_LABEL: 'label[for="filter_1_1"]',
    FILTER_APPLY: 'button.btn.btn-primary:has-text("Apply"), button[type="submit"].btn.btn-primary',
    FILTER_RESET: '#filterreset',
};

