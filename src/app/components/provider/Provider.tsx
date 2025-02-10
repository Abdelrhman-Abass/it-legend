"use client";
import React, { Fragment, use, useEffect, useState, useTransition } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import useThemeProvider from "@/app/store/ThemeProvider";
import GeneralScrollTop from "../common/generalScrollTop/GeneralScrollTop";
import { dehydrate, HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import NewLoader from "../common/newLoader/NewLoader";
import { useCookies } from "react-cookie";
import generalActivePopup from "@/app/store/ActivePopup";
import { MotionConfig } from "framer-motion";
// import GeneralPopup from "../common/generalPopup/GeneralPopup";
const GeneralPopup = React.lazy(() => import("../common/generalPopup/GeneralPopup"));
export default function Provider({ children }: { children: React.ReactNode }) {
    const { isActivePopup } = generalActivePopup();
    const [cookies] = useCookies(["userData"]);
    const { locale } = useParams();
    const pathname = usePathname();
    const router = useRouter();
    const { theme } = useThemeProvider();
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                    },
                },
            }),
    );
    const dehydratedState = dehydrate(queryClient);
    useEffect(() => {
        if (isActivePopup) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isActivePopup]);
    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={dehydratedState}>
                <Fragment>
                    <Navbar />
                    <main className={theme === "light" ? "light_theme" : "dark_theme"}>
                        <GeneralPopup isVideo={true} />
                        <Toaster position="top-right" reverseOrder={false} />
                        {children}
                        <GeneralScrollTop />
                    </main>
                </Fragment>
            </HydrationBoundary>
        </QueryClientProvider>
    );
}
