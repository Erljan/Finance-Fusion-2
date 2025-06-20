import { ACCESS_TOKEN } from "./constants";
import axios from 'axios'


export const api = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)

         const isPublicEndpoint = config.url.includes("/user/register") || config.url.includes("/token");

        if (token && !isPublicEndpoint) {
             config.headers.Authorization = `Bearer ${token}`;
         }
        // if(token){
        //     config.headers.Authorization = `Bearer ${token}`
        // }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

