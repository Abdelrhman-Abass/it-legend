"use client";
import React from "react";
import ModalVideo from "react-modal-video";

const VideoModal = ({
  isVideoOpen,
  setIsVideoOpen,
  videoId = "9Y7ma241N8k",
}) => {
  return (
    <ModalVideo
      channel="youtube"
      isOpen={isVideoOpen}
      videoId={videoId}
      onClose={() => setIsVideoOpen(false)}
      // autoplay={true}
    />
  );
};

export default VideoModal;
