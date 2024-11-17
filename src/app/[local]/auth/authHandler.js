"use server";
import axios from "axios";
import { cookies } from "next/headers";

// Define a function to handle authentication requests with Axios
export const authHandler = async (url, body) => {
  try {
    // Send the POST request using Axios
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${url}`,
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

      // Log token for debugging (optional)
      console.log("Received token:", token);

      // Store tokens and user data in cookies
      cookies().set("token", token);
      cookies().set("refreshToken", refreshToken);
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
