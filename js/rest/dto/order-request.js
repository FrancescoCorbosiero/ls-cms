import { userData } from "../../components/data/user-data.js"

export function getTracerOrderRequest(code, trackingState){
    return {
        "codice": code,
        "tracking": trackingState
    }
}