// 'use client';

// import { useEffect, useRef, useState } from "react";
// import { useNodeId } from "../(courses)/course-player/context/NodeIdContext";
// import { CoursePlayerVideoIsWatched } from "@/hooks/PlayerHandler";
// import debounce from "lodash.debounce";
// import { savePlaybackState } from "../(courses)/utils/cookies";
// import videojs from 'video.js';
// import Hls from 'hls.js';
// import 'video.js/dist/video-js.css'; // Default Video.js styles
// import ReactPlayer from 'react-player'

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
//   const [videoState, setVideoState] = useState({
//     poster: null,
//     hasWatched80Percent: false,
//     currentTime: 0,
//   });

//   const videoRef = useRef(null);
//   const playerRef = useRef(null);

//   const { setActiveNode, activeNode, markNodeAsWatched } = useNodeId();

//   const getCourseIdFromUrl = () => {
//     const currentUrl = new URL(window.location.href);
//     return currentUrl.pathname.split("/").pop();
//   };
//   const courseId = getCourseIdFromUrl();

//   const handleTimeUpdate = debounce(() => {
//     const player = playerRef.current;
//     if (!player) return;

//     const watchedPercentage = (player.currentTime() / player.duration()) * 100;

//     if (watchedPercentage >= 80 && !videoState.hasWatched80Percent) {
//       setVideoState((prevState) => ({
//         ...prevState,
//         hasWatched80Percent: true,
//       }));
//       handleVideoWatched(node.videoId);
//       markNodeAsWatched(activeNode);
//     }

//     if (watchedPercentage === 100) {
//       changeActiveNode(nextNode);
//     }

//     // Save current time to state and localStorage
//     const currentTime = player.currentTime();
//     setVideoState((prevState) => ({
//       ...prevState,
//       currentTime,
//     }));
//     localStorage.setItem(`video_${node.videoId}_time`, currentTime);
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
//     setVideoState((prevState) => ({
//       ...prevState,
//       poster: posterPath,
//     }));

//     if (!videoPath || !videoRef.current) return;

//     const videoElement = videoRef.current;

//     // Check if Video.js is already initialized
//     if (playerRef.current) {
//       playerRef.current.dispose();
//     }

//     // Initialize Video.js with the appropriate configuration
//     const player = videojs(videoElement, {
//       autoplay: true,
//       controls: true,
//       preload: 'auto',
//       poster: posterPath,
//       sources: [{
//         src: videoPath,
//         type: 'application/x-mpegURL',
//       }],
//       // Video.js player customizations
//       techOrder: ['html5'],
//     });

//     // HLS.js Integration (only if HLS is supported)
//     if (Hls.isSupported()) {
//       const hls = new Hls();
//       hls.loadSource(videoPath);
//       hls.attachMedia(videoElement);
//       hls.on(Hls.Events.MANIFEST_PARSED, () => {
//         player.play();
//       });
//     } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
//       player.src({ src: videoPath, type: 'application/vnd.apple.mpegurl' });
//       player.play();
//     } else {
//       console.error("HLS is not supported in this browser.");
//     }

//     // Event Listeners
//     player.on('timeupdate', handleTimeUpdate);
//     player.on('ended', handleIsVideoEnd);
//     player.on('play', () => savePlaybackState(courseId, activeNode, node?.videoId));
//     player.on('pause', () =>
//       savePlaybackState(courseId, activeNode, node?.videoId, player.currentTime())
//     );

//     // Load saved playback position
//     const savedTime = localStorage.getItem(`video_${node.videoId}_time`);
//     if (savedTime) {
//       player.currentTime(Number(savedTime));
//     }

//     playerRef.current = player;

//     return () => {
//       if (playerRef.current) {
//         playerRef.current.dispose();
//       }
//     };
//   }, [node?.path, handleIsVideoEnd, videoState.hasWatched80Percent, nextNode, activeNode]);

//   return (
//     <div className="w-full h-full  flex flex-col items-center justify-center">
//         <ReactPlayer playing url="https://media.publit.io/file/CSharp/GetStarted/9-How-C-Complier-Work.m3u8"/>
//       <div className="w-full h-[calc(100vh-4rem)] lg:w-[1400px] lg:h-[800px]">
//         <video
//           ref={videoRef}
//           src="https://media.publit.io/file/CSharp/GetStarted/9-How-C-Complier-Work.m3u8"
//           className="video-js vjs-theme-custom w-full h-full"
//           controls
//           playsInline
//         />
//       </div>
//       <p className="mt-4 text-white text-sm">
//         Current Time: {videoState.currentTime.toFixed(2)} seconds
//       </p>
//     </div>
//   );
// };

// export default PublitioPlayer;

// components/VideoPlayer.js
'use client';

import { useEffect, useRef } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css"; // Import Plyr styles
import Hls from "hls.js"; // For HLS streaming support

const page = () => {
  const videoRef = useRef(null);
  const videoUrl = "https://media.publit.io/file/CSharp/GetStarted/9-How-C-Complier-Work.m3u8";
  const posterImage = "https://yourimageurl.com/poster.jpg"; // Optional

  useEffect(() => {
    if (!videoUrl || !videoRef.current) return;

    const video = videoRef.current;

    // Initialize Plyr player
    const plyr = new Plyr(video, {
      controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
      autoplay: true,  // Auto-play the video
    });

    // Check if the video is an HLS stream
    if (videoUrl.endsWith(".m3u8") && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((error) => console.error("Video playback error:", error));
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support for Safari
      video.src = videoUrl;
      video.play().catch((error) => console.error("Video playback error:", error));
    } else {
      // For regular MP4 or other formats
      video.src = videoUrl;
      video.play().catch((error) => console.error("Video playback error:", error));
    }

    // Cleanup function
    return () => {
      if (video) {
        plyr.destroy(); // Destroy Plyr instance on cleanup
      }
    };
  }, [videoUrl]);

  return (
    <div className="video-container w-full h-full">
      <video
        ref={videoRef}
        className="plyr__video-embed w-full h-full"
        controls
        playsInline
        poster={posterImage} // Optional poster image
      />
    </div>
  );
};

export default page;



