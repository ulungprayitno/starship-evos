import axios  from "axios";
import { BaseUrl } from "./constant";

const api = axios.create({
    baseURL: BaseUrl,
    headers : {
        'content-type' : 'application/json'
    },
    timeout: 10000
});

export default api