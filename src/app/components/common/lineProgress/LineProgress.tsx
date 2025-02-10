import { ILineProgress } from "@/app/types/Types";
import { Progress } from "antd";
import { useParams } from "next/navigation";
import React from "react";

export default function LineProgress({ title, percent }: ILineProgress) {
    const {locale} =useParams()
    return (
        <div className="line_progress">
            <div className="line_progress_marker f ac jc" style={{ left :locale =="en" ?`${percent - 2}%`:"unset", right:locale =="ar" ?`${percent - 2}%`:"unset"}}>
                <span>You</span>
            </div>
            <h2>{title}</h2>
            <Progress percent={percent} style={{ width: "100%" }} percentPosition={{ align: 'start', type: 'outer' }} size={[0, 10]} status="active" strokeColor={{ from: '#108ee9', to: '#87d068' }} />
        </div>
    );
}
