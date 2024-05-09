import { TEXT_FIELD_COMPONENT_TYPE } from "../../constant/costant.js";
import { addMdComponentToInit } from "../data/component-data.js";

function initTextField(id){
    addMdComponentToInit(id, TEXT_FIELD_COMPONENT_TYPE);
}

export function createTextField(id, placeholder, width){
    let widthClass = width ? `w-${width}` : ``;

    initTextField(id);

    return `
        <label id="${id}" class="mdc-text-field mdc-text-field--outlined mdc-text-field--no-label ${widthClass}">
        <span class="mdc-notched-outline">
            <span class="mdc-notched-outline__leading"></span>
            <span class="mdc-notched-outline__trailing"></span>
        </span>
        <input class="mdc-text-field__input" type="text" aria-label="Label" placeholder="${placeholder}">
        </label>
    `;
}

export function createNumericTextField(id, placeholder, width){
    let widthClass = width ? `w-${width}` : ``;

    initTextField(id);

    return `
        <label id="${id}" class="mdc-text-field mdc-text-field--outlined mdc-text-field--no-label ${widthClass}">
        <span class="mdc-notched-outline">
            <span class="mdc-notched-outline__leading"></span>
            <span class="mdc-notched-outline__trailing"></span>
        </span>
        <input inputmode="numeric" class="mdc-text-field__input" type="text" aria-label="Label" placeholder="${placeholder}">
        </label>
    `;
}

export function createFormTextField(id, placeholder){
    return createTextField(id, placeholder, 75);
}

export function createFormNumericTextField(id, placeholder){
    return createNumericTextField(id, placeholder, 75);
}

