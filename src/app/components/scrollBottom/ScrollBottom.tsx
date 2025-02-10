import React from "react";
import { GoArrowDown } from "react-icons/go";

export default function ScrollBottom({scrollToEleRef}:any) {
    return (
        <div className="scroll_bottom" onClick={()=>scrollToEleRef.current.scrollIntoView({behavior:"smooth"})}>
            <GoArrowDown />
        </div>
    );
}
