import { create } from "zustand";

// Define the store's state and actions
interface StoreState {
    isActiveMenu: boolean;
    openMenu: () => void;
    closeMenu: () => void;
}

const UseToggleMenu = create<StoreState>((set) => ({
    isActiveMenu: false,
    openMenu: () =>
        set(() => ({
            isActiveMenu: true,
        })),
    closeMenu: () =>
        set(() => ({
            isActiveMenu: false,
        })),
}));

export default UseToggleMenu;
