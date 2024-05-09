import { createFormTitleText } from "./text-component.js";

export function createFormTitleDiv(text){
    return `<div class="p-2 mt-5 row justify-content-md-center">
                ${createFormTitleText(text)}
            </div>`;
}