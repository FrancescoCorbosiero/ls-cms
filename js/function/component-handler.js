import { DIV_SPEDIZIONE_DETAIL_ID, DIV_COLLI_DETAIL_ID, DIV_PALLET_DETAIL_ID, DETAIL_DATA_DIALOG_ID, DELIVERY_DATA_DIALOG_ID, NOTES_PRE_ID, REPORT_EMAIL_TEXTFIELD_ID, DATE_FROM_PICKER_ID, DATE_TO_PICKER_ID, NOTES_DATA_DIALOG_ID, NOTES_TEXTFIELD_ID, SERVICE_TYPE_ATTRIBUTE_ID, DECLINE_CUSTOMER_DIALOG_BUTTON_ID, DECLINE_ORDER_DIALOG_BUTTON_ID, APPROVE_CUSTOMER_DIALOG_BUTTON_ID, APPROVE_ORDER_DIALOG_BUTTON_ID, CODICE_TEXTFIELD_ID, IMPORTO_CONTRASSEGNO_TEXTFIELD_ID, IMPORTO_ASSICURATO_TEXTFIELD_ID, CODICE_DOCUMENTO_TRASPORTO_TEXTFIELD_ID, APPROVE_CUSTOMER_DATA_DIALOG_ID, APPROVE_ORDER_DATA_DIALOG_ID, BLACK, CLICK, ERROR_DIALOG_ID, LOGIN_DIALOG_ID, DECLINE_ORDER_DATA_DIALOG_ID, LOGIN_PASSWORD_TEXTFIELD_ID, LOGIN_USERNAME_TEXTFIELD_ID, ORDER_CODE_TEXTFIELD_ID, PALLET_CARD_ID, PALLET_DELETE_CARD_BUTTON_ID, PALLET_DIALOG_TITLE_ID, PALLET_LIST_DIV_ID, PALLET_OPEN_DIALOG_BUTTON_ID, PALLET_OPEN_DROPDOWN_TYPE_BUTTON_ID, PALLET_OVERALL_VOLUME_ID, PALLET_OVERALL_WEIGTH_ID, PALLET_TYPE_ATTRIBUTE_ID, PALLET_TYPE_DROPDOWN_ID, PENDING_CUSTOMERS_DATA_TABLE_ID, PENDING_ORDERS_DATA_TABLE_ID, REGISTRED_CUSTOMERS_DATA_TABLE_ID, SERVICE_OPEN_DROPDOWN_TYPE_BUTTON_ID, SNACKBAR_ID, SNACKBAR_TEXT_ID, TRACE_ORDER_DATA_TABLE_ID, TRACKING_STATE_OPEN_DROPDOWN_TYPE_BUTTON_ID, TRACKING_STATE_ATTRIBUTE_ID } from "../constant/costant.js";
import { getPalletData, updateOverallData } from "./data-handler.js";
import { isApproveOrderDialogFormNotValid, isLoginDialogFormNotValid, isPalletDialogBoxFormValid } from "./form-validator.js";
import { getMdComponent, initMdComponents } from "../components/data/component-data.js";
import { userData } from "../components/data/user-data.js";
import { createPalleCard } from "../components/types/card-component.js";
import { appendHtmlInDiv, deleteElement, disableButtonComponent, enableButtonComponent, hideElement, scroolOnElement, showElement } from "../utility/component-util.js";
import { removeArrayElement, removeArrayElementByIndex } from "../utility/array-util.js";
import { getLoaderDvg as getLoaderSvg, initCmsFormUI, playShakeErrorAnimation, playShakeTextfieldErrorAnimation, setButtonToLoadState, setButtonToReadyState, showError } from "./ui-handler.js";
import { getTrackingStatesRestCall, reportRestCall, updateNotesRestCall, approvePendingOrdersRestCall, declinePendingOrdersRestCall , approvePendingCustomersRestCall, declinePendingCustomersRestCall, doLoginRestCall, getPendingCustomersRestCall, getRegistredCustomersRestCall, getPendingOrdersRestCall, getRegistredOrdersRestCall, tracerOrderRestCall, getNotesRestCall, getOrderDetailRestCall} from "../rest/rest-caller.js";
import { getDataTable, getPendingCustomersDataTable, getRegistedCustomersDataTable } from "../components/types/data-tables-component.js";
import { language } from "../constant/language-messages.js";
import * as stringUtil from "../utility/string-util.js";
import { refreshSection } from "./state-machine.js";

