import React from "react";

const SingleAccordion = ({ show = false, id, title, desc }) => {
  return (
    <div className="accordion-item">
      <h3 className="accordion-header" id="headingOne">
        <button
          className={`accordion-button ${show ? "" : "collapsed"}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#question-${id}`}
          aria-expanded={show ? "true" : "false"}
        >
          <span style={{ textAlign: "start" }}>{title}</span>
        </button>
      </h3>

      <div
        id={`question-${id}`}
        className={`accordion-collapse collapse ${show ? "show" : ""}`}
        data-bs-parent="#faq-accordion"
      >
        <div className="accordion-body">
          <div className="course-lesson">
            <ul>
              {desc.map((list, i) => (
                <li key={i}>
                  {list.title && (
                    <div className="text d-flex align-items-center">
                      <i className="icon-65"></i>
                      {list.title}
                    </div>
                  )}
                  {!list?.badge_list && (
                    <div className="icon">
                      <i className={list?.icon}></i>
                    </div>
                  )}
                  {list?.badge_list && (
                    <div className="badge-list">
                      <span className="badge badge-primary">
                        {list?.question} Question
                      </span>
                      <span className="badge badge-secondary">
                        {list?.minutes} Minutes
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleAccordion;
