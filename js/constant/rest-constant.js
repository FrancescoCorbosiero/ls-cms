//URLS
export const HOST = `http://uat-sanchez-logistica.eu-north-1.elasticbeanstalk.com`;
//export const HOST = `https://api.logisticasanchez.com`;

    //LOGIN
    export const LOGIN_URL = HOST + `/mono/auth/login`;

    //CUSTOMER
    export const PENDING_CUSTOMERS_URL = HOST + `/mono/api/customer/pending`;
    export const REGISTRED_CUSTOMERS_URL = HOST + `/mono/api/customer/registered`;

    export const APPROVE_PEDING_CUSTOMERS_URL = HOST + `/mono/cms/customer/confirm`;
    export const DECLINE_PEDING_CUSTOMERS_URL = HOST + `/mono/cms/customer/decline`;
    export const APPROVE_PEDING_ORDERS_URL = HOST + `/mono/cms/order/confirm`;
    export const DECLINE_PEDING_ORDERS_URL = HOST + `/mono/cms/order/decline`;

    //ORDER
    export const PENDING_ORDERS_URL = HOST + `/mono/api/order/pending`;
    export const REGISTRED_ORDERS_URL = HOST + `/mono/api/order/registered`;

    // TRACKING
    export const TRACE_ORDERS_URL = HOST + `/mono/cms/order/trace`;

    // NOTES
    export const NOTES_URL = HOST + `/mono/cms/notes`;
    export const UPDATE_NOTES_URL = HOST + `/mono/cms/notes/update`;

    // DETAIL
    export const DETAIL_URL = HOST + `/mono/api/order/detail`;

    // REPORT
    export const REPORT_URL = HOST + `/mono/cms/order/report`;

    //ENUM
    export const TRACKING_STATES_URL = HOST + `/mono/api/enumeration/statoTracking`;
    export const ACCESSORY_SERVICE_URL = HOST + `/mono/api/enumeration/servizioAccessorio`;
//METHOD
export const POST = "POST";
export const GET = "GET";