let currentTabViewElementId;
let isCmsBeenInitialize = false;
let typeSelected = false;

export function openErrorDialog(){
    let dialog = getMdComponent(ERROR_DIALOG_ID);

    dialog.escapeKeyAction = "";
    dialog.scrimClickAction = "";

    dialog.open();
}

export function openDialog(dialogId, payload){
    userData.rowPayload = payload;

    //Get MD dialog
    let dialog = getMdComponent(dialogId);

    dialog.open();
}

export function openNotesDialog(payload){

    userData.rowPayload = payload;
    userData.rowPayload['Note'] = getNotes();

    //Get MD dialog
    let dialog = getMdComponent(NOTES_DATA_DIALOG_ID);

    dialog.open();

}

export function openDeliveryDialog(payload){
    userData.rowPayload = payload;
    let codiceTxt = userData.rowPayload['Codice'];

    //Get MD dialog
    getMdComponent(ORDER_CODE_TEXTFIELD_ID).value = codiceTxt;

//    await getTrackingStatesRestCall();
    let dialog = getMdComponent(DELIVERY_DATA_DIALOG_ID);

    dialog.open();
}

export function openDetailDialog(codice){
    userData.rowPayload = codice;
    hydrateDetailForm();

    let dialog = getMdComponent(DETAIL_DATA_DIALOG_ID);
    dialog.open();
}

export function openLoginDialog(){
    let dialog = getMdComponent(LOGIN_DIALOG_ID);

    dialog.escapeKeyAction = "";
    dialog.scrimClickAction = "";
    
    dialog.open();
}

