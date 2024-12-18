"use client";
import React from "react";

// const VdocipherPlayer = ({ node, handleIsWatched, handleIsVideoEnd, nextNode }) => {
//   const path = `https://player.vdocipher.com/v2/?otp=1234567890abcdefghijk&playbackInfo=1234567890abcdefghijk`;
//   console.log(node)
//   return (
//     <iframe
//       id="vdocipher-iframe"
//       style={{ width: "100%", height: "100%" }}
//       src={path}
//       allow="encrypted-media"
//       allowFullScreen
//       onEnded={handleIsVideoEnd}
//     ></iframe>
//   );
// };

// export default VdocipherPlayer;

// import { useEffect, useRef } from "react";
// // import "./style.css";

// const VdocipherPlayer = ({ otp, playbackInfo ,node, handleIsWatched, handleIsVideoEnd, nextNode  }) => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const loadPlayer = () => {
//       if (window.VdoPlayer && containerRef.current) {
//         new window.VdoPlayer({
//           otp:"20160313versASE3135rXmbb8xbJ6gcXasc2CrHtlGo2eECtBaynfVpTxQfnaEjA",
//           playbackInfo:"eyJ2aWRlb0lkIjoiMTA0MWVkNThjZDU0NGY5YmE2MGEzYWE1ZGEzZjExZWYifQ==",
//           theme: "9ae8bbe8dd964ddc9bdb932cca1cb59a",
//           container: containerRef.current,
//         });
//       }
//     };

//     if (window.VdoPlayer) {
//       loadPlayer();
//     } else {
//       const playerScript = document.createElement("script");
//       playerScript.src = "https://player.vdocipher.com/playerAssets/1.6.10/vdo.js";
//       document.body.appendChild(playerScript);
//       playerScript.addEventListener("load", loadPlayer);

//       // Cleanup script if component unmounts
//       return () => {
//         playerScript.removeEventListener("load", loadPlayer);
//         document.body.removeChild(playerScript);
//       };
//     }
//   }, [otp, playbackInfo]);

//   return <div className="player" ref={containerRef}></div>;
// };

// export default VdocipherPlayer;  54eb47f5dcf04b5ea181aa756ae26fc6


// import { useEffect, useRef, useState } from "react";
// // import axios from "axios";
// import { VdoCipherVideoOtp } from "@/hooks/courseHandler";
// import { useNodeId } from "../../context/NodeIdContext";
// import debounce from "lodash.debounce";
// import { savePlaybackState } from "../../../utils/cookies";
// import { CoursePlayerVideoIsWatched } from "@/hooks/PlayerHandler";

// const VdocipherPlayer = ({ node , nextNode}) => {

//   const containerRef = useRef(null);
//   const [otp, setOtp] = useState(null);
//   const [playbackInfo, setPlaybackInfo] = useState(null);
//   const [hasWatched80Percent, setHasWatched80Percent] = useState(false);

//   const [currentTime, setCurrentTime] = useState(0);
//   const { setActiveNode, activeNode, markNodeAsWatched } = useNodeId();

//   const videoId = node.path

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
//     const fetchVideoData = async () => {
//       try {
//         const response = await VdoCipherVideoOtp(videoId);
//         const data = response.playbackInfo;
//         // console.log("console OTP " + data)

//         if (response.otp && response.playbackInfo) {
//           setOtp(typeof response.otp === "string" ? response.otp : String(response.otp) );
//           setPlaybackInfo(typeof response.playbackInfo === "string" ? response.playbackInfo: String(response.playbackInfo) );
//         } else {
//           console.error("Invalid video data:", response);
//         }
//       } catch (error) {
//         console.error("Error fetching video data:", error);
//       }
//     };

//     fetchVideoData();
//   }, [videoId]);
//   useEffect(() => {
//     let playerInstance = null;
//     const loadPlayer = () => {
//       console.log("console OTP " + otp)
//       if (window.VdoPlayer && containerRef.current) {
//         playerInstance = new window.VdoPlayer({
//           otp,
//           playbackInfo,
//           theme: "9ae8bbe8dd964ddc9bdb932cca1cb59a",
//           container: containerRef.current,
//         });

//         playerInstance.addEventListener("play", () => savePlaybackState(courseId, activeNode, node?.videoId));
//         playerInstance.addEventListener("timeupdate", () => {
//           handleTimeUpdate(playerInstance);
//         });

