// import { create } from "zustand";

// interface StoreState {
//     isActivePopup: boolean;
//     extraData: any;
//     activeSuccess: boolean;
//     success: boolean;
//     activeDatesPopup: boolean;
//     activeWarningPopup: boolean;
//     closeWarningPopup: boolean;
//     askquestionPopup: boolean; // New boolean
//     openPopup: () => void;
//     openActiveDatePopup: () => void;
//     closeActiveDatePopup: () => void;
//     openWarningClosePop: () => void;
//     closeWarningClosePop: () => void;
//     setSuccess: () => void;
//     closePopup: () => void;
//     openSucPopup: () => void;
//     closeSucPopup: () => void;
//     setExtraData: (data: any) => void;
//     openQuestion: () => void; // New function
//     closeQuestion: () => void; // New function
// }

// const generalActivePopup = create<StoreState>((set) => ({
//     isActivePopup: false,
//     extraData: null,
//     activeSuccess: false,
//     success: false,
//     activeDatesPopup: false,
//     activeWarningPopup: false,
//     closeWarningPopup: false,
//     askquestionPopup: false, // New boolean
//     setSuccess: () => set({ success: true }),
//     openActiveDatePopup: () => set({ activeDatesPopup: true }),
//     openWarningClosePop: () => set({ activeWarningPopup: true }),
//     closeWarningClosePop: () => set({ closeWarningPopup: true }),
//     openPopup: () => set({ isActivePopup: true }),
//     closeActiveDatePopup: () => set({ activeDatesPopup: false, extraData: null }),
//     closePopup: () => set({ isActivePopup: false, extraData: null }),
//     openSucPopup: () => set({ activeSuccess: true }),
//     closeSucPopup: () => set({ activeSuccess: false, extraData: null }),
//     setExtraData: (data: any) => set({ extraData: data }),
//     openQuestion: () => set({ askquestionPopup: true }), // New function
//     closeQuestion: () => set({ askquestionPopup: false }), // New function
// }));

// export default generalActivePopup;


import { create } from "zustand";

interface StoreState {
    isActivePopup: boolean;
    extraData: any;
    activeSuccess: boolean;
    success: boolean;
    activeDatesPopup: boolean;
    activeWarningPopup: boolean;
    answerReasonPop:boolean;
    closeWarningPopup: boolean;
    countDownPopup: boolean; // New boolean
    askquestionPopup: boolean; // New boolean
    leaderBoard: boolean; // New boolean
    openPopup: () => void;
    openActiveDatePopup: () => void;
    openAnswerReasonPop: () => void;
    closeAnswerReasonPop: () => void;
    closeActiveDatePopup: () => void;
    openWarningClosePop: () => void;
    closeWarningClosePop: () => void;
    openCountDownPopup: () => void;
    closeCountDownPopup: () => void;
    setSuccess: (sucsess:boolean) => void;
    closePopup: () => void;
    openSucPopup: () => void;
    closeSucPopup: () => void;
    setExtraData: (data: any) => void;
    openQuestion: () => void; // New function
    closeQuestion: () => void; // New function
    activeLeaderBoard: () => void; // New function
    closeActiveBoard: () => void; // New function
}

const generalActivePopup = create<StoreState>((set) => ({
    isActivePopup: false,
    extraData: null,
    activeSuccess: false,
    success: false,
    activeDatesPopup: false,
    activeWarningPopup: false,
    closeWarningPopup: false,
    answerReasonPop:false,
    countDownPopup: false, // New boolean
    askquestionPopup: false, // New boolean
    leaderBoard: false, // New boolean
    setSuccess: (sucsess :boolean) => set({ success: sucsess }),
    openActiveDatePopup: () => set({ activeDatesPopup: true }),
    openWarningClosePop: () => set({ activeWarningPopup: true }),
    openAnswerReasonPop: () => set({ answerReasonPop: true }),
    closeAnswerReasonPop: () => set({ answerReasonPop: false }),
    closeWarningClosePop: () => set({ closeWarningPopup: false }),
    openCountDownPopup: () => set({ countDownPopup: true }),
    closeCountDownPopup: () => set({ countDownPopup: false }),
    openPopup: () => set({ isActivePopup: true }),
    closeActiveDatePopup: () => set({ activeDatesPopup: false, extraData: null }),
    closePopup: () => set({ isActivePopup: false, extraData: null }),
    openSucPopup: () => set({ activeSuccess: true }),
    closeSucPopup: () => set({ activeSuccess: false, extraData: null }),
    setExtraData: (data: any) => set({ extraData: data }),
    openQuestion: () => set({ askquestionPopup: true }), // New function
    closeQuestion: () => set({ askquestionPopup: false }), // New function
    activeLeaderBoard: () => set({ leaderBoard: true }), // New function
    closeActiveBoard: () => set({ leaderBoard: false }), // New function
}));

export default generalActivePopup;