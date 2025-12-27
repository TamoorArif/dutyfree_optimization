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