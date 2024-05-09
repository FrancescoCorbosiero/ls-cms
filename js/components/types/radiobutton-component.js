import { RADIOBUTTON_COMPONENT_TYPE } from "../../constant/costant.js";
import { addMdComponentToInit } from "../data/component-data.js";

function initRadioButton(id){
    addMdComponentToInit(id, RADIOBUTTON_COMPONENT_TYPE);
}

export function createRadioButton(id){
    initRadioButton(id);

    return `
        <div class="mdc-form-field">
            <div id="${id}" class="mdc-radio">
                <input class="mdc-radio__native-control" type="radio" id="radio-1" name="radios" checked>
                <div class="mdc-radio__background">
                    <div class="mdc-radio__outer-circle"></div>
                    <div class="mdc-radio__inner-circle"></div>
                </div>
                <div class="mdc-radio__ripple"></div>
            </div>
            <label for="radio-1">Radio 1</label>
        </div>
        `;
}