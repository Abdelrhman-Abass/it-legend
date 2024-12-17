"use server"
import axios from "axios";
import { getAccessToken, getRefreshToken, setAccessToken, clearTokens } from "./tokenUtils";
import { cookies } from "next/headers";


const api = axios.create({
  // baseURL: "${process.env.NEXT_PUBLIC_BASE_URL}",
  headers: { "Content-Type": "application/json" },
});

// Refresh token logic
const refreshAccessToken = async () => {
  const refreshToken = await getRefreshToken();
  const email = cookies().get("user")?.value;
    console.log("email : "+ JSON.parse(email) )
    const em = JSON.parse(email)
  if (!refreshToken || !email) {
    clearTokens();
    throw new Error("Refresh token or email missing");
  }

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/Token`, 
    { email : em , refreshToken }
  );

  const newAccessToken = response.data.data; // Only the new token is returned
  cookies().set("token", newAccessToken, { httpOnly: true, secure: true , maxAge: 3600} );

//   setAccessToken(JSON.stringify(newAccessToken));
  return newAccessToken;
};

// Add request interceptor for tokens
api.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log("Authorization Header:", config.headers.Authorization );
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for handling token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest); // Retry the original request
      } catch (refreshError) {
        // clearTokens();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
