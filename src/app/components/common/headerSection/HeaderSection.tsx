import { IHeaderSection } from "@/app/types/Types";
import React, { Fragment } from "react";

export default function HeaderSection({ subTitle, title, customClass, flip, campany_name, subTitle2, showDescription }: IHeaderSection) {
    return (
        <Fragment>
            {!flip && !showDescription && (
                <div className={`header_section f ac jc f-column ${customClass}`}>
                    <h2 >{title}</h2>
                    <span >{subTitle}</span>
                </div>
            )}
            {flip && (
                <div className={`header_section header_section_flip f ac jc f-column ${customClass}`}>
                    <h2 >
                        {title} <span>{campany_name}</span>
                    </h2>
                    <p className="p1" >{subTitle}</p>
                </div>
            )}
            {showDescription && (
                <div className={`header_section f ac jc f-column ${customClass}`}>
                    <span >{subTitle}</span>
                    <h2 >
                        {title} <span>{campany_name}</span>
                    </h2>
                    <p className="p1">{subTitle2}</p>
                </div>
            )}
        </Fragment>
    );
}
