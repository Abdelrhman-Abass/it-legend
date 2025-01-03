"use server";
import axios from "axios";
import { cookies } from "next/headers";
import api from "./axiosInstance";

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
        // const token = cookies().get("token")?.value;
        // if (!token) {
        //     const refreshToken = cookies().get("refreshToken")?.value
        //     if (!refreshToken) {
        //         return null
        //     }else{
        //         refreshAuth()
        //     }
        // };

        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //         "Content-Type": "application/json",
        //     },
        //     timeout: 3000000,
        // };

        // const response = await axios.get(
        //     `${process.env.NEXT_PUBLIC_BASE_URL}/CourseLink/${courseId}/links`,
        //     config
        // );
        const response = await api.get(`${process.env.NEXT_PUBLIC_BASE_URL}/CourseLink/${courseId}/links`);


        return response.data;
    } catch (error) {
        console.error("Error fetching course Player Links data:", error.message);
        return {
            data: null,
            message: error.response?.data?.message || error.message,
        };
    }
};
export const CoursePlayerLatest = async (videoId) => {
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

        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //         "Content-Type": "application/json",
        //     },
        //     timeout: 3000000,
        // };

        // const response = await axios.get(
        //     `${process.env.NEXT_PUBLIC_BASE_URL}/MemberCoursePlayer/${videoId}`,
        //     config
        // );
        const response = await api.get(`${process.env.NEXT_PUBLIC_BASE_URL}/MemberCoursePlayer/${videoId}`);

        
        if (response?.data?.success) {
            const { data } = response.data; // Extract the 'data' from the response      
        
            cookies().set("latestNode", JSON.stringify(data));
            // Return the user data and tokens (matching Redux expectations)
            return { latestNode: data};
          } else {
            // If the response is not successful, return an error
            return null;
          }
        // console.log("Ltest from handler" + JSON.stringify(response.data.data))
        // cookies().set("latestNode", JSON.stringify(response.data.data) ,{ httpOnly: true, secure: true }); 
        // return JSON.stringify(response.data.data);
    } catch (error) {
        console.error("Error fetching latest data:", error.message);
        return {
            data: null,
            message: error.response?.data?.message || error.message,
        };
    }
};
export const CoursePlayerLatestNode = async (courseId) => {
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

        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //         "Content-Type": "application/json",
        //     },
        //     timeout: 3000000,
        // };

        // const response = await axios.get(
        //     `${process.env.NEXT_PUBLIC_BASE_URL}/MemberCoursePlayer/${courseId}`,
        //     config
        // );
        const response = await api.get(`${process.env.NEXT_PUBLIC_BASE_URL}/MemberCoursePlayer/${courseId}`);

        
        if (response?.data?.success) {
            const { data } = response.data; // Extract the 'data' from the response      
        
            cookies().set("latestNode", JSON.stringify(data));
            // Return the user data and tokens (matching Redux expectations)
            return { latestNode: data};
          } else {
            // If the response is not successful, return an error
            return null;
          }
        // console.log("Ltest from handler" + JSON.stringify(response.data.data))
        // cookies().set("latestNode", JSON.stringify(response.data.data) ,{ httpOnly: true, secure: true }); 
        // return JSON.stringify(response.data.data);
    } catch (error) {
        console.error("Error fetching latest data:", error.message);
        return {
            data: null,
            message: error.response?.data?.message || error.message,
        };
    }
};
export const CoursePlayerVideoType = async (courseId) => {
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

        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //         "Content-Type": "application/json",
        //     },
        //     timeout: 3000000,
        // };

        // const response = await axios.get(
        //     `${process.env.NEXT_PUBLIC_BASE_URL}/MemberCoursePlayer/${courseId}`,
        //     config
        // );
        const response = await api.get(`${process.env.NEXT_PUBLIC_BASE_URL}/MemberCoursePlayer/${courseId}`);

        
        if (response?.data?.success) {
            const { data } = response.data; // Extract the 'data' from the response      
            console.log("Return the Player Type and progress " + response)

            cookies().set("latestNode", JSON.stringify(data));
            // Return the user data and tokens (matching Redux expectations)
            return data;
          } else {
            // If the response is not successful, return an error
            return null;
          }
        
    } catch (error) {
        console.error("Error fetching latest data:", error.message);
        return {
            data: null,
            message: error.response?.data?.message || error.message,
        };
    }
};

