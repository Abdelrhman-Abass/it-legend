"use client";
import React, { useState } from "react";
import Select from "react-select";

export default function WrapperSelect() {
    const colourOptions = [
        { value: "all", label: "All" },
        { value: "ocean", label: "Ocean" },
        { value: "blue", label: "Blue" },
    ];
    return (
        <div   className="wrapper_select">
            <Select
                className="basic-single"
                classNamePrefix="select"
                name="color"
                isSearchable={false}
                options={colourOptions}
                // defaultInputValue={"all"}
                styles={{
                    container: (baseStyles) => ({
                        ...baseStyles,
                    }),

                    indicatorSeparator: (baseStyles) => ({
                        ...baseStyles,
                        display: "none",
                    }),
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        "borderRadius": "0.2em",
                        "background": "white",
                        "border": "2px solid rgba(0, 0, 0, 0.2)",
                        "boxShadow": state.isFocused ? "none" : "none",
                        "height": "2.5em",
                        "width": "15em",
                        "&:hover": {
                            border: "2px solid rgba(0, 0, 0, 0.2)",
                        },
                    }),
                    menu: (baseStyles) => ({
                        ...baseStyles,
                        borderRadius: "0.5em",
                        background: "white",
                        zIndex: 10,
                    }),
                }}
            />
        </div>
    );
}
