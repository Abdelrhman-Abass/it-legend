"use client";
import React, { useEffect, useMemo, useCallback, useReducer, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useMediaQuery } from "react-responsive";
import { useParams, useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getServerRequest, spcificPostServerRequest ,vdocipherPostServerOtpRequest } from "@/app/utils/generalServerRequest";
import GenralCoursePlayerId from "@/app/store/GeneralCoursePlayer";
import LineProgress from "../common/lineProgress/LineProgress";
import AddComment from "../common/addComment/AddComment";
import CourseLinks from "../common/courseLinks/CourseLinks";
import NewLoader from "../common/newLoader/NewLoader";
import Hls from "hls.js";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

// Dynamic imports
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
const CoursePlayerAccordion = dynamic(() => import("../common/coursePlayerAccordion/CoursePlayerAccordion"), { ssr: false });
const CourseTabs = dynamic(() => import("../common/courseTabs/CourseTabs"), { ssr: false });

// Constants
const WATCH_THRESHOLD_PERCENTAGE = 80;

// Reducer for playback state
const playbackReducer = (state: any, action: any) => {
    switch (action.type) {
        case "SET_DURATION":
            return { ...state, duration: action.payload };
        case "SET_PLAYED_SECONDS":
            return { ...state, playedSeconds: action.payload };
        default:
            return state;
    }
};