// cookies().set("latestNode", response.data.data); http://localhost:3000/en/course-player/602d090f-ef57-464a-b724-0bf57ae9cdc3
export const CoursePlayerVideo = async (courseId, nodeId) => {
    try {
    //   console.log("Starting CoursePlayerVideo:", courseId, nodeId);
    //   const token = cookies().get("token")?.value;
    //   if (!token) {
    //     const refreshToken = cookies().get("refreshToken")?.value
    //     if (!refreshToken) {
    //         return null
    //     }else{
    //         refreshAuth()
    //     }
    //     };
      
    //   console.log("Token Retrieved:", token);
  
    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //     timeout: 3000000,
    //   };
  
    //   console.log("Making API Request to:", `${process.env.NEXT_PUBLIC_BASE_URL}/CourseVideo/${courseId}/videos/${nodeId}`);
  
    //   const response = await axios.get(
    //     `${process.env.NEXT_PUBLIC_BASE_URL}/CourseVideo/${courseId}/videos/${nodeId}`,
    //     config
    //   );
      const response = await api.get(`${process.env.NEXT_PUBLIC_BASE_URL}/CourseVideo/${courseId}/videos/${nodeId}`);

  
      console.log("API Response:", response.data);
      const res = response.data.data.video;
      return res;
    } catch (error) {
      console.error("Error fetching course data player video:", error.message);
      return {
        data: null,
        message: error.response?.data?.message || error.message,
      };
    }
  };
  

  export const CoursePlayerVideoIsWatched = async (videoId) => {
    try {
        const token = cookies().get("token")?.value;
        // if (!token) {
        //     const refreshToken = cookies().get("refreshToken")?.value
        //     if (!refreshToken) {
        //         return null
        //     }else{
        //         refreshAuth()
        //     }
        // };

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            timeout: 30000, // 30 seconds timeout.
        };

        // Send POST request
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/MemberVideo/${videoId}/watch`,
            {}, // No request body
            config
        );
        if(response.success){
            console.log("Video marked as watched successfully.")
        }
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

export const CoursePlayerVideoComments = async (videoId) => {
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

        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //         "Content-Type": "application/json",
        //     },
        //     timeout: 3000000,
        // };

        // const response = await axios.get(
        //     `${process.env.NEXT_PUBLIC_BASE_URL}/VideoComment/${nodeId}/comments`,
        //     config
        // );
        console.log(" video id from server handler "  + videoId )
        const response = await api.get(`${process.env.NEXT_PUBLIC_BASE_URL}/VideoComment/${videoId}/comments`);

        return response.data.data;
    } catch (error) {
        console.error("Error fetching course video comments data:", error.message);
        return {
            data: null,
            message: error.response?.data?.message || error.message,
        };
    }
};

export const CoursePlayerNode = async (courseId ) => {
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

        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //         "Content-Type": "application/json",
        //     },
        //     timeout: 3000000,
        // };

        // const response = await axios.get(
        //     `${process.env.NEXT_PUBLIC_BASE_URL}/CourseNode/${courseId}/nodes`,
        //     config
        // );
        const response = await api.get(`${process.env.NEXT_PUBLIC_BASE_URL}/CourseNode/${courseId}/nodes`);

        return response.data;
    } catch (error) {
        console.error("Error fetching course player node data:", error.message);
        return {
            data: null,
            message: error.response?.data?.message || error.message,
        };
    }
};
export const CourseFeatureDetails = async (courseId ) => {
    try {
        
        const response = await api.get(`${process.env.NEXT_PUBLIC_BASE_URL}/CourseFeature/${courseId}/features`);

        return response.data;
    } catch (error) {
        console.error("Error fetching course player node data:", error.message);
        return {
            data: null,
            message: error.response?.data?.message || error.message,
        };
    }
};