//         playerInstance.addEventListener("pause", () =>
//           savePlaybackState(courseId, activeNode, node?.videoId, playerInstance.currentTime)
//         );
//       }
//     };
    
//     if (window.VdoPlayer) {
//       loadPlayer();
//     } else {
//       const playerScript = document.createElement("script");
//       playerScript.src = "https://player.vdocipher.com/playerAssets/1.6.10/vdo.js";
//       document.body.appendChild(playerScript);
//       playerScript.addEventListener("load", loadPlayer);
      
//       // Cleanup script if component unmounts
//       return () => {
//         playerScript.removeEventListener("load", loadPlayer);
//         document.body.removeChild(playerScript);

//       };
//     }
//   }, [otp , playbackInfo]);
 
//   return (
//     // <div style={{ position: 'relative', paddingBottom: 100, height: 0 }} ref={containerRef}>
//     //    <iframe
//     //      ref={containerRef}
//     //      src={`https://player.vdocipher.com/v2/?otp=${otp}&playbackInfo=${playbackInfo}&primaryColor=4245EF`}
//     //      frameBorder="0"
//     //     allow="encrypted-media"
//     //     allowFullScreen
//     //     style={{ position: 'absolute', top: -10, left: 0, width: '100%', height: '70%' }}
//     //     title="VdoCipher Video Player"
//     //     /> 
//     // </div> 
//     <div className="video-container w-full h-full">
//       <div
//         ref={containerRef}
//         style={{
//           width: "100%",
//           height: "100%",
//           overflow: "hidden",
//         }}
//       ></div>
      
//     </div>
//   ) 

// };


// export default VdocipherPlayer;



// otp:"20160313versASE3135rXmbb8xbJ6gcXasc2CrHtlGo2eECtBaynfVpTxQfnaEjA",
// playbackInfo:"eyJ2aWRlb0lkIjoiMTA0MWVkNThjZDU0NGY5YmE2MGEzYWE1ZGEzZjExZWYifQ==",
// otp: "20160313versUSE3237sTIrlOqndihzAJxY20PWPkWt5f6Dzsoq7NTSkS7jJ1aqY",
// playbackInfo: "eyJ2aWRlb0lkIjoiNTRlYjQ3ZjVkY2YwNGI1ZWExODFhYTc1NmFlMjZmYzYifQ==",


import { useEffect, useRef, useState } from "react";
import { VdoCipherVideoOtp } from "@/hooks/courseHandler";
import { useNodeId } from "../../context/NodeIdContext";
import { CoursePlayerVideoIsWatched } from "@/hooks/PlayerHandler";

const VdocipherPlayer = ({ node, nextNode }) => {
  const containerRef = useRef(null);
  const [otp, setOtp] = useState(null);
  const [playbackInfo, setPlaybackInfo] = useState(null);
  const [player, setPlayer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [status, setStatus] = useState("NA");
  const { setActiveNode, markNodeAsWatched } = useNodeId();

  const videoId = node.path;

  useEffect(() => {
    const loadVdoCipherScript = () => {
      if (!window.VdoPlayer) {
        const script = document.createElement("script");
        script.src = "https://player.vdocipher.com/playerAssets/1.6.10/vdo.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
          console.log("VdoPlayer script loaded successfully.");
        };

        script.onerror = () => {
          console.error("Failed to load VdoPlayer script.");
        };
      }
    };

    loadVdoCipherScript();
  }, []);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await VdoCipherVideoOtp(videoId);
        if (response.otp && response.playbackInfo) {
          setOtp(response.otp);
          setPlaybackInfo(response.playbackInfo);
        } else {
          console.error("Invalid video data:", response);
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    if (!otp || !playbackInfo || !containerRef.current) return;
  
    const initializePlayer = () => {
      if (window.VdoPlayer) {
        const playerInstance = new window.VdoPlayer({
          otp,
          playbackInfo,
          theme: "9ae8bbe8dd964ddc9bdb932cca1cb59a",
          container: containerRef.current,
        });
  
        // Wait for the player to be ready before adding event listeners
        playerInstance.addEventListener("ready", () => {
          console.log("Player is ready.");
          setPlayer(playerInstance);
  
          if (playerInstance.video) {
            playerInstance.video.addEventListener("play", () => {
              console.log("Playing");
              setStatus("Playing");
            });
  
            playerInstance.video.addEventListener("pause", () => {
              console.log("Paused");
              setStatus("Paused");
            });
  
            playerInstance.video.addEventListener("timeupdate", () => {
              const time = playerInstance.video.currentTime;
              console.log(`Time Updated: ${time}`);
              setCurrentTime(time);
            });
          } else {
            console.error("Player video element is not available.");
          }
        });
      } else {
        console.error("VdoPlayer is not available.");
      }
    };
  
    if (window.VdoPlayer) {
      initializePlayer();
    } else {
      const interval = setInterval(() => {
        if (window.VdoPlayer) {
          clearInterval(interval);
          initializePlayer();
        }
      }, 100);
    }
  }, [otp, playbackInfo]);

  return (
    <div>
      <div ref={containerRef} style={{ width: "100%", height: "500px" }} />
      {player && (
        <div>
          <div>Status: {status}</div>
          <div>Current Time: {currentTime}</div>
        </div>
      )}
    </div>
  );
};

