"use client";
import React, { useEffect, useMemo, useCallback, useReducer, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useMediaQuery } from "react-responsive";
import { useParams, useRouter, usePathname } from "next/navigation";
import { useCookies } from "react-cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getServerRequest, spcificPostServerRequest } from "@/app/utils/generalServerRequest";
import GenralCoursePlayerId from "@/app/store/GeneralCoursePlayer";
import LineProgress from "../common/lineProgress/LineProgress";
import AddComment from "../common/addComment/AddComment";
import CourseLinks from "../common/courseLinks/CourseLinks";
import NewLoader from "../common/newLoader/NewLoader";
import Hls from "hls.js";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoLinkSharp } from "react-icons/io5";
import { Autoplay } from "swiper/modules";
import { FiSun } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";
import useThemeProvider from "@/app/store/ThemeProvider";
import CourseExam from "../common/courseExam/CourseExam";
import AskQuestion from "../common/askQuestion/AskQuestion";
import generalActivePopup from "@/app/store/ActivePopup";
import LeaderBoard from "../common/leaderBoard/LeaderBoard";


// Dynamic imports
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
const CoursePlayerAccordion = dynamic(() => import("../common/coursePlayerAccordion/CoursePlayerAccordion"), { ssr: false });
const CourseTabs = dynamic(() => import("../common/courseTabs/CourseTabs"), { ssr: false });


