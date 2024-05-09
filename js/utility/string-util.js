import { EMAIL_REGEX, MOBILE_PHONE_REGEX } from "../constant/costant.js";

export function isNullOrEmpty (stringToCheck) {
    return (!stringToCheck || stringToCheck.length === 0 );
}

export function isEmailFormatValid (stringToCheck) {
    return EMAIL_REGEX.test(stringToCheck);
}

export function isEmailFormatNotValid (stringToCheck) {
    return !EMAIL_REGEX.test(stringToCheck);
}

export function isStringValidWithRegex (stringToCheck, regex) {
    return regex.test(stringToCheck);
}

export function isMobilePhoneValid(stringToCheck){
    return !MOBILE_PHONE_REGEX.test(stringToCheck);
}

export function hasContent (stringToCheck) {
    return !isNullOrEmpty(stringToCheck);
}