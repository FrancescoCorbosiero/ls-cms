import { NOTES_DATA_DIALOG_ID, DELIVERY_DATA_DIALOG_ID, APPROVE_ORDER_DATA_DIALOG_ID, APPROVE_CUSTOMER_DATA_DIALOG_ID, DECLINE_CUSTOMER_DATA_DIALOG_ID, DECLINE_ORDER_DATA_DIALOG_ID, SVG_ICON, REGISTRED_ORDERS_TAB_CONTENT_VIEW_ID, REGISTRED_ORDERS_DATA_TABLE_ID, APPROVE_BUTTON_ID, _APPROVE_BUTTON_ID, BUTTON_STANDARD, DECLINE_BUTTON_ID, _DECLINE_BUTTON_ID, _DETAIL_BUTTON_ID, _NOTES_BUTTON_ID, LOGIN_DIALOG_BUTTON_ID } from "../../constant/costant.js";
import { language } from "../../constant/language-messages.js";
import { OK_SVG, DECLINE_SVG, NOTES_SVG, DELIVERY_SVG, DETAIL_SVG} from "../../constant/svg.js";
import { approvePendingCustomer, declinePendingCustomer, approvePendingOrder, declinePendingOrder, openDialog, openNotesDialog, openDeliveryDialog, openDetailDialog } from "../../function/component-handler.js";
import { isArrayNullOrEmpty, isArrayOk } from "../../utility/array-util.js";
import { userData } from "../data/user-data.js";
import { countNext, resetCounter } from "../data/counter.js";
import { createFunctionButton} from "./button-component.js";

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
    let dataObject = userData.registredCustomers.map(customer => ({
                                                           'ID': customer.id,
                                                           'Ragione sociale': customer.ragioneSociale,
                                                           'Email': customer.email,
                                                           'Indirizzo':  customer.indirizzo,
                                                           'Provincia': customer.provincia,
                                                           'Città': customer.citta,
                                                           'Cap': customer.cap,
                                                           'Telefono': customer.telefono,
                                                           'Email confermata': customer.emailConfirmed ? 'SI' : 'NO'
                                                       }));
    return getDataTable(dataObject.reverse(), language.registredCustomersEmpty);
}

