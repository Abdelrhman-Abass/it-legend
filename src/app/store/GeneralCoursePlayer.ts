import { create } from "zustand";

interface StoreState {
    videoNode: string;
    videoLink: string;
    videoName: string;
    videoId: string;
    prevNode:string;
    nextNode:any;
    lastVideoData: any;
    setVideoNode: (id: string) => void;
    setPrevNode: (id: string) => void;
    setNextNode: (data: any) => void;
    CourseVideo: (id: string) => void;
    setVideoName: (title: string) => void;
    setVideoID: (id: string) => void;
    setLastVideoData: (data: any) => void;
}

const GenralCoursePlayerId = create<StoreState>((set) => ({
    videoNode: "",
    videoLink: "",
    videoName: "",
    videoId: "",
    prevNode:"",
    nextNode:null,
    lastVideoData: null,
    setVideoNode: (id: string) =>
        set(() => ({
            videoNode: id,
        })),
    setPrevNode: (id: string) =>
        set(() => ({
            prevNode: id,
        })),
    setNextNode: (data: any) =>
        set(() => ({
            nextNode: data,
        })),
    CourseVideo: (link: string) =>
        set(() => ({
            videoLink: link,
        })),
    setVideoName: (link: string) =>
        set(() => ({
            videoName: link,
        })),
    setVideoID: (id: string) =>
        set(() => ({
            videoId: id,
        })),
    setLastVideoData: (data: any) =>
        set(() => ({
            lastVideoData: data,
        })),
}));

export default GenralCoursePlayerId;
