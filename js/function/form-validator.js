import { APPROVE_ORDER_DATA_DIALOG_ID, APPROVE_CUSTOMER_DATA_DIALOG_ID, DECLINE_CUSTOMER_DATA_DIALOG_ID, DECLINE_ORDER_DATA_DIALOG_ID, DELIVERY_DOCUMENT_TEXTFIELD_ID, EMAIL_TEXTFIELD_ID, LOGIN_DIALOG_ID, MDC_TEXT_FIELD_CLASS, MOBILE_PHONE_REGEX, ONLY_NUMBERS_REGEX, ORDER_FORM_ID, PACKAGE_QUANTITY_TEXTFIELD_ID, PALLET_OPEN_DIALOG_BUTTON_ID, PHONE_TEXTFIELD_ID, POSTALCODE_REGEX, POSTALCODE_TEXTFIELD_ID, RECIPIENT_FORM_ID, ORDER_VIEW_FORM_ID, SERVICE_OPEN_DROPDOWN_TYPE_BUTTON_ID, SERVICE_TYPE_ATTRIBUTE_ID } from "../constant/costant.js";
import * as stringUtil from "../utility/string-util.js";
import { getMdComponent } from "../components/data/component-data.js";
import { playShakeErrorAnimation, playShakeTextfieldErrorAnimation } from "./ui-handler.js";
import { userData } from "../components/data/user-data.js";

export function isEmailFormValid(){
    let mdcEmailTextField = getMdComponent(EMAIL_TEXTFIELD_ID);
    
    let emailValue = mdcEmailTextField.value;

    //Integrity check
    let isEmailNotValid = stringUtil.isNullOrEmpty(emailValue) || stringUtil.isEmailFormatNotValid(emailValue);

    if(isEmailNotValid){
        playShakeTextfieldErrorAnimation(mdcEmailTextField, EMAIL_TEXTFIELD_ID);

        return false;
    }

    return true;
}

export function isRegistrationFormValid(){
    let formNotValid = isFormNullOrEmpty(ORDER_VIEW_FORM_ID);

    if(formNotValid){
        return false;
    }

    formNotValid = isPostalCodeNotValid(POSTALCODE_TEXTFIELD_ID);

    if(formNotValid){
        return false;
    }

    formNotValid = isPhoneNotValid(PHONE_TEXTFIELD_ID);

    if(formNotValid){
        return false;
    }


    return true;
}

export function isRecipientFormValid(){
    let formNotValid = isFormNullOrEmpty(RECIPIENT_FORM_ID);

    if(formNotValid){
        return false;
    }

    formNotValid = isPostalCodeNotValid(POSTALCODE_TEXTFIELD_ID);

    if(formNotValid){
        return false;
    }

    formNotValid = isPhoneNotValid(PHONE_TEXTFIELD_ID);

    if(formNotValid){
        return false;
    }


    return true;
}

export function isOrderFormValid(){
    //let formNotValid = isFormValidWithRegex(ORDER_FORM_ID, ONLY_NUMBERS_REGEX);

    //NOT REQUIRED
    let packageQuantityTextField = getMdComponent(PACKAGE_QUANTITY_TEXTFIELD_ID);
    let packageQuantity = packageQuantityTextField.value;

    let packageQuantityIsPresent = !stringUtil.isNullOrEmpty(packageQuantity);
    let packageQuantityNotValid = false;

    if(packageQuantityIsPresent){
        packageQuantityNotValid = isTextFieldRegexNotValid(PACKAGE_QUANTITY_TEXTFIELD_ID, packageQuantityTextField, ONLY_NUMBERS_REGEX);
    }

    //REQUIRED
    let deliveryDocumentTextField = getMdComponent(DELIVERY_DOCUMENT_TEXTFIELD_ID);
    let deliveryDocumentNotValid = isTextFieldNullOrEmpty(DELIVERY_DOCUMENT_TEXTFIELD_ID, deliveryDocumentTextField);

    let serviceType = document.getElementById(SERVICE_OPEN_DROPDOWN_TYPE_BUTTON_ID).getAttribute(SERVICE_TYPE_ATTRIBUTE_ID);
    let serviceTypeNotSelected = !serviceType;
    
    if(serviceTypeNotSelected){
        playShakeErrorAnimation(SERVICE_OPEN_DROPDOWN_TYPE_BUTTON_ID);
    }

    let noPalletInserted = userData.palletList.length > 0 ? false : true;

    if(noPalletInserted){
        playShakeErrorAnimation(PALLET_OPEN_DIALOG_BUTTON_ID);
    }

    let formNotValid = packageQuantityNotValid || deliveryDocumentNotValid || noPalletInserted;

    if(formNotValid){
        return false;
    }

    return true;
}

