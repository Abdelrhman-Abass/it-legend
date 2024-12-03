"use client"
import { CoursePlayerVideoIsWatched } from "@/hooks/PlayerHandler";
import React, { useCallback, useEffect, useState } from "react";
import YouTube from "react-youtube";

const YouTubePlayer = ({ node, setWatch, handleIsVideoEnd ,nextNode }) => {
  
  const [player, setPlayer] = useState(null);
  const [hasReached80, setHasReached80] = useState(false);
  const [watchedDuration, setWatchedDuration] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  // console.log("Node data:", node);
  const changeNoParam = (newNoValue) => {
    // Get the current URL
    const currentUrl = new URL(window.location.href);

    // Update the 'no' parameter
    currentUrl.searchParams.set('no', newNoValue); // Change 'no' to the new value

    // Update the browser's URL without reloading the page
    window.history.pushState({}, '', currentUrl);
    window.location.reload();

  };
  // useEffect(()=>{
  //   const res = changeNoParam(nextNode)
  // },[])
  
  const opts = {
    playerVars: {
      autoplay: 1,
    },
  };

  const handleVideoWatched = async (videoId) => {
    const result = await CoursePlayerVideoIsWatched(videoId);

    if (result.success) {
        console.log(result.message);
    } else {
        console.error("Error:", result.message);
    }
};


  const YoutubeParser = (url = "") => {
    const regExp =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const onReady = (event) => {
    setPlayer(event.target);
  };

  const trackWatchedDuration = useCallback(() => {
    if (player) {
      const currentTime = player.getCurrentTime();
      setWatchedDuration((prevDuration) => prevDuration + 1); // Increment by 1 second
      // console.log(`Watched duration: ${currentTime} seconds`);
    }
  }, [player]);

  const onStateChange = useCallback(
    async (event) => {
      if (player) {
        const duration = player.getDuration();
        const currentTime = player.getCurrentTime();

        if (!hasReached80 && currentTime / duration >= 0.8) {
          setHasReached80(true);
          console.log("Video has reached 80% of the viewership.");
          await handleVideoWatched(node.videoId)
          setWatch(true)
        }
        if (currentTime / duration == 1) {
          setHasReached80(true);
          console.log("Video has reached 100% of the viewership.");
          changeNoParam(nextNode);
        }

        if (event.data === 1) {
          // Video is playing
          if (!intervalId) {
            const id = setInterval(trackWatchedDuration, 1000); // Track every second
            setIntervalId(id);
          }
        } else {
          // Video is paused or ended
          clearInterval(intervalId);
          setIntervalId(null);
        }
      }
    },
    [player, hasReached80, intervalId, trackWatchedDuration]
  );

  // const onStateChange = useCallback(
  //   async (event) => {
  //     if (player) {
  //       const duration = player.getDuration();
  //       const currentTime = player.getCurrentTime();
  //       if (!hasReached80 && currentTime / duration >= 0.8) {
  //         setHasReached80(true);
  //         console.log("Video has reached 80% of the viewership.");
  //         await handleIsWatched();
  //       }
  //     }
  //   },
  //   [player, hasReached80]
  // );

  return (
    <YouTube
      onEnd={handleIsVideoEnd}
      style={{ width: "100%", height: "100%" }}
      videoId={YoutubeParser(node?.path)}
      opts={opts}
      onReady={onReady}
      onStateChange={onStateChange}
    />
  );
};

export default YouTubePlayer;
