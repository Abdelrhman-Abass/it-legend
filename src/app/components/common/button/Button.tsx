"use client";
import { IButton } from "@/app/types/Types";
import React, { memo } from "react";
import { IoArrowForward } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { RiLoader5Fill } from "react-icons/ri";

// Memoizing the component to avoid unnecessary re-renders
const Button = memo(({courseTitle, title, url = "#", red = false, blank = false, white = false, customIcon = null, customClass = "", isLoading = false, hideIcon }: IButton) => {
    const router = useRouter();
    const handleClick = () => {
        if (url) {
            if (blank) {
                window.open(url, "_blank");
            } else {
                scrollTo({ top: 0, behavior: "smooth" });
                localStorage.setItem("course_title", courseTitle || "");
                router.push(url, { scroll: false });
            }
        }
    };

    return (
        <div className={`custom_btn ${customClass} ${red ? "red" : ""} ${white ? "white" : ""}`} onClick={handleClick}>
            <button className="f ac jc">
                <span>{title}</span>
                {isLoading ? <RiLoader5Fill className="loader_icon" /> : !hideIcon ? customIcon || <IoArrowForward /> : ""}
            </button>
        </div>
    );
});

export default Button;
