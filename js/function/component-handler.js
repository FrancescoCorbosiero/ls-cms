import { BLACK, CLICK, ERROR_DIALOG_ID, LOGIN_DIALOG_ID, LOGIN_PASSWORD_TEXTFIELD_ID, LOGIN_USERNAME_TEXTFIELD_ID, ORDER_CODE_TEXTFIELD_ID, PALLET_CARD_ID, PALLET_DATA_DIALOG_ID, PALLET_DELETE_CARD_BUTTON_ID, PALLET_DIALOG_TITLE_ID, PALLET_LIST_DIV_ID, PALLET_OPEN_DIALOG_BUTTON_ID, PALLET_OPEN_DROPDOWN_TYPE_BUTTON_ID, PALLET_OVERALL_VOLUME_ID, PALLET_OVERALL_WEIGTH_ID, PALLET_TYPE_ATTRIBUTE_ID, PALLET_TYPE_DROPDOWN_ID, PENDING_CUSTOMERS_DATA_TABLE_ID, PENDING_ORDERS_DATA_TABLE_ID, REGISTRED_CUSTOMERS_DATA_TABLE_ID, SERVICE_OPEN_DROPDOWN_TYPE_BUTTON_ID, SNACKBAR_ID, SNACKBAR_TEXT_ID, TRACE_ORDER_DATA_TABLE_ID, TRACKING_STATE_OPEN_DROPDOWN_TYPE_BUTTON_ID, TRACKING_STATE_ATTRIBUTE_ID } from "../constant/costant.js";
import { getPalletData, updateOverallData } from "./data-handler.js";
import { isLoginDialogFormNotValid, isPalletDialogBoxFormValid } from "./form-validator.js";
import { getMdComponent, initMdComponents } from "../components/data/component-data.js";
import { userData } from "../components/data/user-data.js";
import { createPalleCard } from "../components/types/card-component.js";
import { appendHtmlInDiv, deleteElement, disableButtonComponent, enableButtonComponent, hideElement, scroolOnElement, showElement } from "../utility/component-util.js";
import { removeArrayElement, removeArrayElementByIndex } from "../utility/array-util.js";
import { getLoaderDvg as getLoaderSvg, initCmsFormUI, playShakeErrorAnimation, playShakeTextfieldErrorAnimation, setButtonToLoadState, setButtonToReadyState, showError } from "./ui-handler.js";
import { approvePendingCustomersRestCall, declinePendingCustomersRestCall, doLoginRestCall, getPendingCustomersRestCall, getRegistredCustomersRestCall, tracerOrderRestCall } from "../rest/rest-caller.js";
import { getDataTable, getPendingCustomersDataTable, getRegistedCustomersDataTable } from "../components/types/data-tables-component.js";
import { language } from "../constant/language-messages.js";
import * as stringUtil from "../utility/string-util.js";

let currentTabViewElementId;
let isCmsBeenInitialize = false;
let typeSelected = false;

export function openErrorDialog(){
    let dialog = getMdComponent(ERROR_DIALOG_ID);

    dialog.escapeKeyAction = "";
    dialog.scrimClickAction = "";
    
    dialog.open();
}

export function openLoginDialog(){
    let dialog = getMdComponent(LOGIN_DIALOG_ID);

    dialog.escapeKeyAction = "";
    dialog.scrimClickAction = "";
    
    dialog.open();
}

export async function executeLogin(buttonCallerId){
    let buttonCaller = document.getElementById(buttonCallerId);

    setButtonToLoadState(buttonCaller);
    disableButtonComponent(buttonCaller);

    //Validate form
    let formNotValid = isLoginDialogFormNotValid();

    if(formNotValid){
        enableButtonComponent(buttonCaller);
        setButtonToReadyState(buttonCaller);

        return;
    }

    //Get data from fields
    let mdcUsernameTextField = getMdComponent(LOGIN_USERNAME_TEXTFIELD_ID);
    userData.username = mdcUsernameTextField.value;

    let mdcPasswordTextField = getMdComponent(LOGIN_PASSWORD_TEXTFIELD_ID);
    userData.password = mdcPasswordTextField.value;

    //Rest call
    try {
        await doLoginRestCall();

        let dialog = getMdComponent(LOGIN_DIALOG_ID);
        dialog.close();

        initCms();
    } catch(error) {
        showSnackBarError("Ops, si è verificato un errore");
    }

    enableButtonComponent(buttonCaller);
    setButtonToReadyState(buttonCaller);
}

export function switchTab(id){
    //hide the prev selected tab
    hideElement(currentTabViewElementId);

    //show the tab view selected
    showElement(id);
    currentTabViewElementId = id;
}

export function setCurretTabView(id){
    currentTabViewElementId = id;
}

