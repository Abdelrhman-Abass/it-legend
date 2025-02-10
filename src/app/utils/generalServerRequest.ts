import axios from "axios";
import { AxiosInstance } from "./axiosInstance";
export const getServerRequest = async (url: string) => {
    try {
        const response = await AxiosInstance.get(url);
        return {
            success: true,
            data: response.data,
        };
    } catch (error: any) {
        if (error.response) {
        return {
            success: false,
            status: error.response.status,
            message: error.response.data.message,
        }
        }
        else if (error.request) {
            return {
                success: false,
                status: null,
                message: "No response received from server. Please check your connection.",
            };
        }
        else {
            return {
                success: false,
                status: null,
                message: "An unexpected error occurred.",
            };
        }
    }
};


export const postServerRequest = async (url: string, data: any) => {
    try {
        const res = await AxiosInstance.post(url, data );
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const spcificPostServerRequest = async (url: string) => {
    try {
        const res = await AxiosInstance.post(url );
        return res;
    } catch (error) {
        console.log(error);
    }
};


export const vdocipherPostServerOtpRequest = async (videoPath: string) => {
    try {
        const API_SECRET_KEY = process.env.NEXT_PUBLIC_VDOCIPHER;
        console.log(videoPath)

        const response = await axios.post(
            `https://dev.vdocipher.com/api/videos/${videoPath}/otp`,
            {}, // Axios requires an empty object as the request body
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Apisecret ${API_SECRET_KEY}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error fetching VdoCipher OTP:", error);
        throw error;
    }
};
