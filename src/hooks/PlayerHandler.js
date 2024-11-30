"use server";
import axios from "axios";
import { cookies } from "next/headers";

// Define a function to handle authentication requests with Axios
const fetchWithRetry = async (url, config, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
        try {
            return await axios.get(url, config);
        } catch (error) {
            if (i === retries - 1) throw error;
            console.warn(`Retrying (${i + 1}/${retries})...`);
            await new Promise((res) => setTimeout(res, delay));
        }
    }
};

// alaamuhamed97@gmail.com
export const CoursePlayerLinks = async (courseId) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) throw new Error("Token is not available");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            timeout: 3000000,
        };

        const response = await axios.get(
            `http://49.13.77.125:1118/Endpoint/api/CourseLink/${courseId}/links`,
            config
        );

        return response.data;
    } catch (error) {
        console.error("Error fetching course data:", error.message);
        return {
            data: null,
            message: error.response?.data?.message || error.message,
        };
    }
};

export const CoursePlayerVideo = async (courseId , nodeId) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) throw new Error("Token is not available");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            timeout: 3000000,
        };

        
        const response = await axios.get(
            `http://49.13.77.125:1118/Endpoint/api/CourseVideo/${courseId}/videos/${nodeId}`,
            config
        );
        // console.log(response.data.data.video)
        const res = response.data.data.video
        return res;

    } catch (error) {
        console.error("Error fetching course data:", error.message);
        return {
            data: null,
            message: error.response?.data?.message || error.message,
        };
    }
};


export const CoursePlayerVideoComments = async (courseId ,videoId) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) throw new Error("Token is not available");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            timeout: 3000000,
        };

        const response = await axios.get(
            `http://49.13.77.125:1118/Endpoint/api/CourseVideo/${courseId}/videos/${videoId}`,
            config
        );

        return response.data;
    } catch (error) {
        console.error("Error fetching course data:", error.message);
        return {
            data: null,
            message: error.response?.data?.message || error.message,
        };
    }
};

export const CoursePlayerNode = async (courseId ) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) throw new Error("Token is not available");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            timeout: 3000000,
        };

        const response = await axios.get(
            `http://49.13.77.125:1118/Endpoint/api/CourseNode/${courseId}/nodes`,
            config
        );

        return response.data;
    } catch (error) {
        console.error("Error fetching course data:", error.message);
        return {
            data: null,
            message: error.response?.data?.message || error.message,
        };
    }
};
