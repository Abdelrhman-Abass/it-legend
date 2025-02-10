import { IStudentResult } from "@/app/types/Types";
import React, { useEffect, useState } from "react";
import Odometer from "react-odometerjs";

export default function StudentResult({ title, result, icon, showIcon, customClass }: IStudentResult) {
    const [value, setValue] = useState(0);
    useEffect(() => {
        const timeoutId = setTimeout(() => setValue(Number(result)), 1000);
        return () => {
            clearTimeout(timeoutId);
        };
    }, []);
    return (
        <div className={`student_result ${customClass}`} >
            {showIcon ? (
                <div className="student_result_icon">{icon}</div>
            ) : (
                <div className="student_result_count">
                    <Odometer value={value} format="(.ddd),dd" />
                    {/* <h3>{`+${result}`}</h3> */}
                </div>
            )}
            <div className="student_result_content">
                <h3>{title?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0}</h3>
                {showIcon && <span>{result}</span>}
            </div>
        </div>
    );
}