export function showSnackBarError(message){
    let snackbar = getMdComponent(SNACKBAR_ID);

    let snackbarMessage = document.getElementById(SNACKBAR_TEXT_ID);

    snackbarMessage.textContent = message;

    snackbar.open();
}

export async function initCms(){
    if(isCmsBeenInitialize){
        return;
    }

    //Get table data 
    try {
        await getPendingCustomersRestCall();
        await getRegistredCustomersRestCall();

        initCmsFormUI();
        initMdComponents();

        isCmsBeenInitialize = true;
    } catch(error) {
        console.error(error);
        showSnackBarError("Ops, si è verificato un errore");
    }
}

export async function approvePendingCustomer(customer){
    let pendingDataTable = document.getElementById(PENDING_CUSTOMERS_DATA_TABLE_ID);
    let email = customer.email;

    let prevContent = pendingDataTable.innerHTML;

    //Get table data 
    try {
        pendingDataTable.innerHTML = getLoaderSvg(20, BLACK);

        await approvePendingCustomersRestCall(email);

        await refreshCustomerDataTable();

    } catch(error) {
        console.error(error);

        pendingDataTable.innerHTML = prevContent;
        showSnackBarError("Ops, si è verificato un errore");
    }
}

export async function declinePendingCustomer(customer){
    let pendingDataTable = document.getElementById(PENDING_CUSTOMERS_DATA_TABLE_ID);
    let email = customer.email;

    let prevContent = pendingDataTable.innerHTML;

    //Get table data 
    try {
        pendingDataTable.innerHTML = getLoaderSvg(20, BLACK);

        await declinePendingCustomersRestCall(email);

        await refreshCustomerDataTable();
    } catch(error) {
        console.error(error);

        pendingDataTable.innerHTML = prevContent;
        showSnackBarError("Ops, si è verificato un errore");
    }
}

async function refreshCustomerDataTable(){
    let pendingDataTable = document.getElementById(PENDING_CUSTOMERS_DATA_TABLE_ID);
    let registredDataTable = document.getElementById(REGISTRED_CUSTOMERS_DATA_TABLE_ID);
    
    registredDataTable.innerHTML = getLoaderSvg(20, BLACK);

    await getPendingCustomersRestCall();
    pendingDataTable.innerHTML = getPendingCustomersDataTable();

    await getRegistredCustomersRestCall();
    registredDataTable.innerHTML = getRegistedCustomersDataTable();
}

export async function tracerOrder(){
    let mdcOrderCodeTextField = getMdComponent(ORDER_CODE_TEXTFIELD_ID);

    let orderCode = mdcOrderCodeTextField.value;

    let isOrderCodeNotValid = stringUtil.isNullOrEmpty(orderCode);

    if(isOrderCodeNotValid){
        playShakeTextfieldErrorAnimation(mdcOrderCodeTextField, ORDER_CODE_TEXTFIELD_ID);
        return;
    }

    let trackingState = document.getElementById(TRACKING_STATE_OPEN_DROPDOWN_TYPE_BUTTON_ID).getAttribute(TRACKING_STATE_ATTRIBUTE_ID);
    let trackingStateNotSelected = !trackingState;
    
    if(trackingStateNotSelected){
        playShakeErrorAnimation(TRACKING_STATE_OPEN_DROPDOWN_TYPE_BUTTON_ID);
        return;
    }

    let tracerOrderDataTable = document.getElementById(TRACE_ORDER_DATA_TABLE_ID);
    let prevContent = tracerOrderDataTable.innerHTML;

    //Get table data 
    try {
        tracerOrderDataTable.innerHTML = getLoaderSvg(20, BLACK);

        await tracerOrderRestCall(orderCode, trackingState);

        tracerOrderDataTable.innerHTML = getDataTable(userData.tracedOrders, language.tracedOrdersEmpty);
    } catch(error) {
        console.error(error);

        tracerOrderDataTable.innerHTML = prevContent;
        showSnackBarError("Codice non presente");
    }   
}

export function openSelectableDropdown(buttonCallerId, dropdownId, attributeId){
    let dropdownComponent = getMdComponent(dropdownId);

    dropdownComponent.open = true;

    let menuItems = document.getElementById(dropdownId).querySelectorAll('.mdc-list-item');

    menuItems.forEach(menuOption => {
        menuOption.addEventListener(CLICK, () => {
            let value = menuOption.textContent;

            //Change button text with the selected type
            let buttonElement = document.getElementById(buttonCallerId);
            buttonElement.textContent = value;
            
            //Set in the button the item selected
            let itemIndex = menuOption.getAttribute(attributeId);
            buttonElement.setAttribute(attributeId, itemIndex);
            
            typeSelected = true;

            dropdownComponent.open = false;
        });
    });
}