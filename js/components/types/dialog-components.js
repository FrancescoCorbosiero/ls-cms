import { DIV_SPEDIZIONE_DETAIL_ID, DIV_COLLI_DETAIL_ID, DIV_PALLET_DETAIL_ID, DELIVERY_DATA_DIALOG_ID, NOTES_PRE_ID, TRACE_ORDER_DATA_TABLE_ID, BUTTON_ROUNDED, TRACE_ORDER_TAB_CONTENT_VIEW_ID, DECLINE_CUSTOMER_DIALOG_BUTTON_ID, DECLINE_ORDER_DIALOG_BUTTON_ID, APPROVE_CUSTOMER_DIALOG_BUTTON_ID, NOTES_DIALOG_BUTTON_ID, APPROVE_ORDER_DIALOG_BUTTON_ID, ORDER_CODE_TEXTFIELD_ID, NOTES_TEXTFIELD_ID, CODICE_TEXTFIELD_ID, IMPORTO_CONTRASSEGNO_TEXTFIELD_ID, IMPORTO_ASSICURATO_TEXTFIELD_ID, CODICE_DOCUMENTO_TRASPORTO_TEXTFIELD_ID, TRACKING_STATE_ATTRIBUTE_ID, TRACKING_STATE_DROPDOWN_ID, TRACE_ORDER_BUTTON_ID, TRACKING_STATE_OPEN_DROPDOWN_TYPE_BUTTON_ID, SERVICE_TYPE_ATTRIBUTE_ID, SERVICE_DROPDOWN_ID, SERVICE_OPEN_DROPDOWN_TYPE_BUTTON_ID, APP_ID, BUTTON_STANDARD, DIALOG_COMPONENT_TYPE, ERROR_DIALOG_TITLE_ID, LOGIN_DIALOG_BUTTON_ID, LOGIN_PASSWORD_TEXTFIELD_ID, LOGIN_USERNAME_TEXTFIELD_ID, PALLET_CONFIRM_DIALOG_BUTTON_ID, PALLET_DIALOG_TITLE_ID, PALLET_HEIGHT_TEXTFIELD_ID, PALLET_LENGHT_TEXTFIELD_ID, PALLET_OPEN_DROPDOWN_TYPE_BUTTON_ID, PALLET_QUANTITY_TEXTFIELD_ID, PALLET_TYPE_DROPDOWN_ID, PALLET_WEIGHT_TEXTFIELD_ID, PALLET_WIDTH_TEXTFIELD_ID } from "../../constant/costant.js";
import { language } from "../../constant/language-messages.js";
import { tracerOrder, getNotes, updateNotes, openSelectableDropdown, executeLogin, approvePendingOrder, approvePendingCustomer, declinePendingCustomer, declinePendingOrder } from "../../function/component-handler.js";
import { addMdComponentToInit } from "../data/component-data.js";
import { createFunctionButton } from "./button-component.js";
import { createTextField, createNumericTextField } from "./text-field-component.js";
import { createServiceDropdownMenu, creatDropdownMenuFromEnum } from "./dropdown-component.js";
import { createRadioButton } from "./radiobutton-component.js";
import { userData } from "../data/user-data.js";

function createDialogComponent(id, dialog){
    initDialog(id);
    appendDialog(dialog);
}

function initDialog(id){
    addMdComponentToInit(id, DIALOG_COMPONENT_TYPE);
}

function appendDialog(dialog){
    let app = document.getElementById(APP_ID);

    app.insertAdjacentHTML('beforeend', dialog);
}

export function createErrorDialog(id){
    let dialog = `
        <div class="mdc-dialog" id=${id}>
            <div class="mdc-dialog__container">
            <div class="mdc-dialog__surface"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="my-dialog-title"
                aria-describedby="my-dialog-content">
                <!-- TITLE -->
                <h2 class="mdc-dialog__title" id="${ERROR_DIALOG_TITLE_ID}">${language.errorDialogTitle}</h2>
                <!-- CONTENT -->
                <div class="mdc-dialog__content" id="my-dialog-content">
                    <p>${language.errorDialogText}</p>
                </div>
                <div class="mdc-dialog__actions">
                    <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="cancel">
                        <div class="mdc-button__ripple"></div>
                        <span class="mdc-button__label">${language.dialogClose}</span>
                    </button>
                </div>
            </div>
            </div>
            <div class="mdc-dialog__scrim"></div>
        </div>
    `;

    createDialogComponent(id, dialog);
}

