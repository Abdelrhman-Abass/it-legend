// 'use client';

// import { useEffect, useRef, useState } from "react";
// import { useNodeId } from "../../context/NodeIdContext";
// import { CoursePlayerVideoIsWatched } from "@/hooks/PlayerHandler";
// import debounce from "lodash.debounce";
// import { savePlaybackState } from "../../../utils/cookies";

// // Helper function to derive video path and poster
// const deriveVideoAssets = (path) => {
//   if (!path) return { videoPath: null, posterPath: null };
//   if (path.includes(".html")) {
//     return {
//       videoPath: path.replace(".html", ".m3u8"),
//       posterPath: path.replace(".html", ".jpg"),
//     };
//   }
//   return {
//     videoPath: path,
//     posterPath: path.replace(".m3u8", ".jpg"),
//   };
// };

// const PublitioPlayer = ({ node, handleIsVideoEnd, nextNode }) => {
//   const [poster, setPoster] = useState(null);
//   const [hasWatched80Percent, setHasWatched80Percent] = useState(false);
//   const videoRef = useRef(null);
//   const { setActiveNode, activeNode, markNodeAsWatched } = useNodeId();
//   const getCourseIdFromUrl = () => {
//     const currentUrl = new URL(window.location.href);
//     return currentUrl.pathname.split("/").pop(); // Assumes courseId is the last part of the URL
//   };

//   const courseId = getCourseIdFromUrl();

//   useEffect(() => {
//     const { videoPath, posterPath } = deriveVideoAssets(node?.path);
//     setPoster(posterPath);

//     if (!videoPath) return;

//     const video = videoRef.current;

//     // Prevent reinitialization if already initialized
//     if (video && video.hlsInitialized) {
//       return;
//     }

//     const savedTime = localStorage.getItem(`video_${node.videoId}_time`);
//     if (savedTime) {
//       video.currentTime = Number(savedTime);
//     }

//     const script = document.createElement("script");
//     script.src = "https://static.publit.io/js/hls.js";
//     script.async = true;

//     const initializePlayer = () => {
//       if (window.Hls && window.Hls.isSupported()) {
//         const hls = new window.Hls();
//         hls.attachMedia(video);

//         hls.on(window.Hls.Events.MEDIA_ATTACHED, () => {
//           hls.loadSource(videoPath);

//           if (video.readyState >= 2) {
//             video.play().catch((error) =>
//               console.error("Video playback error:", error)
//           );
//         }
//       });
//       // const handlePause = () => {
//       //   console.log("Video stopped");
//       //   if (onVideoStop) onVideoStop(); // Trigger custom handler for stop
//       //   savePlaybackState(courseId, activeNode, node?.videoId, video.currentTime); // Save playback state on pause
  
//       // };

//         const handleTimeUpdate = debounce(() => {
//           const watchedPercentage = (video.currentTime / video.duration) * 100;

//           if (watchedPercentage >= 80 && !hasWatched80Percent) {
//             setHasWatched80Percent(true);
//             handleVideoWatched(node.videoId);
//             markNodeAsWatched(activeNode);
//           }

//           if (watchedPercentage === 100) {
//             changeActiveNode(nextNode);
//           }
          
//           localStorage.setItem(`video_${node.videoId}_time`, video.currentTime);
//         }, 500);

//         video.addEventListener("ended", handleIsVideoEnd);
//         video.addEventListener("timeupdate", handleTimeUpdate);
//         video.addEventListener("pause", savePlaybackState(courseId, activeNode, node?.videoId, video.currentTime));

//         video.hls = hls;
//         video.hlsInitialized = true; // Mark as initialized
//       } else {
//         console.error("Hls.js is not supported in this browser.");
//       }
//     };


//     script.onload = initializePlayer;
//     document.body.appendChild(script);

//     return () => {
//       if (video) {
//         video.removeEventListener("ended", handleIsVideoEnd);
//         video.removeEventListener("timeupdate", () => {});
//         video.removeEventListener("pause", savePlaybackState(courseId, activeNode, node?.videoId, video.currentTime));


//         if (video.hls) {
//           video.hls.destroy();
//           video.hlsInitialized = false; // Reset initialized flag
//         }
//       }
//       document.body.removeChild(script);
//     };
//   }, [node?.path, handleIsVideoEnd, hasWatched80Percent, nextNode, activeNode]);

//   const handleVideoWatched = async (videoId) => {
//     const result = await CoursePlayerVideoIsWatched(videoId);

//     if (result.success) {
//       console.log(result.message);
//     } else {
//       console.error("Error:", result.message);
//     }
//   };

//   const changeActiveNode = (newNodeValue) => {
//     setActiveNode(newNodeValue);
//   };

//   return (
//     <div className="video-container w-full h-full">
//       <video
//         autoPlay
//         muted
//         ref={videoRef}
//         className="w-full h-full"
//         onContextMenu={(e) => e.preventDefault()}
//         controlsList="nodownload"
//         controls
//         poster={poster}
//         playsInline
//       />
//     </div>
//   );
// };

