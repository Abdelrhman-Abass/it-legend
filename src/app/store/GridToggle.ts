import { create } from "zustand";

// Define the store's state and actions
interface StoreState {
    type: string;
    activeGrid: () => void;
    activeLine: () => void;
}

const GridToggle = create<StoreState>((set) => ({
    type: "grid",
    activeGrid: () =>
        set(() => ({
            type: "grid",
        })),
    activeLine: () =>
        set(() => ({
            type: "line",
        })),
}));

export default GridToggle;
