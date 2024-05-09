import { DROPDOWN_COMPONENT_TYPE, EPAL_TYPE_ID, GENERIC_PALLET_TYPE_ID, PALLET_TYPE_ATTRIBUTE_ID, SERVICE_TYPE_ATTRIBUTE_ID } from "../../constant/costant.js";
import { language } from "../../constant/language-messages.js";
import { addMdComponentToInit, getServiceDropDownData } from "../data/component-data.js";

function initDropDownMenu(id){
    addMdComponentToInit(id, DROPDOWN_COMPONENT_TYPE);
}

export function createPalletDropdownMenu(id){
    initDropDownMenu(id)

    return `
        <div id="${id}" class="mdc-menu mdc-menu-surface">
            <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
                <li class="mdc-list-item" role="menuitem" ${getPalletTypeAttribute(GENERIC_PALLET_TYPE_ID)}>
                    <span class="mdc-list-item__ripple"></span>
                    <span class="mdc-list-item__text">${language.genericPallet}</span>
                </li>
                <li class="mdc-list-item" role="menuitem" ${getPalletTypeAttribute(EPAL_TYPE_ID)}>
                    <span class="mdc-list-item__ripple"></span>
                    <span class="mdc-list-item__text">${language.epal}</span>
                </li>
            </ul>
        </div>
    `;
}

export function createServiceDropdownMenu(id){
    initDropDownMenu(id);

    //Create Dropdown items based on the API response from rest-call#getOrderDropdownData()
    let serviceDropDownData = getServiceDropDownData();

    let itemList = "";

    serviceDropDownData.forEach((service) => {
        let serviceItemHtml = `
            <li class="mdc-list-item" role="menuitem" ${getServiceTypeAttribute(service.id)}>
                <span class="mdc-list-item__ripple"></span>
                <span class="mdc-list-item__text">${service.label}</span>
            </li>`

        itemList = itemList.concat(serviceItemHtml);
    })

    return `
        <div id="${id}" class="mdc-menu mdc-menu-surface">
            <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
                ${itemList}
            </ul>
        </div>
    `;
}

export function creatDropdownMenuFromEnum(id, attributeId, enumObj){
    initDropDownMenu(id);

    let itemList = "";

    enumObj.forEach((obj) => {
        let enumItemHtml = `
            <li class="mdc-list-item" role="menuitem" ${createAttributeID(attributeId, obj.id)}>
                <span class="mdc-list-item__ripple"></span>
                <span class="mdc-list-item__text">${obj.label}</span>
            </li>`

        itemList = itemList.concat(enumItemHtml);
    })

    return `
        <div id="${id}" class="mdc-menu mdc-menu-surface">
            <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
                ${itemList}
            </ul>
        </div>
    `;
}

function getPalletTypeAttribute(palletTypeId){
    return `${PALLET_TYPE_ATTRIBUTE_ID}=${palletTypeId}`;
}

function getServiceTypeAttribute(serviceTypeId){
    return `${SERVICE_TYPE_ATTRIBUTE_ID}=${serviceTypeId}`;
}

function createAttributeID(attributeId, enumId){
    return `${attributeId}=${enumId}`;
}