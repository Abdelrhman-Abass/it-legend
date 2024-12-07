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
    const playbackState = JSON.parse(cookies().get("playbackState")?.value || "{}");

    if (!playbackState[courseId]) {
        return null; // No data for this course
    }

    // Get the first nodeId (or adapt as needed if multiple nodes are stored)
    const nodeId = Object.keys(playbackState[courseId])[0];
    return nodeId || null;
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