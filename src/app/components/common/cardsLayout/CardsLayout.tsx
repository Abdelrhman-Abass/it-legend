"use client";
import GridToggle from "@/app/store/GridToggle";
import React from "react";
import { FaBars } from "react-icons/fa";
import { TbGridDots } from "react-icons/tb";

export default function CardsLayout() {
    const { activeGrid, activeLine, type } = GridToggle();
    return (
        <div className="cards_layout f ac">
            <div   className={`cards_layout_icon f ac jc ${type === "grid" ? "active" : ""}`} onClick={activeGrid}>
                <TbGridDots />
            </div>
            <div   className={`cards_layout_icon f ac jc ${type === "line" ? "active" : ""}`} onClick={activeLine}>
                <FaBars />
            </div>
        </div>
    );
}
