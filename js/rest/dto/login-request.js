import { userData } from "../../components/data/user-data.js";

export function getLoginRequest(){
    return {
        "username": userData.username,
        "password": userData.password
    }
}