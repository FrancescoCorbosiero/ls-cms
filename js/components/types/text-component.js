import { PALLET_OVERALL_WEIGTH_ID } from "../../constant/costant.js";

export function createText(size, text){
    return `<p class="fs-${size} fw-bold">${text}</p>`;
}

export function createFormTitleText(text){
    return `<p class="form-title">${text}</p>`;
}

export function createOverallStatsText(id, text){
    return `<span id="${id}" class="overall-stats">${text}</span>`;
}

export function createOverallUnitText(text){
    return `<span class="overall-unit">${text}</span>`;
}

export function createTextArea(id, text){
    return `
        <label id="${id}" class="mdc-text-field mdc-text-field--filled mdc-text-field--textarea mdc-text-field--no-label">
            <span class="mdc-text-field__ripple"></span>
            <span class="mdc-text-field__resizer">
                <textarea class="mdc-text-field__input" rows="8" cols="40" aria-label="Label"></textarea>
            </span>
            <span class="mdc-line-ripple"></span>
        </label>`;
}