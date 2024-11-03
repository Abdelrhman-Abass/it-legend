// components/VideoPlayer.js
"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import "video-react/dist/video-react.css";

const Player = dynamic(() => import("video-react").then((mod) => mod.Player), {
  ssr: false,
});

const VideoPlayer = ({ videoUrl }) => {
  const playerRef = useRef(null);

  const handleTimeUpdate = () => {
    const player = playerRef.current;
    const currentTime = player.getState().player.currentTime;
    const duration = player.getState().player.duration;

    if (currentTime / duration >= 0.8) {
      console.log("Video reached 80% completion!");
      // Perform your custom action here
    }
  };

  useEffect(() => {
    const player = playerRef.current;
    player?.subscribeToStateChange(handleTimeUpdate);
  }, []);

  return (
    <div>
      <Player ref={playerRef} playsInline src={videoUrl} />
    </div>
  );
};

export default VideoPlayer;
