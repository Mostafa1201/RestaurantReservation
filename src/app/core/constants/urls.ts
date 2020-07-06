import { environment } from "../../../environments/environment";

/**
 * @example http://localhost:3000/
 */
const BASE_URL = environment.BASE_URL;

/**
 * @example http://localhost:3000/api/
 */
const API_URL = environment.API_URL;

export default {
    auth: {  
        login: API_URL + "auth/login",
        register: API_URL + "auth/register",
    },
    restaurantTables: {
        availableList: API_URL + "tables/available",
        add: API_URL + "tables/add",
    },
    reservation: {
        add: API_URL + "reservations/add",
        close: API_URL + "reservations/close",
        list: API_URL + "reservations/list",
    }
}