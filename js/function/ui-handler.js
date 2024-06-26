import { createErrorDialog, createLoginDialog } from "../components/types/dialog-components.js";
import { getCustomerViewFormHtml } from "../components/types/form-components.js";
import { createSnackBar } from "../components/types/snackbar-component.js";
import { BOOTSTRAP_DISPLAY_NONE_CLASS, FADE_IN_ANIMATION_CLASS, FADE_OUT_ANIMATION_CLASS, ORDER_BUTTON_ID, CUSTOMER_BUTTON_ID, FORM_DIV_ID, CUSTOMER_VIEW, REGISTRATION_EMAIL_SENT_STEP, ORDER_EMAIL_SENT_STEP, PENDING_STEP, LOGO_ID, CUSTOMER_BUTTON_ICON_ID, ERROR_DIALOG_ID, ORDER_BUTTON_ICON_ID, LOGIN_DIALOG_ID, WHITE } from "../constant/costant.js";
import { language } from "../constant/language-messages.js";
import { ORDER_SVG, CUSTOMER_SVG, LOGO_SVG, LOGO_SVG_WHITE } from "../constant/svg.js";
import { formIdByStateMap, htmlFormByFormIdMap } from "../mapper/state-form-mapper.js";
import { appendHtmlInDiv, disableButtonComponent, enableButtonComponent } from "../utility/component-util.js";
import { openErrorDialog } from "./component-handler.js";
import { currentView } from "./state-machine.js";

const loadStateMap = new Map();

const customerButton = document.getElementById(CUSTOMER_BUTTON_ID);
const orderButton = document.getElementById(ORDER_BUTTON_ID);

export function updateNavigationButtonsUI(){
    
    enableButtonComponent(customerButton);
    enableButtonComponent(orderButton);    

}

export function showError() {
    openErrorDialog();
    updateNavigationButtonsUI();
}

export function setNavigationButtonsToLoadState(){
    disableButtonComponent(customerButton);
    disableButtonComponent(orderButton);
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

//REGISTRATION FORM

export function initCmsUI(){
    //Nav buttons
    let nextStepIconButton = document.getElementById(CUSTOMER_BUTTON_ICON_ID);
    nextStepIconButton.innerHTML = CUSTOMER_SVG;

    let prevStepIconButton = document.getElementById(ORDER_BUTTON_ICON_ID);
    prevStepIconButton.innerHTML = ORDER_SVG;

    createSnackBar();
    createErrorDialog(ERROR_DIALOG_ID);
    createLoginDialog(LOGIN_DIALOG_ID);
}

export function initCmsFormUI(){
    //Init form
    let registrationForm = document.getElementById(FORM_DIV_ID);
    let startRegistrationFormHtml = getCustomerViewFormHtml();

    registrationForm.innerHTML = startRegistrationFormHtml;
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