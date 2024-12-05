"use server";
import { refreshAuth } from "@/app/[local]/auth/authHandler";
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
        if (!token) {
            const refreshToken = cookies().get("refreshToken")?.value
            if (!refreshToken) {
                return null
            }else{
                refreshAuth()
            }
        };

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

export const latestNodeOpend = async (courseId) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            const refreshToken = cookies().get("refreshToken")?.value
            if (!refreshToken) {
                return null
            }else{
                refreshAuth()
            }
        };

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            timeout: 3000000,
        };

        const response = await fetchWithRetry(
            `http://49.13.77.125:1118/Endpoint/api/MemberCoursePlayer/${courseId}`,
            config
        );

        // if (response) {
        //     cookies().set("latestNode", JSON.stringify(data),{ httpOnly: true, secure: true } );
        // }
        if (response?.data?.success) {
            const { data } = response.data; // Extract the 'data' from the response      
            
            // Store tokens and user data in cookies
            
            cookies().set("latestNode", JSON.stringify(data));
            
            return data;
          } else {
            // If the response is not successful, return an error
            return null;
          }
    } catch (error) {
        console.error("Error fetching course latest node data:", error.message);
        return {
            data: null,
            message: error.response?.data?.message || error.message,
        };
    }
};
export const authHandler = async (url, body) => {
    try {
      // Send the POST request using Axios
      const response = await axios.post(
        `http://49.13.77.125:1118/Endpoint/api/${url}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      // Check if the response is successful
      if (response?.data?.success) {
        const { data } = response.data; // Extract the 'data' from the response
        const { token, refreshToken } = data;
  
        
        // Store tokens and user data in cookies
        cookies().set("token", token,{ httpOnly: true, secure: true } );
        cookies().set("refreshToken", refreshToken ,{ httpOnly: true, secure: true });
        // cookies().set("user_id", data.id);
        cookies().set("user", JSON.stringify(data));
        // Return the user data and tokens (matching Redux expectations)
        return { user: data, accessToken: token, refreshToken };
      } else {
        // If the response is not successful, return an error
        return null;
      }
    } catch (error) {
      // Handle error in case of failure (e.g., network issues, server errors)
      console.error("Error in authHandler:", error.message);
      return null;
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
