import { create } from "zustand";

interface StoreState {
    isLoginActive: boolean;
    toggleFlip: () => void;
}

const AuthFormFlip = create<StoreState>((set) => ({
    isLoginActive: true,
    toggleFlip: () =>
        set((state) => ({
            isLoginActive: !state.isLoginActive,
        })),
}));

export default AuthFormFlip;
