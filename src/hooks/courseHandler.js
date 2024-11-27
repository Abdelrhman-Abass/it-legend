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
export const courseUSerData = async () => {
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

        const response = await fetchWithRetry(
            `http://49.13.77.125:1118/Endpoint/api/MemberCourse`,
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

// export const courseUSerData = async () => {
//     try {
//         const token = cookies().get("token")?.value;
//         if (!token) throw new Error("Token is not available");

//         const response = await axios.get(
//             `http://49.13.77.125:1118/Endpoint/api/MemberCourse`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "application/json",
//                 },
//                 timeout: 300000, // Set timeout to 30 seconds

//             }
//         );

//         if (!response.ok) {
//             throw new Error("Failed to fetch data");
//         }

//         const data = await response.json();

//         // Ensure that the response has the correct structure
//         return response.data; // Axios automatically parses the JSON response

//     } catch (error) {
//         console.error(error);
//         return {
//             data: null, // Return null if there is an error
//             message: error.response?.data?.message || error.message, // Get error message from response if available
//         };
//     }
// };

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