// export default PublitioPlayer;

// 'use client';

// import { useEffect, useRef, useState } from "react";
// import { useNodeId } from "../../context/NodeIdContext";
// import { CoursePlayerVideoIsWatched } from "@/hooks/PlayerHandler";
// import debounce from "lodash.debounce";
// import { savePlaybackState } from "../../../utils/cookies";

// // Helper function to derive video path and poster
// const deriveVideoAssets = (path) => {
//   if (!path) return { videoPath: null, posterPath: null };
//   if (path.includes(".html")) {
//     return {
//       videoPath: path.replace(".html", ".m3u8"),
//       posterPath: path.replace(".html", ".jpg"),
//     };
//   }
//   return {
//     videoPath: path,
//     posterPath: path.replace(".m3u8", ".jpg"),
//   };
// };

// const PublitioPlayer = ({ node, handleIsVideoEnd, nextNode }) => {
//   const [poster, setPoster] = useState(null);
//   const [hasWatched80Percent, setHasWatched80Percent] = useState(false);
//   const videoRef = useRef(null);
//   const { setActiveNode, activeNode, markNodeAsWatched } = useNodeId();

//   const getCourseIdFromUrl = () => {
//     const currentUrl = new URL(window.location.href);
//     return currentUrl.pathname.split("/").pop(); // Assumes courseId is the last part of the URL
//   };

//   const courseId = getCourseIdFromUrl();

//   const handleTimeUpdate = debounce((video) => {
//     const watchedPercentage = (video.currentTime / video.duration) * 100;

//     if (watchedPercentage >= 80 && !hasWatched80Percent) {
//       setHasWatched80Percent(true);
//       handleVideoWatched(node.videoId);
//       markNodeAsWatched(activeNode);
//     }

//     if (watchedPercentage === 100) {
//       changeActiveNode(nextNode);
//     }

//     // Save video time to localStorage
//     localStorage.setItem(`video_${node.videoId}_time`, video.currentTime);
//   }, 500);

//   const handleVideoWatched = async (videoId) => {
//     const result = await CoursePlayerVideoIsWatched(videoId);

//     if (result.success) {
//       console.log(result.message);
//     } else {
//       console.error("Error:", result.message);
//     }
//   };

//   const changeActiveNode = (newNodeValue) => {
//     setActiveNode(newNodeValue);
//   };

//   useEffect(() => {
//     const { videoPath, posterPath } = deriveVideoAssets(node?.path);
//     setPoster(posterPath);

//     if (!videoPath) return;

//     const video = videoRef.current;

//     // Check if the player has already been initialized
//     if (video && video.hlsInitialized) {
//       return;
//     }

//     const savedTime = localStorage.getItem(`video_${node.videoId}_time`);
//     if (savedTime) {
//       video.currentTime = Number(savedTime);
//     }

//     const script = document.createElement("script");
//     script.src = "https://static.publit.io/js/hls.js";
//     script.async = true;

//     const initializePlayer = () => {
//       if (window.Hls && window.Hls.isSupported()) {
//         const hls = new window.Hls();
//         hls.attachMedia(video);

//         hls.on(window.Hls.Events.MEDIA_ATTACHED, () => {
//           hls.loadSource(videoPath);

//           if (video.readyState >= 2) {
//             video.play().catch((error) =>
//               console.error("Video playback error:", error)
//             );
//           }
//         });

//         video.addEventListener("ended", handleIsVideoEnd);
//         video.addEventListener("timeupdate", () => handleTimeUpdate(video));
//         video.addEventListener("pause", () =>
//           savePlaybackState(courseId, activeNode, node?.videoId, video.currentTime)
//         );

//         video.hls = hls;
//         video.hlsInitialized = true; // Mark as initialized
//       } else {
//         console.error("Hls.js is not supported in this browser.");
//       }
//     };

//     // Load HLS.js script
//     script.onload = initializePlayer;
//     document.body.appendChild(script);

//     // Cleanup function to remove event listeners and destroy HLS instance
//     return () => {
//       if (video) {
//         video.removeEventListener("ended", handleIsVideoEnd);
//         video.removeEventListener("timeupdate", () => handleTimeUpdate(video));
//         video.removeEventListener("pause", () =>
//           savePlaybackState(courseId, activeNode, node?.videoId, video.currentTime)
//         );

//         if (video.hls) {
//           video.hls.destroy();
//           video.hlsInitialized = false; // Reset initialization
//         }
//       }
//       document.body.removeChild(script);
//     };
//   }, [node?.path, handleIsVideoEnd, hasWatched80Percent, nextNode, activeNode]);

//   return (
//     <div className="video-container w-full h-full">
//       <video
//         autoPlay
//         muted
//         ref={videoRef}
//         className="w-full h-full"
//         onContextMenu={(e) => e.preventDefault()}
//         controlsList="nodownload"
//         controls
//         poster={poster}
//         playsInline
//       />
//     </div>
//   );
// };

