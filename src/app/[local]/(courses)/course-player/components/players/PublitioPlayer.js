// // "use client"; // Ensures the component runs on the client side
// // import { useEffect, useRef } from "react";

// // const PublitioPlayer = ({ node, handleIsWatched, handleIsVideoEnd }) => {
// //   let path = node?.path;
// //   let poster = null;

// //   if (path.includes(".html")) {
// //     path = path.replace(".html", ".m3u8");
// //     poster = path.replace(".html", ".jpg");
// //   } else {
// //     poster = path.replace(".m3u8", ".jpg");
// //   }

// //   const videoRef = useRef(null); // Create a ref for the video element
// //   const hasWatched80Percent = useRef(false); // Track if 80% has been watched

// //   const checkWatchedPercentage = async () => {
// //     const video = videoRef.current;
// //     if (video) {
// //       const watchedPercentage = (video.currentTime / video.duration) * 100;
// //       if (watchedPercentage >= 80 && !hasWatched80Percent.current) {
// //         hasWatched80Percent.current = true; // Prevent multiple calls
// //         await handleIsWatched(); // Call the function when 80% is watched
// //       }
// //     }
// //   };

// //   useEffect(() => {
// //     const script = document.createElement("script");
// //     script.src = "https://static.publit.io/js/hls.js";
// //     script.async = true;
// //     script.onload = () => {
// //       if (window.Hls && window.Hls.isSupported()) {
// //         const video = videoRef.current;
// //         const hls = new window.Hls();
// //         hls.attachMedia(video);
// //         hls.on(window.Hls.Events.MEDIA_ATTACHED, () => {
// //           hls.loadSource(path);
// //           video.play().catch((error) => {
// //             console.error("Error attempting to play:", error);
// //           });
// //         });

// //         video.addEventListener("ended", handleIsVideoEnd);
// //         video.addEventListener("timeupdate", checkWatchedPercentage); // Listen for time updates
// //       }
// //     };
// //     document.body.appendChild(script);

// //     return () => {
// //       const video = videoRef.current;
// //       if (video) {
// //         video.removeEventListener("ended", handleIsVideoEnd);
// //         video.removeEventListener("timeupdate", checkWatchedPercentage); // Clean up time update listener
// //       }
// //       document.body.removeChild(script);
// //     };
// //   }, [path]);

// //   return (
// //     <div style={{ width: "100%", height: "100%" }}>
// //       <video
// //         autoPlay
// //         muted
// //         width="100%"
// //         height="100%"
// //         ref={videoRef}
// //         onContextMenu={() => false}
// //         controlsList="nodownload"
// //         controls
// //         poster={poster}
// //         playsInline
// //       ></video>
// //     </div>
// //   );
// // };
// // export default PublitioPlayer;

// "use client"; // Ensures the component runs on the client side
// import { useEffect, useRef, useState } from "react";

// const PublitioPlayer = ({ node, handleIsVideoEnd }) => {
//   const [poster, setPoster] = useState(null); // Use state for poster dynamically
//   const [hasWatched80Percent, setHasWatched80Percent] = useState(false); // Track 80% watched via state
//   const videoRef = useRef(null); // Create a ref for the video element

//   // Derive path and poster from the node prop
//   useEffect(() => {
//     let path = node?.path;
//     let posterPath = null;

//     if (path) {
//       if (path.includes(".html")) {
//         path = path.replace(".html", ".m3u8");
//         posterPath = path.replace(".html", ".jpg");
//       } else {
//         posterPath = path.replace(".m3u8", ".jpg");
//       }
//     }

//     setPoster(posterPath); // Update poster dynamically
//     return () => {
//       setPoster(null); // Cleanup poster if necessary
//     };
//   }, [node]);

