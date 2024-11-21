"use client";
import React from "react";
import Counter from "@/layout/Counter";

const CounterUpArea = () => {
  return (
    <div className="pv-demo-counterup gap-top-equal">
      <div className="container">
        <div className="counterup-wrap">
          <div className="row">
            <div className="col-sm-4">
              <div className="edu-counterup counterup-style-1 ">
                <h2 className="counter-item count-number primary-color">
                  <span className="odometer">
                    <Counter number="8" text="+" />
                  </span>
                </h2>
                <span className="title"> مجموع ساعات التعلم</span>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="edu-counterup counterup-style-1 border-end">
                <h2 className="counter-item count-number secondary-color">
                  <span className="odometer">
                    <Counter number="11" text="+" />
                  </span>
                </h2>
                <span className="title">
                  إجمالي الامتحانات التي تم اجتيازها
                </span>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="edu-counterup counterup-style-1 border-end">
                <h2 className="counter-item count-number extra02-color">
                  <span className="odometer">
                    <Counter number="51" text="+" />
                  </span>
                </h2>
                <span className="title">إجمالي مقاطع الفيديو التي شاهدتها</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterUpArea;
