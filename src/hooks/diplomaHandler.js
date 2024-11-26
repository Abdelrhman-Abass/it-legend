"use server";
import axios from "axios";
import { cookies } from "next/headers";

// Define a function to handle authentication requests with Axios
export const diplomaUSerData = async () => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) throw new Error("Token is not available");

        const response = await fetch(
            `http://49.13.77.125:1118/Endpoint/api/MemberCategory/categories`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        // Ensure that the response has the correct structure
        return {
            data: data?.data ?? null, // If 'data' is undefined, return null
            message: data?.message ?? null,
        };
    } catch (error) {
        console.error(error);
        return {
            data: null, // Return null if there is an error
            message: error.message,
        };
    }
};