export async function hydrateDetailForm(){
    let detail = await getOrderDetail(userData.rowPayload);

    let spedizioneDiv = document.getElementById(DIV_SPEDIZIONE_DETAIL_ID);
    let colliDiv = document.getElementById(DIV_COLLI_DETAIL_ID);
    let palletDiv = document.getElementById(DIV_PALLET_DETAIL_ID);

    spedizioneDiv.innerHTML = "";
    colliDiv.innerHTML = "";
    palletDiv.innerHTML = "";


    let innerHtml = "";
    Object.entries(detail.spedizione).forEach(([key, value]) => {
            innerHtml = innerHtml.concat(`
                <div>
                    <span class="details-label">${key + ':'}</span>
                    <span class="details-value">${value != null ? value : "-"}</span>
                </div>
            `);
        });
    spedizioneDiv.innerHTML = innerHtml;

    innerHtml = "";
    Object.entries(detail.dettaglioColli).forEach(([key, value]) => {
        innerHtml = innerHtml.concat(`
            <div>
                <span class="details-label">${key + ':'}</span>
                <span class="details-value">${value}</span>
            </div>
        `);
    });
    colliDiv.innerHTML = innerHtml;

    innerHtml = "";
    detail.palletList.forEach(pallet => {
        Object.entries(pallet).forEach(([key, value]) => {
            innerHtml = innerHtml.concat(`
                <div>
                    <span class="details-label">${key + ':'}</span>
                    <span class="details-value">${value}</span>
                </div>
            `);
        });
        innerHtml = innerHtml.concat('<br>');
    });
    palletDiv.innerHTML = innerHtml;

    innerHtml = "";
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

export async function report(){
    let mdcReportEmailTextField = getMdComponent(REPORT_EMAIL_TEXTFIELD_ID);
    let email = mdcReportEmailTextField.value;
    let isEmailValid = stringUtil.isEmailFormatValid(email);

    let dateFromInput = document.getElementById(DATE_FROM_PICKER_ID);
    let dateFrom = dateFromInput.value;
    let isDateFromValid = true;

    let dateToInput = document.getElementById(DATE_TO_PICKER_ID);
    let dateTo = dateToInput.value;
    let isDateToValid = true;

    if(isEmailValid && isDateFromValid && isDateToValid){
        try {
            await reportRestCall(email, dateFrom, dateTo);
            showSnackBarError("Report inviato correttamente");
            await refreshSection();
        } catch(error) {
            console.error(error);
            showSnackBarError("Dati non validi");
        }
    } else{
        showSnackBarError("Dati non validi");
    }
}

export async function getOrderDetail(codice){
    //let dialog = getMdComponent(DETAIL_DATA_DIALOG_ID);
    try {
        let orderDetail = await getOrderDetailRestCall(codice);
        return orderDetail;

        //dialog.close();
    } catch(error) {
        console.error(error);
        //dialog.close();
        showSnackBarError("Ops, si è verificato un errore");
    }
}

export async function getNotes(){
    let order = userData.rowPayload;
    let dialog = getMdComponent(NOTES_DATA_DIALOG_ID);

    let notes = getMdComponent(NOTES_TEXTFIELD_ID);
    let pre = document.getElementById(NOTES_PRE_ID);

    notes.value = 'Nessuna nota presente';
    pre.innerHTML = 'Nessuna nota presente';

    try {
        let req = {
            codice: order['Codice']
        };

        let notesTxt = await getNotesRestCall(req);

        notes.value = notesTxt != null ? notesTxt : "Nessuna nota presente";
        pre.innerHTML = notesTxt != null ? notesTxt : "Nessuna nota presente";
        return notesTxt;

        dialog.close();
    } catch(error) {
        console.error(error);
        dialog.close();
        showSnackBarError("Ops, si è verificato un errore");
    }
}

export async function updateNotes(buttonCallerId){
    let buttonCaller = document.getElementById(buttonCallerId);

    setButtonToLoadState(buttonCaller);
    disableButtonComponent(buttonCaller);

//    let formNotValid = isApproveOrderDialogFormNotValid();
//
//    if(formNotValid){
//        enableButtonComponent(buttonCaller);
//        setButtonToReadyState(buttonCaller);
//        return;
//    }

    let notesTxt = getMdComponent(NOTES_TEXTFIELD_ID).value
    let order = userData.rowPayload;

    let dialog = getMdComponent(NOTES_DATA_DIALOG_ID);

    //Get table data
    try {
        let req = {
            codice: order['Codice'],
            notes: notesTxt
        };
        await updateNotesRestCall(req);

        await refreshSection();
        dialog.close();
    } catch(error) {
        console.error(error);
        dialog.close();
        pendingDataTable.innerHTML = prevContent;
        showSnackBarError("Ops, si è verificato un errore");
    }

    enableButtonComponent(buttonCaller);
    setButtonToReadyState(buttonCaller);
}

export async function approvePendingCustomer(buttonCallerId){
    let buttonCaller = document.getElementById(buttonCallerId);

    setButtonToLoadState(buttonCaller);
    disableButtonComponent(buttonCaller);

    let pendingDataTable = document.getElementById(PENDING_CUSTOMERS_DATA_TABLE_ID);
    let prevContent = pendingDataTable.innerHTML;

    let customer = userData.rowPayload;
    let dialog = getMdComponent(APPROVE_CUSTOMER_DATA_DIALOG_ID);

    //Get table data 
    try {
        pendingDataTable.innerHTML = getLoaderSvg(20, BLACK);

        let email = customer['Email'];
        let req = {email: email};
        await approvePendingCustomersRestCall(req);

        await refreshSection();

        dialog.close();

    } catch(error) {
        console.error(error);
        pendingDataTable.innerHTML = prevContent;
        dialog.close();
        showSnackBarError("Ops, si è verificato un errore");
    }

    enableButtonComponent(buttonCaller);
    setButtonToReadyState(buttonCaller);
}

export async function declinePendingCustomer(buttonCallerId){
    let buttonCaller = document.getElementById(buttonCallerId);

    setButtonToLoadState(buttonCaller);
    disableButtonComponent(buttonCaller);

    let pendingDataTable = document.getElementById(PENDING_CUSTOMERS_DATA_TABLE_ID);

    let prevContent = pendingDataTable.innerHTML;

    let customer = userData.rowPayload;
    let dialog = getMdComponent(DECLINE_CUSTOMER_DATA_DIALOG_ID);
    //Get table data 
    try {
        pendingDataTable.innerHTML = getLoaderSvg(20, BLACK);

        let email = customer['Email'];
        let req = {email: email};
        await declinePendingCustomersRestCall(req);

        await refreshSection();
        dialog.close();
    } catch(error) {
        console.error(error);
        pendingDataTable.innerHTML = prevContent;
        dialog.close();
        showSnackBarError("Ops, si è verificato un errore");
    }

    enableButtonComponent(buttonCaller);
    setButtonToReadyState(buttonCaller);
}

export async function approvePendingOrder(buttonCallerId){
    let buttonCaller = document.getElementById(buttonCallerId);

    setButtonToLoadState(buttonCaller);
    disableButtonComponent(buttonCaller);

    let formNotValid = isApproveOrderDialogFormNotValid();

    if(formNotValid){
        enableButtonComponent(buttonCaller);
        setButtonToReadyState(buttonCaller);

        return;
    }

    //Get data from fields
    let codiceTxt = getMdComponent(CODICE_TEXTFIELD_ID).value;
    let importoAssicuratoTxt = getMdComponent(IMPORTO_ASSICURATO_TEXTFIELD_ID).value;

    let pendingDataTable = document.getElementById(PENDING_ORDERS_DATA_TABLE_ID);
    let order = userData.rowPayload;

    let prevContent = pendingDataTable.innerHTML;
    let dialog = getMdComponent(APPROVE_ORDER_DATA_DIALOG_ID);

    //Get table data
    try {
        pendingDataTable.innerHTML = getLoaderSvg(20, BLACK);

        let req = {
                id: order['ID'],
                req: {
                    codice: codiceTxt,
                    importoAssicurato: importoAssicuratoTxt,
                    tracking: 1,

                    // Optional
        //            note: null,
        //            servizioAccessorio: null,
        //            stato: null,
        //            updateShippingTs: true,
        //            updateDeliveryTs: false
                }
            };
        await approvePendingOrdersRestCall(req);

        await refreshSection();
        dialog.close();
    } catch(error) {
        console.error(error);
        dialog.close();
        pendingDataTable.innerHTML = prevContent;
        showSnackBarError("Ops, si è verificato un errore");
    }

    enableButtonComponent(buttonCaller);
    setButtonToReadyState(buttonCaller);
}

export async function declinePendingOrder(buttonCallerId){
    let buttonCaller = document.getElementById(buttonCallerId);

    setButtonToLoadState(buttonCaller);
    disableButtonComponent(buttonCaller);

    let pendingDataTable = document.getElementById(PENDING_ORDERS_DATA_TABLE_ID);

    let prevContent = pendingDataTable.innerHTML;
    let order = userData.rowPayload;
    let dialog = getMdComponent(DECLINE_ORDER_DATA_DIALOG_ID);
    //Get table data
    try {
        pendingDataTable.innerHTML = getLoaderSvg(20, BLACK);

        let req = {
            id: order['ID'],
            email: order['Cliente mittente']
        }
        await declinePendingOrdersRestCall(req);

        await refreshSection();
        dialog.close();
    } catch(error) {
        console.error(error);
        dialog.close();
        pendingDataTable.innerHTML = prevContent;
        showSnackBarError("Ops, si è verificato un errore");
    }

    enableButtonComponent(buttonCaller);
    setButtonToReadyState(buttonCaller);
}

async function refreshDataTable(){
    let pendingDataTable = document.getElementById(PENDING_CUSTOMERS_DATA_TABLE_ID);
    let registredDataTable = document.getElementById(REGISTRED_CUSTOMERS_DATA_TABLE_ID);
    
    registredDataTable.innerHTML = getLoaderSvg(20, BLACK);

    await getPendingCustomersRestCall();
    pendingDataTable.innerHTML = getPendingCustomersDataTable();

    await getRegistredCustomersRestCall();
    registredDataTable.innerHTML = getRegistedCustomersDataTable();
}

export async function tracerOrder(buttonCallerId){
    let buttonCaller = document.getElementById(buttonCallerId);

    setButtonToLoadState(buttonCaller);
    disableButtonComponent(buttonCaller);

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

    let dialog = getMdComponent(DELIVERY_DATA_DIALOG_ID);
    //Get table data 
    try {

        await tracerOrderRestCall(orderCode, trackingState);
        await refreshSection();

        dialog.close();
    } catch(error) {
        console.error(error);
        dialog.close();
        showSnackBarError("Codice non presente");
    }

    enableButtonComponent(buttonCaller);
    setButtonToReadyState(buttonCaller);
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