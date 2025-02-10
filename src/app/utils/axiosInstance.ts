import axios from "axios";
import { getCookie } from "cookies-next";
export const AxiosInstance = axios.create({
    baseURL: "http://49.13.77.125:1118/Endpoint/api",
});
AxiosInstance.defaults.headers.common["Accept"] = "application/json";
AxiosInstance.defaults.headers.common["Content-Type"] = "application/json";
// AxiosInstance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
AxiosInstance.interceptors.request.use(
    async (config) => {
        const token = getCookie("userData"); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);
