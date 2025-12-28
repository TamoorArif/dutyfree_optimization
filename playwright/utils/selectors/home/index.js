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
    FILTER: "#filterquery",
    FLAVOURS_LABEL: 'input[id="attrgroup_10_1"]',
    NICOTIN_STRENGTH_LABEL: 'input[id="attrval_13_517"]',
    NICOTIN_STRENGTH2_LABEL: 'input[id="attrgroup_14_15"]',
    PUFF_COUNT_LABEL: 'input[id="filter_1_1"]',
    FILTER_APPLY: '#filterapply',
    FILTER_RESET: '#filterreset',
};