export default VdocipherPlayer;






//  <script src="https://player.vdocipher.com/v2/api.js"></script>
// const loadVdoCipherAPI = () => {
//   const script = document.createElement('script');
//   script.src = "https://player.vdocipher.com/v2/api.js";
//   script.async = true;
//   document.body.appendChild(script);
// };
// refreshToken : CfDJ8K/fx8tsMBpMmK+dO7tOCOYme7+V67Zgz+POAiYfLydGDcVm/EG1ZY/Sg8+GyV9OqnQeqaQEhPxC65TZQrgnNHgEkVZHGNdn83sOQM+2nU7UHa5NZ4tbyUmLUTM3FLTMP7Xiir8rT+3aP2YWZulNouqiGCOTfI6FIJnBMdqCeHkVuB+QwRWjTIDjbE9pMWVLldtYZS3SuXF0ynPjFA/j8ig6h3QqbXstOEG9yYo59REz
// token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImE4YzhlMGQ1LTU5MmYtNDdhZC1hYWIyLTA2OWM2MjEwNmVkOCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhbGFhbXVoYW1lZDk3QGdtYWlsLmNvbSIsImp0aSI6IjVjOGVkOTY1LWYyOGQtNDA2OC1iMjBhLWRkMDIzNDc5YTU0YiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6InVzZXIiLCJleHAiOjE3MzQzNTE4MDcsImlzcyI6Imh0dHBzOi8vd3d3Lml0bGVnZW5kLm5ldC8iLCJhdWQiOiJodHRwczovL3d3dy5pdGxlZ2VuZC5uZXQvIn0.ToiUUTBzz4d6vc7EDwQ5ECCTb_Rv-NQeZx2bvJWsx-M
// user :"alaamuhamed97@gmail.com"
// http://localhost:3000/ar/course-player/6c719fa0-70ea-41cc-bfb1-972482285d23
// import React, { useEffect, useRef, useState } from 'react';

// const VideoPlayer = ({ otp, playbackInfo }) => {
//   const iframeRef = useRef(null);
//   const [player, setPlayer] = useState(null);

//   // Load the VdoCipher API and initialize the player
//   useEffect(() => {
//     const loadPlayer = () => {
//       if (iframeRef.current && window.VdoPlayer) {
//         const playerInstance = VdoPlayer.getInstance(iframeRef.current);
//         setPlayer(playerInstance);

//         // Attach event listeners
//         playerInstance.video.addEventListener('play', () => {
//           console.log('Video is playing');
//         });

//         playerInstance.api.getTotalPlayed().then((data) => {
//           console.log('Video playback: ', data);
//         });
//       }
//     };

//     // Ensure VdoPlayer API is ready
//     if (!window.VdoPlayer) {
//       const script = document.createElement('script');
//       script.src = 'https://player.vdocipher.com/v2/api.js';
//       script.onload = loadPlayer;
//       document.body.appendChild(script);
//     } else {
//       loadPlayer();
//     }
//   }, [otp, playbackInfo]);

//   return (
//     <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
//       <iframe
//         ref={iframeRef}
//         src={`https://player.vdocipher.com/v2/?otp=${otp}&playbackInfo=${playbackInfo}&primaryColor=4245EF`}
//         frameBorder="0"
//         allow="encrypted-media"
//         allowFullScreen
//         style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
//         title="VdoCipher Video Player"
//       />
//     </div>
//   );
// };

// export default VideoPlayer;
