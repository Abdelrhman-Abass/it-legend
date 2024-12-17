"use server";
import axios from "axios";
import { cookies } from "next/headers";
import api from "./axiosInstance";

// Define a function to handle authentication requests with Axios
export const diplomaUSerData = async () => {
    try {
        // const token = cookies().get("token")?.value;
        // if (!token) {
        //     const refreshToken = cookies().get("refreshToken")?.value
        //     if (!refreshToken) {
        //         return null
        //     }else{
        //         refreshAuth()
        //     }
        // };

        // const response = await fetch(
        //     `${process.env.NEXT_PUBLIC_BASE_URL}/MemberCategory/categories`,
        //     {
        //         method: "GET",
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //             "Content-Type": "application/json",
        //         },
        //     }
        // );

        const response = await api.get(`${process.env.NEXT_PUBLIC_BASE_URL}/MemberCategory/categories`);
        return response.data;


        // if (!response.ok) {
        //     throw new Error("Failed to fetch data");
        // }

        // const data = await response.json();

        // // Ensure that the response has the correct structure
        // return {
        //     data: data?.data ?? null, // If 'data' is undefined, return null
        //     message: data?.message ?? null,
        // };
    } catch (error) {
        console.error(error);
        return {
            data: null, // Return null if there is an error
            message: error.message,
        };
    }
};


// Function to fetch courses by category
export const getCoursesByCategory = async (categoryId) => {
    try {
        // const token = cookies().get("token")?.value;
        // if (!token) {
        //     const refreshToken = cookies().get("refreshToken")?.value
        //     if (!refreshToken) {
        //         return null
        //     }else{
        //         refreshAuth()
        //     }
        // };

        // const response = await fetch(
        //     `${process.env.NEXT_PUBLIC_BASE_URL}/MemberCategory/${categoryId}/details`,
        //     {
        //         method: "GET",
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //             "Content-Type": "application/json",
        //         },
        //     }
        // );
        const response = await api.get(`${process.env.NEXT_PUBLIC_BASE_URL}/MemberCategory/${categoryId}/details`);
        return response.data;


        // if (!response.ok) {
        //     throw new Error("Failed to fetch courses data");
        // }

        // const data = await response.json();

        // // Ensure that the response has the correct structure
        // return {
        //     data: data?.data ?? null, // If 'data' is undefined, return null
        //     message: data?.message ?? null,
        // };
    } catch (error) {
        console.error(error);
        return {
            data: null, // Return null if there is an error
            message: error.message,
        };
    }
};
