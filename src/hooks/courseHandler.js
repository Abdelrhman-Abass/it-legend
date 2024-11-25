"use server";
import axios from "axios";
import { cookies } from "next/headers";

// Define a function to handle authentication requests with Axios
export const courseUSerData = async () => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) throw new Error("Token is not available");

        const response = await axios.get(
            `http://49.13.77.125:1118/Endpoint/api/MemberCourse`,
            {
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
        return response.data; // Axios automatically parses the JSON response

    } catch (error) {
        console.error(error);
        return {
            data: null, // Return null if there is an error
            message: error.response?.data?.message || error.message, // Get error message from response if available
        };
    }
};

// Example of the `getJWT` helper function (also using Axios)
const getJWT = async (body) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/JWTAuthApi/post`,
            body,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        // Return JWT token from the response
        return response?.data?.data;
    } catch (error) {
        console.error("Error fetching JWT:", error.message);
        return null;
    }
};

export { getJWT };
