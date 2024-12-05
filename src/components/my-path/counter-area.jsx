import React from "react";
import Counter from "@/layout/Counter";

const static_counter_data = [
  {
    color: "primary-color",
    count: 29.3,
    icon: "48",
    // text: "K",
    title: "مجموع الدرجات",
    decimal: 1,
  },
  {
    color: "secondary-color",
    count: 7,
    icon: "47",
    // text: "K",
    title: "المستوي",
    decimal: 1,
  },
  {
    color: "extra08-color",
    count: 100,
    icon: "2",
    // text: "%",
    title: "التحدي اليومي",
  },
  {
    color: "extra05-color",
    count: 354,
    icon: "50",
    // text: "%",
    title: "التقيم الحالي",
  },
];

const CounterArea = ({ about_p_3 , my=false , codeChallenges ,level , score}) => {

  const dynamic_counter_data = [
    score && {
      color: "primary-color",
      count: score,
      icon: "7",
      title: "مجموع الدرجات",
    },
    level && {
      color: "secondary-color",
      count: level,
      icon: "6",
      title: "المستوي",
    },
    codeChallenges && {
      color: "extra08-color",
      count: codeChallenges,
      icon: "34",
      title: "التحدي اليومي",
    },
    {
      color: "extra05-color",
      count: 354,
      icon: "50",
      // text: "%",
      title: "التقيم الحالي",
    },
  ].filter(Boolean); // Remove undefined entries

  const counter_data = my == true ? dynamic_counter_data : static_counter_data;


  return (
    <div
      className={`${
        about_p_3 ? "counterup-area-9" : "counterup-area-8 gap-lg-bottom-equal"
      }`}
    >
      <div
        className={`container ${about_p_3 ? "edublink-animated-shape" : ""}`}
      >
        <div className="row g-5">
          {counter_data.map((c, i) => {
            const { color, count, text, title, icon } = c;
            return (
              <div
                key={i}
                className="col-lg-3 col-6 col-sm-6"
                data-aos-delay="150"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <div className="edu-counterup counterup-style-4">
                  <div className={`icon ${color}`}>
                    <i className={`icon-${icon}`}></i>
                  </div>
                  <h2 className="counter-item count-number">
                    <span className="odometer">
                      <Counter
                        number={parseFloat(count)}
                        text={text}
                        decimal={c.decimal}
                      />
                    </span>
                  </h2>
                  <h6 className="title">{title}</h6>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ul className="shape-group">
        <li
          className={`shape-1 ${about_p_3 ? "scene" : ""}`}
          data-aos-delay="500"
          data-aos="fade"
          data-aos-duration="200"
        >
          <img
            src={`/assets/images/others/${
              about_p_3 ? "shape-27.png" : "map-shape-3.png"
            }`}
            alt="Shape"
          />
        </li>
      </ul>
    </div>
  );
};

export default CounterArea;
