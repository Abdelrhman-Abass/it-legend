"use client";
import React from "react";
import { motion } from "framer-motion";
import { useMouseMoveUI } from "@/contexts/mouse-move-context";
import useModal from "@/hooks/use-modal";
import VideoModal from "@/components/common/popup-modal/video-modal";

const VideoArea = ({ about_p_2, title }) => {
  const videoId = "fgG4xvYLzgk";
  const { isVideoOpen, setIsVideoOpen } = useModal();
  const { mouseDirection, mouseReverse } = useMouseMoveUI();
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  return (
    <>
      <div id="about" className={`video-area-${about_p_2 ? "4" : "1"}`}>
        <div className="container">
          {title && (
            <h3
              className="title mb-5"
              style={{ position: "relative", textAlign: "center" }}
            >
              {title}
            </h3>
          )}
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div
                className="video-gallery"
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {/* <div className="thumbnail">
                  <img src={thumbnail} alt="Thumb" style={{ width: "100%" }} />
                  <button
                    onClick={() => setIsVideoOpen(true)}
                    className="video-play-btn video-popup-activation"
                  >
                    <i className="icon-18"></i>
                  </button>
                </div> */}
                <iframe
                  className="video-frame"
                  src="https://www.youtube.com/embed/fgG4xvYLzgk?si=3g4olcnq5p6Ho-S3"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
                <div className="video-overlay"></div>
                <ul className="shape-group">
                  <li className="shape-1 scene">
                    <img
                      className="rotateit"
                      src="/assets/images/about/shape-37.png"
                      alt="Shape"
                    />
                  </li>
                  <li className="shape-2 scene">
                    <img src="/assets/images/faq/shape-04.png" alt="Shape" />
                  </li>
                  <motion.li
                    className="shape-3 scene shape-light"
                    animate={{
                      x: mouseReverse(25).x,
                      y: mouseReverse(25).y,
                    }}
                  >
                    <img src="/assets/images/faq/shape-14.png" alt="Shape" />
                  </motion.li>
                  <motion.li
                    className="shape-3 scene shape-dark"
                    animate={{
                      x: mouseReverse(25).x,
                      y: mouseReverse(25).y,
                    }}
                  >
                    <img
                      src="/assets/images/faq/dark-shape-14.png"
                      alt="Shape"
                    />
                  </motion.li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <VideoModal
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={videoId}
      />
    </>
  );
};

export default VideoArea;
