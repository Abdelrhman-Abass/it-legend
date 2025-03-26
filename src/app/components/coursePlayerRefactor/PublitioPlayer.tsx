// import { useEffect, useRef, useState } from 'react';
// import Head from 'next/head';

// interface VideoItem {
//   title: string;
//   src: string;
// }

// declare global {
//   interface Window {
//     Hls: any;
//   }
// }

// export default function VideoPlayer({ videoLink, handleVideoEnd, handleProgress, handleDuration }: { videoLink: string, handleDuration: any, handleProgress: any, handleVideoEnd: any }) {
//   // const videoRef = useRef<HTMLVideoElement>(null);
//   // const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//   // const [hlsInstance, setHlsInstance] = useState<any>(null);
//   // const [hlsLoaded, setHlsLoaded] = useState(false);


//   // function convertToM3u8(url: string): string {
//   //   return url.replace(/\.html(\?|$)/, '.m3u8$1');
//   // }

//   // useEffect(() => {
//   //   const script = document.createElement('script');
//   //   script.src = 'https://static.publit.io/js/hls.js';
//   //   script.async = true;
//   //   script.onload = () => setHlsLoaded(true);
//   //   document.body.appendChild(script);

//   //   return () => {
//   //     document.body.removeChild(script);
//   //     if (hlsInstance) {
//   //       hlsInstance.destroy();
//   //     }
//   //   };
//   // }, []);

//   // useEffect(() => {
//   //   if (!hlsLoaded || !videoRef.current) return;

//   //   const video = videoRef.current;

//   //   const handleTimeUpdate = () => {
//   //     if (!video.duration) return;
//   //     const percent = (video.currentTime / video.duration) * 100;

//   //     if (percent >= 80 && percent < 81) {
//   //       console.log("🎯 Video is at 80% progress");
//   //     }

//   //     if (percent >= 100) {
//   //       console.log("✅ Video is complete!");
//   //     }
//   //   };

//   //   // const handleVideoEnd = () => {
//   //   //   if (currentVideoIndex < playlist.length - 1) {
//   //   //     setCurrentVideoIndex((prev) => prev + 1);
//   //   //   } else {
//   //   //     console.log("🎬 Restarting Playlist...");
//   //   //     setCurrentVideoIndex(0);
//   //   //   }
//   //   // };

//   //   // Auto-switch video every 15s
//   //   // const autoSwitchTimer = setTimeout(() => {
//   //   //   console.log("⏩ Auto-switching video...");
//   //   //   setCurrentVideoIndex((prev) => (prev + 1) % playlist.length);
//   //   // }, 15000); 

//   //   video.addEventListener("timeupdate", handleTimeUpdate);
//   //   video.addEventListener("ended", handleVideoEnd);

//   //   const loadVideo = (src: string) => {
//   //     if (hlsInstance) {
//   //       hlsInstance.destroy();
//   //       setHlsInstance(null);
//   //     }

//   //     if (window.Hls.isSupported()) {
//   //       const hls = new window.Hls();
//   //       setHlsInstance(hls);
//   //       hls.attachMedia(video);
//   //       hls.on(window.Hls.Events.MEDIA_ATTACHED, function () {
//   //         hls.loadSource(src);
//   //       });

//   //       hls.on(window.Hls.Events.MANIFEST_PARSED, function () {
//   //         video.play();
//   //       });

//   //       hls.on(window.Hls.Events.ERROR, function (event: any, data: any) {
//   //         if (data.fatal) {
//   //           switch (data.type) {
//   //             case window.Hls.ErrorTypes.NETWORK_ERROR:
//   //               hls.startLoad();
//   //               break;
//   //             case window.Hls.ErrorTypes.MEDIA_ERROR:
//   //               hls.recoverMediaError();
//   //               break;
//   //             default:
//   //               loadVideo(src);
//   //               break;
//   //           }
//   //         }
//   //       });
//   //     } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
//   //       video.src = src;
//   //       video.addEventListener("loadedmetadata", () => video.play());
//   //     }
//   //   };

//   //   loadVideo(convertToM3u8(videoLink));

