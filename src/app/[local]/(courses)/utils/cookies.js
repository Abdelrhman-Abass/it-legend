"use server"
import { cookies } from "next/headers"; // For Next.js cookies

// Save video playback time
export const savePlaybackState = async (courseId, nodeId, videoId, timestamp) => {
    const playbackState = JSON.parse(cookies().get("playbackState")?.value || "{}");

    if (!playbackState[courseId]) playbackState[courseId] = {};
    if (!playbackState[courseId][nodeId]) playbackState[courseId][nodeId] = {};

    playbackState[courseId][nodeId][videoId] = timestamp;

    cookies().set("playbackState", JSON.stringify(playbackState), {
        httpOnly: false, // Accessible on the client
        secure: true,
        maxAge: 7 * 24 * 60 * 60, // 1 week
    });
};

// Get video playback time
export const getLastPlayedNode = async (courseId) => {
    // Ensure courseId is a string
    const courseKey = String(courseId);

    const playbackState = JSON.parse(cookies().get("playbackState")?.value || "{}");

    console.log("playbackState:", playbackState);
    console.log("playbackState:", courseKey);

    // if (!playbackState[courseKey]) {
    //     console.error(`No playback data found for courseId: ${courseKey}`);
    //     return null; // No data for this course
    // }
    // else{
    //     return playbackState[courseKey]
    // }

    // // Get the first nodeId
    // const nodeIds = Object.keys(playbackState[courseKey]);
    // if (nodeIds.length === 0) {
    //     console.error(`No nodes found for courseId: ${courseKey}`);
    //     return null;
    // }

    // const nodeId = nodeIds[0];
    // console.log(`Last played node for courseId ${courseKey}:`, nodeId);

    // return nodeId || null;
    return courseKey;
};
// Retrieve the last played video and timestamp for a node
export const getLastPlayedVideo = async (courseId, nodeId) => {
    const playbackState = JSON.parse(cookies().get("playbackState")?.value || "{}");

    if (!playbackState[courseId]?.[nodeId]) {
        return null; // No data for this node
    }

    // Get the first videoId and its timestamp
    const videos = playbackState[courseId][nodeId];
    const videoId = Object.keys(videos)[0];
    const timestamp = videos[videoId] || 0;

    return { videoId, timestamp };
};