export function createLoginDialog(id){
    let dialog = `
        <div class="mdc-dialog" id=${id}>
            <div class="mdc-dialog__container">
                <div class="mdc-dialog__surface"
                    role="alertdialog"
                    aria-modal="true"
                    aria-labelledby="my-dialog-title"
                    aria-describedby="my-dialog-content">
                    <!-- TITLE -->
                    <h2 class="mdc-dialog__title">${language.loginDialogTitle}</h2>
                    <!-- CONTENT -->
                    <div class="mdc-dialog__content" id="my-dialog-content">
                        <div class="container text-center">
                            <div class="p-1 row">
                                ${createTextField(LOGIN_USERNAME_TEXTFIELD_ID, language.username)}
                            </div>
                            <div class="p-1 row">
                                ${createTextField(LOGIN_PASSWORD_TEXTFIELD_ID, language.password)}
                            </div>
                        </div>
                    </div>
                    <div class="mdc-dialog__actions">
                        ${createFunctionButton(
                            {
                                id: LOGIN_DIALOG_BUTTON_ID,
                                text: language.dialogConfirm,
                                type: BUTTON_STANDARD,
                                functionToCall: () => executeLogin(LOGIN_DIALOG_BUTTON_ID)
                            }
                        )}
                    </div>
                </div>
            </div>
            <div class="mdc-dialog__scrim"></div>
        </div>
    `;

    createDialogComponent(id, dialog);
}

export function createApproveOrderDialog(id){

    let dialog = `
               <div class="mdc-dialog" id=${id}>
                   <div class="mdc-dialog__container">
                   <div class="mdc-dialog__surface"
                       role="alertdialog"
                       aria-modal="true"
                       aria-labelledby="my-dialog-title"
                       aria-describedby="my-dialog-content">
                       <!-- TITLE -->
                       <h2 class="mdc-dialog__title">${language.approveOrderDialogTitle}</h2>
                       <!-- CONTENT -->
                       <div class="mdc-dialog__content" id="my-dialog-content">
                           <div class="container text-center">
                               <div class="p-1 row">
                                   ${createTextField(CODICE_TEXTFIELD_ID, "Codice")}
                               </div>
                               <div class="p-1 row">
                                   ${createNumericTextField(IMPORTO_ASSICURATO_TEXTFIELD_ID, "Importo Totale (per cliente)")}
                               </div>
                           </div>
                           <div class="mdc-dialog__actions">
                              <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="cancel">
                                  <div class="mdc-button__ripple"></div>
                                  <span class="mdc-button__label">${language.dialogCancel}</span>
                              </button>
                              ${createFunctionButton(
                                  {
                                      id: APPROVE_ORDER_DIALOG_BUTTON_ID,
                                      text: language.dialogConfirm,
                                      type: BUTTON_STANDARD,
                                      functionToCall: () => approvePendingOrder(APPROVE_ORDER_DIALOG_BUTTON_ID)
                                  }
                              )}
                          </div>
                       </div>

                   </div>
                   </div>
                   <div class="mdc-dialog__scrim"></div>
               </div>
           `;


    createDialogComponent(id, dialog);
}

export function createApproveCustomerDialog(id){
    let dialog = `
            <div class="mdc-dialog" id=${id}>
                <div class="mdc-dialog__container">
                <div class="mdc-dialog__surface"
                    role="alertdialog"
                    aria-modal="true"
                    aria-labelledby="my-dialog-title"
                    aria-describedby="my-dialog-content">
                    <!-- TITLE -->
                    <h2 class="mdc-dialog__title">${language.confirmationDialogTitle}</h2>
                    <!-- CONTENT -->
                    <div class="mdc-dialog__content" id="my-dialog-content">

                    </div>
                    <div class="mdc-dialog__actions">
                       <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="cancel">
                           <div class="mdc-button__ripple"></div>
                           <span class="mdc-button__label">${language.dialogCancel}</span>
                       </button>
                        ${createFunctionButton(
                            {
                                id: APPROVE_CUSTOMER_DIALOG_BUTTON_ID,
                                text: language.dialogConfirm,
                                type: BUTTON_STANDARD,
                                functionToCall: () => approvePendingCustomer(APPROVE_CUSTOMER_DIALOG_BUTTON_ID)
                            }
                        )}
                    </div>
                </div>
                <div class="mdc-dialog__scrim"></div>
            </div>
    `;
    createDialogComponent(id, dialog);
}

