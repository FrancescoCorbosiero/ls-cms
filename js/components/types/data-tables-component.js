import { APPROVE_PENDING_CUSTOMER_BUTTON_ID, APPROVE_PENDING_ORDER_BUTTON_ID, BUTTON_STANDARD, DECLINE_PENDING_CUSTOMER_BUTTON_ID, DECLINE_PENDING_ORDER_BUTTON_ID, LOGIN_DIALOG_BUTTON_ID } from "../../constant/costant.js";
import { language } from "../../constant/language-messages.js";
import { approvePendingCustomer, declinePendingCustomer } from "../../function/component-handler.js";
import { isArrayNullOrEmpty, isArrayOk } from "../../utility/array-util.js";
import { userData } from "../data/user-data.js";
import { createFunctionButton } from "./button-component.js";

export function getDataTable(jsonData, emptyTableText){
    let dataObject = jsonData;

    let isObjectEmpty = isArrayNullOrEmpty(dataObject);

    if(isObjectEmpty){
        return `<span>${emptyTableText}</span>`;
    }

    let keys = Object.keys(dataObject[0]);

    let head = "";
    
    keys.forEach((key) => {
        head = head.concat(`<th class="mdc-data-table__header-cell" role="columnheader" scope="col">${key}</th>`);
    })

    let body = [];

    dataObject.forEach(customer => {
        let rows = "";

        Object.entries(customer).forEach(([key, value]) => {
            rows = rows.concat(`<td class="mdc-data-table__cell">${value}</td>`);
        });

        body.push(`<tr class="mdc-data-table__row">${rows}</tr>`);
    })

    return `<div class="mdc-data-table">
                <div class="mdc-data-table__table-container">
                <table class="mdc-data-table__table" aria-label="Dessert calories">
                    <thead>
                    <tr class="mdc-data-table__header-row">
                        ${head}
                    </tr>
                    </thead>
                    <tbody class="mdc-data-table__content">
                        ${body}
                    </tbody>
                </table>
                </div>
            </div>`;
}

export function getRegistedCustomersDataTable(){
    return getDataTable(userData.registredCustomers, language.registredCustomersEmpty);
}

export function getPendingCustomersDataTable(){
    let dataObject = userData.pendingCustomers;

    let isObjectEmpty = isArrayNullOrEmpty(dataObject);

    if(isObjectEmpty){
        return `<span>${language.pendingCustomersEmpty}</span>`;
    }

    let keys = Object.keys(dataObject[0]);

    //The empty column is for the action buttons
    let head = `<th class="mdc-data-table__header-cell" role="columnheader" scope="col"></th>`;
    
    keys.forEach((key) => {
        head = head.concat(`<th class="mdc-data-table__header-cell" role="columnheader" scope="col">${key}</th>`);
    })

    let body = [];

    dataObject.forEach(customer => {
        //init the row with the bottons
        let rows = `
            <td class="mdc-data-table__cell">
                ${createFunctionButton(
                    {
                        id: APPROVE_PENDING_CUSTOMER_BUTTON_ID, 
                        text: language.approve, 
                        type: BUTTON_STANDARD,
                        functionToCall: () => approvePendingCustomer(customer)
                    }
                )}
                ${createFunctionButton(
                    {
                        id: DECLINE_PENDING_CUSTOMER_BUTTON_ID, 
                        text: language.decline, 
                        type: BUTTON_STANDARD,
                        functionToCall: () => declinePendingCustomer(customer)
                    }
                )}
            </td>`;

        Object.entries(customer).forEach(([key, value]) => {
            rows = rows.concat(`<td class="mdc-data-table__cell">${value}</td>`);
        });

        body.push(`<tr class="mdc-data-table__row">${rows}</tr>`);
    })

    return `<div class="mdc-data-table">
                <div class="mdc-data-table__table-container">
                <table class="mdc-data-table__table" aria-label="Dessert calories">
                    <thead>
                    <tr class="mdc-data-table__header-row">
                        ${head}
                    </tr>
                    </thead>
                    <tbody class="mdc-data-table__content">
                        ${body}
                    </tbody>
                </table>
                </div>
            </div>`;
}

export function getPendingOrdersDataTable(){
    let dataObject = userData.pendingOrders;

    let isObjectEmpty = isArrayNullOrEmpty(dataObject);

    if(isObjectEmpty){
        return `<span>${language.pendingOrdersEmpty}</span>`;
    }

    let keys = Object.keys(dataObject[0]);

    //The empty column is for the action buttons
    let head = `<th class="mdc-data-table__header-cell" role="columnheader" scope="col"></th>`;
    
    keys.forEach((key) => {
        head = head.concat(`<th class="mdc-data-table__header-cell" role="columnheader" scope="col">${key}</th>`);
    })

    let body = [];

    dataObject.forEach(order => {
        //init the row with the bottons
        let rows = `
            <td class="mdc-data-table__cell">
                ${createFunctionButton(
                    {
                        id: APPROVE_PENDING_ORDER_BUTTON_ID, 
                        text: language.approve, 
                        type: BUTTON_STANDARD,
                        functionToCall: () => {}
                    }
                )}
                ${createFunctionButton(
                    {
                        id: DECLINE_PENDING_ORDER_BUTTON_ID, 
                        text: language.decline, 
                        type: BUTTON_STANDARD,
                        functionToCall: () => {}
                    }
                )}
            </td>`;

        Object.entries(order).forEach(([key, value]) => {
            rows = rows.concat(`<td class="mdc-data-table__cell">${value}</td>`);
        });

        body.push(`<tr class="mdc-data-table__row">${rows}</tr>`);
    })

    return `<div class="mdc-data-table">
                <div class="mdc-data-table__table-container">
                <table class="mdc-data-table__table" aria-label="Dessert calories">
                    <thead>
                    <tr class="mdc-data-table__header-row">
                        ${head}
                    </tr>
                    </thead>
                    <tbody class="mdc-data-table__content">
                        ${body}
                    </tbody>
                </table>
                </div>
            </div>`;
}