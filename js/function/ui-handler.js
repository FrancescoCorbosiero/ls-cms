import { createErrorDialog, createLoginDialog, createApproveOrderDialog, createApproveCustomerDialog, createDeclineOrderDialog, createNotesDialog, createDeliveryDialog, createDetailDialog, createDeclineCustomerDialog } from "../components/types/dialog-components.js";
import { getCustomerViewFormHtml } from "../components/types/form-components.js";
import { createSnackBar } from "../components/types/snackbar-component.js";
import { DECLINE_CUSTOMER_DIALOG_BUTTON_ID, DECLINE_ORDER_DIALOG_BUTTON_ID, APPROVE_CUSTOMER_DIALOG_BUTTON_ID, APPROVE_ORDER_DIALOG_BUTTON_ID, CODICE_TEXTFIELD_ID, IMPORTO_CONTRASSEGNO_TEXTFIELD_ID, IMPORTO_ASSICURATO_TEXTFIELD_ID, CODICE_DOCUMENTO_TRASPORTO_TEXTFIELD_ID, BOOTSTRAP_DISPLAY_NONE_CLASS, FADE_IN_ANIMATION_CLASS, FADE_OUT_ANIMATION_CLASS, ORDER_BUTTON_ID, CUSTOMER_BUTTON_ID, REFRESH_BUTTON_ID, FORM_DIV_ID, CUSTOMER_VIEW, REGISTRATION_EMAIL_SENT_STEP, ORDER_EMAIL_SENT_STEP, PENDING_STEP, LOGO_ID, CUSTOMER_BUTTON_ICON_ID, ERROR_DIALOG_ID, REFRESH_BUTTON_ICON_ID, ORDER_BUTTON_ICON_ID, LOGIN_DIALOG_ID, APPROVE_ORDER_DATA_DIALOG_ID, APPROVE_CUSTOMER_DATA_DIALOG_ID, DECLINE_CUSTOMER_DATA_DIALOG_ID, DECLINE_ORDER_DATA_DIALOG_ID, NOTES_DATA_DIALOG_ID, DELIVERY_DATA_DIALOG_ID, DETAIL_DATA_DIALOG_ID, WHITE } from "../constant/costant.js";
import { language } from "../constant/language-messages.js";
import { ORDER_SVG, CUSTOMER_SVG, REFRESH_SVG, LOGO_SVG, LOGO_SVG_WHITE, NOTES_SVG } from "../constant/svg.js";
import { formIdByStateMap, htmlFormByFormIdMap } from "../mapper/state-form-mapper.js";
import { appendHtmlInDiv, deleteElement, disableButtonComponent, enableButtonComponent } from "../utility/component-util.js";
import { openErrorDialog } from "./component-handler.js";
import { currentView } from "./state-machine.js";

const loadStateMap = new Map();

const customerButton = document.getElementById(CUSTOMER_BUTTON_ID);
const orderButton = document.getElementById(ORDER_BUTTON_ID);
const refreshButton = document.getElementById(REFRESH_BUTTON_ID);

// NAVIGATION
export function updateNavigationButtonsUI(){
    enableButtonComponent(customerButton);
    enableButtonComponent(orderButton);
    enableButtonComponent(refreshButton)
}

export function showError() {
    openErrorDialog();
    updateNavigationButtonsUI();
}

export function setNavigationButtonsToLoadState(){
    disableButtonComponent(customerButton);
    disableButtonComponent(orderButton);
    disableButtonComponent(refreshButton);
}

export function setButtonToLoadState(buttonElement){
    //Save the content
    loadStateMap.set(buttonElement.id, buttonElement.innerHTML);

    let color = WHITE;
    let size = 10;

    buttonElement.innerHTML = `${getLoaderDvg(size, color)}`;
}

export function getLoaderDvg(size, color){
    return `
        <div>
            <svg class="circular">
                <circle class="path" cx="50" cy="50" r="${size}" fill="none" stroke-width="3" stroke-miterlimit="10" stroke="${color}"/>
            </svg>
        </div>`;
}

export function setButtonToReadyState(buttonElement){
    //Recover the prev content
    let prevContent = loadStateMap.get(buttonElement.id);

    buttonElement.innerHTML = prevContent;
}


//CMS FORM
export function initCmsUI(){
    //Nav buttons
    let nextStepIconButton = document.getElementById(CUSTOMER_BUTTON_ICON_ID);
    nextStepIconButton.innerHTML = CUSTOMER_SVG;

    let prevStepIconButton = document.getElementById(ORDER_BUTTON_ICON_ID);
    prevStepIconButton.innerHTML = ORDER_SVG;

    let refreshIconButton = document.getElementById(REFRESH_BUTTON_ICON_ID)
    refreshIconButton.innerHTML = REFRESH_SVG;

    createSnackBar();
    createErrorDialog(ERROR_DIALOG_ID);
    createLoginDialog(LOGIN_DIALOG_ID);
    createApproveCustomerDialog(APPROVE_CUSTOMER_DATA_DIALOG_ID);
    createApproveOrderDialog(APPROVE_ORDER_DATA_DIALOG_ID);
    createDeclineCustomerDialog(DECLINE_CUSTOMER_DATA_DIALOG_ID);
    createDeclineOrderDialog(DECLINE_ORDER_DATA_DIALOG_ID);
    createNotesDialog(NOTES_DATA_DIALOG_ID);
    createDeliveryDialog(DELIVERY_DATA_DIALOG_ID);
    createDetailDialog(DETAIL_DATA_DIALOG_ID);
}

