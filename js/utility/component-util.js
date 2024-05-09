import { DISABLE_ACTION_BUTTON_CLASS, DISABLE_OPACITY_BUTTON_CLASS } from "../constant/costant.js";

export function disableButtonComponent(button){
    button.classList.add(DISABLE_ACTION_BUTTON_CLASS);
    button.classList.add(DISABLE_OPACITY_BUTTON_CLASS);
}

export function enableButtonComponent(button){
    button.classList.remove(DISABLE_ACTION_BUTTON_CLASS);
    button.classList.remove(DISABLE_OPACITY_BUTTON_CLASS);
}

export function appendHtmlInDiv(divId, htmlToAppend){
    let element = document.getElementById(divId);

    element.insertAdjacentHTML('beforeend', htmlToAppend);
}

export function scroolOnElement(element){
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

export function deleteElement(elementId){
    document.getElementById(elementId).remove();
}

export function hideElement(elementId){
    let element = document.getElementById(elementId);
    element.hidden = true;
}

export function showElement(elementId){
    let element = document.getElementById(elementId);
    element.hidden = false;
}