import { create } from "zustand";

// Define the theme types
type Theme = "light" | "dark";

// Define the store's state and actions
interface StoreState {
    theme: Theme;
    toggleTheme: () => void;}

const useThemeProvider = create<StoreState>((set) => ({
    theme: "light",
    toggleTheme: () =>
        set((state) => ({
            theme: state.theme === "light" ? "dark" : "light",
        })),
}));

export default useThemeProvider;