declare global {
    interface Window {
        VdoPlayer: any; // You can replace 'any' with the specific type if you know it
    }
}
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
    const [diplomaRoute, setDiplomaRoute] = useState<string | null>("");
    const { theme, toggleTheme } = useThemeProvider();
    const t = useTranslations();
    const { locale } = useParams();
    const router = useRouter();
    const pathname = usePathname(); // Get the current path

    const [vdocipherConfig, setVdocipherConfig] = useState<any>({ otp: "", playbackInfo: "" });
    const [cookies, , removeCookie] = useCookies(["userData"]);
    const [videoCipherPath, setVideoCipherPath] = useState<string>("");
    const [hasHandledProgress, setHasHandledProgress] = useState(false);
    const [activeTab, setActiveTab] = useState("links");
    // const [nodeType, setNodeType] = useState<number>(0);
    const [examId, setExamID] = useState<number>(0);

    const [storedCourse, setStoredCourse] = useState<any | null>(null);
    const [courseTitle, setCourseTitle] = useState<string>("");


    const { videoNode, setVideoNode, videoLink, videoName, setIsSubmitted, nodeType, setNodeType, isSubmitted, videoId, passedIsRequired, setPassedIsRequired, setVideoID, CourseVideo, setVideoName, lastVideoData } = GenralCoursePlayerId();
    const { openQuestion, activeLeaderBoard, askquestionPopup } = generalActivePopup();

    const playerRef = useRef<HTMLVideoElement | null>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const linksRef = useRef(null);
    const commentsRef = useRef(null);
    const course_list = useRef(null);
    const sourceRef = useRef<any>(null);
    const [playbackState, dispatch] = useReducer(playbackReducer, { duration: 0, playedSeconds: 0 });



    // Queries
    const { data: CourseLinksData, isError: isCourseLinksError } = useQuery({
        queryKey: ["Course_links", { slug }],
        queryFn: () => getServerRequest(`/CourseLink/${slug}/links`),
        enabled: !!slug,
    });

    const { data: CourseDetails, isLoading: isLoadingMemberCoursePlayer, isError: isCourseDetailsError } = useQuery({
        queryKey: ["CourseDetails", { slug }],
        queryFn: () => getServerRequest(`/MemberCoursePlayer/${slug}`),
    });

    const {
        data: MemberCoursePlayer,
        refetch: refetchMemberCoursePlayer,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["MemberCoursePlayer", { slug }],
        queryFn: () => getServerRequest(`/CourseNode/${slug}/nodes`),
    });

    const {
        data: ExamQuestion,
        refetch: refetchExamQuestion,
        isLoading: isLoadingExam,  // Renamed to avoid conflict
        isFetching, // Indicates if data is being refetched
    } = useQuery({
        queryKey: ["examQuestion", { videoId }],
        // queryFn: () => getServerRequest(`/MemberExam/${videoId}/questions`),
        queryFn: () => {
            console.log("Fetching data... from course Player "); // Debugging: Check if query is running
            return getServerRequest(`/MemberExam/${videoId}/questions`);
        },
        enabled: false, // Only fetch if nodeType is 1 and examId exists
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
        else if (courseVideos?.data?.data?.video == null) {
            console.log(courseVideos?.data?.data);
            // setExamID(courseVideos?.data?.data.examId)
        } else {
            console.log(courseVideos)
        }

    }, [courseVideos]);


    useEffect(() => {
        if (nodeType === 1) {
            console.log(videoId)
            // setIsSubmitted(false)
        }
    }, [nodeType, isSubmitted]);

    // Fetch OTP when videoId changes
    const { data: vdocipherOTP, isLoading: isLoadingvdocipherOTP } = useQuery({
        queryKey: ["Vdo_Cipher_Otp", { videoCipherPath }],
        queryFn: () => getServerRequest(`/VdoCipher/${videoCipherPath}/otp`),
        enabled: !!videoCipherPath,
    });

    useEffect(() => {
        MemberCoursePlayer?.data?.data?.map((item: any) => {
            item.nodes.map((node: any) => {

                if (node.contentId == videoId) {
                    setNodeType(node.type);
                }
            });
        });
    }, [MemberCoursePlayer, videoNode]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.setItem("lastVisitedURL", window.location.href);
        };


        window.addEventListener("beforeunload", handleBeforeUnload);


        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        const handlePopState = () => {
            const lastURL = localStorage.getItem("lastVisitedURL");

            if (lastURL) {
                router.push(lastURL); // Go to last visited video URL
            } else {
                window.history.back(); // Default back behavior
            }
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [router]);

    useEffect(() => {
        const storedData = localStorage.getItem("courses");
        // console.log("Slug: ", slug);
        // console.log("Stored Data: ", storedData);

        if (storedData) {
            const courses: Record<string, { titleAr: string; category_id: string; categoryTitleAr: string; categoryTitleEn?: string }> = JSON.parse(storedData);

            const foundCourse = courses[slug]; // Ensure courses is an object with keys matching slugs
            // console.log("Found Course: ", foundCourse);

            if (foundCourse) {
                setStoredCourse({
                    ...foundCourse,
                    categoryTitleEn: foundCourse.categoryTitleEn || "Default Title",
                });
            } else {
                setStoredCourse(null);
            }
        } else {
            setStoredCourse(null);
        }
    }, [slug]); // ✅ Add slug as a dependency


    useEffect(() => {
        const handlePopState = () => {
            const lastURL = localStorage.getItem("lastVisitedURL");

            if (lastURL) {
                router.push(lastURL); // Go to last visited video URL
            } else {
                window.history.back(); // Default back behavior
            }
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [router]);





    useEffect(() => {
        if (vdocipherOTP?.data?.data?.otp) {
            setVdocipherConfig({
                otp: vdocipherOTP.data.data.otp,
                playbackInfo: vdocipherOTP.data.data.playbackInfo,
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

    // Derived state: First unwatched node

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = ""; // Some browsers require setting this to show the warning
        };

        if (nodeType === 1) {
            window.addEventListener("beforeunload", handleBeforeUnload);
        }


        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [nodeType]);

    // console.log("video Id : " + videoId)

    const nextUnwatchedNode = useMemo(() => {
        if (!MemberCoursePlayer?.data?.data) return null;

        let lastWatchedIndex = -1; // Track the index of the last watched video
        let lastWatchedNode = null; // Track the last watched video node

        // Iterate through the data to find the last watched video
        for (let i = 0; i < MemberCoursePlayer.data.data.length; i++) {
            const item = MemberCoursePlayer.data.data[i];
            for (let j = 0; j < item.nodes.length; j++) {
                const node = item.nodes[j];
                if (node.type === 0 && node.isWatched) {
                    // Update the last watched video
                    lastWatchedIndex = i;
                    lastWatchedNode = node;
                }
            }
        }

        // If no videos have been watched, return the first unwatched video
        if (lastWatchedIndex === -1) {
            for (const item of MemberCoursePlayer.data.data) {
                const node = item.nodes.find((node: any) => node.type === 0 && !node.isWatched);
                if (node) return node;
            }
            return null;
        }

        // Find the next unwatched video after the last watched video
        for (let i = lastWatchedIndex; i < MemberCoursePlayer.data.data.length; i++) {
            const item = MemberCoursePlayer.data.data[i];
            const startIndex = i === lastWatchedIndex ? item.nodes.indexOf(lastWatchedNode) + 1 : 0;
            for (let j = startIndex; j < item.nodes.length; j++) {
                const node = item.nodes[j];
                if (node.type === 0 && !node.isWatched) {
                    // console.log("node : " + JSON.stringify(node, null, 2))
                    setVideoID(node.contentId)
                    return node; // Return the next unwatched video
                }
            }
        }

        return MemberCoursePlayer.data.data[0]?.nodes[0] ?? null;

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
                courseTitle: CourseDetails?.data?.data?.titleEn,
            };
            localStorage.setItem("watchedPercentage", JSON.stringify(lastWatchedPercentage));
            if (watchedPercentage >= WATCH_THRESHOLD_PERCENTAGE) {
                watchVideoMutation.mutate();
                setHasHandledProgress(true);

                // alert("You have watched 80% of the video");
            }
        },
        [playbackState.duration, watchVideoMutation, hasHandledProgress],
    );

    // Function to handle video end
    const handleVideoEnd = useCallback(() => {
        if (MemberCoursePlayer?.data?.data) {
            const nodes = MemberCoursePlayer.data.data.flatMap((item: any) => item.nodes);
            const currentIndex = nodes.findIndex((node: any) => node.nodeId === videoNode);
            // console.log(videoNode)
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
        if (nextUnwatchedNode) {
            setVideoNode(nextUnwatchedNode.nodeId);
            setVideoName(locale === "ar" ? nextUnwatchedNode.titleAr : nextUnwatchedNode.titleEn);
            videoCommentsMutation.mutate(nextUnwatchedNode.contentId);
        }
    }, [nextUnwatchedNode, locale, setVideoName, setVideoNode, MemberCoursePlayer]);

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

    useEffect(() => {
        const scriptSrc = "https://player.vdocipher.com/v2/api.js";
        if (CourseDetails?.data?.data?.playerType == 2) {
            const loadScript = () => {
                return new Promise((resolve, reject) => {
                    if (document.querySelector(`script[src="${scriptSrc}"]`)) {
                        resolve("Script already loaded");
                        return;
                    }

                    const script = document.createElement("script");
                    script.src = scriptSrc;
                    script.async = true;
                    script.onload = () => resolve("Script loaded successfully");
                    script.onerror = () => reject("Script load error");
                    document.body.appendChild(script);
                });
            };
            // console.log(videoNode  + " Node video from efffect")

            loadScript()
                .then(() => {
                    console.log("✅ VdoCipher API loaded.");
                    initializePlayer();
                })
                .catch((error) => {
                    console.error("❌ VdoCipher API load error:", error);
                });
        }
    }, [CourseDetails, videoId, videoNode]);

    // console.log(videoId);
    const initializePlayer = () => {
        if (CourseDetails?.data?.data?.playerType == 2) {
            if (!iframeRef.current) {
                console.warn("⚠️ iframeRef.current is not available yet. Retrying...");
                setTimeout(initializePlayer, 100); // Retry after 100ms
            }

            const checkVdoPlayer = () => {
                if (typeof window.VdoPlayer === "undefined") {
                    console.warn("⚠️ VdoPlayer not available yet. Retrying...");
                    setTimeout(checkVdoPlayer, 100);
                } else {
                    console.log("🎬 Initializing VdoCipher Player...");

                    try {
                        const playerInstance = window.VdoPlayer.getInstance(iframeRef.current);
                        if (playerInstance.video) {
                            console.log("✅ Player instance found. Adding event listeners...");

                            playerInstance.video.addEventListener("play", () => {
                                console.log("▶️ Video is playing");
                            });

                            // Tracking 80% and 100% progress
                            playerInstance.video.addEventListener("timeupdate", () => {
                                let currentTime = playerInstance.video.currentTime;
                                let duration = playerInstance.video.duration;
                                let progress = (currentTime / duration) * 100;

                                if (progress >= 80) {
                                    console.log("🎯 Video reached 80%");
                                    handleProgress({
                                        playedSeconds: currentTime,
                                        played: currentTime / duration,
                                    });
                                }

                                if (progress >= 100) {
                                    handleVideoEnd();

                                    console.log("🏁 Video reached 100%");
                                }
                            });
                        }
                    } catch (error) {
                        console.error("❌ Error initializing VdoCipher:", error);
                    }
                }
            };

            checkVdoPlayer();
        }
    };

    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.setItem("lastVisitedURL", window.location.href);
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        const handlePopState = () => {
            const lastURL = localStorage.getItem("lastVisitedURL");

            if (lastURL) {
                router.push(lastURL); // Go to last visited video URL
            } else {
                window.history.back(); // Default back behavior
            }
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [router]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.setItem("lastVisitedURL", window.location.href);
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        const handlePopState = () => {
            const lastURL = localStorage.getItem("lastVisitedURL");

            if (lastURL) {
                router.push(lastURL); // Go to last visited video URL
            } else {
                window.history.back(); // Default back behavior
            }
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [router]);

    useEffect(() => {
        if (CourseDetails?.data?.data?.playerType === 1 && playerRef.current && sourceRef.current) {
            const video = playerRef.current;
            const videoSrc = videoLink.replace(".html", ".m3u8");

            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(videoSrc);
                hls.attachMedia(video);

                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    video.play().catch((error) => console.error("Error playing video:", error));
                });

                hls.on(Hls.Events.FRAG_CHANGED, (event, data) => {
                    console.log("Fragment changed:", data);
                    // You can use this event to track progress
                    const currentTime = video.currentTime;
                    const duration = video.duration;
                    const progress = {
                        playedSeconds: currentTime,
                        played: currentTime / duration,
                    };
                    handleProgress(progress);
                });

                hls.on(Hls.Events.ERROR, (event, data) => {
                    console.error("HLS error:", data);
                });
            } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                sourceRef.current.src = videoSrc;
                video.load();
                video.addEventListener("loadedmetadata", () => {
                    video.play().catch((error) => console.error("Error playing video:", error));
                });

                console.log("Current Time: ");
                video.addEventListener("timeupdate", () => {
                    const currentTime = video.currentTime;
                    const duration = video.duration;

                    const progress = {
                        playedSeconds: currentTime,
                        played: currentTime / duration,
                    };
                    handleProgress(progress);
                });
            }
        }
    }, [CourseDetails, videoLink]);

    const isTablet = useMediaQuery({ query: "(min-width: 1025px)" });


    const startFromPercentage = (percentage: any) => {
        const time = (percentage / 100) * lastVideoData?.duration;
        return time;
    };

    useEffect(() => {
        if (iframeRef.current) {
            iframeRef.current.contentWindow?.postMessage({ event: "subscribe", type: "timeupdate" }, "*");
        }
    }, []);

    // Function to convert percentage to time

    // Function to check video type and render appropriate player
    const checkVideoType = useCallback(() => {
        const playerType = CourseDetails?.data?.data?.playerType;

        switch (playerType) {
            case 0: // Normal video (e.g., YouTube)
                return (
                    <ReactPlayer
                        // config={{
                        //     file: { attributes: { controlsList: "nodownload" } },
                        // }}
                        key={videoNode}
                        width="100%"
                        style={{ aspectRatio: "16/9", width: "100%", height: "unset" }}
                        // height="19em"
                        controls
                        ref={playerRef}
                        config={{
                            youtube: {
                                playerVars: { modestbranding: 1, rel: 0 },
                            },
                        }}
                        url={videoLink}
                        playing={!!videoLink}
                        onDuration={handleDuration}
                        onProgress={handleProgress}
                        onEnded={handleVideoEnd}
                        setPlayer
                        onPlaybackQualityChange={(quality: any) => {
                            console.log("Quality changed to:", quality.data);
                            localStorage.setItem("Quality", quality.data);
                        }}
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
                                // ref={playerRef}
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
                        src={`https://player.vdocipher.com/v2/?otp=${vdocipherConfig.otp}&playbackInfo=${vdocipherConfig.playbackInfo}&autoplay=true&mute=true&enableEvents=true&enablePostroll=true`}
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
            // console.log(event.data.event_id + "from here ")
            if (event.data.event_id === "publitio_video_played") {

                const progress = {
                    playedSeconds: event.data.currentTime,
                    played: event.data.currentTime / event.data.duration,
                };

                handleProgress(progress);
            }
        };

        window.addEventListener("message", handleIframeProgress);

        return () => {
            window.removeEventListener("message", handleIframeProgress);
        };
    }, [handleProgress]);
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
                console.log(event.data, "progress");

                // let currentTime = event.data.currentTime;
                // let duration = event.data.duration;

                const progress = {
                    playedSeconds: event.data.currentTime,
                    played: event.data.duration,
                };
                console.log(event.data.currentTime, "progress");

                handleProgress(progress);
            }
        };

        window.addEventListener("message", handleIframeProgress);

        return () => {
            window.removeEventListener("message", handleIframeProgress);
        };
    }, [handleProgress]);

    useEffect(() => {
        if (iframeRef.current) {
            iframeRef.current.contentWindow?.postMessage(
                { event: "subscribe", type: "timeupdate" },
                "*"
            );
        }
    }, []);

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

                const { currentTime, duration } = event.data;

                if (currentTime !== undefined && duration) {
                    const progress = {
                        playedSeconds: currentTime,
                        played: currentTime / duration,
                    };
                    console.log("Video Progress:", progress);
                    handleProgress(progress);
                } else {
                    console.warn("currentTime or duration is missing in event data:", event.data);
                }
                // console.log(progress, "progress");

                // handleProgress(progress);
            }
        };

        window.addEventListener("message", handleIframeProgress);

        return () => {
            window.removeEventListener("message", handleIframeProgress);
        };
    }, [handleProgress]);

    useEffect(() => {
        const handleIframeProgress = (event: any) => {
            if (!event.data) return;

            if (event.data.event_id === "publitio_video_played") {
                console.log("Publit.io Video Event:", event.data);

                const { currentTime, duration } = event.data;
                if (typeof currentTime === "number" && typeof duration === "number") {
                    const progress = {
                        playedSeconds: currentTime,
                        totalDuration: duration,
                    };
                    console.log(`Current Time: ${currentTime} / ${duration}`);

                    // Call the function to update progress in your state
                    handleProgress(progress);
                }
            }
        };

        window.addEventListener("message", handleIframeProgress);

        return () => {
            window.removeEventListener("message", handleIframeProgress);
        };
    }, [handleProgress]);
    useEffect(() => {
        if (localStorage.getItem("diploma_route")) {
            const router = localStorage.getItem("diploma_route");
            setDiplomaRoute(router);
        }
    }, [slug])
    // Default active tab

    // Function to scroll smoothly to section
    const scrollToSection = (ref: any, tabName: any) => {
        if (ref?.current) {
            ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
            setActiveTab(tabName); // Update active tab on click
        }
    };

    // Render
    return (
        <>

            {nodeType === 1 ? (

                <div className="overlay"></div>
            ) : (
                null
            )}
            <section className="course_player_header_info p-lg f ac jb" style={{ overflow: nodeType === 1 ? "hidden" : "visible" }}>
                <div>
                    <div className="course_player_header_breadcrumb f ac">
                        <Link href="/learn-path">{t("menu.learn_pathes")}</Link>
                        <MdKeyboardArrowRight />
                        {/* <Link href={`/${diplomaRoute}` }>{t("common.courses") }</Link> */}

                        {storedCourse && (
                            <>
                                <Link href={`/${diplomaRoute}`}>
                                    {locale === "ar" ? storedCourse.categoryTitleAr : storedCourse.categoryTitleEn}
                                </Link>
                                <MdKeyboardArrowRight />

                            </>

                        )}
                        <span>{localStorage.getItem("course_title")}</span>
                    </div>
                    <h2>{videoName}</h2>
                </div>
                <div className={`header-service-mode `} onClick={toggleTheme}>
                    {theme === "dark" ? <FiSun style={{ color: "gold" }} /> : <IoMoonOutline />}
                </div>
            </section>
            <section className={"course_player " + (nodeType === 1 ? "exam_overlay" : "")}>

                <div className="course_player_video" >

                    {nodeType === 0 ? (
                        <div className="course_player_video_seaction">
                            {checkVideoType()}
                        </div>
                    ) : (
                        // <CourseExam  examid={examId} questions={ExamQuestion?.data?.data}/>
                        isLoadingExam || isLoadingVideo ? (
                            <NewLoader loading={isLoading} />  // Show loading message until both are ready
                        ) : (
                            <CourseExam examid={examId} />
                        )
                    )}
                    <div className="course_player_video_tabs" style={{ display: nodeType === 1 ? "none" : "block" }}>

                        <div className="buttons-container">
                            <button onClick={() => scrollToSection(linksRef, "links")} className={`custom-button ${activeTab === "links" ? "active" : ""}`}>
                                <div title={t("courseTabs.links")}>
                                    <IoLinkSharp />

                                </div>
                            </button>
                            {!isTablet && (
                                <button onClick={() => scrollToSection(linksRef, "course_list")} className={`custom-button ${activeTab === "course_list" ? "active" : ""}`}>

                                    <div title={t("courseTabs.courseContent")} className="custom-button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-user"><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M15 18a3 3 0 1 0-6 0"></path><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"></path><circle cx="12" cy="13" r="2"></circle></svg>
                                    </div>
                                </button>


                            )}
                            <button onClick={() => scrollToSection(commentsRef, "comments")} className={`custom-button ${activeTab === "comments" ? "active" : ""}`}>
                                <div title={t("courseTabs.comments")} className="custom-button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle-more"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path><path d="M8 12h.01"></path><path d="M12 12h.01"></path><path d="M16 12h.01"></path></svg></div>
                            </button>
                            <button onClick={() => { openQuestion() }} className={`custom-button ${activeTab === "q_a" ? "active" : ""}`}>
                                <div title={t("courseTabs.q_a")} onClick={() => { openQuestion(); console.log("div is clicked"); }} className="custom-button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle-question"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>

                                </div>
                            </button>
                            <button onClick={() => { activeLeaderBoard() }} className={`custom-button ${activeTab === "leader" ? "active" : ""}`}>
                                <div title={t("courseTabs.leader")} className="custom-button" onClick={() => { }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-ellipsis"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="M8 12h.01"></path><path d="M12 12h.01"></path><path d="M16 12h.01"></path></svg>

                                </div>
                            </button>
                        </div>

                        <AskQuestion slug={slug} />

                        <LeaderBoard />

                        <div ref={linksRef}>
                            <CourseLinks data={CourseLinksData?.data?.data} title={t("courseTabs.links")} />
                        </div>
                        {!isTablet ? (
                            isLoadingMemberCoursePlayer ? (
                                <NewLoader loading={isLoadingMemberCoursePlayer} />
                            ) : (
                                <div className="course_player_list">
                                    <div className="course_player_header">{CourseDetails && <LineProgress title={t("courseTabs.coursList")} percent={Math.trunc(CourseDetails?.data?.data.progressPercentage)} />}</div>
                                    <div className="course_player_list_items">
                                        <CoursePlayerAccordion videosItems={MemberCoursePlayer?.data?.data} videoCommentsMutation={videoCommentsMutation} slug={slug} />
                                    </div>
                                </div>
                            )
                        ) : null}


                        <div ref={commentsRef}>
                            <CourseLinks data={videoCommentsMutation?.isPending ? [] : videoCommentsMutation?.data?.data?.data} title={t("common.comments")} showComments />
                            <AddComment videoCommentsMutation={videoCommentsMutation} nodeId={videoNode} />
                        </div>

                        {/* <CourseTabs data={isTablet ? tabsData : tabsDataMobile} /> */}
                    </div>
                </div>
                {isTablet ? (
                    <div className={"course_player_list " + (nodeType === 1 ? "exam_overlay" : "")}>

                        <div className="course_player_list">
                            <div className="course_player_header">
                                {CourseDetails && (
                                    <LineProgress
                                        title={t("courseTabs.coursList")}
                                        percent={Math.trunc(CourseDetails?.data?.data?.progressPercentage)}
                                    />
                                )}
                            </div>
                            <div className="course_player_list_items">
                                {isLoadingMemberCoursePlayer ? (
                                    <NewLoader loading={isLoadingMemberCoursePlayer} />
                                ) : (
                                    <div ref={course_list}>
                                        <CoursePlayerAccordion
                                            videosItems={MemberCoursePlayer?.data?.data}
                                            videoCommentsMutation={videoCommentsMutation}
                                            slug={slug}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : null}
            </section>
        </>
    );
}




