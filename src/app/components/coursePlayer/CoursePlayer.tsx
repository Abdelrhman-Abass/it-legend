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
import { FiSun } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";
import useThemeProvider from "@/app/store/ThemeProvider";
import CourseExam from "../common/courseExam/CourseExam";
import AskQuestion from "../common/askQuestion/AskQuestion";
import generalActivePopup from "@/app/store/ActivePopup";
import LeaderBoard from "../common/leaderBoard/LeaderBoard";

import { last } from "ace-builds-internal/lib/lang";
import CoursePlayerHeader from "../coursePlayerRefactor/CoursePlayerHeader";
import RenderVideoTypes from "../coursePlayerRefactor/RenderVideoTypes";
import CoursePlayerTabs from "../coursePlayerRefactor/CoursePlayerTabs";
import CoursePlayerList from "../coursePlayerRefactor/CoursePlayerList";

// Dynamic imports
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
const CoursePlayerAccordion = dynamic(() => import("../common/coursePlayerAccordion/CoursePlayerAccordion"), { ssr: false });

declare global {
    interface Window {
        VdoPlayer: any;
    }
}

// Constants
const WATCH_THRESHOLD_PERCENTAGE = 80;

// Types
interface VideoPlayerProps {
    slug: string;
}

interface PlaybackState {
    duration: number;
    playedSeconds: number;
}

interface CourseData {
    titleAr: string;
    category_id: string;
    categoryTitleAr: string;
    categoryTitleEn?: string;
}

// Reducer for playback state
const playbackReducer = (state: PlaybackState, action: { type: string; payload?: any }): PlaybackState => {
    switch (action.type) {
        case "SET_DURATION":
            return { ...state, duration: action.payload };
        case "SET_PLAYED_SECONDS":
            return { ...state, playedSeconds: action.payload };
        default:
            return state;
    }
};

