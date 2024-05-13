//STATE MACHINE STATES
    //Cms
    export const CUSTOMER_VIEW = "CUSTOMER_VIEW";
    export const ORDER_VIEW = "ORDER_VIEW";

    //Pending
    export const PENDING_STEP = "PENDING_STEP";
    //Registration
    export const CONFIRM_REGISTRATION_STEP = "CONFIRM_REGISTRATION_STEP";
    export const REGISTRATION_EMAIL_SENT_STEP = "REGISTRATION_EMAIL_SENT_STEP";
    //Order
    export const ORDER_STEP = "ORDER_STEP";
    export const RECIPIENT_STEP = "RECIPIENT_STEP";
    export const CONFIRM_ORDER_STEP = "CONFIRM_ORDER_STEP";
    export const ORDER_EMAIL_SENT_STEP = "ORDER_EMAIL_SENT_STEP";
    

//REGISTRATION STATES
    export const REGISTERED_STATUS = "REGISTERED";
    export const PENDING_STATUS = "PENDING";
    export const NEW_STATUS = "NEW";

//ICON NAMES
    export const HOURGLASS_EMPTY_ICON = "hourglass_empty";
    export const DELETE_ICON = "delete";

//REGEX
    export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    export const MOBILE_PHONE_REGEX = /^(\+\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    export const POSTALCODE_REGEX = /^\d{5}$|^\d{5}-\d{4}$/;
    export const ONLY_NUMBERS_REGEX = /^\d+$/;

//CSS

    //BOOTSTRAP

    export const BOOTSTRAP_DISPLAY_NONE_CLASS = "d-none";

    //MDC

    export const MDC_TEXT_FIELD_CLASS = "mdc-text-field";
    export const DISABLE_ACTION_BUTTON_CLASS = "mdc-text-field--disabled";
    export const DISABLE_OPACITY_BUTTON_CLASS = "mdc-disabled-text-field-opacity";

    //ANIMATIONS
    export const FADE_OUT_ANIMATION_CLASS = "fade-out";
    export const FADE_IN_ANIMATION_CLASS = "fade-in";
    export const BOUCE_IN_RIGHT_ANIMATION_CLASS = "bounce-in-right";

    //COLORS
    export const BLACK = "black";
    export const WHITE = "white";

//ID

    //APP
    export const APP_ID = "app-id";

    //SNACKBAR
    export const SNACKBAR_ID = "snackbar-id";
    export const SNACKBAR_TEXT_ID = "snackbar-text-id";

    //DIV
    export const FORM_DIV_ID = "form-id";
    export const PALLET_LIST_DIV_ID = "pallet-list-id";

    //CARD
    export const PALLET_CARD_ID = "pallet-card-id";

    //TAB BAR
    export const CUSTOMERS_TAB_BAR_ID = "customers-tab-bar-id";
    export const ORDERS_TAB_BAR_ID = "orders-tab-bar-id";
    export const TRACKING_TAB_BAR_ID = "tracking-tab-bar-id";

    //DATA TABLE
        //Customer
        export const PENDING_CUSTOMERS_DATA_TABLE_ID = "pending-customers-data-table-id";
        export const REGISTRED_CUSTOMERS_DATA_TABLE_ID = "registred-customers-data-table-id";
        //Order
        export const PENDING_ORDERS_DATA_TABLE_ID = "pending-orders-data-table-id";
        export const REGISTRED_ORDERS_DATA_TABLE_ID = "registred-orders-data-table-id";
        //Tracking
        export const TRACE_ORDER_DATA_TABLE_ID = "trace-order-data-table-id";

    //TAB CONTENT VIEW
    export const PENDING_CUSTOMERS_TAB_CONTENT_VIEW_ID = "pending-customers-tab-content-view-id";
    export const REGISTRED_CUSTOMERS_TAB_CONTENT_VIEW_ID = "registred-customers-tab-content-view-id";

    export const PENDING_ORDERS_TAB_CONTENT_VIEW_ID = "pending-orders-tab-content-view-id";
    export const REGISTRED_ORDERS_TAB_CONTENT_VIEW_ID = "registred-orders-tab-content-view-id";

    export const TRACE_ORDER_TAB_CONTENT_VIEW_ID = "trace-order-tab-content-view-id";

    //LOGO
    export const LOGO_ID = "logo-id";
    
    //BUTTONS
        //DATA TABLE
            //Customer
            export const APPROVE_PENDING_CUSTOMER_BUTTON_ID = "approve-pending-customer-button-id";
            export const DECLINE_PENDING_CUSTOMER_BUTTON_ID = "decline-pending-customer-button-id";
            //Order
            export const APPROVE_PENDING_ORDER_BUTTON_ID = "approve-pending-order-button-id";
            export const DECLINE_PENDING_ORDER_BUTTON_ID = "decline-pending-order-button-id";

            export const TRACE_ORDER_BUTTON_ID = "trace-order-button-id";

        //TAB BAR BUTTONS
        export const PENDING_CUSTOMERS_TAB_BUTTON_ID = "pending-customers-tab-button-id";
        export const REGISTRED_CUSTOMERS_TAB_BUTTON_ID = "registred-customers-tab-button-id";

        export const PENDING_ORDERS_TAB_BUTTON_ID = "pending-orders-tab-button-id";
        export const REGISTRED_ORDERS_TAB_BUTTON_ID = "registred-orders-tab-button-id";
        export const SEARCH_ORDER_TAB_BUTTON_ID = "search-order-tab-button-id";

        //NAV BUTTONS
        export const ORDER_BUTTON_ID = "order-button-id";
        export const CUSTOMER_BUTTON_ID = "customer-button-id";
        export const REFRESH_BUTTON_ID = "refresh-button-id";

        //NAV ICONS
        export const ORDER_BUTTON_ICON_ID = "order-button-icon-id";
        export const CUSTOMER_BUTTON_ICON_ID = "customer-button-icon-id";
        export const REFRESH_BUTTON_ICON_ID = "refresh-button-icon-id";

        //DIALOG BUTTONS
        export const PALLET_OPEN_DIALOG_BUTTON_ID = "pallet-open-dialog-button-id";
        export const PALLET_CONFIRM_DIALOG_BUTTON_ID = "pallet-confirm-dialog-button-id";
        export const PALLET_DELETE_CARD_BUTTON_ID = "pallet-delete-card-button-id";
        export const LOGIN_DIALOG_BUTTON_ID = "login-dialog-button-id";

        //DROPDOWN BUTTONS
        export const PALLET_OPEN_DROPDOWN_TYPE_BUTTON_ID = "pallet-open-dropdown-type-button-id";
        export const SERVICE_OPEN_DROPDOWN_TYPE_BUTTON_ID = "service-open-dropdown-type-button-id";

        export const TRACKING_STATE_OPEN_DROPDOWN_TYPE_BUTTON_ID = "tracking-state-open-dropdown-type-button-id";

        //SERVICE
        export const SERVICE_TYPE_ATTRIBUTE_ID = "serviceTypeId";
        export const TRACKING_STATE_ATTRIBUTE_ID = "trackingStateId";

        //PALLET TYPE
        export const PALLET_TYPE_ATTRIBUTE_ID = "palletTypeId";
        export const GENERIC_PALLET_TYPE_ID = "0";
        export const EPAL_TYPE_ID = "1";
        export const GENERIC_PALLET_TYPE_VALUE = "PALLET";
        export const EPAL_TYPE_VALUE = "EPAL";

    //DIALOG
    export const PALLET_DATA_DIALOG_ID = "pallet-data-dialog-id";
    export const ERROR_DIALOG_ID = "error-dialog-id";
    export const LOGIN_DIALOG_ID = "login-dialog-id";

    //DROPDOWN
    export const PALLET_TYPE_DROPDOWN_ID = "pallet-type-dropdown-id";
    export const SERVICE_DROPDOWN_ID = "service-dropdown-id";

    export const TRACKING_STATE_DROPDOWN_ID = "tracking-state-dropdown-id";
    
    //TEXT FIELD ID
        //LOGIN
        export const LOGIN_USERNAME_TEXTFIELD_ID = "login-username-field-email-id";
        export const LOGIN_PASSWORD_TEXTFIELD_ID = "login-password-field-email-id";

        //ORDERS
        export const ORDER_CODE_TEXTFIELD_ID = "order-code-field-email-id";


        //USER
        export const EMAIL_TEXTFIELD_ID = "text-field-email-id";
        export const COMPANY_TEXTFIELD_ID = "text-field-company-id";
        export const ADDRESS_TEXTFIELD_ID = "text-field-address-id";
        export const PROVINCE_TEXTFIELD_ID = "text-field-province-id";
        export const CITY_TEXTFIELD_ID = "text-field-city-id";
        export const POSTALCODE_TEXTFIELD_ID = "text-field-postal-code-id";
        export const PHONE_TEXTFIELD_ID = "text-field-phone-id";
       
        //ORDER

            //PACKAGE
            export const PACKAGE_QUANTITY_TEXTFIELD_ID = "text-field-package-quantity-id";
            export const PACKAGE_WEIGHT_TEXTFIELD_ID = "text-field-package-weight-id";
            export const PACKAGE_VOLUME_TEXTFIELD_ID = "text-field-package-volume-id";
            //EPAL
            export const EPAL_QUANTITY_TEXTFIELD_ID = "text-field-epal-quantity-id";
            //PALLET
            export const PALLET_HEIGHT_TEXTFIELD_ID = "text-field-pallet-height-id";
            export const PALLET_WEIGHT_TEXTFIELD_ID = "text-field-pallet-weight-id";
            export const PALLET_LENGHT_TEXTFIELD_ID = "text-field-pallet-lenght-id";
            export const PALLET_WIDTH_TEXTFIELD_ID = "text-field-pallet-width-id";
            export const PALLET_QUANTITY_TEXTFIELD_ID = "text-field-pallet-quantity-id";
            //TRANSPORT
            export const DELIVERY_DOCUMENT_TEXTFIELD_ID = "text-field-delivery-document-id";
            export const ORDER_NOTES_TEXTAREA_ID = "text-area-order-notes-id";

    //TEXT

        //PALLET
        export const PALLET_DIALOG_TITLE_ID = "pallet-dialog-title-id";
        export const PALLET_OVERALL_WEIGTH_ID = "pallet-overall-weigth-id";
        export const PALLET_OVERALL_VOLUME_ID = "pallet-overall-volume-id";

        //ERROR
        export const ERROR_DIALOG_TITLE_ID = "error-dialog-title-id";


    //FORM

        //Cms
        export const CUSTOMER_VIEW_FORM_ID = "customer-view-form-id";
        export const ORDER_VIEW_FORM_ID = "order-view-form-id";
        export const TRACKING_VIEW_FORM_ID = "tracking-view-form-id";


        //Pending
        export const PENDING_FORM_ID = "pending-form-id";
        //Registration
        export const CONFIRM_DATA_FORM_ID = "confirm-data-form-id";
        export const REGISTRATION_EMAIL_SENT_FORM_ID = "registration-email-sent-form-id";
        //Order
        export const ORDER_FORM_ID = "order-form-id";
        export const RECIPIENT_FORM_ID = "recipient-form-id";
        export const ORDER_EMAIL_SENT_FORM_ID = "order-email-sent-form-id";


//MD COMPONENTS TYPES

export const DIALOG_COMPONENT_TYPE = "DIALOG_COMPONENT_TYPE";
export const SNACKBAR_COMPONENT_TYPE = "SNACKBAR_COMPONENT_TYPE";
export const TEXT_FIELD_COMPONENT_TYPE = "TEXT_FIELD_COMPONENT_TYPE";
export const TAB_BAR_COMPONENT_TYPE = "TAB_BAR_COMPONENT_TYPE";
export const DROPDOWN_COMPONENT_TYPE = "DROPDOWN_COMPONENT_TYPE";
export const RADIOBUTTON_COMPONENT_TYPE = "RADIOBUTTON_COMPONENT_TYPE";

//BUTTON TYPE 
export const BUTTON_ROUNDED = "BUTTON_ROUNDED";
export const BUTTON_STANDARD = "BUTTON_STANDARD";
export const BUTTON_TAB_BAR = "BUTTON_TAB_BAR";

//EVENT LISTENER TYPES
export const CLICK = "click";
