"use client";
import useThemeProvider from "@/app/store/ThemeProvider";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCookies } from "react-cookie";
import React from "react";

const Logo = React.memo(() => {
    const [cookies] = useCookies(["userData"]);
    const { locale } = useParams() || {}; // Fallback for locale if undefined
    const { theme } = useThemeProvider();

    // Determine the logo path based on the theme
    const logoPath = theme === "light" && locale === "ar" ? "/assets/images/Logo-normal-ar.png" :theme === "light" && locale === "en"? "/assets/images/Logo-normal-en.png":theme != "light" && locale === "ar"?"/assets/images/Logo-normal-dark-ar.png":"/assets/images/Logo-normal-dark-en.png";
    const href = !!cookies.userData ? `/${locale}/learn-path` : `/${locale}`;
    return (
        <Link href={href} className="header-logo relative">
            <Image src={logoPath} alt="logo" fill priority />
        </Link>
    );
});

export default Logo;