//   const checkWatchedPercentage = async () => {
//     const video = videoRef.current;
//     if (video) {
//       const watchedPercentage = (video.currentTime / video.duration) * 100;
//       if (watchedPercentage >= 80 && !hasWatched80Percent) {
//         console.log("the user has reached 80% " + watchedPercentage)
//         setHasWatched80Percent(true); // Update state when 80% is watched
//         // await handleIsWatched(); // Call the function when 80% is watched
//       }
//     }
//   };

//   useEffect(() => {
//     // Dynamically load hls.js library
//     const script = document.createElement("script");
//     script.src = "https://static.publit.io/js/hls.js";
//     script.async = true;

//     script.onload = () => {
//       if (window.Hls && window.Hls.isSupported()) {
//         const video = videoRef.current;
//         const hls = new window.Hls();
//         hls.attachMedia(video);
//         hls.on(window.Hls.Events.MEDIA_ATTACHED, () => {
//           hls.loadSource(node?.path.replace(".html", ".m3u8"));
//           video.play().catch((error) => {
//             console.error("Error attempting to play:", error);
//           });
//         });

//         video.addEventListener("ended", handleIsVideoEnd);
//         video.addEventListener("timeupdate", checkWatchedPercentage); // Listen for time updates
//       }
//     };

//     document.body.appendChild(script);

//     // Cleanup when the component unmounts or changes
//     return () => {
//       const video = videoRef.current;
//       if (video) {
//         video.removeEventListener("ended", handleIsVideoEnd);
//         video.removeEventListener("timeupdate", checkWatchedPercentage); // Clean up time update listener
//       }
//       document.body.removeChild(script);
//     };
//   }, [node?.path]); // Dependency on node.path for reloading on path change

//   return (
//     <div style={{ width: "100%", height: "100%" }}>
//       <video
//         autoPlay
//         muted
//         width="100%"
//         height="100%"
//         ref={videoRef}
//         onContextMenu={(e) => e.preventDefault()} // Prevent context menu on right-click
//         controlsList="nodownload"
//         controls
//         poster={poster}
//         playsInline
//       />
//     </div>
//   );
// };

// export default PublitioPlayer;

"use client";

import { useEffect, useRef, useState } from "react";
import { useNodeId } from "../../context/NodeIdContext";
import { CoursePlayerVideoIsWatched } from "@/hooks/PlayerHandler";

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
  const { setActiveNode } = useNodeId();
  const lastTimeRef = useRef(0); // Track the last known time of the video

  useEffect(() => {
    const { videoPath, posterPath } = deriveVideoAssets(node?.path);
    setPoster(posterPath);

    if (!videoPath) return;

    const video = videoRef.current;

    const script = document.createElement("script");
    script.src = "https://static.publit.io/js/hls.js";
    script.async = true;

    const initializePlayer = () => {
      if (window.Hls && window.Hls.isSupported() && video) {
        const hls = new window.Hls();
        hls.attachMedia(video);
        hls.on(window.Hls.Events.MEDIA_ATTACHED, () => {
          hls.loadSource(videoPath);
          video.play().catch((error) => console.error("Video playback error:", error));
        });

        video.currentTime = lastTimeRef.current; // Resume from the last known time

        video.addEventListener("ended", handleIsVideoEnd);
        video.addEventListener("timeupdate", async () => {
          const watchedPercentage = (video.currentTime / video.duration) * 100;
          if (watchedPercentage >= 80 && !hasWatched80Percent) {
            setHasWatched80Percent(true);
            await CoursePlayerVideoIsWatched(node.videoId);
          }

          // Update the last known time
          lastTimeRef.current = video.currentTime;
        });
      } else {
        console.error("Hls.js is not supported in this browser.");
      }
    };

    script.onload = initializePlayer;
    document.body.appendChild(script);

    return () => {
      if (video) {
        video.removeEventListener("ended", handleIsVideoEnd);
      }
      document.body.removeChild(script);
    };
  }, [node?.path, handleIsVideoEnd, hasWatched80Percent]);

  return (
    <div className="video-container w-full h-full">
      <video
        ref={videoRef}
        autoPlay
        muted
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