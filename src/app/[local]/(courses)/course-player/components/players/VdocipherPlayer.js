"use client";
import React from "react";

const VdocipherPlayer = ({ node, handleIsWatched, handleIsVideoEnd }) => {
  const path = `https://player.vdocipher.com/v2/?otp=${node?.otp}&playbackInfo=${node?.playBackInfo}`;

  return (
    <iframe
      id="vdocipher-iframe"
      style={{ width: "100%", height: "100%" }}
      src={path}
      allow="encrypted-media"
      allowFullScreen
      onEnded={handleIsVideoEnd}
    ></iframe>
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