export default function CoursePlayer({ slug }: { slug: string }) {
    const t = useTranslations();
    const { locale } = useParams();
    const router = useRouter();
    const [cookies, , removeCookie] = useCookies(["userData"]);
    const [videoCipherPath , setVideoCipherPath] = useState<string>("");

    const { videoNode, setVideoNode, videoLink, videoName, videoId, CourseVideo, setVideoName, lastVideoData } = GenralCoursePlayerId();
    const playerRef = useRef<HTMLVideoElement | null>(null);
    const sourceRef = useRef<any>(null);

    const [vdocipherConfig, setVdocipherConfig] = useState<any>({ otp: "", playbackInfo: "" });

    const [playbackState, dispatch] = useReducer(playbackReducer, { duration: 0, playedSeconds: 0 });

    // Queries
    const { data: CourseLinksData, isError: isCourseLinksError } = useQuery({
        queryKey: ["Course_links", { slug }],
        queryFn: () => getServerRequest(`/CourseLink/${slug}/links`),
        enabled: !!slug,
    });

    const { data: CourseDetails, isError: isCourseDetailsError } = useQuery({
        queryKey: ["CourseDetails", { slug }],
        queryFn: () => getServerRequest(`/MemberCoursePlayer/${slug}`),
    });
    console.log(CourseDetails?.data?.data?.image,"CourseDetails");

    
    
    const {
        data: MemberCoursePlayer,
        refetch: refetchMemberCoursePlayer,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["MemberCoursePlayer", { slug }],
        queryFn: () => getServerRequest(`/CourseNode/${slug}/nodes`),
    });
    
    const { data: courseVideos, isLoading: isLoadingVideo } = useQuery({
        queryKey: ["Course_videos", { slug, videoNode }],
        queryFn: () => getServerRequest(`/CourseVideo/${slug}/videos/${videoNode}`),
        enabled: !!videoNode,
    });

    
    useEffect(() => {
        if (courseVideos?.data?.data?.video?.path) {
            setVideoCipherPath(courseVideos.data.data.video.path);
        }
    }, [courseVideos]);
    
    const { data: vdocipherOTP, isLoading: isLoadingvdocipherOTP } = useQuery({
        queryKey: ["Vdo_Cipher_Otp", {videoCipherPath }],
        queryFn: () => vdocipherPostServerOtpRequest(videoCipherPath),
        enabled: !!videoCipherPath,
    });


        useEffect(() => {
            if (vdocipherOTP?.data?.otp) {
                setVdocipherConfig({
                    otp: vdocipherOTP.data.otp,
                    playbackInfo: vdocipherOTP.data.playbackInfo,
                });
            }
        }, [vdocipherOTP]);
        


    const videoCommentsMutation = useMutation({
        mutationFn: (nodeId) => getServerRequest(`/VideoComment/${nodeId}/comments`),
    });

    const watchVideoMutation = useMutation({
        mutationFn: () => spcificPostServerRequest(`/MemberVideo/${videoId}/watch`),
        onSuccess: () => {
            refetchMemberCoursePlayer();
        },
    });
    // const watchVideoMutation = useMutation({
    //     mutationFn: () => vdocipherPostServerOtpRequest(videoCipherPath),
    //     onSuccess: () => {
    //         refetchMemberCoursePlayer();
    //         consoel
    //     },
    // });

    // Fetch OTP when videoId changes
   

    // Derived state: First unwatched node
    const firstUnwatchedNodeId = useMemo(() => {
        if (!MemberCoursePlayer?.data?.data) return null;
        for (const item of MemberCoursePlayer.data.data) {
            const node = item.nodes.find((node: any) => {
                if (node.type == 0 && !node.isWatched) return node;
                else if (node.type == 0 && node.isWatched) return node;
            });
            if (node) return node;
        }
        return null;
    }, [MemberCoursePlayer]);

    // Handlers
    const handleDuration = useCallback((duration: number) => dispatch({ type: "SET_DURATION", payload: duration }), []);
    const handleProgress = useCallback(
        (progress: any) => {
            dispatch({ type: "SET_PLAYED_SECONDS", payload: progress.playedSeconds });
            const watchedPercentage = (progress.playedSeconds / playbackState.duration) * 100;
            const lastWatchedPercentage = {
                slug: slug,
                percentage: watchedPercentage,
                title: locale === "ar" ? courseVideos?.data?.data?.video?.titleAr : courseVideos?.data?.data?.video?.titleEn,
                duration: playbackState.duration,
                image: CourseDetails?.data?.data?.image,
            };
            localStorage.setItem("watchedPercentage", JSON.stringify(lastWatchedPercentage));
            if (watchedPercentage >= WATCH_THRESHOLD_PERCENTAGE) {
                watchVideoMutation.mutate();
                alert("You have watched 80% of the video");
            }
        },
        [playbackState.duration, watchVideoMutation],
    );

    // Function to handle video end
    const handleVideoEnd = useCallback(() => {
        if (MemberCoursePlayer?.data?.data) {
            const nodes = MemberCoursePlayer.data.data.flatMap((item: any) => item.nodes);
            const currentIndex = nodes.findIndex((node: any) => node.nodeId === videoNode);

            let nextNode;
            if (currentIndex !== -1 && currentIndex < nodes.length - 1) {
                // If there is a next video, play it
                nextNode = nodes[currentIndex + 1];
            } else {
                // If there is no next video, play the first video
                nextNode = nodes[0];
            }

            if (nextNode) {
                setVideoNode(nextNode.nodeId);
                setVideoName(locale === "ar" ? nextNode.titleAr : nextNode.titleEn);
                videoCommentsMutation.mutate(nextNode.contentId);
            }
        }
    }, [MemberCoursePlayer, videoNode, setVideoNode, setVideoName, locale, videoCommentsMutation]);

    // Effects
    useEffect(() => {
        if (firstUnwatchedNodeId) {
            setVideoNode(firstUnwatchedNodeId.nodeId);
            setVideoName(locale === "ar" ? firstUnwatchedNodeId.titleAr : firstUnwatchedNodeId.titleEn);
            videoCommentsMutation.mutate(firstUnwatchedNodeId.contentId);
        }
    }, [firstUnwatchedNodeId, locale, setVideoName, setVideoNode]);

    useEffect(() => {
        if (courseVideos?.data?.data?.video?.path) {
            CourseVideo(courseVideos.data.data.video.path);
        }
    }, [courseVideos, CourseVideo]);

    useEffect(() => {
        if (isCourseLinksError) {
            removeCookie("userData", { path: "/", expires: new Date(0) });
            router.replace(`/${locale}`);
            localStorage.clear();
        }
    }, [MemberCoursePlayer, courseVideos, isCourseLinksError]);

    useEffect(() => {
        if (lastVideoData) {
            setVideoNode(lastVideoData?.data?.data?.nodeId);
            setVideoName(locale === "ar" ? lastVideoData?.data?.data?.titleAr : lastVideoData?.data?.data?.titleEn);
            videoCommentsMutation.mutate(lastVideoData?.data?.data?.contentId);
        }
    }, [lastVideoData]);

    // Effect to handle HLS video
    useEffect(() => {
        if (CourseDetails?.data?.data?.playerType === 1 && playerRef.current && sourceRef.current) {
            const video = playerRef.current;
            const source = sourceRef.current;
            const videoSrc = videoLink.replace(".html", ".m3u8");

            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(videoSrc);
                hls.attachMedia(video);

                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    video.play().catch((error) => console.error("Error playing video:", error));
                });
            } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                source.src = videoSrc;
                video.load();
                video.addEventListener("loadedmetadata", () => {
                    video.play().catch((error) => console.error("Error playing video:", error));
                });
            }
        }
    }, [CourseDetails, videoLink]);

    // Tabs configuration
    const isTablet = useMediaQuery({ query: "(min-width: 1024px)" });
    const tabsData = useMemo(
        () => [
            {
                key: "1",
                label: t("courseTabs.links"),
                children: (
                    <>
                        <CourseLinks data={CourseLinksData?.data?.data} title={t("courseTabs.links")} />
                        <CourseLinks data={videoCommentsMutation?.isPending ? [] : videoCommentsMutation?.data?.data?.data} title={t("common.comments")} showComments />
                        <AddComment />
                    </>
                ),
            },
            { key: "2", label: t("courseTabs.q_a"), children: t("courseTabs.q_a") },
            { key: "3", label: t("courseTabs.leader"), children: t("courseTabs.leader") },
        ],
        [CourseLinksData, t, videoCommentsMutation],
    );

    const tabsDataMobile = useMemo(
        () => [
            {
                key: "4",
                label: t("courseTabs.courseContent"),
                children: (
                    <div className="course_player_list">
                        <div className="course_player_header">{CourseDetails && <LineProgress title="Course List" percent={Math.trunc(CourseDetails?.data.data.progressPercentage)} />}</div>
                        <div className="course_player_list_items">
                            <CoursePlayerAccordion videosItems={MemberCoursePlayer?.data.data} videoCommentsMutation={videoCommentsMutation} />
                        </div>
                    </div>
                ),
            },
            ...tabsData,
        ],
        [tabsData, MemberCoursePlayer, t, CourseDetails],
    );

    const startFromPercentage = (percentage: any) => {
        const time = (percentage / 100) * lastVideoData?.duration;
        return time;
    };

    // Function to check video type and render appropriate player
    const checkVideoType = useCallback(() => {
        const playerType = CourseDetails?.data?.data?.playerType;

        switch (playerType) {
            case 0: // Normal video (e.g., YouTube)
                return (
                    <ReactPlayer
                        config={{
                            file: { attributes: { controlsList: "nodownload" } },
                        }}
                        key={videoNode}
                        width="100%"
                        style={{ aspectRatio: "16/9", width: "100%", height: "unset" }}
                        // height="19em"
                        controls
                        url={videoLink}
                        playing={!!videoLink}
                        onDuration={handleDuration}
                        onProgress={handleProgress}
                        onEnded={handleVideoEnd}
                        progressInterval={100}
                        onReady={(player) => {
                            const startTime = startFromPercentage(lastVideoData?.percentage);
                            player.seekTo(startTime);
                        }}
                    />
                );

            case 1: // HLS video (e.g., Publit)
                return (
                    <div style={{ left: "0", width: "100%", height: "0", position: "relative", paddingBottom: "55.29%" }}>
                        <figure
                            style={{
                                left: "0",
                                width: "100%",
                                height: "0",
                                position: "relative",
                                paddingBottom: "55.29%",
                                marginBlockEnd: "0",
                                marginBlockStart: "0",
                                marginInlineStart: "0",
                                marginInlineEnd: "0",
                            }}>
                            <iframe
                                id="pv_NeR5g5Te"
                                src={videoLink}
                                scrolling="no"
                                style={{ border: "0", top: "0", left: "0", width: "100%", height: "100%", position: "absolute", overflow: "hidden" }}
                                allowFullScreen={true}
                                onLoad={() => {
                                    // Send a message to the iframe to listen for the video end event
                                    const iframe = document.getElementById("pv_NeR5g5Te") as any;
                                    if (iframe) {
                                        iframe.contentWindow.postMessage("listenForVideoEnd", "*");
                                        iframe.contentWindow.postMessage("listenForVideoProgress", "*");
                                    }
                                }}
                            />
                        </figure>
                    </div>
                );
            case 2: //vdocipher
                return (
                    <iframe
                        src={`https://player.vdocipher.com/v2/?otp=${videoLink}&playbackInfo=${vdocipherConfig.playbackInfo}`}
                        // style={{ width: "100%", height: "19em", border: "none" }}
                        allowFullScreen
                        allow="encrypted-media"
                        onLoad={() => {
                            // Send a message to the iframe to listen for the video end event
                            const iframe = document.querySelector("iframe") as any;
                            if (iframe) {
                                iframe.contentWindow.postMessage("listenForVideoEnd", "*");
                            }
                        }}
                    />
                );
            default:
                return null;
        }
    }, [CourseDetails, videoNode, videoLink, handleDuration, handleProgress, handleVideoEnd, lastVideoData, vdocipherConfig]);

    useEffect(() => {
        const handleIframeEnd = (event: any) => {
            if (event.data.event_id == "publitio_video_ended") {
                handleVideoEnd();
            }
        };

        window.addEventListener("message", handleIframeEnd);

        return () => {
            window.removeEventListener("message", handleIframeEnd);
        };
    }, [handleVideoEnd]);
    useEffect(() => {
        const handleIframeProgress = (event: any) => {
            if (event.data.event_id === "publitio_video_played") {
                console.log(event.data.type, "progress");

                const progress = {
                    playedSeconds: event.data.currentTime,
                    played: event.data.currentTime / event.data.duration,
                };
                console.log(progress, "progress");

                handleProgress(progress);
            }
        };

        window.addEventListener("message", handleIframeProgress);

        return () => {
            window.removeEventListener("message", handleIframeProgress);
        };
    }, [handleProgress]);
 
    // Render
    return (
        <>
            <section className="course_player_header_info p-lg">
                <div className="course_player_header_breadcrumb f ac">
                    <Link href="/">Home</Link>
                    <MdKeyboardArrowRight />
                    <Link href="/courses">Courses</Link>
                    <MdKeyboardArrowRight />
                    <span>C# Course</span>
                </div>
                <h2>{videoName}</h2>
            </section>
            <section className="course_player">
                <div className="course_player_video">
                    <div className="course_player_video_seaction">
                        {checkVideoType()}
                        {/* <div className="course_player_video_seaction_content">
                            <h3>{videoName}</h3>
                        </div> */}
                    </div>
                    <div className="course_player_video_tabs">
                        <CourseTabs data={isTablet ? tabsData : tabsDataMobile} />
                    </div>
                </div>
                <div className="course_player_list">
                    <div className="course_player_header">{CourseDetails && <LineProgress title="Course List" percent={Math.trunc(CourseDetails?.data.data.progressPercentage)} />}</div>
                    <div className="course_player_list_items">
                        <CoursePlayerAccordion videosItems={MemberCoursePlayer?.data.data} videoCommentsMutation={videoCommentsMutation} />
                    </div>
                </div>
            </section>
        </>
    );
}
