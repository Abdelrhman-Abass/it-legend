import React from "react";
import Counter from "@/layout/Counter";
import { useTranslations } from "next-intl";

const counter_data = [
  {
    color: "primary-color",
    delay: "50",
    count: 15,
    text: "year",
    title: "field",
    // decimal: 1,
  },
  {
    color: "secondary-color",
    delay: "100",
    count: 30,
    text: "k",
    title: "student",
    // decimal: 1,
  },
  {
    color: "extra02-color",
    delay: "150",
    count: 5,
    text: "years",
    title: "experience",
  },
  {
    color: "extra05-color",
    delay: "200",
    count: 3,
    text: "years",
    title: "psychology",
  },
];

const CounterArea = ({ home_3 = false, home_8 = false }) => {
  const t = useTranslations("home.counterArea");

  return (
    <div
      className={`${
        home_3
          ? "counterup-area-1 gap-lg-bottom-equal"
          : home_8
          ? "counterup-area-3 gap-bottom-equal"
          : "counterup-area-5 edu-section-gap"
      }`}
    >
      <div className="container">
        <div className="row g-5">
          {counter_data.map((c, i) => (
            <div
              key={i}
              className="col-6 col-lg-3 col-sm-6"
              data-aos-delay={c.delay}
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <div
                className={`edu-counterup counterup-style-${
                  home_3 ? "1" : "5"
                } ${!home_3 && c.color}`}
              >
                <h2
                  className={`counter-item count-number ${home_3 && c.color}`}
                >
                  <span className="odometer">
                    <Counter
                      number={parseFloat(c.count)}
                      text={t(c.text)}
                      decimal={c.decimal}
                    />
                  </span>
                </h2>
                <h6 className="title">{t(c.title)}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CounterArea;
