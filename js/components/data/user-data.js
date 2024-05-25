import { removeArrayElementByIndex } from "../../utility/array-util.js";

export const userData = {
    //LOGIN
    username: "",
    password: "",

    //TOKEN
    token: "",
    refreshToken: "",

    //CUSTOMERS
    pendingCustomers: [],
    registredCustomers: [],

    //ORDERS
    pendingOrders: [],
    registredOrders: [],
    tracedOrders: [],

    //ENUM
    trackingStateEnum: [
        {
            "id": 0,
            "name": "NON_GESTITO",
            "label": "Non gestito"
        },
        {
            "id": 1,
            "name": "PRESA",
            "label": "Presa in carico"
        },
        {
            "id": 2,
            "name": "TRANSITO",
            "label": "Transito"
        },
        {
            "id": 3,
            "name": "TERMINAL_DEST",
            "label": "Terminal destinatario"
        },
        {
            "id": 4,
            "name": "ASSEGNATO",
            "label": "Assegnato"
        },
        {
            "id": 5,
            "name": "CONSEGNATO",
            "label": "Consegnato"
        }
    ],
    accessoryServiceEnum: [],

    //ADMIN ACTIONS
    rowPayload: {}
}

export function setCurrentRow(current){
    userData.rowPayload = current;
}