//   //   return () => {
//   //     video.removeEventListener("timeupdate", handleTimeUpdate);
//   //     video.removeEventListener("ended", handleVideoEnd);
//   //   //   clearTimeout(autoSwitchTimer);
//   //   };
//   // }, [currentVideoIndex, hlsLoaded]);

//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [hlsInstance, setHlsInstance] = useState<any>(null);
//   const [hlsLoaded, setHlsLoaded] = useState(false);

//   function convertToM3u8(url: string): string {
//     return url.replace(/\.html(\?|$)/, ".m3u8$1");
//   }

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://static.publit.io/js/hls.js";
//     script.async = true;
//     script.onload = () => setHlsLoaded(true);
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//       if (hlsInstance) {
//         hlsInstance.destroy();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!hlsLoaded || !videoRef.current || !videoLink) return;

//     const video = videoRef.current;

//     const handleTimeUpdate = () => {
//       if (video.duration) {
//         const progress = (video.currentTime / video.duration) * 100;
//         handleProgress(video.currentTime);
//         console.log(`🎯 Video Progress: ${progress.toFixed(2)}%`);
//       }
//     };

//     const handleMetadata = () => {
//       handleDuration(video.duration);
//     };

//     video.addEventListener("timeupdate", handleTimeUpdate);
//     video.addEventListener("loadedmetadata", handleMetadata);
//     video.addEventListener("ended", handleVideoEnd);

//     const loadVideo = (src: string) => {
//       if (hlsInstance) {
//         hlsInstance.destroy();
//         setHlsInstance(null);
//       }

//       if (window.Hls.isSupported()) {
//         const hls = new window.Hls();
//         setHlsInstance(hls);
//         hls.attachMedia(video);
//         hls.on(window.Hls.Events.MEDIA_ATTACHED, () => {
//           hls.loadSource(src);
//         });

//         hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
//           video.play();
//         });

//         hls.on(window.Hls.Events.ERROR, (event: any, data: any) => {
//           if (data.fatal) {
//             switch (data.type) {
//               case window.Hls.ErrorTypes.NETWORK_ERROR:
//                 hls.startLoad();
//                 break;
//               case window.Hls.ErrorTypes.MEDIA_ERROR:
//                 hls.recoverMediaError();
//                 break;
//               default:
//                 loadVideo(src);
//                 break;
//             }
//           }
//         });
//       } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
//         video.src = src;
//         video.addEventListener("loadedmetadata", () => video.play());
//       }
//     };

//     loadVideo(convertToM3u8(videoLink));

//     return () => {
//       video.removeEventListener("timeupdate", handleTimeUpdate);
//       video.removeEventListener("loadedmetadata", handleMetadata);
//       video.removeEventListener("ended", handleVideoEnd);
//     };
//   }, [hlsLoaded, videoLink]);

//   return (
//     <>
//       <div className="videoPlayer">
//         <div className="videoContainer">
//           <video
//             ref={videoRef}
//             className="video"
//             onContextMenu={(e) => e.preventDefault()}
//             controlsList="nodownload"
//             controls
//             poster="https://media.publit.io/file/w_1280/CSharp/Variables/1-Declare-Variables.jpg"
//             playsInline
//           />
//         </div>
//       </div>
//     </>
//   );
// }



// import { useEffect, useRef, useState } from "react";
// import videojs from "video.js";
// import "video.js/dist/video-js.css";
// import "videojs-http-source-selector";
// import "videojs-contrib-quality-levels"; // Required for quality selection
// import "videojs-hls-quality-selector"; // ✅ Import the plugin


// interface VideoPlayerProps {
//   videoLink: string;
//   handleVideoEnd: () => void;
//   handleProgress: (time: number) => void;
//   handleDuration: (duration: number) => void;
// }

// declare global {
//   interface Window {
//     Hls: any;
//   }
// }

// export default function VideoPlayer({
//   videoLink,
//   handleVideoEnd,
//   handleProgress,
//   handleDuration,
// }: VideoPlayerProps) {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const playerRef = useRef<any>(null);
//   const [hlsLoaded, setHlsLoaded] = useState(false);
//   const [selectedQuality, setSelectedQuality] = useState("Auto");

//     function convertToM3u8(url: string): string {
//     return url.replace(/\.html(\?|$)/, '.m3u8$1');
//   }