// export default PublitioPlayer;


'use client';

import { useEffect, useRef, useState } from "react";
import { useNodeId } from "../../context/NodeIdContext";
import { CoursePlayerVideoIsWatched } from "@/hooks/PlayerHandler";
import debounce from "lodash.debounce";
import { savePlaybackState } from "../../../utils/cookies";

// Helper function to derive video path and poster
const deriveVideoAssets = (path) => {
  if (!path) return { videoPath: null, posterPath: null };
  if (path.includes(".html")) {
    return {
      videoPath: path.replace(".html", ".m3u8"),
      posterPath: path.replace(".html", ".jpg"),
    };
  }
  return {
    videoPath: path,
    posterPath: path.replace(".m3u8", ".jpg"),
  };
};

const PublitioPlayer = ({ node, handleIsVideoEnd, nextNode }) => {
  const [poster, setPoster] = useState(null);
  const [hasWatched80Percent, setHasWatched80Percent] = useState(false);
  const videoRef = useRef(null);
  const { setActiveNode, activeNode, markNodeAsWatched } = useNodeId();

  const getCourseIdFromUrl = () => {
    const currentUrl = new URL(window.location.href);
    return currentUrl.pathname.split("/").pop(); // Assumes courseId is the last part of the URL
  };
  const courseId = getCourseIdFromUrl();

  // useEffect(()=>{
  //   savePlaybackState(courseId, activeNode, node?.videoId)
  // },[node?.videoId])


  const handleTimeUpdate = debounce((video) => {
    const watchedPercentage = (video.currentTime / video.duration) * 100;

    if (watchedPercentage >= 80 && !hasWatched80Percent) {
      setHasWatched80Percent(true);
      handleVideoWatched(node.videoId);
      markNodeAsWatched(activeNode);
    }

    if (watchedPercentage === 100) {
      changeActiveNode(nextNode);
    }

    // Save video time to localStorage
    localStorage.setItem(`video_${node.videoId}_time`, video.currentTime);
  }, 500);

  const handleVideoWatched = async (videoId) => {
    const result = await CoursePlayerVideoIsWatched(videoId);

    if (result.success) {
      console.log(result.message);
    } else {
      console.error("Error:", result.message);
    }
  };

  const changeActiveNode = (newNodeValue) => {
    setActiveNode(newNodeValue);
  };

  useEffect(() => {
    const { videoPath, posterPath } = deriveVideoAssets(node?.path);
    setPoster(posterPath);

    if (!videoPath) return;

    const video = videoRef.current;

    // Check if the player has already been initialized
    if (video && video.hlsInitialized) {
      return;
    }

    const savedTime = localStorage.getItem(`video_${node.videoId}_time`);
    if (savedTime) {
      video.currentTime = Number(savedTime);
    }

    const script = document.createElement("script");
    script.src = "https://static.publit.io/js/hls.js";
    script.async = true;

    const initializePlayer = () => {
      if (window.Hls && window.Hls.isSupported()) {
        const hls = new window.Hls();
        hls.attachMedia(video);

        hls.on(window.Hls.Events.MEDIA_ATTACHED, () => {
          hls.loadSource(videoPath);

          if (video.readyState >= 2) {
            video.play().catch((error) =>
              console.error("Video playback error:", error)
            );
          }
        });
        video.addEventListener("play", () => savePlaybackState(courseId, activeNode, node?.videoId));
        video.addEventListener("ended", handleIsVideoEnd);
        video.addEventListener("timeupdate", () => handleTimeUpdate(video));
        video.addEventListener("pause", () =>
          savePlaybackState(courseId, activeNode, node?.videoId, video.currentTime)
        );

        video.hls = hls;
        video.hlsInitialized = true; // Mark as initialized
      } else {
        console.error("Hls.js is not supported in this browser.");
      }
    };

    // Load HLS.js script
    script.onload = initializePlayer;
    document.body.appendChild(script);

    // Cleanup function to remove event listeners and destroy HLS instance
    return () => {
      if (video) {
        video.removeEventListener("play", savePlaybackState(courseId, activeNode, node?.videoId));
        video.removeEventListener("ended", handleIsVideoEnd);
        video.removeEventListener("timeupdate", () => handleTimeUpdate(video));
        video.removeEventListener("pause", () =>
          savePlaybackState(courseId, activeNode, node?.videoId, video.currentTime)
        );

        if (video.hls) {
          video.hls.destroy();
          video.hlsInitialized = false; // Reset initialization
        }
      }
      document.body.removeChild(script);
    };
  }, [node?.path, handleIsVideoEnd, hasWatched80Percent, nextNode, activeNode]);

  return (
    <div className="video-container w-full h-full">
      <video
        autoPlay
        muted
        ref={videoRef}
        className="w-full h-full"
        onContextMenu={(e) => e.preventDefault()}
        controlsList="nodownload"
        controls
        poster={poster}
        playsInline
      />
    </div>
  );
};

export default PublitioPlayer;