export function isPalletDialogBoxFormValid(){
    let formNotValid = isFormValidWithRegex(CONFIRMATION_DATA_DIALOG_ID, ONLY_NUMBERS_REGEX);

    if(formNotValid){
        return false;
    }

    return true;
}

export function isLoginDialogFormNotValid(){
    let formNotValid = isFormNullOrEmpty(LOGIN_DIALOG_ID);

    if(formNotValid){
        return true;
    }

    return false;
}

export function isApproveOrderDialogFormNotValid(){
    let formNotValid = isFormNullOrEmpty(APPROVE_ORDER_DATA_DIALOG_ID);

    if(formNotValid){
        return true;
    }

    return false;
}

function isFormNullOrEmpty(formId){
    let form = document.getElementById(formId);

    let textFields = form.querySelectorAll("." + MDC_TEXT_FIELD_CLASS);

    let formNotValid = false;

    textFields.forEach( (textfield) => {
        let textFieldNotValid = isTextFieldNotValid(textfield);

        if(textFieldNotValid){
            formNotValid = true;
        }
    });

    return formNotValid;
}

function isFormValidWithRegex(formId, regexToCheck){
    let form = document.getElementById(formId);

    let textFields = form.querySelectorAll("." + MDC_TEXT_FIELD_CLASS);

    let formNotValid = false;

    textFields.forEach( (textfield) => {
        let textFieldNotValid = isTextFieldNotValidWithRegex(textfield, regexToCheck);

        if(textFieldNotValid){
            formNotValid = true;
        }
    });

    return formNotValid;
}

function isTextFieldNotValid(textField){
    let id = textField.id;

    let mdcTextField = getMdComponent(id);

    if(!mdcTextField){
        console.error(`init error with TextField: ${id}`);
    }

    return isTextFieldNullOrEmpty(id, mdcTextField);
}

function isTextFieldNotValidWithRegex(textField, regexToCheck){
    let id = textField.id;

    let mdcTextField = getMdComponent(id);

    if(!mdcTextField){
        console.error(`init error with TextField: ${id}`);
    }

    let isNullOrEmpty = isTextFieldNullOrEmpty(id, mdcTextField);

    if(isNullOrEmpty){
        return true;
    }

    let isRegexNotValid = isTextFieldRegexNotValid(id, mdcTextField, regexToCheck);

    if(isRegexNotValid){
        return true;
    }

    return false;
}

function isTextFieldNullOrEmpty(id, mdcTextField){
    let textFieldValue = mdcTextField.value;

    //Integrity check
    let isValueNotValid = stringUtil.isNullOrEmpty(textFieldValue);

    if(isValueNotValid){
        playShakeTextfieldErrorAnimation(mdcTextField, id);
        return true;
    }

    return false;
}

function isTextFieldRegexNotValid(id, mdcTextField, regexToCheck){
    let textFieldValue = mdcTextField.value;

    //Integrity check
    let isValueNotValid = !stringUtil.isStringValidWithRegex(textFieldValue, regexToCheck);

    if(isValueNotValid){
        playShakeTextfieldErrorAnimation(mdcTextField, id);
        return true;
    }

    return false;
}

function isPostalCodeNotValid(textFieldId){
    let postalCodeTextFieldId = textFieldId;
    let postalCodeMdcTextField = getMdComponent(postalCodeTextFieldId);

    let postalCodeNotValid = isTextFieldRegexNotValid(postalCodeTextFieldId, postalCodeMdcTextField, POSTALCODE_REGEX);

    if(postalCodeNotValid){
        return true;
    }

    return false;
}

function isPhoneNotValid(textFieldId){
    let phoneTextFieldId = textFieldId;
    let phoneMdcTextField = getMdComponent(phoneTextFieldId);

    let phoneNotValid = isTextFieldRegexNotValid(phoneTextFieldId, phoneMdcTextField, MOBILE_PHONE_REGEX);

    if(phoneNotValid){
        return true;
    }

    return false;
}