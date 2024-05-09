//URLS
export const HOST = `http://uat-sanchez-logistica.eu-north-1.elasticbeanstalk.com`;

    //LOGIN
    export const LOGIN_URL = HOST + `/mono/auth/login`;

    //CUSTOMER
    export const PENDING_CUSTOMERS_URL = HOST + `/mono/api/customer/pending`;
    export const REGISTRED_CUSTOMERS_URL = HOST + `/mono/api/customer/registered`;

    export const APPROVE_PEDING_CUSTOMERS_URL = HOST + `/mono/cms/customer/confirm`;
    export const DECLINE_PEDING_CUSTOMERS_URL = HOST + `/mono/cms/customer/decline`;

    //ORDER
    export const PENDING_ORDERS_URL = HOST + `/mono/api/order/pending`;
    export const TRACE_ORDERS_URL = HOST + `/mono/cms/order/trace`;

    //ENUM
    export const TRACKING_STATES_URL = HOST + `/mono/api/enumeration/statoTracking`;
//METHOD
export const POST = "POST";
export const GET = "GET";
