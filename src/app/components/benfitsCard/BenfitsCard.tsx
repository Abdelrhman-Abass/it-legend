import React from "react";

export default function BenfitsCard({ title, subTitle, index, customClass }: { title: string; subTitle: string; index: number; customClass?: string }) {
    return (
        <div className={`benfitsCard ${customClass}`}>
            <div className="benfitsCard_icon"></div>
            <div className="benfitsCard_content">
                <h3>{title}</h3>
                <p className="p1">{subTitle}</p>
            </div>
        </div>
    );
}
