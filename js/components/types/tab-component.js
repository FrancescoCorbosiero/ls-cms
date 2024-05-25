import { BUTTON_TAB_BAR, PENDING_CUSTOMERS_TAB_BUTTON_ID, PENDING_CUSTOMERS_TAB_CONTENT_VIEW_ID, REPORT_TAB_BUTTON_ID, REGISTRED_ORDERS_TAB_BUTTON_ID, PENDING_ORDERS_TAB_BUTTON_ID, REGISTRED_ORDERS_TAB_CONTENT_VIEW_ID, PENDING_ORDERS_TAB_CONTENT_VIEW_ID, REGISTRED_CUSTOMERS_TAB_BUTTON_ID, REGISTRED_CUSTOMERS_TAB_CONTENT_VIEW_ID, SEARCH_ORDER_TAB_BUTTON_ID, TAB_BAR_COMPONENT_TYPE, REPORT_TAB_CONTENT_VIEW_ID, TRACE_ORDER_TAB_CONTENT_VIEW_ID } from "../../constant/costant.js";
import { language } from "../../constant/language-messages.js";
import { setCurretTabView, switchTab } from "../../function/component-handler.js";
import { addMdComponentToInit } from "../data/component-data.js";
import { createFunctionButton } from "./button-component.js";
import { getDataTable } from "./data-tables-component.js";

function initTabBarComponent(id){
    addMdComponentToInit(id, TAB_BAR_COMPONENT_TYPE);
}

export function createCustomerTabBar(id){
    initTabBarComponent(id);

    return `
        <div id="${id}" class="mdc-tab-bar" role="tablist">
            <div class="mdc-tab-scroller">
                <div class="mdc-tab-scroller__scroll-area">
                    <div class="mdc-tab-scroller__scroll-content">
                        ${createFunctionButton(
                            {
                                id: PENDING_CUSTOMERS_TAB_BUTTON_ID, 
                                text: language.pendingCustomers, 
                                type: BUTTON_TAB_BAR, 
                                activeTab: true,
                                functionToCall: () => switchTab(PENDING_CUSTOMERS_TAB_CONTENT_VIEW_ID)
                            }
                        )}
                        ${createFunctionButton(
                            {
                                id: REGISTRED_CUSTOMERS_TAB_BUTTON_ID, 
                                text: language.registredCustomers,  
                                type: BUTTON_TAB_BAR,
                                activeTab: false,
                                functionToCall: () => switchTab(REGISTRED_CUSTOMERS_TAB_CONTENT_VIEW_ID)
                            }
                        )}
                    </div>
                </div>
            </div>
        </div>`;
}

export function createOrderTabBar(id){
    initTabBarComponent(id);

    return `
        <div id="${id}" class="mdc-tab-bar" role="tablist">
            <div class="mdc-tab-scroller">
                <div class="mdc-tab-scroller__scroll-area">
                    <div class="mdc-tab-scroller__scroll-content">
                        ${createFunctionButton(
                            {
                                id: PENDING_ORDERS_TAB_BUTTON_ID, 
                                text: language.pendingOrders, 
                                type: BUTTON_TAB_BAR, 
                                activeTab: true,
                                functionToCall: () => switchTab(PENDING_ORDERS_TAB_CONTENT_VIEW_ID)
                            }
                        )}
                        ${createFunctionButton(
                            {
                                id: REGISTRED_ORDERS_TAB_BUTTON_ID,
                                text: language.registredOrders,
                                type: BUTTON_TAB_BAR,
                                activeTab: false,
                                functionToCall: () => switchTab(REGISTRED_ORDERS_TAB_CONTENT_VIEW_ID)
                            }
                        )}
                        ${createFunctionButton(
                            {
                                id: REPORT_TAB_BUTTON_ID,
                                text: language.report,
                                type: BUTTON_TAB_BAR,
                                activeTab: false,
                                functionToCall: () => switchTab(REPORT_TAB_CONTENT_VIEW_ID)
                            }
                        )}
                    </div>
                </div>
            </div>
        </div>`;
}

export function createTabView(id, isDefaultView, contentToView){
    //if it's not the default tab view then hide it
    let hidden = isDefaultView ? "" : "hidden";

    //if it's the default view init the active tab view in the component-handler
    if(isDefaultView){
        setCurretTabView(id);
    }


    return `<div class="mt-3" id="${id}" ${hidden}>
                <div class="p-1 row justify-content-center">
                    ${contentToView}
                </div>
            </div>`;
}