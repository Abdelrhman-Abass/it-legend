import { create } from "zustand";
interface StoreState {
    isActivePopup: boolean;
    extraData: any;
    openPopup: () => void;
    closePopup: () => void;
    setExtraData: (data: any) => void;
}

const generalActivePopup = create<StoreState>((set) => ({
    isActivePopup: false,
    extraData: null,
    openPopup: () => set({ isActivePopup: true }),
    closePopup: () => set({ isActivePopup: false , extraData: null }),
    setExtraData: (data: any) => set({ extraData: data }),
}));

export default generalActivePopup;
