import { userData } from "../components/data/user-data.js";
import { APPROVE_PEDING_CUSTOMERS_URL, DECLINE_PEDING_CUSTOMERS_URL, GET, LOGIN_URL, PENDING_CUSTOMERS_URL, PENDING_ORDERS_URL, POST, REGISTRED_CUSTOMERS_URL, TRACE_ORDERS_URL, TRACKING_STATES_URL} from "../constant/rest-constant.js";
import { getLoginRequest } from "./dto/login-request.js";
import { getTracerOrderRequest } from "./dto/order-request.js";

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

export async function approvePendingCustomersRestCall(email){
    let request = {
        "email": email
    };

    await doPostAuthRestCall(APPROVE_PEDING_CUSTOMERS_URL, request);
}

export async function declinePendingCustomersRestCall(email){
    let request = {
        "email": email
    };

    await doPostAuthRestCall(DECLINE_PEDING_CUSTOMERS_URL, request);
}

//ORDERS
export async function getPendingOrdersRestCall(){
    let request = {};

    let response = await doPostAuthRestCall(PENDING_ORDERS_URL, request);

    let responseJson = await response.json();

    userData.pendingOrders = responseJson;
}


export async function tracerOrderRestCall(code, trackingState){
    let request = getTracerOrderRequest(code, trackingState);

    let response = await doPostAuthRestCall(TRACE_ORDERS_URL, request);

    let responseJson = await response.json();

    userData.tracedOrders.push(responseJson);
}

export async function getTrackingStatesRestCall(){
    let response = await doGetNoAuthRestCall(TRACKING_STATES_URL);

    let responseJson = await response.json();

    userData.trackingStateEnum = responseJson;
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
