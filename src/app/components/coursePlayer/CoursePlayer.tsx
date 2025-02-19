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

// Dynamic imports
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
const CoursePlayerAccordion = dynamic(() => import("../common/coursePlayerAccordion/CoursePlayerAccordion"), { ssr: false });
const CourseTabs = dynamic(() => import("../common/courseTabs/CourseTabs"), { ssr: false });
import { Autoplay } from "swiper/modules";
import { FiSun } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";
import useThemeProvider from "@/app/store/ThemeProvider";

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

type CourseData = {
    titleAR: string;
    category_id: string;
    categoryTitleAr: string;
    categoryTitleEn: string;
};


export default function CoursePlayer({ slug }: { slug: string }) {
    const [diplomaRoute, setDiplomaRoute] = useState<string | null>("");
    const { theme,toggleTheme } = useThemeProvider();
    const t = useTranslations();
    const { locale } = useParams();
    const router = useRouter();
    const pathname = usePathname(); // Get the current path

    const [cookies, , removeCookie] = useCookies(["userData"]);
    const [videoCipherPath, setVideoCipherPath] = useState<string>("");
    const [hasHandledProgress, setHasHandledProgress] = useState(false);
    const [storedCourse, setStoredCourse] = useState<any | null>(null);

    const { videoNode, setVideoNode, videoLink, videoName, videoId, CourseVideo, setVideoName, lastVideoData } = GenralCoursePlayerId();
    const playerRef = useRef<HTMLVideoElement | null>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

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

    // Fetch OTP when videoId changes
    const { data: vdocipherOTP, isLoading: isLoadingvdocipherOTP } = useQuery({
        queryKey: ["Vdo_Cipher_Otp", { videoCipherPath }],
        queryFn: () => getServerRequest(`/VdoCipher/${videoCipherPath}/otp`),
        enabled: !!videoCipherPath,
    });

    //     useEffect(() => {
    //         // Function to handle the popstate event
    //         const handlePopState = () => { 1px solid rgba(255, 255, 255, 0.1)
    //             // Get the current history state
    //             const currentState = window.history.state;

    //             // Optionally, check if there is a previous state
    //             if (currentState && currentState.backUrl) {
    //                 // Navigate to the previous URL stored in the state
    //                 router.push(currentState.backUrl);
    //             } else {
    //                 // Default behavior: go back one step in history
    //                 window.history.back();
    //             }
    //         };

    //         // Add the event listener for the popstate event
    //         window.addEventListener("popstate", handlePopState);

    //         // Clean up the event listener on unmount
    //         return () => {
    //             window.removeEventListener("popstate", handlePopState);
    //         };
    //     }, [router]);
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
        console.log("Slug: ", slug);
        console.log("Stored Data: ", storedData);
    
        if (storedData) {
            const courses: Record<string, { titleAr: string; category_id: string; categoryTitleAr: string; categoryTitleEn?: string }> = JSON.parse(storedData);
            
            const foundCourse = courses[slug]; // Ensure courses is an object with keys matching slugs
            console.log("Found Course: ", foundCourse);
    
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
    
    // 🔥 Correct way to log the updated state
    useEffect(() => {
        console.log("Updated storedCourse: ", storedCourse);
    }, [storedCourse]); // ✅ Logs when `storedCourse` updates

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

    // useEffect(() => {
    // Function to handle the popstate event
    // window.addEventListener("popstate", (event) => {
    //     console.log(
    //       `location: ${document.location}, state: ${JSON.stringify(event.state)}`,
    //     );
    //   });
    // console.log(window.history);
    // }, []);

    // useEffect(() => {
    //     // Function to handle the popstate event
    //     const handlePopState = () => {
    //         // Get the current history state
    //         const currentState = window.history.state;

    //         // Optionally, check if there is a previous state
    //         if (currentState && currentState.backUrl) {
    //             // Navigate to the previous URL stored in the state
    //             router.push(currentState.backUrl);
    //         } else {
    //             // Default behavior: go back one step in history
    //             window.history.back();
    //         }
    //     };

    //     // Add the event listener for the popstate event
    //     window.addEventListener("popstate", handlePopState);

    //     // Clean up the event listener on unmount
    //     return () => {
    //         window.removeEventListener("popstate", handlePopState);
    //     };
    // }, [router]);

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

    // useEffect(() => {
    // Function to handle the popstate event
    // window.addEventListener("popstate", (event) => {
    //     console.log(
    //       `location: ${document.location}, state: ${JSON.stringify(event.state)}`,
    //     );
    //   });
    // const diplomaName = localStorage.getItem("diplomaName") || "{}"
    // console.log(diplomaName + "diploma name")
    // }, []);

    // useEffect(() => {
    //     // Function to handle the popstate event
    //     const handlePopState = () => {
    //         // Get the current history state
    //         const currentState = window.history.state;

    //         // Optionally, check if there is a previous state
    //         if (currentState && currentState.backUrl) {
    //             // Navigate to the previous URL stored in the state
    //             router.push(currentState.backUrl);
    //         } else {
    //             // Default behavior: go back one step in history
    //             window.history.back();
    //         }
    //     };

    //     // Add the event listener for the popstate event
    //     window.addEventListener("popstate", handlePopState);

    //     // Clean up the event listener on unmount
    //     return () => {
    //         window.removeEventListener("popstate", handlePopState);
    //     };
    // }, [router]);

    // Example: Save the current URL in the history state when navigating to this page

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
    const isTablet = useMediaQuery({ query: "(min-width: 1025px)" });
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
                        <div className="course_player_header">{CourseDetails && <LineProgress title="Course List" percent={Math.trunc(CourseDetails?.data?.data.progressPercentage)} />}</div>
                        <div className="course_player_list_items">
                            <CoursePlayerAccordion videosItems={MemberCoursePlayer?.data?.data} videoCommentsMutation={videoCommentsMutation} />
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

    useEffect(() => {
        if (iframeRef.current) {
            iframeRef.current.contentWindow?.postMessage({ event: "subscribe", type: "timeupdate" }, "*");
        }

        // console.log(iframeRef.current);
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
                        // onLoad={() => {
                        //     const iframe = document.querySelector("vdocipher-player") as any;

                        //     if (iframe) {
                        //         iframe.contentWindow.postMessage("listenForVideoEnd", "*");
                        //         iframe.contentWindow.postMessage("listenForVideoProgress", "*");
                        //     }
                        // }}
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
            if (event.data.event_id === "publitio_video_played") {
                // console.log(event.data.type, "progress");

                const progress = {
                    playedSeconds: event.data.currentTime,
                    played: event.data.currentTime / event.data.duration,
                };
                // console.log(progress, "progress");

                handleProgress(progress);
            }
        };

        window.addEventListener("message", handleIframeProgress);

        return () => {
            window.removeEventListener("message", handleIframeProgress);
        };
    }, [handleProgress]);
    useEffect(() => {
        if(localStorage.getItem("diploma_route")){
            const router = localStorage.getItem("diploma_route");
            setDiplomaRoute(router);
        }
    },[slug])

    // Render
    return (
        <>
            <section className="course_player_header_info p-lg f ac jb">
                <div>
                    <div className="course_player_header_breadcrumb f ac">
                        <Link href="/learn-path">{t("menu.learn_pathes") }</Link>
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
                        <span>{localStorage.getItem("course_title") }</span>
                    </div>
                    <h2>{videoName}</h2>
                </div>
                <div className={`header-service-mode `} onClick={toggleTheme}>
                    {theme === "dark" ? <FiSun style={{ color: "gold" }} /> : <IoMoonOutline />}
                </div>
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
                    <div className="course_player_header">{CourseDetails && <LineProgress title="Course List" percent={Math.trunc(CourseDetails?.data?.data?.progressPercentage)} />}</div>
                    <div className="course_player_list_items">
                        <CoursePlayerAccordion videosItems={MemberCoursePlayer?.data?.data} videoCommentsMutation={videoCommentsMutation} />
                    </div>
                </div>
            </section>
        </>
    );
}
