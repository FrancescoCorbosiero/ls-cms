import { initMdComponents, addMdComponentToInit } from "../components/data/component-data.js";
import { APPROVE_ORDER_DATA_DIALOG_ID, APPROVE_CUSTOMER_DATA_DIALOG_ID, DECLINE_CUSTOMER_DATA_DIALOG_ID, DECLINE_ORDER_DATA_DIALOG_ID, CONFIRM_REGISTRATION_STEP, REGISTRATION_EMAIL_SENT_STEP, NEW_STATUS, ORDER_STEP, PENDING_STEP, PENDING_STATUS, REGISTERED_STATUS, ORDER_VIEW, CUSTOMER_VIEW as CUSTOMER_VIEW, RECIPIENT_STEP, CONFIRM_ORDER_STEP, ORDER_EMAIL_SENT_STEP } from "../constant/costant.js";
import { getPendingCustomersRestCall, getRegistredCustomersRestCall, getPendingOrdersRestCall, getRegistredOrdersRestCall, getTrackingStatesRestCall, getAccessoryServiceRestCall } from "../rest/rest-caller.js";
import { saveEmail, saveOrderData, saveRecipientData, saveRegistrationData } from "./data-handler.js";
import { isEmailFormValid, isOrderFormValid, isRecipientFormValid, isRegistrationFormValid as isRegistrationFormValid } from "./form-validator.js";
import { initCmsUI, setNavigationButtonsToLoadState, showError, updateNavigationButtonsUI, updateRegistrationFormUI, refreshFormUI} from "./ui-handler.js";
import { userData } from "../components/data/user-data.js";

export let currentView = CUSTOMER_VIEW;

let orderSectionNotLoader = true;

export async function swapToOrderSection(){ 
    setNavigationButtonsToLoadState();

    if(orderSectionNotLoader){
        await getPendingOrdersRestCall();
        await getRegistredOrdersRestCall();
        await getTrackingStatesRestCall();
        await getAccessoryServiceRestCall();

        orderSectionNotLoader = false;
    }

    updateState(ORDER_VIEW);
}

export function swapToCustomerSection(){ 
    setNavigationButtonsToLoadState();

    updateState(CUSTOMER_VIEW);
}

export async function refreshSection(){
    setNavigationButtonsToLoadState();

    if(currentView == ORDER_VIEW){
        await getPendingOrdersRestCall();
        await getRegistredOrdersRestCall();
        await refreshFormUI(ORDER_VIEW)
        updateNavigationButtonsUI();
        initMdComponents();
    } else {
        await getPendingCustomersRestCall();
        await getRegistredCustomersRestCall();
        await refreshFormUI(CUSTOMER_VIEW)
        updateNavigationButtonsUI();
        initMdComponents();
    }
}

async function updateState(nextState){
    await updateRegistrationFormUI(nextState);
    
    currentView = nextState;

    updateNavigationButtonsUI();
    initMdComponents();
}