import useGenralCoursePlayerId from "@/app/store/GeneralCoursePlayer";
import dynamic from "next/dynamic";
import React, { Fragment, useRef, useEffect } from "react";

export default function RenderVideoTypes({ playerRef, handleDuration, handleProgress, handleVideoEnd, startFromPercentage, CourseDetails, otp, playbackInfo }: any) {
    const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

    // Zustand store
    const { videoNode, videoLink, lastVideoData } = useGenralCoursePlayerId();

    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    useEffect(() => {
        if (videoLink) {
            const iframe = document.getElementById("pv_NeR5g5Te") as HTMLIFrameElement;
            if (iframe?.contentWindow) {
                iframe.contentWindow.postMessage("listenForVideoEnd", "*");
                iframe.contentWindow.postMessage("listenForVideoProgress", "*");
            }
        }
    }, [videoLink]);

    const renderVideoPlayer = () => {
        const playerType = CourseDetails?.data?.data?.playerType;

        switch (playerType) {
            case 0: // YouTube
                return (
                    <ReactPlayer
                        key={videoNode}
                        width="100%"
                        style={{ aspectRatio: "16/9", width: "100%", height: "unset" }}
                        controls
                        ref={playerRef}
                        config={{
                            youtube: { playerVars: { modestbranding: 1, rel: 0 } },
                        }}
                        url={videoLink || ""}
                        playing={!!videoLink}
                        onDuration={handleDuration}
                        onProgress={handleProgress}
                        onEnded={handleVideoEnd}
                        progressInterval={100}
                        onReady={() => {
                            if (playerRef?.current) {
                                const startTime = startFromPercentage(lastVideoData?.percentage || 0);
                                playerRef.current.seekTo(startTime);
                            }
                        }}
                    />
                );

            case 1: // HLS (Publit)
                return (
                    <div style={{ left: "0", width: "100%", height: "0", position: "relative", paddingBottom: "55.29%" }}>
                        <figure style={{ left: "0", width: "100%", height: "0", position: "relative", paddingBottom: "55.29%" }}>
                            <iframe
                                id="pv_NeR5g5Te"
                                src={videoLink || ""}
                                scrolling="no"
                                style={{ border: "0", top: "0", left: "0", width: "100%", height: "100%", position: "absolute", overflow: "hidden" }}
                                allowFullScreen
                            />
                        </figure>
                    </div>
                );

            case 2: // VdoCipher
                return (
                    <iframe
                        src={`https://player.vdocipher.com/v2/?otp=${otp}&playbackInfo=${playbackInfo}&autoplay=true&mute=true&enableEvents=true&enablePostroll=true`}
                        ref={iframeRef}
                        id="vdocipher-player"
                        allow="encrypted-media"
                        title="Vdocipher Player"
                        allowFullScreen
                    />
                );

            default:
                return null;
        }
    };

    return <Fragment>{renderVideoPlayer()}</Fragment>;
}