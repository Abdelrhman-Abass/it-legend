"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "@/navigation";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const SwitchThemeButton = () => {
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (!theme) {
            setTheme("light");
        }

        setIsMounted(true);

        // Get user ID from cookies
        const cookies = document.cookie.split("; ");
        const userIdCookie = cookies.find((cookie) =>
            cookie.startsWith("user_id=")
        );
        if (userIdCookie) {
            setUserId(userIdCookie.split("=")[1]);
        }
    }, [theme, setTheme]);

    const handleLogout = () => {
        document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setUserId(null);
        router.push("/");
    };

    if (!isMounted) return null;

    return (
        <button
            className="inline-flex items-center justify-center p-2 rounded-lg transition-colors hover:text-gray-900 dark:hover:text-white bg-transparent border-none focus:outline-none"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}            
        >
            {theme === "light" ? (
                <Moon
                    strokeWidth={2}
                    size={28}
                    className="cursor-pointer text-gray-800"
                />
            ) : (
                <Sun
                    strokeWidth={2}
                    size={32}
                    className="cursor-pointer text-yellow-400"
                />
            )}
        </button>

    );
};

export default SwitchThemeButton;
