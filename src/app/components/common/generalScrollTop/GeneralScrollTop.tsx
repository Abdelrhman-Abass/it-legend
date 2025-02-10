"use client";
import React, { useState, useEffect, useRef } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";

export default function GeneralScrollTop() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (scrollTop / docHeight) * 100;
            setScrollProgress(progress);
            if (window.scrollY > 0) {
                scrollRef.current?.classList.add("active");
            } else {
                scrollRef.current?.classList.remove("active");
            }
        };

        window.addEventListener("scroll", updateScrollProgress);
        return () => window.removeEventListener("scroll", updateScrollProgress);
    }, [scrollRef]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <div className="general_scroll_top" onClick={scrollToTop} ref={scrollRef}>
            <svg width="50" height="50" viewBox="0 0 36 36">
                <path
                    d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#ddd"
                    strokeWidth="2"
                />
                <path
                    className="progress"
                    d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#f00"
                    strokeWidth="2"
                    strokeDasharray={`${scrollProgress}, 100`}
                />
            </svg>
            <MdKeyboardArrowUp className="scroll_top_icon" />
        </div>
    );
}
