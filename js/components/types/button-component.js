import { BUTTON_ROUNDED, BUTTON_STANDARD, BUTTON_TAB_BAR, CLICK } from "../../constant/costant.js";
import { addButtonListenerToInit } from "../data/component-data.js";

export function createStandardButton(buttonSettings){
    return `
        <button id="${buttonSettings.id}" class="mdc-button mdc-button--raised ${buttonSettings.weight}">
            <span class="mdc-button__label">${buttonSettings.text}</span>
        </button>
    `;
}

export function createRoundedButton(buttonSettings){
    return `
        <button id="${buttonSettings.id}" class="mdc-fab mdc-fab--extended ${buttonSettings.weight}">
            <div class="mdc-fab__ripple"></div>
            <span class="mdc-fab__label">${buttonSettings.text}</span>
        </button>
    `;
}

export function createTabBarButton(buttonSettings){
    let tabActive = buttonSettings.activeTab ? "--active" : "";
    let indicatorActive = buttonSettings.activeTab ? "mdc-tab-indicator--active" : "";

    return `
        <button class="mdc-tab mdc-tab${tabActive}" role="tab" aria-selected="true" tabindex="0" id="${buttonSettings.id}">
            <span class="mdc-tab__content">
                <span class="mdc-tab__text-label">${buttonSettings.text}</span>
            </span>
            
            <span class="mdc-tab-indicator ${indicatorActive}">
                <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
            </span>
            
            <span class="mdc-tab__ripple"></span>
        </button>`;

}

export function createIconButton(id, icon){
    return `
        <button id="${id}" class="mdc-button mdc-button--icon-leading">
            <span class="mdc-button__ripple"></span>
            <i class="material-icons mdc-button__icon" aria-hidden="true">${icon}</i>
        </button>
    `;
}

export function createFunctionButton(buttonSettings){
    
    addButtonListenerToInit(buttonSettings.id, CLICK, buttonSettings.functionToCall);

    buttonSettings.weight = buttonSettings.weight ? buttonSettings.weight : "";
    
    switch(buttonSettings.type){
        case BUTTON_STANDARD:
            return createStandardButton(buttonSettings);
        case BUTTON_ROUNDED:
            return createRoundedButton(buttonSettings);
        case BUTTON_TAB_BAR:
            return createTabBarButton(buttonSettings);
        default:
            console.error("Unexpected button type");

            break;
    }
}

