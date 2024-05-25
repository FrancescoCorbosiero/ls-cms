import { userData } from "../components/data/user-data.js";
import { REPORT_URL, NOTES_URL, UPDATE_NOTES_URL, APPROVE_PEDING_ORDERS_URL, DECLINE_PEDING_ORDERS_URL, APPROVE_PEDING_CUSTOMERS_URL, DECLINE_PEDING_CUSTOMERS_URL, GET, LOGIN_URL, PENDING_CUSTOMERS_URL, PENDING_ORDERS_URL, POST, REGISTRED_ORDERS_URL, REGISTRED_CUSTOMERS_URL, TRACE_ORDERS_URL, ACCESSORY_SERVICE_URL, TRACKING_STATES_URL} from "../constant/rest-constant.js";
import { getLoginRequest } from "./dto/login-request.js";
import { getTracerOrderRequest } from "./dto/order-request.js";
import { initServiceDropDownData } from "../components/data/component-data.js";

export async function doLoginRestCall(){
    let request = getLoginRequest();

    let response = await doPostNoAuthRestCall(LOGIN_URL, request);

    let responseJson = await response.json();

    userData.token = responseJson.token;
    userData.refreshToken = responseJson.refreshToken;
}

//CUSTOMERS
export async function getPendingCustomersRestCall(){
    let request = {};

    let response = await doPostAuthRestCall(PENDING_CUSTOMERS_URL, request);

    let responseJson = await response.json();

    userData.pendingCustomers = responseJson;
}

export async function getRegistredCustomersRestCall(){
    let request = {};

    let response = await doPostAuthRestCall(REGISTRED_CUSTOMERS_URL, request);

    let responseJson = await response.json();

    userData.registredCustomers = responseJson;
}

export async function approvePendingCustomersRestCall(req){
    await doPostAuthRestCall(APPROVE_PEDING_CUSTOMERS_URL, req);
}

export async function declinePendingCustomersRestCall(req){
    await doPostAuthRestCall(DECLINE_PEDING_CUSTOMERS_URL, req);
}

export async function approvePendingOrdersRestCall(req){
    await doPostAuthRestCall(APPROVE_PEDING_ORDERS_URL, req);
}

export async function declinePendingOrdersRestCall(req){
    await doPostAuthRestCall(DECLINE_PEDING_ORDERS_URL, req);
}

//ORDERS
export async function getPendingOrdersRestCall(){
    let request = {};

    let response = await doPostAuthRestCall(PENDING_ORDERS_URL, request);

    let responseJson = await response.json();

    userData.pendingOrders = responseJson;
}

export async function getRegistredOrdersRestCall(){
    let request = {};

    let response = await doPostAuthRestCall(REGISTRED_ORDERS_URL, request);

    let responseJson = await response.json();

    userData.registredOrders = responseJson;
}

// TRACKING
export async function tracerOrderRestCall(code, trackingState){
    let request = getTracerOrderRequest(code, trackingState);

    let response = await doPostAuthRestCall(TRACE_ORDERS_URL, request);

    let responseJson = await response.json();

    userData.tracedOrders.push(responseJson);
}

// NOTES
export async function getNotesRestCall(req){
    let response = await doPostAuthRestCall(NOTES_URL, req);
    let responseJson = await response.json();
    return responseJson.notes;
}

export async function updateNotesRestCall(req){
    await doPostAuthRestCall(UPDATE_NOTES_URL, req);
}

// REPORT
export async function reportRestCall(email, dateFrom, dateTo){
    let req = {
        email: email,
        from: dateFrom,
        to: dateTo
    };
    await doPostAuthRestCall(REPORT_URL, req);
}

// DROPDOWN
export async function getTrackingStatesRestCall(){
    let response = await doGetNoAuthRestCall(TRACKING_STATES_URL);

    let responseJson = await response.json();

    userData.trackingStateEnum = responseJson;
}

export async function getAccessoryServiceRestCall(){
    let response = await doGetNoAuthRestCall(ACCESSORY_SERVICE_URL);

    let responseJson = await response.json();

    userData.accessoryServiceEnum = responseJson;
}

async function doPostNoAuthRestCall(url, request){
    let response = await fetch(url, {
        method: POST,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    let restCallFailed = response.ok == false;

    if(restCallFailed){
        throw new Error("Rest call failed");
    }

    return response;
}

async function doGetNoAuthRestCall(url){
    let response = await fetch(url, {
        method: GET,
        headers: {
            "Content-Type": "application/json",
        }
    });

    let restCallFailed = response.ok == false;

    if(restCallFailed){
        throw new Error("Rest call failed");
    }

    return response;
}

async function doPostAuthRestCall(url, request){
    let response = await fetch(url, {
        method: POST,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userData.token}`
        },
        body: JSON.stringify(request),
    });

    let restCallFailed = response.ok == false;

    if(restCallFailed){
        throw new Error("Rest call failed");
    }

    return response;
}
