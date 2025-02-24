import { create } from "zustand";
interface StoreState {
    isActivePopup: boolean;
    extraData: any;
    activeSuccess:boolean;
    success:boolean;
    activeDatesPopup:boolean;
    openPopup: () => void;
    openActiveDatePopup: () => void;
    closeActiveDatePopup: () => void;
    setSuccess: () => void;
    closePopup: () => void;
    openSucPopup: () => void;
    closeSucPopup: () => void;
    setExtraData: (data: any) => void;
}

const generalActivePopup = create<StoreState>((set) => ({
    isActivePopup: false,
    extraData: null,
    activeSuccess:false,
    success:false,
    activeDatesPopup:false,
    setSuccess: () => set({ success: true }),
    openActiveDatePopup: () => set({ activeDatesPopup: true }),
    openPopup: () => set({ isActivePopup: true }),
    closeActiveDatePopup: () => set({ activeDatesPopup: false , extraData: null }),
    closePopup: () => set({ isActivePopup: false , extraData: null }),
    openSucPopup: () => set({ activeSuccess: true }),
    closeSucPopup: () => set({ activeSuccess: false , extraData: null }),
    setExtraData: (data: any) => set({ extraData: data }),
}));

export default generalActivePopup;