//   useEffect(() => {
//     // Load HLS.js dynamically
//     const script = document.createElement("script");
//     script.src = "https://static.publit.io/js/hls.js";
//     script.async = true;
//     script.onload = () => setHlsLoaded(true);
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   useEffect(() => {
//     if (!videoRef.current || !videoLink || !hlsLoaded) return;

//     // Initialize Video.js Player
//     playerRef.current = videojs(videoRef.current, {
//       autoplay: true,
//       controls: true,
//       fluid: true,
//       responsive: true,
//       playbackRates: [0.5, 1, 1.25, 1.5, 2], // Speed options
//       html5: {
//         hls: {
//           overrideNative: true,
//           enableLowInitialPlaylist: true,
//           smoothQualityChange: true,
//         },
//       },
//       controlBar: {
//         children: [
//           "playToggle",
//           "progressControl",
//           "volumePanel",
//           "currentTimeDisplay",
//           "timeDivider",
//           "durationDisplay",
//           "playbackRateMenuButton",
//           "qualitySelector", // ✅ Add Quality Selector in Video.js Controls
          
//           "fullscreenToggle",
//         ],
//       },
//     });

    
//     const player = playerRef.current;

//     // Initialize HLS.js and attach it to Video.js
//     if (window.Hls && window.Hls.isSupported()) {
//       const hls = new window.Hls();
//       hls.loadSource(convertToM3u8(videoLink));
//       hls.attachMedia(videoRef.current);
      
//       hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
//         player.play();
//         handleDuration(player.duration());
//       });

//       const availableQualityLevels = player.qualityLevels();
//     player.hlsQualitySelector({ displayCurrentQuality: true });

//     // // Set up quality level change handler
//     availableQualityLevels.on('addqualitylevel', () => {
//       const levels = availableQualityLevels.levels_ || [];
//       console.log('Available quality levels:', levels.map((level: any) => ({
//         width: level.width,
//         height: level.height,
//         bitrate: level.bitrate,
//         enabled: level.enabled
//       })));
//     });

//     // Set up source
//     player.src({
//       src: convertToM3u8(videoLink),
//       type: 'application/x-mpegURL'
//     });

//     // Event handlers
//     player.on('loadedmetadata', () => {
//       handleDuration(player.duration());
//       // Force quality selector update after metadata loads
//       player.trigger('loadedqualitydata');
//     });

//     player.on('loadedmetadata', () => {
//       const tech = player.tech({ IWillNotUseThisInPlugins: true });
//       if (tech?.hls) {
//         console.log('HLS levels:', tech.hls.levels);
//       }
//     });

//       hls.on(window.Hls.Events.ERROR, (event: any, data: any) => {
//         console.error("HLS.js Error", data);
//         if (data.fatal) {
//           switch (data.type) {
//             case window.Hls.ErrorTypes.NETWORK_ERROR:
//               hls.startLoad();
//               break;
//             case window.Hls.ErrorTypes.MEDIA_ERROR:
//               hls.recoverMediaError();
//               break;
//             default:
//               console.error("Unrecoverable error:", data);
//           }
//         }
//         player.hlsQualitySelector({
//           displayCurrentQuality: true,
//         });
        
//         // player.on('loadedmetadata', () => {
//           // const tech = player.tech({ IWillNotUseThisInPlugins: true });
//           // if (tech?.hls) {
//           //   console.log('Available quality levels:', tech.hls.levels);
//           // }
//         // });

//         // ✅ Detect Quality Change
//         player.on('hlsQualitySelector::change', (event: any, quality: string) => {
//           setSelectedQuality(quality);
//           console.log('Selected quality:', quality);
//         });
//       });


//     } else {
//       console.warn("HLS.js not supported, falling back to native HLS playback");
//       player.src({ src: convertToM3u8(videoLink), type: "application/x-mpegURL" });
//     }

//     player.on("timeupdate", () => {
//       handleProgress(player.currentTime());
//       console.log(`📊 Progress: ${player.currentTime()}s`);
//     });

//     player.on("ended", () => {
//       handleVideoEnd();
//       console.log("✅ Video Ended!");
//     });

//     return () => {
//       if (player) {
//         player.dispose();
//       }
//     };
//   }, [videoLink, hlsLoaded]);

//   useEffect(() => {
//     if (!videoRef.current || !videoLink || !hlsLoaded) return;
  
//     const video = videoRef.current;
  
//     if (window.Hls && window.Hls.isSupported()) {
//       const hls = new window.Hls();
//       hls.loadSource(convertToM3u8(videoLink));
//       hls.attachMedia(video);
      
//       hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
//         console.log("✅ HLS Manifest Parsed");
  
//         video
//           .play()
//           .catch((err) => {
//             console.warn("⚠️ Auto-Play Blocked. Waiting for user interaction.");
//           });
  
//         handleDuration(video.duration);
//       });
  
//     } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
//       video.src = convertToM3u8(videoLink);
//       video.addEventListener("loadedmetadata", () => video.play());
//     }
//   }, [videoLink, hlsLoaded]);
  

//   const changeQuality = (quality: string) => {
//     if (!playerRef.current) return;

//     const qualityLevels = playerRef.current.qualityLevels();
//     if (quality === "Auto") {
//       for (let i = 0; i < qualityLevels.length; i++) {
//         qualityLevels[i].enabled = true;
//       }
//     } else {
//       for (let i = 0; i < qualityLevels.length; i++) {
//         qualityLevels[i].enabled = qualityLevels[i].height.toString() === quality.replace("p", "");
//       }
//     }

//     setSelectedQuality(quality);
//     console.log("🎯 Selected Quality:", quality);
//   };

//   return (
//     <div className="videoPlayer">
//       <div className="videoContainer">
//         <video ref={videoRef} className="video-js vjs-big-play-centered vjs-default-skin" />
//       </div>
//     </div>
//   );
// }


import { useCallback, useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-http-source-selector";
import "videojs-contrib-quality-levels"; // Required for quality selection
import "videojs-hls-quality-selector"; // ✅ Import the plugin


interface VideoPlayerProps {
  videoLink: string;
  handleVideoEnd: () => void;
  handleProgress: (progress: { playedSeconds: number; played: number }) => void;
  handleDuration: (duration: number) => void;
  WATCH_THRESHOLD_PERCENTAGE?: number;
}

declare global {
  interface Window {
    Hls: any;
  }
}

export default function VideoPlayer({
  videoLink,
  handleVideoEnd,
  handleProgress,
  handleDuration,
  WATCH_THRESHOLD_PERCENTAGE = 80
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);
  const [hlsLoaded, setHlsLoaded] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState("Auto");
  const [hasHandledProgress, setHasHandledProgress] = useState(false);

  const convertToM3u8 = useCallback((url: string): string => {
    return url.replace(/\.html(\?|$)/, '.m3u8$1');
  }, []);

  const handleTimeUpdate = useCallback((currentTime: number, duration: number) => {
    const played = duration > 0 ? currentTime / duration : 0;
    // handleProgress({
    //   playedSeconds: currentTime,
    //   played
    // });

    if (played * 100 >= WATCH_THRESHOLD_PERCENTAGE && !hasHandledProgress) {
      setHasHandledProgress(true);
    }
  }, [handleProgress, WATCH_THRESHOLD_PERCENTAGE, hasHandledProgress]);

  useEffect(() => {
    // Load HLS.js dynamically
    const script = document.createElement("script");
    script.src = "https://static.publit.io/js/hls.js";
    script.async = true;
    script.onload = () => setHlsLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current || !videoLink || !hlsLoaded) return;

    const savedSpeed = localStorage.getItem("videoPlaybackSpeed");
    const playbackSpeed = savedSpeed ? parseFloat(savedSpeed) : 1;

    
    // Initialize Video.js Player
    playerRef.current = videojs(videoRef.current, {
            autoplay: false,
            controls: true,
            fluid: true,
            responsive: true,
            playbackRates: [0.5,0.75, 1, 1.25, 1.5, 2], // Speed options
            html5: {
              hls: {
                overrideNative: true,
                enableLowInitialPlaylist: true,
                smoothQualityChange: true,
              },
            },
            controlBar: {
              children: [
                "playToggle",
                "progressControl",
                "volumePanel",
                "currentTimeDisplay",
                "timeDivider",
                "durationDisplay",
                "playbackRateMenuButton",
                "qualitySelector", // ✅ Add Quality Selector in Video.js Controls
                
                "fullscreenToggle",
              ],
            },
          });

    
    const player = playerRef.current;
    player.ready(() => {
      player.playbackRate(playbackSpeed);
      console.log("🔄 Restored Speed:", playbackSpeed);
    });

    // ✅ Save speed when user changes it
    player.on("ratechange", () => {
      const newSpeed = player.playbackRate();
      localStorage.setItem("videoPlaybackSpeed", newSpeed.toString());
      console.log("💾 Speed Saved:", newSpeed);
    });

    // Initialize HLS.js and attach it to Video.js
    if (window.Hls && window.Hls.isSupported()) {
      const hls = new window.Hls();
      hls.loadSource(convertToM3u8(videoLink));
      hls.attachMedia(videoRef.current);
      
      hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
        player.play();
        handleDuration(player.duration());
      });

      const availableQualityLevels = player.qualityLevels();
      player.hlsQualitySelector({ displayCurrentQuality: true });

      // // Set up quality level change handler
      availableQualityLevels.on('addqualitylevel', () => {
        const levels = availableQualityLevels.levels_ || [];
        console.log('Available quality levels:', levels.map((level: any) => ({
          width: level.width,
          height: level.height,
          bitrate: level.bitrate,
          enabled: level.enabled
        })));
      });

      setTimeout(() => {
        const qualityLevels = player.qualityLevels();
        console.log("🎯 Quality Levels Found:", qualityLevels.levels_); // Debugging

        qualityLevels.on('addqualitylevel', () => {
          const levels = qualityLevels.levels_ || [];
          console.log('Available quality levels:', levels.map((level: any) => ({
            width: level.width,
            height: level.height,
            bitrate: level.bitrate,
            enabled: level.enabled
          })));
        });
        if (qualityLevels.levels_.length > 0) {
          player.hlsQualitySelector({ displayCurrentQuality: true });
          player.trigger("loadedqualitydata"); // Force refresh
        } else {
          console.warn("⚠️ No quality levels detected");
        }
      }, 1000); // Slight delay ensures levels are available
    
      
      // player.src({
      //         src: convertToM3u8(videoLink),
      //         type: 'application/x-mpegURL'
      //       });

      // if (hls.levels && hls.levels.length > 0) {  
        player.hlsQualitySelector({ displayCurrentQuality: true });  
      // }

      player.on('loadedmetadata', () => {
        handleDuration(player.duration());
        // Force quality selector update after metadata loads
        player.trigger('loadedqualitydata');
      });

      player.on('loadedmetadata', () => {
        const tech = player.tech({ IWillNotUseThisInPlugins: true });
        if (tech?.hls) {
          console.log('HLS levels:', tech.hls.levels);
        }
      });

      hls.on(window.Hls.Events.ERROR, (event: any, data: any) => {
        console.error("HLS.js Error", data);
        if (data.fatal) {
          switch (data.type) {
            case window.Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case window.Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              console.error("Unrecoverable error:", data);
          }
        }
        player.hlsQualitySelector({
          displayCurrentQuality: true,
        });
  
        // ✅ Detect Quality Change
        player.on("hlsQualitySelector::change", (event: any, quality: string) => {
          console.log("🎯 Selected Quality:", quality);
          setSelectedQuality(quality); // Save selected quality
        });
      });


    } else {
      console.warn("HLS.js not supported, falling back to native HLS playback");
      player.src({ src: convertToM3u8(videoLink), type: "application/x-mpegURL" });
    }

    player.on("timeupdate", () => {
      handleTimeUpdate(player.currentTime(), player.duration());
    });

    player.on("ended", () => {
      handleVideoEnd();
      setHasHandledProgress(false);
    });

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [videoLink, hlsLoaded]);

  //  red :#f17d3a  background:rgba(0, 0, 0, .7)
 

  return (
    <div className="videoPlayer" style={{ border: "0", top: "0", left: "0", width: "100%", height: "100%", position: "absolute", overflow: "hidden" }}>
      <div className="videoContainer">
        <video ref={videoRef}  className="video-js vjs-big-play-centered vjs-default-skin" />
      </div>
    </div>
  );
}