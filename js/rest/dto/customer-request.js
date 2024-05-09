import { userData } from "../../components/data/user-data.js";

export function getCustomerStatusRequest(){
    return {
        "email": userData.email
    }
}

export function getRegisterCustomerRequest(){
    return {
        "email": userData.email,
        "ragioneSociale": userData.company,
        "indirizzo": userData.address,
        "provincia": userData.province,
        "citta": userData.city,
        "cap": userData.postalCode,
        "telefono": userData.phone
    }
}