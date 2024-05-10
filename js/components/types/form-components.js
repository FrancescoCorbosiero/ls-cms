import { REGISTRED_ORDERS_TAB_CONTENT_VIEW_ID, REGISTRED_ORDERS_DATA_TABLE_ID, CUSTOMERS_TAB_BAR_ID, PENDING_CUSTOMERS_DATA_TABLE_ID, PENDING_CUSTOMERS_TAB_CONTENT_VIEW_ID, REGISTRED_CUSTOMERS_DATA_TABLE_ID, REGISTRED_CUSTOMERS_TAB_CONTENT_VIEW_ID, CUSTOMER_VIEW_FORM_ID, ORDER_VIEW_FORM_ID, ORDERS_TAB_BAR_ID, TRACE_ORDER_TAB_CONTENT_VIEW_ID, PENDING_ORDERS_TAB_CONTENT_VIEW_ID, PENDING_ORDERS_DATA_TABLE_ID, TRACE_ORDER_DATA_TABLE_ID, ORDER_CODE_TEXTFIELD_ID, TRACE_ORDER_BUTTON_ID, BUTTON_STANDARD, SERVICE_DROPDOWN_ID, TRACKING_STATE_DROPDOWN_ID, SERVICE_OPEN_DROPDOWN_TYPE_BUTTON_ID, TRACKING_STATE_OPEN_DROPDOWN_TYPE_BUTTON_ID, SERVICE_TYPE_ATTRIBUTE_ID, TRACKING_STATE_ATTRIBUTE_ID, BUTTON_ROUNDED } from "../../constant/costant.js";
import { language } from "../../constant/language-messages.js";
import { openSelectableDropdown, setCurretTabView, tracerOrder } from "../../function/component-handler.js";
import { userData } from "../data/user-data.js";
import { createFunctionButton } from "./button-component.js";
import { getDataTable, getPendingCustomersDataTable, getPendingOrdersDataTable, getRegistedCustomersDataTable, getRegistedOrdersDataTable } from "./data-tables-component.js";
import { creatDropdownMenuFromEnum, createServiceDropdownMenu } from "./dropdown-component.js";
import { createCustomerTabBar, createOrderTabBar } from "./tab-component.js";
import { createFormTextField, createTextField } from "./text-field-component.js";

export function getCustomerViewFormHtml(){
    //Set the view to pending customer tab 
    setCurretTabView(PENDING_CUSTOMERS_TAB_CONTENT_VIEW_ID);

    return `<div id="${CUSTOMER_VIEW_FORM_ID}" >
                ${createCustomerTabBar(CUSTOMERS_TAB_BAR_ID)}

                <div id="${PENDING_CUSTOMERS_TAB_CONTENT_VIEW_ID}" class="mt-3">
                    <div id="${PENDING_CUSTOMERS_DATA_TABLE_ID}" class="p-1 row justify-content-center">
                        ${getPendingCustomersDataTable()}
                    </div>
                </div>

                <div id="${REGISTRED_CUSTOMERS_TAB_CONTENT_VIEW_ID}" class="mt-3" hidden>
                    <div id="${REGISTRED_CUSTOMERS_DATA_TABLE_ID}" class="p-1 row justify-content-center" >
                        ${getRegistedCustomersDataTable()}
                    </div>
                </div>

            </div>`;
}

export function getOrderViewFormHtml(){
    //Set the view to pending customer tab 
    setCurretTabView(PENDING_ORDERS_TAB_CONTENT_VIEW_ID);

    return `<div id="${ORDER_VIEW_FORM_ID}" >
                ${createOrderTabBar(ORDERS_TAB_BAR_ID)}

                <div id="${PENDING_ORDERS_TAB_CONTENT_VIEW_ID}" class="mt-3">
                    <div id="${PENDING_ORDERS_DATA_TABLE_ID}" class="p-1 row justify-content-center">
                        ${getPendingOrdersDataTable()}
                    </div>
                </div>

                <div id="${REGISTRED_ORDERS_TAB_CONTENT_VIEW_ID}" class="mt-3" hidden>
                    <div id="${REGISTRED_ORDERS_DATA_TABLE_ID}" class="p-1 row justify-content-center" >
                        ${getRegistedOrdersDataTable()}
                    </div>
                </div>

                <div id="${TRACE_ORDER_TAB_CONTENT_VIEW_ID}" class="mt-3" hidden>
                    <div class="p-1 row justify-content-center" >
                        ${createTextField(
                            ORDER_CODE_TEXTFIELD_ID,
                            language.orderCode,
                            25
                        )}
                    </div>
                    <div class="p-1 row justify-content-center">
                        <div class="col align-self-center">
                            <div id="demo-menu" class="mdc-menu-surface--anchor">
                                ${createFunctionButton(
                                    {
                                        id: TRACKING_STATE_OPEN_DROPDOWN_TYPE_BUTTON_ID,
                                        text: language.trackingStateOpenDropdownText,
                                        type: BUTTON_STANDARD,
                                        functionToCall: () => openSelectableDropdown(TRACKING_STATE_OPEN_DROPDOWN_TYPE_BUTTON_ID, TRACKING_STATE_DROPDOWN_ID, TRACKING_STATE_ATTRIBUTE_ID),
                                        weight: "w-25"
                                    }
                                )}
                                ${creatDropdownMenuFromEnum(TRACKING_STATE_DROPDOWN_ID, TRACKING_STATE_ATTRIBUTE_ID, userData.trackingStateEnum)}
                            </div>
                        </div>
                    </div>
                    <div class="mt-3 p-1 row justify-content-center" >
                        ${createFunctionButton(
                            {
                                id: TRACE_ORDER_BUTTON_ID, 
                                text: language.search, 
                                type: BUTTON_ROUNDED,
                                weight: "w-25",
                                functionToCall: () => tracerOrder()
                            }
                        )}
                    </div>
                    <div id="${TRACE_ORDER_DATA_TABLE_ID}" class="mt-2 p-1 row justify-content-center" >
                    </div>
                </div>
            </div>`;
}