export function getPendingCustomersDataTable(){
    let dataObject = userData.pendingCustomers.map(customer => ({
                                                       'ID': customer.id,
                                                       'Ragione sociale': customer.ragioneSociale,
                                                       'Email': customer.email,
                                                       'Indirizzo':  customer.indirizzo,
                                                       'Provincia': customer.provincia,
                                                       'Città': customer.citta,
                                                       'Cap': customer.cap,
                                                       'Telefono': customer.telefono,
                                                       'Email confermata': customer.emailConfirmed ? 'SI' : 'NO'
                                                   }));

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
                        id: countNext() + "-customer" + _APPROVE_BUTTON_ID,
                        svg: OK_SVG,
                        type: SVG_ICON,
                        functionToCall: () => openDialog(APPROVE_CUSTOMER_DATA_DIALOG_ID, customer)
                    }
                )}
                ${createFunctionButton(
                    {
                        id: countNext() + "-customer" + _DECLINE_BUTTON_ID,
                        svg: DECLINE_SVG,
                        type: SVG_ICON,
                        functionToCall: () => openDialog(DECLINE_CUSTOMER_DATA_DIALOG_ID, customer)
                    }
                )}
            </td>`;

        Object.entries(customer).forEach(([key, value]) => {
            rows = rows.concat(`<td class="mdc-data-table__cell">${value}</td>`);
        });

        body.push(`<tr class="mdc-data-table__row">${rows}</tr>`);
    })

    resetCounter();

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

export function getRegistedOrdersDataTable(){
    let fullOrderList = userData.registredOrders;
    let dataObject = userData.registredOrders.map(order => ({
                                                    'ID': order.id,
                                                    'Codice': order.codice,
                                                    'Cliente mittente': order.email,
                                                    'Codice Doc. Trasporto': order.codiceDocumentoTrasporto != null ? order.codiceDocumentoTrasporto : '-',
                                                    'Destinatario': order.ragioneSociale,
                                                    'Indirizzo':  order.indirizzo,
                                                    'Città': order.citta + '(' + order.provincia + ')',
                                                    'Cap': order.cap,
                                                    'Telefono': order.telefono,
                                                    'Importo': order.importo != null ? order.importo : '-',
                                                    'Ser. Accessorio': order.servizioAccessorio,
                                                    'Stato': order.stato,
                                                    'Tracking': order.tracking
                                                }));
    let isObjectEmpty = isArrayNullOrEmpty(dataObject);
    dataObject = dataObject.reverse();

        if(isObjectEmpty){
            return `<span>${language.registredOrdersEmpty}</span>`;
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
                            id: countNext() + "-delivery" + _APPROVE_BUTTON_ID,
                            svg: DELIVERY_SVG,
                            type: SVG_ICON,
                            functionToCall: () => openDeliveryDialog(order)
                        }
                    )}
                    ${createFunctionButton(
                        {
                            id: countNext() + "-notes" + _NOTES_BUTTON_ID,
                            svg: NOTES_SVG,
                            type: SVG_ICON,
                            functionToCall: () => openNotesDialog(order)
                        }
                    )}
                    ${createFunctionButton(
                        {
                            id: countNext() + "-registered" + _DETAIL_BUTTON_ID,
                            svg: DETAIL_SVG,
                            type: SVG_ICON,
                            functionToCall: () => openDetailDialog(fullOrderList.find(fullOrder => fullOrder.id == order['ID']).codice)
                        }
                    )}
                </td>`;

            Object.entries(order).forEach(([key, value]) => {
                rows = rows.concat(`<td class="mdc-data-table__cell">${value}</td>`);
            });

            body.push(`<tr class="mdc-data-table__row">${rows}</tr>`);
        })

        resetCounter();

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
    return getDataTable(dataObject, language.registredOrdersEmpty);
}

export function getPendingOrdersDataTable(){
    let fullOrderList = userData.pendingOrders;
    let dataObject = userData.pendingOrders.map(order => ({
                                                    'ID': order.id,
                                                    'Codice': order.codice.includes("TEMP") ? "-" : order.codice,
                                                    'Cliente mittente': order.email,
                                                    'Codice Doc. Trasporto': order.codiceDocumentoTrasporto != null ? order.codiceDocumentoTrasporto : '-',
                                                    'Destinatario': order.ragioneSociale,
                                                    'Indirizzo':  order.indirizzo,
                                                    'Città': order.citta + '(' + order.provincia + ')',
                                                    'Cap': order.cap,
                                                    'Telefono': order.telefono,
                                                    'Importo': order.importo != null ? order.importo : '-',
                                                    'Ser. Accessorio': order.servizioAccessorio,
                                                    'Stato': order.stato,
                                                    'Tracking': order.tracking
                                                }));

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
                        id: countNext() + "-order" + _APPROVE_BUTTON_ID,
                        svg: OK_SVG,
                        type: SVG_ICON,
                        functionToCall: () => openDialog(APPROVE_ORDER_DATA_DIALOG_ID, order)
                    }
                )}
                ${createFunctionButton(
                    {
                        id: countNext() + "-order" + _DECLINE_BUTTON_ID,
                        svg: DECLINE_SVG,
                        type: SVG_ICON,
                        functionToCall: () => openDialog(DECLINE_ORDER_DATA_DIALOG_ID, order)
                    }
                )}
                ${createFunctionButton(
                    {
                        id: countNext() + "-pending" + _DETAIL_BUTTON_ID,
                        svg: DETAIL_SVG,
                        type: SVG_ICON,
                        functionToCall: () => openDetailDialog(fullOrderList.find(fullOrder => fullOrder.id == order['ID']).codice)
                    }
                )}
            </td>`;

        Object.entries(order).forEach(([key, value]) => {
            rows = rows.concat(`<td class="mdc-data-table__cell">${value}</td>`);
        });

        body.push(`<tr class="mdc-data-table__row">${rows}</tr>`);
    })

    resetCounter();

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