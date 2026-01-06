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
//Search selectors
export const SEARCH_SELECTORS = {
    SEARCH_INPUT: '#auto_id_107',
    DROPDOWN: '.o_searchbar_form .o_dropdown_menu',
    RESULT_ITEMS: '.o_searchbar_form .o_dropdown_menu .dropdown-item',
    NO_RESULT_TEXT: 'No results',
    ITEM_IMAGE: '.oe_product_image',
    ITEM_TITLE: '.oe_product_name',
    ITEM_CATEGORY: '.oe_product_category',
    ITEM_PRICE: '.oe_currency_value',
};

// Sort selectors
export const SORT_SELECTORS = {
    NEW_ARRIVALS_LINK: '#auto_id_20',
    SORT_BUTTON: '.o_sortby_dropdown .dropdown-toggle',
    SORT_MENU: '.dropdown-menu.dropdown-menu-end.show',
    FEATURED: '#sort_option_website_sequence_asc',
    NEWEST: '#sort_option_create_date_desc',
    AZ: '#sort_option_website_sequence_asc',
    LOW_HIGH: '#sort_option_list_price_asc',
    HIGH_LOW: '#sort_option_list_price_desc',
};
// banner selectors
export const BANNER_SELECTORS = {
    CAROUSEL: '[data-name="Main Banner Slider"] .carousel-inner',
    SLIDES: '[data-name="Main Banner Slider"] .carousel-item',
    INDICATORS: '[data-name="Main Banner Slider"] .carousel-indicators button',
    NEXT_ARROW: '[data-name="Main Banner Slider"] .carousel-control-next',
    PREV_ARROW: '[data-name="Main Banner Slider"] .carousel-control-prev',
};
export const CONTACT_SELECTORS = {
    contact_us_LINK:"#auto_id_22",
    Name:"#contact_name",
    Phone_Number:"#contact_phone",
    Email:"#contact_email",
    Massege:"#contact_message",
    Attachment:"#contact_attachment",
    Submit_Button:"#contact_submit"
    
};