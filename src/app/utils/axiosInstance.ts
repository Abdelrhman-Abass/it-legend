import axios from "axios";
import { getCookie } from "cookies-next";
export const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
AxiosInstance.defaults.headers.common["Accept"] = "application/json";
AxiosInstance.defaults.headers.common["Content-Type"] = "application/json";
AxiosInstance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
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
