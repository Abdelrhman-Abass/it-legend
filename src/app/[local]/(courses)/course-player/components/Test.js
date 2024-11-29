import React from "react";
import CourseModules from "./CourseModules";

const Test = ({
    testData
}) => {


    console.log("from accordion : " + testData)
    return (
        <div className="accordion edu-accordion" id="accordionExample">
            {/* {testData.map((item, index) => (
                <div className="accordion-item" key={index}>
                    <h3 className="accordion-header" id="headingOne">
                        <button
                            className={`accordion-button ${show ? "" : "collapsed"}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#module-${item.moduleId}`}
                            aria-expanded={show ? "true" : "false"}
                        >
                            <span style={{ textAlign: "start" }}>
                                {item.moduleTitleAr}
                            </span>
                        </button>
                    </h3>
                </div>
            ))} */}
        </div>
    );
};

export default Test;
