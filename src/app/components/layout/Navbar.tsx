"use client";
import React, { useEffect } from "react";
import Logo from "./Logo";
import Menu from "./Menu";
import ServiceBar from "./ServiceBar";
import MobileMenu from "./MobileMenu";
import useThemeProvider from "@/app/store/ThemeProvider";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
const Navbar = React.memo(() => {
    const { theme } = useThemeProvider();
    const pathname = usePathname() || ""; // Fallback in case pathname is undefined
    const navRef = React.useRef<HTMLElement>(null);

    // useEffect(() => {
    //     navRef.current?.style.setProperty("transform", `translateY(${0}px)`);
    // }, []);
    return (
        !pathname.includes("course-player") && (
            <motion.header
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`header p-lg jb f ac ${pathname.includes("course-player") ? "header_player" : ""} ${theme === "light" ? "light_theme" : "dark_theme"}`}
                ref={navRef}>
                <div className="header-right-container f ac">
                    <Logo />
                </div>
                <Menu />
                <ServiceBar />
                <MobileMenu />
            </motion.header>
        )
    );
});

export default Navbar;
