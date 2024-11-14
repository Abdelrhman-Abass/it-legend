import { useState } from 'react';

const SingleAccordion = ({ show, id, title, desc }) => {
  const [isOpen, setIsOpen] = useState(show);

  return (
    <div className="accordion-item">
      <h3 className="accordion-header">
        <button
          className={`accordion-button ${!isOpen ? 'collapsed' : ''}`}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          {title}
        </button>
      </h3>
      <div
        className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
      >
        <div className="accordion-body">
          <ul className="course-item">
            {desc.map((item, i) => (
              <li key={i}>
                {item.badge_list ? (
                  <div className="course-item-link">
                    <span>{item.title}</span>
                    <div className="course-item-meta">
                      {item.question > 0 && <span>{item.question} Questions</span>}
                      {item.minutes > 0 && <span>{item.minutes} Minutes</span>}
                    </div>
                  </div>
                ) : (
                  <div className="course-item-link">
                    <i className={item.icon}></i>
                    <span>{item.title}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleAccordion;
