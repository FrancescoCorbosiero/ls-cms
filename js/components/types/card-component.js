import { DELETE_ICON } from "../../constant/costant.js";
import { language } from "../../constant/language-messages.js";
import { createIconButton } from "./button-component.js";

export function createPalleCard(cardId, deleteButtonId, palletData){
    return `
        <div id="${cardId}" class="mt-3 mdc-card align-items-start">
            <p class="mt-3 ms-3 fs-3 fw-bold">${palletData.typeName}</p>
            ${createPalletDataLine(language.palletHeightPlaceHolder, palletData.height)}
            ${createPalletDataLine(language.palletWeightPlaceHolder, palletData.weight)}
            ${createPalletDataLine(language.palletLenghtPlaceHolder, palletData.lenght)}
            ${createPalletDataLine(language.palletWidhtPlaceHolder, palletData.width)}
            ${createPalletDataLine(language.palletQuantityPlaceHolder, palletData.quantity)}
            ${createIconButton(deleteButtonId, DELETE_ICON)}
        </div>`;
}

function printPalletDataValues(palletData){
    return Object.values(palletData).map(element => String(element));
}

function createPalletDataLine(palletDataName, palletDataValue){
    return `<p class="ms-3">${palletDataName} :  ${palletDataValue}</p>`;
}