import React from "react";

const VideoFrame = () => {
  return (
    <iframe
      height="100%"
      width="100%"
      src="https://www.youtube.com/embed/fgG4xvYLzgk?si=3g4olcnq5p6Ho-S3"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
};

export default VideoFrame;
