const { VITE_API_DOMAIN, REACT_APP_API_WEB_DOMAIN } = import.meta.env;

export const API_DOMAIN = VITE_API_DOMAIN + "api/";
// export const API_WEB_DOMAIN = REACT_APP_API_WEB_DOMAIN;

//login
export const API_AUTHENTICATE = API_DOMAIN + "authenticate";

//customer register
export const API_CUSTOMER_REGISTER = API_DOMAIN + "customer-register";

//Address update
export const API_ADDRESS_UPDATE = API_DOMAIN + "address-update";

//Category
export const API_CATEGORIES = API_DOMAIN + "categories";

//Sub-category
export const API_SUB_CATEGORY = API_DOMAIN + "sub-category";

// place order 
export const API_PLACE_ORDER = API_DOMAIN + "place-order";

//order history
export const API_ALL_ORDERS = API_DOMAIN + "all-orders";






