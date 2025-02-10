"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import { useCookies } from "react-cookie";

export default function Menu() {
    const { locale } = useParams();
    const pathname = usePathname();
    const t = useTranslations();
    const [cookies] = useCookies(["userData"]);

    // Determine authentication status directly from cookies
    const isAuthenticated = !!cookies.userData;

    // Memoize MenuData and AuthMenuData to avoid unnecessary recalculations
    const MenuData = React.useMemo(
        () => [
            {
                id: 1,
                name: t("menu.home"),
                url: "/",
            },
            {
                id: 2,
                name: t("menu.learn_pathes"),
                url: "/learn_pathes",
            },
            {
                id: 3,
                name: t("menu.free_courses"),
                url: "/free_courses",
            },
            {
                id: 4,
                name: t("menu.courses"),
                url: "/courses",
            },
        ],
        [t],
    );

    const AuthMenuData = React.useMemo(
        () => [
            {
                id: 1,
                name: t("common.myDiplomas"),
                url: `/${locale}/learn-path#learn-path`,
            },
            {
                id: 2,
                name: t("common.myCourses"),
                url: `/${locale}/learn-path#my-courses`,
            },
        ],
        [t],
    );

   
    const menuItems = isAuthenticated ? AuthMenuData : MenuData;

    return (
        <div className="header-links f">
            {menuItems.map((item) => (
                <Link key={item.id} href={item.url} className={pathname.includes(`/${locale}${item.url}`) ? "active" : ""}>
                    {item.name}
                </Link>
            ))}
        </div>
    );
}
