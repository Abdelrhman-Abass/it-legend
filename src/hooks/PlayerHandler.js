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
export const CoursePlayerLatestNode = async (courseId) => {
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
            `http://49.13.77.125:1118/Endpoint/api/MemberCoursePlayer/${courseId}`,
            config
        );
        console.log("Ltest from handler: " + JSON.stringify(response.data.data));

        // Manually set the cookie via Set-Cookie header
        const latestNodeData = JSON.stringify(response.data.data);
        const cookieOptions = {
            httpOnly: true,  // Cookie is inaccessible from JavaScript
            secure: 'production',  // Use Secure cookies in production
            sameSite: 'Strict',  // Add SameSite policy
            path: '/',  // Cookie is available throughout the site
        };

        const cookieHeader = `latestNode=${encodeURIComponent(latestNodeData)}; HttpOnly; Secure=${cookieOptions.secure}; SameSite=${cookieOptions.sameSite}; Path=${cookieOptions.path}`;
        
        // Set the cookie header
        const res = cookies();  // You may need to use this in your API handler
        res.setHeader('Set-Cookie', cookieHeader);

        return latestNodeData;
    } catch (error) {
        console.error("Error fetching course data:", error.message);
        return {
            data: null,
            message: error.response?.data?.message || error.message,
        };
    }
};
// cookies().set("latestNode", response.data.data); http://localhost:3000/en/course-player/602d090f-ef57-464a-b724-0bf57ae9cdc3
export const CoursePlayerVideo = async (courseId, nodeId) => {
    try {
      console.log("Starting CoursePlayerVideo:", courseId, nodeId);
      const token = cookies().get("token")?.value;
      if (!token) throw new Error("Token is not available");
      
      console.log("Token Retrieved:", token);
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        timeout: 3000000,
      };
  
      console.log("Making API Request to:", `http://49.13.77.125:1118/Endpoint/api/CourseVideo/${courseId}/videos/${nodeId}`);
  
      const response = await axios.get(
        `http://49.13.77.125:1118/Endpoint/api/CourseVideo/${courseId}/videos/${nodeId}`,
        config
      );
  
      console.log("API Response:", response.data);
      const res = response.data.data.video;
      return res;
    } catch (error) {
      console.error("Error fetching course data:", error.message);
      return {
        data: null,
        message: error.response?.data?.message || error.message,
      };
    }
  };
  

  export const CoursePlayerVideoIsWatched = async (videoId) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) throw new Error("Token is not available");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            timeout: 30000, // 30 seconds timeout.
        };

        // Send POST request
        await axios.post(
            `http://49.13.77.125:1118/Endpoint/api/MemberVideo/${videoId}/watch`,
            {}, // No request body
            config
        );

        // Return success confirmation since the API has no response body
        return { success: true, message: "Video marked as watched successfully." };
    } catch (error) {
        console.error("Error marking video as watched:", error);

        // Return structured error response
        return {
            success: false,
            message: error.response?.data?.message || "Failed to mark video as watched",
        };
    }
};

export const CoursePlayerVideoComments = async (nodeId) => {
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
            `http://49.13.77.125:1118/Endpoint/api/VideoComment/${nodeId}/comments`,
            config
        );

        return response.data.data;
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
