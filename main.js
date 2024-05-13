import { initMdComponents } from "./js/components/data/component-data.js";
import { CLICK, ORDER_BUTTON_ID, CUSTOMER_BUTTON_ID, REFRESH_BUTTON_ID, ERROR_DIALOG_ID, LOGIN_DIALOG_ID } from "./js/constant/costant.js";
import { openLoginDialog } from "./js/function/component-handler.js";
import { swapToOrderSection, swapToCustomerSection, refreshSection } from "./js/function/state-machine.js";
import { initCmsUI, setNavigationButtonsToLoadState, showError, updateNavigationButtonsUI } from "./js/function/ui-handler.js";

//LISTENERS

//INIT COMPONENTS
document.addEventListener("DOMContentLoaded", function(event) {
    updateNavigationButtonsUI();
    initCmsUI();
    initMdComponents();

    openLoginDialog();
});


document.getElementById(ORDER_BUTTON_ID).addEventListener(CLICK, swapToOrderSection);
document.getElementById(CUSTOMER_BUTTON_ID).addEventListener(CLICK, swapToCustomerSection);
document.getElementById(REFRESH_BUTTON_ID).addEventListener(CLICK, refreshSection);
