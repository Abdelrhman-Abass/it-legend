"use server";
import axios from "axios";
import { cookies } from "next/headers";
import api from "../../../hooks/axiosInstance"
import { setAccessToken, setRefreshToken } from "../../../hooks/tokenUtils";

// Define a function to handle authentication requests with Axios
export const authHandler = async (url, body) => {
  try {
    const response = await api.post(`${process.env.NEXT_PUBLIC_BASE_URL}/${url}`, body);
    const expirationDate = new Date("9999-12-31T23:59:59.999Z");
    if (response?.data?.success) {
      const { token, refreshToken, email } = response.data.data;
      cookies().set("token", token,{ httpOnly: true, secure: true , maxAge: 3600} );
      cookies().set("refreshToken", refreshToken ,{ httpOnly: true, secure: true  , expires: expirationDate });

      // setAccessToken(token);
      // setRefreshToken(refreshToken);

      cookies().set("user", JSON.stringify(email), { expires: expirationDate });
      return { user: email, accessToken: token, refreshToken };
    }

    return null;
  } catch (error) {
    console.error("Error in authHandler:", error.message);
    return null;
  }
};
// export const authHandler = async (url, body) => {
//   try {
//     // Send the POST request using Axios
//     const response = await axios.post(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/${url}`,
//       body,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // Check if the response is successful
//     if (response?.data?.success) {
//       const { data } = response.data; // Extract the 'data' from the response
//       const { token, refreshToken ,email} = data;

      
//       // Store tokens and user data in cookies
//       cookies().set("token", token,{ httpOnly: true, secure: true , maxAge: 3600} );
//       cookies().set("refreshToken", refreshToken ,{ httpOnly: true, secure: true  , maxAge: 86400 });
//       // cookies().set("user_id", data.id);
//       cookies().set("user", JSON.stringify(email) , {maxAge: 86400});
//       // Return the user data and tokens (matching Redux expectations)
//       return { user: email, accessToken: token, refreshToken };
//     } else {
//       // If the response is not successful, return an error
//       return null;
//     }
//   } catch (error) {
//     // Handle error in case of failure (e.g., network issues, server errors)
//     console.error("Error in authHandler:", error.message);
//     return null;
//   }
// };

export const refreshAuth = async()=>{
  try {
    const refreshToken = cookies().get("refreshToken")?.value
    if (!refreshToken) throw new Error("Token is not available");

    const email = cookies().get("user")?.value
    if (!email) throw new Error("email is not available");
    console.log(email)
    
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/Token/`,
      {
        email,
        refreshToken
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    if (response?.data?.success) {
      const { data } = response.data; // Extract the 'data' from the response
      const { token } = data;

      
      // Store tokens and user data in cookies
      cookies().set("token", token,{ httpOnly: true, secure: true , maxAge: 3600} );
      return {token};
    } else {
      // If the response is not successful, return an error
      return null;
    }
} catch (error) {
    console.error("Error fetching user data:", error.message);
    return {
        data: null,
        message: error.response?.data?.message || error.message,
    };
}
}


export const PlayerLatestNode = async (courseId) => {
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
          `${process.env.NEXT_PUBLIC_BASE_URL}/MemberCoursePlayer/${courseId}`,
          config
      );
      
      if (response?.data?.success) {
          const { data } = response.data; // Extract the 'data' from the response      
      
          cookies().set("latestNode", JSON.stringify(data));
          // Return the user data and tokens (matching Redux expectations)
          return { latestNode: data};
        } else {
          // If the response is not successful, return an error
          return null;
        }
  } catch (error) {
      console.error("Error fetching user latest nodes data:", error.message);
      return {
          data: null,
          message: error.response?.data?.message || error.message,
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
