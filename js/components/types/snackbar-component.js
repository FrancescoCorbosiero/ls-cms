import { APP_ID, SNACKBAR_COMPONENT_TYPE, SNACKBAR_ID, SNACKBAR_TEXT_ID } from "../../constant/costant.js";
import { language } from "../../constant/language-messages.js"
import { addMdComponentToInit } from "../data/component-data.js";

function createSnackbarComponent(snackbar){
    initSnackbar(SNACKBAR_ID);
    appendSnackBar(snackbar);
}

function initSnackbar(){
    addMdComponentToInit(SNACKBAR_ID, SNACKBAR_COMPONENT_TYPE);
}

export function appendSnackBar(snackbar){
    let app = document.getElementById(APP_ID);

    app.insertAdjacentHTML('beforeend', snackbar);
}

export function createSnackBar(){
    let snackbar = `
        <aside class="mdc-snackbar" id="${SNACKBAR_ID}">
            <div class="mdc-snackbar__surface" role="status" aria-relevant="additions">
                <div class="mdc-snackbar__label" aria-atomic="false">
                    <span id="${SNACKBAR_TEXT_ID}"></span>
                </div>
                <div class="mdc-snackbar__actions" aria-atomic="true">
                </div>
            </div>
        </aside>`;
    
    createSnackbarComponent(snackbar);

    return snackbar;
}