export function initCmsFormUI(){
    //Init form
    let form = document.getElementById(FORM_DIV_ID);
    let startRegistrationFormHtml = getCustomerViewFormHtml();

    form.innerHTML = startRegistrationFormHtml;
}

export function updateCmsFormUI(currentView){
    //Init form
    let form = document.getElementById(FORM_DIV_ID);
    let formHtml = getCustomerViewFormHtml();

    if(currentView == ORDER_VIEW_ID){
        formHtml = getOrderViewFormHtml();
    } else {
        formHtml = getCustomerViewFormHtml();
    }

    form.innerHTML = startRegistrationFormHtml;
}

export function updateRegistrationFormUI(nextStep){
    return new Promise((resolve) => {
        //get the current form
        let registrationForm = document.getElementById(FORM_DIV_ID);

        //add fade out animation to it
        registrationForm.classList.remove(FADE_IN_ANIMATION_CLASS);
        registrationForm.classList.add(FADE_OUT_ANIMATION_CLASS);

        let fadeOutAnimation = document.querySelector('.' + FADE_OUT_ANIMATION_CLASS);

        //when the animation end
        fadeOutAnimation.addEventListener('animationend', () => {
            //remove the animation class
            registrationForm.classList.remove(FADE_OUT_ANIMATION_CLASS);
            
            swapForm(nextStep);

            //fade in
            registrationForm.classList.add(FADE_IN_ANIMATION_CLASS);

            let fadeInAnimation = document.querySelector('.' + FADE_IN_ANIMATION_CLASS);

            fadeInAnimation.addEventListener('animationend', () => {
                resolve();
            }, { once: true }); 

        }, { once: true }); 
    });
}

export function refreshFormUI(nextStep){
    return new Promise((resolve) => {
        //get the current form
        let registrationForm = document.getElementById(FORM_DIV_ID);

        //add fade out animation to it
        registrationForm.classList.remove(FADE_IN_ANIMATION_CLASS);
        registrationForm.classList.add(FADE_OUT_ANIMATION_CLASS);

        let fadeOutAnimation = document.querySelector('.' + FADE_OUT_ANIMATION_CLASS);

        //when the animation end
        fadeOutAnimation.addEventListener('animationend', () => {
            //remove the animation class
            registrationForm.classList.remove(FADE_OUT_ANIMATION_CLASS);

            updateForm(nextStep);

            //fade in
            registrationForm.classList.add(FADE_IN_ANIMATION_CLASS);

            let fadeInAnimation = document.querySelector('.' + FADE_IN_ANIMATION_CLASS);

            fadeInAnimation.addEventListener('animationend', () => {
                resolve();
            }, { once: true });

        }, { once: true });
    });
}

function swapForm(nextStep){
    let formToHideId = formIdByStateMap.get(currentView);
    let formToDisplayId = formIdByStateMap.get(nextStep);

    //TODO handle errors

    let formToHide = document.getElementById(formToHideId);
    let formToDisplay = document.getElementById(formToDisplayId);

    if(!formToDisplay){
        let formHtmlFunction = htmlFormByFormIdMap.get(formToDisplayId);
        let htmlToAppend = formHtmlFunction();

        appendHtmlInDiv(FORM_DIV_ID, htmlToAppend);
        formToDisplay = document.getElementById(formToDisplayId);
    }

    formToHide.hidden = true;
    formToDisplay.hidden = false;
}

function updateForm(currentView){
    let formToDisplayId = formIdByStateMap.get(currentView);
    let formToDisplay = document.getElementById(formToDisplayId);

    let formHtmlFunction = htmlFormByFormIdMap.get(formToDisplayId);
    let htmlToAppend = formHtmlFunction();

    deleteElement(formToDisplayId);
    appendHtmlInDiv(FORM_DIV_ID, htmlToAppend);
    formToDisplay = document.getElementById(formToDisplayId);

    formToDisplay.hidden = false;
}


//TEXT FIELD
export function playShakeTextfieldErrorAnimation(mdcTextField, id){
    let textField = document.getElementById(id);

    textField.classList.add("shake");

    textField.style.animation = 'none';
    textField.offsetHeight;
    textField.style.animation = null;

    mdcTextField.valid = false;

    textField.addEventListener('animationend', () => {
        textField.classList.remove("shake");
    });
}

export function playShakeErrorAnimation(id){
    let element = document.getElementById(id);

    element.classList.add("shake");

    element.style.animation = 'none';
    element.offsetHeight;
    element.style.animation = null;

    element.addEventListener('animationend', () => {
        element.classList.remove("shake");
    });
}