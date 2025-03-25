import axios from "axios";
import { getCookie, setCookie } from "cookies-next";

export const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

// 🔹 Attach access token to requests
AxiosInstance.interceptors.request.use(
    async (config) => {
        const token = getCookie("userData"); // Access token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 🔄 Refresh token logic in response interceptor
AxiosInstance.interceptors.response.use(
    (response) => response, // ✅ Return response if no error
    async (error) => {
        const originalRequest = error.config;
        
        // ⛔ If not an auth error (401), reject immediately
        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        // 🛑 Prevent infinite loops
        originalRequest._retry = true;

        try {
            const refreshToken = getCookie("userDataRefresh"); // Get refresh token
            const email = getCookie("userDataEmail"); // Get refresh token
            if (!refreshToken) {
                console.log("No refresh token found, redirecting to login...");
                return Promise.reject(error);
            }

            // 🔄 Call refresh token API
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/token`, {
                refreshToken,
                email,
            });
            // console.log(data)
            // ✅ Store new token in cookies
            setCookie("userData", data.data, { maxAge: 3600 }); // Store for 1 hour

            // 🔁 Retry the failed request with the new token
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return AxiosInstance(originalRequest);
        } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            return Promise.reject(refreshError);
        }
    }
);
