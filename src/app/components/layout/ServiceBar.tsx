"use client";
import React from "react";
import { BsCart2 } from "react-icons/bs";
import { IoMoonOutline } from "react-icons/io5";
import LangSwither from "./LangSwither";
import Button from "../common/button/Button";
import { useTranslations } from "next-intl";
import { FaBars, FaRegUser } from "react-icons/fa";
import UseToggleMenu from "@/app/store/ToggleMenu";
import useThemeProvider from "@/app/store/ThemeProvider";
import { FiSun } from "react-icons/fi";
import { useCookies } from "react-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For navigation after logout
import { HiBars3BottomLeft } from "react-icons/hi2";

export default function ServiceBar() {
    const { toggleTheme, theme } = useThemeProvider();
    const { openMenu } = UseToggleMenu();
    const t = useTranslations();
    const [cookies, setCookie, removeCookie] = useCookies(["userDataRefresh", "userData","userDataEmail"]);
    const router = useRouter(); // For redirecting after logout

    const isAuthenticated = !!cookies.userDataRefresh;

    // Handle logout
    const handleLogout = () => {
        removeCookie("userData", { path: "/", expires: new Date(0) });
        removeCookie("userDataRefresh", { path: "/", expires: new Date(0) });
        removeCookie("userDataEmail", { path: "/", expires: new Date(0) });
        router.push("/auth");
    };

    return (
        <div className="header-service f ac">
            <div className="header-service-cart">
                <span className="ac jc">0</span>
                <BsCart2 />
            </div>
            <div className="header-service-mode" onClick={toggleTheme}>
                {theme === "dark" ? <FiSun style={{ color: "gold" }} /> : <IoMoonOutline />}
            </div>
            <LangSwither arText={"ع"} enText={"EN"}/>
            {!isAuthenticated && <Button title={t("common.login")} url="/auth" customClass="flip_icon" hideIcon />}
            {isAuthenticated && (
                <div className="user_menu">
                    <FaRegUser className="user_menu_icon" />
                    <div className="user_menu_list">
                        <Link href={"#"}>{t("common.myAccount")}</Link>
                        <Link href={"tel:+012 (345) 6789"} target="_blank">
                            {t("common.support")}
                        </Link>
                        <span onClick={handleLogout}>{t("common.logout")}</span>
                    </div>
                </div>
            )}
            <HiBars3BottomLeft className="toggle_bar" onClick={openMenu}/>
        </div>
    );
}
