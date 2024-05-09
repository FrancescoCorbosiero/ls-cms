import { initMdComponents } from "../components/data/component-data.js";
import { CONFIRM_REGISTRATION_STEP, REGISTRATION_EMAIL_SENT_STEP, NEW_STATUS, ORDER_STEP, PENDING_STEP, PENDING_STATUS, REGISTERED_STATUS, ORDER_VIEW, CUSTOMER_VIEW as CUSTOMER_VIEW, PALLET_DATA_DIALOG_ID, RECIPIENT_STEP, CONFIRM_ORDER_STEP, ORDER_EMAIL_SENT_STEP } from "../constant/costant.js";
import { getPendingOrdersRestCall, getTrackingStatesRestCall } from "../rest/rest-caller.js";
import { saveEmail, saveOrderData, saveRecipientData, saveRegistrationData } from "./data-handler.js";
import { isEmailFormValid, isOrderFormValid, isRecipientFormValid, isRegistrationFormValid as isRegistrationFormValid } from "./form-validator.js";
import { setNavigationButtonsToLoadState, showError, updateNavigationButtonsUI, updateRegistrationFormUI } from "./ui-handler.js";

export let currentView = CUSTOMER_VIEW;

let orderSectionNotLoader = true;

export async function swapToOrderSection(){ 
    setNavigationButtonsToLoadState();

    if(orderSectionNotLoader){
        await getPendingOrdersRestCall();
        await getTrackingStatesRestCall();

        orderSectionNotLoader = false;
    }

    updateState(ORDER_VIEW);
}

export function swapToCustomerSection(){ 
    setNavigationButtonsToLoadState();

    updateState(CUSTOMER_VIEW);
}

async function updateState(nextState){
    await updateRegistrationFormUI(nextState);
    
    currentView = nextState;

    updateNavigationButtonsUI();
    initMdComponents();
}