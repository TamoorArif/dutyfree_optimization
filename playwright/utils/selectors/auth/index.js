// LOGIN SELECTORS
export const LOGIN_SELECTORS = {
  USER_LOGIN_POPUP: '#userloginpopup',
  USER_EMAIL: '#login',
  USER_PASSWORD: '#password',
  SUBMIT_BTN: '#loginsubmitbutton',
  EMAIL_VERIFIED: '.gap-2 .text-break',
  ERROR_MESSAGE: '#errormsg',
};

// Signup selectors
export const SINGLE_USER_SIGNUP_SELECTORS = {
  PROFILE_CLICK: '#userloginpopup',
  SINGLE_USER_HYPERLINK: '#signuptoday',
  EMAIL_FOR_SINGLE_USER: '#logins',
  NAME_FOR_SINGLE_USER: '#names',
  PASSWORD: '#passwords',
  CONFIRM_PASSWORD: '#confirm_passwords',
  SIGNUP_BTN: '#signupbutton',
  EMAIL_VERIFIED_SIGNUP: '#unique_verify_email',
  ERROR_MESSAGE: '#errors',
};

// Signup selectors for Wholesaler
export const WHOLESALER_SIGNUP_SELECTORS = {
  PROFILE_CLICK: '#userloginpopup',
  WHOLESALER_HYPERLINK: '#wholesignuptoday',
  FIRST_NAME: '#firstname',
  LAST_NAME: '#lastname',
  CONTACT_NUMBER: '#contact_number',
  EMAIL: '#email',
  STREET: '#street',
  COUNTRY: '#country_id',
  CITY: '#city',
  POSTAL_CODE: '#zip',
  STORE_NAME: '#store_name',
  TYPE_OF_BUSINESS: '#business_type',
  SUBMIT_BTN: '#submitbuttonwhole'
};

// Reset Password selectors
export const RESET_PASSWORD_SELECTORS = {
  LOGIN_BTN: '#userloginpopup',
  FORGOT_LINK: '#forgotpassword',
  SUCCESS_MSG: 'text=Check your email'
};