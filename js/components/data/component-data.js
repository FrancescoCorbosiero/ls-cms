import { DIALOG_COMPONENT_TYPE, DROPDOWN_COMPONENT_TYPE, RADIOBUTTON_COMPONENT_TYPE, SNACKBAR_COMPONENT_TYPE, TAB_BAR_COMPONENT_TYPE, TEXT_FIELD_COMPONENT_TYPE } from "../../constant/costant.js";

//Material Design
let materialDesignComponents = new Map;
let materialDesignCompentsToInit = [];

//Buttons
let buttonsWithEventListeners = [];

//Dropdowns data
let serviceDropDownData = [];

export function initMdComponents(){
    initComponents();
    initButtonEventListeners();
}

//MD COMPONENTS

    function initComponents() {
        let componentsToRemove = [];

        materialDesignCompentsToInit
                .filter(component => !materialDesignComponents.has(component.id) && document.getElementById(component.id) != null)
                .forEach(component => {
                    let id = component.id;
                    let type = component.componentType;
                    let element = document.getElementById(id);

                    switch(type){
                        case TEXT_FIELD_COMPONENT_TYPE:
                            let textFieldComponent = new mdc.textField.MDCTextField(element);

                            instantiateMdComponent(id, textFieldComponent);
                            break;
                        case DIALOG_COMPONENT_TYPE:
                            let dialogComponent = new mdc.dialog.MDCDialog(element);

                            instantiateMdComponent(id, dialogComponent);
                            break;
                        case DROPDOWN_COMPONENT_TYPE:
                            let drownDownComponent = new mdc.menu.MDCMenu(element);

                            instantiateMdComponent(id, drownDownComponent);
                            break;
                        case RADIOBUTTON_COMPONENT_TYPE:
                            let radioButtonComponent = new mdc.radio.MDCRadio(element);

                            instantiateMdComponent(id, radioButtonComponent);
                            break;
                        case TAB_BAR_COMPONENT_TYPE:
                            let tabBarComponent = new mdc.tabBar.MDCTabBar(element);

                            instantiateMdComponent(id, tabBarComponent);
                            break;
                        case SNACKBAR_COMPONENT_TYPE:
                            let snackBarComponent = new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'));

                            instantiateMdComponent(id, snackBarComponent);
                            break;
                        default:
                            //ERROR

                            break;
                    }

                    //Remove component from the array after the init
                    let componentArrayIndex = materialDesignCompentsToInit.indexOf(component);
                    componentsToRemove.push(componentArrayIndex);
                });

        //Remove init components
        materialDesignCompentsToInit = materialDesignCompentsToInit.filter((component => !componentsToRemove.includes(component) ));
    }

    function instantiateMdComponent(id, component){
        materialDesignComponents.set(id, component);
    }

    export function addMdComponentToInit(id, componentType){
        let component = {
            id: id,
            componentType: componentType
        }

        materialDesignCompentsToInit.push(component);
    }

    export function getMdComponent(id){
        return materialDesignComponents.get(id);
    }


//BUTTONS

    export function initButtonEventListeners() {
        buttonsWithEventListeners
            .filter(button => document.getElementById(button.id) != null)
            .forEach(button => {
                let id = button.id;
                let listenerEvent = button.listenerEvent;
                let listenerFunction = button.listenerFunction;

                document.getElementById(id).addEventListener(listenerEvent, listenerFunction);
            });
    }

    export function addButtonListenerToInit(id, listenerEvent, listenerFunction){
        let button = {
            id: id,
            listenerEvent: listenerEvent,
            listenerFunction: listenerFunction
        }

        buttonsWithEventListeners.push(button);
    }

//DROPDOWN

    export function initServiceDropDownData(apiResponse) {
        serviceDropDownData = apiResponse;
    }

    export function getServiceDropDownData() {
        return serviceDropDownData;
    }