export function createDeclineOrderDialog(id){
    let dialog = `
            <div class="mdc-dialog" id=${id}>
                <div class="mdc-dialog__container">
                <div class="mdc-dialog__surface"
                    role="alertdialog"
                    aria-modal="true"
                    aria-labelledby="my-dialog-title"
                    aria-describedby="my-dialog-content">
                    <!-- TITLE -->
                    <h2 class="mdc-dialog__title">${language.confirmationDialogTitle}</h2>
                    <!-- CONTENT -->
                    <div class="mdc-dialog__content" id="my-dialog-content">

                    </div>
                    <div class="mdc-dialog__actions">
                       <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="cancel">
                           <div class="mdc-button__ripple"></div>
                           <span class="mdc-button__label">${language.dialogCancel}</span>
                       </button>
                        ${createFunctionButton(
                            {
                                id: DECLINE_ORDER_DIALOG_BUTTON_ID,
                                text: language.dialogConfirm,
                                type: BUTTON_STANDARD,
                                functionToCall: () => declinePendingOrder(DECLINE_ORDER_DIALOG_BUTTON_ID)
                            }
                        )}
                    </div>
                </div>
                <div class="mdc-dialog__scrim"></div>

            </div>
    `;
    createDialogComponent(id, dialog);
}

export function createDeclineCustomerDialog(id){
let dialog = `
            <div class="mdc-dialog" id=${id}>
                <div class="mdc-dialog__container">
                <div class="mdc-dialog__surface"
                    role="alertdialog"
                    aria-modal="true"
                    aria-labelledby="my-dialog-title"
                    aria-describedby="my-dialog-content">
                    <!-- TITLE -->
                    <h2 class="mdc-dialog__title">${language.confirmationDialogTitle}</h2>
                    <!-- CONTENT -->
                    <div class="mdc-dialog__content" id="my-dialog-content">

                    </div>
                    <div class="mdc-dialog__actions">
                       <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="cancel">
                           <div class="mdc-button__ripple"></div>
                           <span class="mdc-button__label">${language.dialogCancel}</span>
                       </button>
                        ${createFunctionButton(
                            {
                                id: DECLINE_CUSTOMER_DIALOG_BUTTON_ID,
                                text: language.dialogConfirm,
                                type: BUTTON_STANDARD,
                                functionToCall: () => declinePendingCustomer(DECLINE_CUSTOMER_DIALOG_BUTTON_ID)
                            }
                        )}
                    </div>
                </div>
                <div class="mdc-dialog__scrim"></div>

            </div>
    `;
    createDialogComponent(id, dialog);
}

export function createNotesDialog(id){
    let dialog = `
                <div class="mdc-dialog" id=${id}>
                    <div class="mdc-dialog__container">
                        <div class="mdc-dialog__surface"
                            role="alertdialog"
                            aria-modal="true"
                            aria-labelledby="my-dialog-title"
                            aria-describedby="my-dialog-content">
                            <!-- TITLE -->
                            <h2 class="mdc-dialog__title">${language.updateNotesDialogTitle}</h2>
                            <!-- CONTENT -->
                            <div class="mdc-dialog__content" id="my-dialog-content">
                                <pre id = "${NOTES_PRE_ID}">
                                    ${userData.rowPayload['Note'] != null ? userData.rowPayload['Note'] : "Nessuna nota presente"}
                                </pre>
                                ${
                                    createTextField(
                                        NOTES_TEXTFIELD_ID,
                                        "Nessuna nota presente",
                                        75
                                    )
                                 }
                                <br>
                            </div>
                            <div class="mdc-dialog__actions">
                                   <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="cancel">
                                       <div class="mdc-button__ripple"></div>
                                       <span class="mdc-button__label">${language.dialogClose}</span>
                                   </button>
                                   ${createFunctionButton(
                                       {
                                           id: NOTES_DIALOG_BUTTON_ID,
                                           text: language.dialogSet,
                                           type: BUTTON_STANDARD,
                                           functionToCall: () => updateNotes(NOTES_DIALOG_BUTTON_ID)
                                       }
                                   )}
                            </div>
                        </div>
                        <div class="mdc-dialog__scrim"></div>

                </div>`;
    createDialogComponent(id, dialog);
}