export default function CoursePlayer({ slug }: VideoPlayerProps) {
    // Hooks and context
    const { theme, toggleTheme } = useThemeProvider();
    const t = useTranslations();
    const { locale } = useParams();
    const router = useRouter();
    const pathname = usePathname();
    const [cookies, , removeCookie] = useCookies(["userData"]);

    // State from store
    const {
        videoNode,
        setVideoNode,
        videoLink,
        videoName,
        setIsSubmitted,
        nodeType,
        setNodeType,
        isSubmitted,
        videoId,
        passedIsRequired,
        setPassedIsRequired,
        setVideoID,
        CourseVideo,
        setVideoName,
        lastVideoData,
    } = GenralCoursePlayerId();

    const { openQuestion, activeLeaderBoard, askquestionPopup } = generalActivePopup();

    // Local state
    const [diplomaRoute, setDiplomaRoute] = useState<string | null>("");
    const [vdocipherConfig, setVdocipherConfig] = useState({ otp: "", playbackInfo: "" });
    const [videoCipherPath, setVideoCipherPath] = useState("");
    const [hasHandledProgress, setHasHandledProgress] = useState(false);
    const [activeTab, setActiveTab] = useState("links");
    const [examId, setExamID] = useState(0);
    const [storedCourse, setStoredCourse] = useState<CourseData | null>(null);
    const [playbackState, dispatch] = useReducer(playbackReducer, { duration: 0, playedSeconds: 0 });

    // Refs
    const playerRef = useRef<HTMLVideoElement | null>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const commentsRef = useRef<HTMLDivElement>(null);
    const course_list = useRef<HTMLDivElement>(null);
    const sourceRef = useRef<any>(null);
    const isTablet = useMediaQuery({ query: "(min-width: 1025px)" });

    // API Queries
    const { data: CourseLinksData, isError: isCourseLinksError } = useQuery({
        queryKey: ["Course_links", { slug }],
        queryFn: () => getServerRequest(`/CourseLink/${slug}/links`),
        enabled: !!slug,
    });

    const { data: CourseDetails, isLoading: isLoadingMemberCoursePlayer } = useQuery({
        queryKey: ["CourseDetails", { slug }],
        queryFn: () => getServerRequest(`/MemberCoursePlayer/${slug}`),
    });

    const { data: MemberCoursePlayer, refetch: refetchMemberCoursePlayer } = useQuery({
        queryKey: ["MemberCoursePlayer", { slug }],
        queryFn: () => getServerRequest(`/CourseNode/${slug}/nodes`),
    });

    const {
        data: ExamQuestion,
        refetch: refetchExamQuestion,
        isLoading: isLoadingExam,
    } = useQuery({
        queryKey: ["examQuestion", { videoId }],
        queryFn: () => getServerRequest(`/MemberExam/${videoId}/questions`),
        enabled: false,
    });

    const { data: courseVideos } = useQuery({
        queryKey: ["Course_videos", { slug, videoNode }],
        queryFn: () => getServerRequest(`/CourseVideo/${slug}/videos/${videoNode}`),
        enabled: !!videoNode,
    });

    const { data: vdocipherOTP } = useQuery({
        queryKey: ["Vdo_Cipher_Otp", { videoCipherPath }],
        queryFn: () => getServerRequest(`/VdoCipher/${videoCipherPath}/otp`),
        enabled: !!videoCipherPath,
    });

    // Mutations
    const videoCommentsMutation = useMutation({
        mutationFn: (nodeId: number) => getServerRequest(`/VideoComment/${nodeId}/comments`),
    });

    const watchVideoMutation = useMutation({
        mutationFn: () => spcificPostServerRequest(`/MemberVideo/${videoId}/watch`),
        onSuccess: () => refetchMemberCoursePlayer(),
    });

    // Effects
    useEffect(() => {
        if (courseVideos?.data?.data?.video?.path) {
            setVideoCipherPath(courseVideos.data.data.video.path);
        } else if (courseVideos?.data?.data?.video === null) {
            setExamID(courseVideos?.data?.data.examId);
        }
    }, [courseVideos]);

    useEffect(() => {
        if (nodeType === 1) {
            console.log(videoId);
        }
    }, [nodeType, isSubmitted]);

    useEffect(() => {
        MemberCoursePlayer?.data?.data?.forEach((item: any) => {
            item.nodes.forEach((node: any) => {
                if (node.contentId === videoId) {
                    setNodeType(node.type);
                }
            });
        });
    }, [MemberCoursePlayer, videoNode]);

    useEffect(() => {
        const storedData = localStorage.getItem("courses");
        if (storedData) {
            const courses: Record<string, CourseData> = JSON.parse(storedData);
            const foundCourse = courses[slug];

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
    }, [slug]);

    useEffect(() => {
        if (vdocipherOTP?.data?.data?.otp) {
            setVdocipherConfig({
                otp: vdocipherOTP.data.data.otp,
                playbackInfo: vdocipherOTP.data.data.playbackInfo,
            });
        }
    }, [vdocipherOTP]);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            localStorage.setItem("lastVisitedURL", window.location.href);
            if (nodeType === 1) {
                event.preventDefault();
                event.returnValue = "";
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [nodeType]);

    useEffect(() => {
        const handlePopState = () => {
            const lastURL = localStorage.getItem("lastVisitedURL");
            if (lastURL) {
                router.push(lastURL);
            } else {
                window.history.back();
            }
        };

        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, [router]);

    useEffect(() => {
        if (isCourseLinksError) {
            removeCookie("userData", { path: "/", expires: new Date(0) });
            router.replace(`/${locale}`);
            localStorage.clear();
        }
    }, [isCourseLinksError]);

    useEffect(() => {
        if (lastVideoData) {
            setVideoNode(lastVideoData?.data?.data?.nodeId);
            setVideoName(locale === "ar" ? lastVideoData?.data?.data?.titleAr : lastVideoData?.data?.data?.titleEn);
            videoCommentsMutation.mutate(lastVideoData?.data?.data?.contentId);
        }
    }, [lastVideoData]);

    useEffect(() => {
        if (CourseDetails?.data?.data?.playerType === 2) {
            loadVdoCipherScript();
        }
    }, [CourseDetails, videoId, videoNode]);

    useEffect(() => {
        if (localStorage.getItem("diploma_route")) {
            setDiplomaRoute(localStorage.getItem("diploma_route"));
        }
    }, [slug]);

    // Helper functions
    const loadVdoCipherScript = () => {
        const scriptSrc = "https://player.vdocipher.com/v2/api.js";

        if (document.querySelector(`script[src="${scriptSrc}"]`)) {
            initializePlayer();
            return;
        }

        const script = document.createElement("script");
        script.src = scriptSrc;
        script.async = true;
        script.onload = () => initializePlayer();
        script.onerror = () => console.error("Failed to load VdoCipher script");
        document.body.appendChild(script);
    };

    const initializePlayer = () => {
        if (!iframeRef.current) {
            setTimeout(initializePlayer, 100);
            return;
        }

        const checkVdoPlayer = () => {
            if (typeof window.VdoPlayer === "undefined") {
                setTimeout(checkVdoPlayer, 100);
            } else {
                try {
                    const playerInstance = window.VdoPlayer.getInstance(iframeRef.current);
                    if (playerInstance.video) {
                        playerInstance.video.addEventListener("play", () => console.log("Video is playing"));

                        playerInstance.video.addEventListener("timeupdate", () => {
                            const currentTime = playerInstance.video.currentTime;
                            const duration = playerInstance.video.duration;
                            const progress = (currentTime / duration) * 100;

                            if (progress >= 80) {
                                handleProgress({
                                    playedSeconds: currentTime,
                                    played: currentTime / duration,
                                });
                            }

                            if (progress >= 100) {
                                handleVideoEnd();
                            }
                        });
                    }
                } catch (error) {
                    console.error("Error initializing VdoCipher:", error);
                }
            }
        };

        checkVdoPlayer();
    };

    const setupHlsPlayer = () => {
        if (!playerRef.current || !sourceRef.current) return;

        const video = playerRef.current;
        const videoSrc = videoLink.replace(".html", ".m3u8");

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play().catch(console.error);
            });

            hls.on(Hls.Events.FRAG_CHANGED, (event, data) => {
                const currentTime = video.currentTime;
                const duration = video.duration;
                handleProgress({
                    playedSeconds: currentTime,
                    played: currentTime / duration,
                });
            });

            hls.on(Hls.Events.ERROR, console.error);
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            sourceRef.current.src = videoSrc;
            video.load();
            video.addEventListener("loadedmetadata", () => {
                video.play().catch(console.error);
            });

            video.addEventListener("timeupdate", () => {
                const currentTime = video.currentTime;
                const duration = video.duration;
                handleProgress({
                    playedSeconds: currentTime,
                    played: currentTime / duration,
                });
            });
        }
    };

    // Event handlers
    const handleDuration = useCallback((duration: number) => {
        dispatch({ type: "SET_DURATION", payload: duration });
    }, []);

    const handleProgress = useCallback(
        (progress: { playedSeconds: number; played: number }) => {
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

            if (watchedPercentage >= WATCH_THRESHOLD_PERCENTAGE && !hasHandledProgress) {
                watchVideoMutation.mutate();
                setHasHandledProgress(true);
            }
        },
        [playbackState.duration, slug, locale, courseVideos, CourseDetails, hasHandledProgress],
    );

    const handleVideoEnd = useCallback(() => {
        if (!MemberCoursePlayer?.data?.data) return;

        const nodes = MemberCoursePlayer.data.data.flatMap((item: any) => item.nodes);
        const currentIndex = nodes.findIndex((node: any) => node.nodeId === videoNode);

        let nextNode;
        if (currentIndex !== -1 && currentIndex < nodes.length - 1) {
            nextNode = nodes[currentIndex + 1];
        } else {
            nextNode = nodes[0];
        }

        if (nextNode) {
            setVideoNode(nextNode.nodeId);
            setVideoName(locale === "ar" ? nextNode.titleAr : nextNode.titleEn);
            videoCommentsMutation.mutate(nextNode.contentId);
        }
    }, [MemberCoursePlayer, videoNode, locale]);

    const nextUnwatchedNode = useMemo(() => {
        if (!MemberCoursePlayer?.data?.data) return null;

        let lastWatchedIndex = -1;
        let lastWatchedNode = null;

        // Find last watched video
        MemberCoursePlayer.data.data.forEach((item: any, i: number) => {
            item.nodes.forEach((node: any) => {
                if (node.type === 0 && node.isWatched) {
                    lastWatchedIndex = i;
                    lastWatchedNode = node;
                }
            });
        });

        // If no videos watched, return first unwatched
        if (lastWatchedIndex === -1) {
            for (const item of MemberCoursePlayer.data.data) {
                const node = item.nodes.find((node: any) => node.type === 0 && !node.isWatched);
                if (node) {
                    setVideoID(node.contentId);
                    return node;
                }
            }
            return null;
        }

        // Find next unwatched after last watched
        for (let i = lastWatchedIndex; i < MemberCoursePlayer.data.data.length; i++) {
            const item = MemberCoursePlayer.data.data[i];
            const startIndex = i === lastWatchedIndex ? item.nodes.indexOf(lastWatchedNode) + 1 : 0;

            for (let j = startIndex; j < item.nodes.length; j++) {
                const node = item.nodes[j];
                if (node.type === 0 && !node.isWatched) {
                    setVideoID(node.contentId);
                    return node;
                }
            }
        }

        return MemberCoursePlayer.data.data[0]?.nodes[0] ?? null;
    }, [MemberCoursePlayer]);

    useEffect(() => {
        if (nextUnwatchedNode) {
            setVideoNode(nextUnwatchedNode.nodeId);
            setVideoName(locale === "ar" ? nextUnwatchedNode.titleAr : nextUnwatchedNode.titleEn);
            videoCommentsMutation.mutate(nextUnwatchedNode.contentId);
        }
    }, [nextUnwatchedNode, locale]);

    useEffect(() => {
        if (courseVideos?.data?.data?.video?.path) {
            CourseVideo(courseVideos.data.data.video.path);
        }
    }, [courseVideos]);

    useEffect(() => {
        if (CourseDetails?.data?.data?.playerType === 1) {
            setupHlsPlayer();
        }
    }, [CourseDetails, videoLink]);

    // Message event handlers
    useEffect(() => {
        const handleIframeEnd = (event: any) => {
            if (event.data.event_id === "publitio_video_ended") {
                handleVideoEnd();
            }
        };

        const handleIframeProgress = (event: any) => {
            if (event.data.event_id === "publitio_video_played") {
                const { currentTime, duration } = event.data;
                if (typeof currentTime === "number" && typeof duration === "number") {
                    handleProgress({
                        playedSeconds: currentTime,
                        played: currentTime / duration,
                    });
                }
            }
        };

        window.addEventListener("message", handleIframeEnd);
        window.addEventListener("message", handleIframeProgress);

        return () => {
            window.removeEventListener("message", handleIframeEnd);
            window.removeEventListener("message", handleIframeProgress);
        };
    }, [handleVideoEnd, handleProgress]);

    // UI helpers
    const startFromPercentage = (percentage: number) => {
        return (percentage / 100) * (lastVideoData?.duration || 0);
    };



    console.log(videoLink)

    // useEffect(() => {
    //     const handleBackButton = (event: PopStateEvent) => {
    //         event.preventDefault(); // منع الرجوع التلقائي
    //         const lastVisitedNode = sessionStorage.getItem("lastVisitedNode");

    //         if (lastVisitedNode) {
    //             setVideoNode(lastVisitedNode); // الرجوع للفيديو المحدد
    //             sessionStorage.removeItem("lastVisitedNode"); // تنظيف بعد الاستخدام
    //         } else {
    //             console.warn("No last visited node found!");
    //         }
    //     };

    //     window.addEventListener("popstate", handleBackButton);

    //     return () => {
    //         window.removeEventListener("popstate", handleBackButton);
    //     };
    // }, []);
    return (
        <>
            {nodeType === 1 && <div className="overlay"></div>}
            <CoursePlayerHeader nodeType={nodeType} theme={theme} toggleTheme={toggleTheme} diplomaRoute={diplomaRoute} storedCourse={storedCourse} />
            <section className={`course_player ${nodeType === 1 ? "exam_overlay" : ""}`}>
                <div className="course_player_video">
                    {nodeType === 0 ? (
                        <div className="course_player_video_seaction">
                            <RenderVideoTypes
                                otp={vdocipherConfig.otp}
                                playbackInfo={vdocipherConfig.playbackInfo}
                                playerRef={playerRef}
                                handleDuration={handleDuration}
                                handleProgress={handleProgress}
                                handleVideoEnd={handleVideoEnd}
                                startFromPercentage={startFromPercentage}
                                CourseDetails={CourseDetails}
                            />
                        </div>
                    ) : isLoadingExam ? (
                        <NewLoader loading={isLoadingExam} />
                    ) : (
                        <CourseExam examid={examId} />
                    )}

                    {nodeType !== 1 && (
                        <CoursePlayerTabs
                            linksRef={linksRef}
                            nodeType={nodeType}
                            isTablet={isTablet}
                            commentsRef={commentsRef}
                            CourseLinksData={CourseLinksData}
                            slug={slug}
                            CourseDetails={CourseDetails}
                            isLoadingMemberCoursePlayer={isLoadingMemberCoursePlayer}
                            MemberCoursePlayer={MemberCoursePlayer}
                            videoCommentsMutation={videoCommentsMutation}
                        />
                    )}
                </div>

                {isTablet && (
                    <CoursePlayerList
                        nodeType={nodeType}
                        CourseDetails={CourseDetails}
                        MemberCoursePlayer={MemberCoursePlayer}
                        videoCommentsMutation={videoCommentsMutation}
                        isLoadingMemberCoursePlayer={isLoadingMemberCoursePlayer}
                        course_list={course_list}
                        slug={slug}
                    />
                )}
            </section>
        </>
    );
}