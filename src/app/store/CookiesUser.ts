import { create } from "zustand";
import { useCookies } from "react-cookie";

interface UserData {
    name: string;
    age: number;
}

interface StoreState {
    userData: UserData | null;
    setUserData: (data: UserData) => void;
    clearUserData: () => void;
    hasUserData: () => boolean;
}

const GeneralCheckCookies = create<StoreState>((set, get) => ({
    userData: null,

    setUserData: (data: UserData) => {
        set(() => {
            const [cookies, setCookie] = useCookies(["userData"]);
            setCookie("userData", JSON.stringify(data), { path: "/", maxAge: 7 * 24 * 60 * 60 }); // 7 days
            return { userData: data };
        });
    },

    clearUserData: () => {
        set(() => {
            const [, , removeCookie] = useCookies(["userData"]);
            removeCookie("userData", { path: "/" });
            return { userData: null };
        });
    },

    hasUserData: () => {
        const [cookies] = useCookies(["userData"]);
        return !!cookies.userData;
    },
}));

export default GeneralCheckCookies;