export function createDeliveryDialog(id){
    let dialog = `
                <div class="mdc-dialog" id=${id}>
                    <div class="mdc-dialog__container">
                        <div class="mdc-dialog__surface"
                            role="alertdialog"
                            aria-modal="true"
                            aria-labelledby="my-dialog-title"
                            aria-describedby="my-dialog-content">
                            <!-- TITLE -->
                            <h2 class="mdc-dialog__title">${language.traceOrderDialogTitle}</h2>
                            <!-- CONTENT -->
                            <div class="mdc-dialog__content" id="my-dialog-content">
                                <div id="${TRACE_ORDER_TAB_CONTENT_VIEW_ID}" class="mt-3">
                                    <div class="p-1 row justify-content-center" >
                                        ${createTextField(
                                            ORDER_CODE_TEXTFIELD_ID,
                                            language.orderCode,
                                            75
                                        )}
                                    </div>
                                    <br>
                                    <br>
                                    <div class="p-1 row justify-content-center">
                                        <div class="col align-self-center">
                                            <div id="demo-menu" class="mdc-menu-surface--anchor">
                                                ${createFunctionButton(
                                                    {
                                                        id: TRACKING_STATE_OPEN_DROPDOWN_TYPE_BUTTON_ID,
                                                        text: language.trackingStateOpenDropdownText,
                                                        type: BUTTON_STANDARD,
                                                        functionToCall: () => openSelectableDropdown(TRACKING_STATE_OPEN_DROPDOWN_TYPE_BUTTON_ID, TRACKING_STATE_DROPDOWN_ID, TRACKING_STATE_ATTRIBUTE_ID),
                                                        weight: "w-75"
                                                    }
                                                )}
                                                ${creatDropdownMenuFromEnum(TRACKING_STATE_DROPDOWN_ID, TRACKING_STATE_ATTRIBUTE_ID, userData.trackingStateEnum)}
                                            </div>
                                        </div>
                                    </div>
                                    <br>
                                    <br>
                                </div>
                            </div>
                            <div class="mdc-dialog__actions">
                                   <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="cancel">
                                       <div class="mdc-button__ripple"></div>
                                       <span class="mdc-button__label">${language.dialogClose}</span>
                                   </button>
                                   ${createFunctionButton(
                                       {
                                           id: TRACE_ORDER_BUTTON_ID,
                                           text: language.search,
                                           type: BUTTON_STANDARD,
                                           functionToCall: () => tracerOrder(TRACE_ORDER_BUTTON_ID)
                                       }
                                   )}
                            </div>
                        </div>
                        <div class="mdc-dialog__scrim"></div>

                </div>`;
    createDialogComponent(id, dialog);
}

export function createDetailDialog(id){
    let dialog = `
                <style>
                .details-container {
                    background-color: #fff;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    padding: 20px;
                    margin: 20px auto;
                    max-width: 600px;
                }

                .details-label {
                    font-weight: bold;
                }

                .details-value {
                    margin-left: 10px;
                    color: #666;
                }
                </style>
                <div class="mdc-dialog" id=${id}>
                    <div class="mdc-dialog__container">
                        <div class="mdc-dialog__surface"
                            role="alertdialog"
                            aria-modal="true"
                            aria-labelledby="my-dialog-title"
                            aria-describedby="my-dialog-content">
                            <!-- TITLE -->
                            <h2 class="mdc-dialog__title">${language.detailDialogTitle}</h2>
                            <!-- CONTENT -->
                            <div class="mdc-dialog__content" id="my-dialog-content">
                                <h1>Dettaglio Spedizione</h1>
                                <div class="details-container" id="${DIV_SPEDIZIONE_DETAIL_ID}">
                                </div>

                                <br>

                                <h1>Dettaglio Colli</h1>
                                <div class="details-container" id="${DIV_COLLI_DETAIL_ID}">
                                </div>

                                <br>

                                <h1>Pallets</h1>
                                <div class="details-container" id="${DIV_PALLET_DETAIL_ID}">
                                </div>
                            </div>
                            <div class="mdc-dialog__actions">
                                   <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="cancel">
                                       <div class="mdc-button__ripple"></div>
                                       <span class="mdc-button__label">${language.dialogClose}</span>
                                   </button>
                            </div>
                        </div>
                        <div class="mdc-dialog__scrim"></div>

                </div>`;
    createDialogComponent(id, dialog);
}