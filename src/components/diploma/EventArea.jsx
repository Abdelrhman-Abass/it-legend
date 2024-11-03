"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { useMouseMoveUI } from "@/contexts/mouse-move-context";
import { event_data } from "@/data";
import EventItem from "../event-grid/event-item";

const EventArea = ({ event_2 }) => {
  const { mouseDirection, mouseReverse } = useMouseMoveUI();
  return (
    <div
      className={`edu-event-area ${
        event_2 ? "event-area-2" : "event-area-1 gap-large-text"
      }`}
    >
      <div className="container edublink-animated-shape">
        <div
          className="section-title section-center"
          data-aos-delay="150"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <span className="pre-title">المراحل</span>
          <h2 className="title">تنقسم الدبلومة الي 3 مراحل</h2>
          <span className="shape-line">
            <i className="icon-19"></i>
          </span>
        </div>

        <div className="row g-5">
          {event_data.slice(0, 3).map((event) => {
            const { delay, id } = event;
            return (
              <div
                key={id}
                className="col-lg-4 col-md-6 stage"
                data-aos-delay={delay}
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <div className="edu-event event-style-1">
                  <EventItem item={event} />
                </div>
              </div>
            );
          })}
        </div>

        <ul className="shape-group">
          <li
            className="shape-1"
            data-aos-delay="500"
            data-aos="fade"
            data-aos-duration="200"
          >
            <img
              className="rotateit"
              src="/assets/images/about/shape-13.png"
              alt="Shape"
            />
          </li>
          <motion.li
            className="shape-2 scene"
            data-aos-delay="500"
            data-aos="fade"
            data-aos-duration="200"
            animate={{
              x: mouseReverse(30).x,
              y: mouseReverse(30).y,
            }}
          >
            <span></span>
          </motion.li>
        </ul>
      </div>
    </div>
  );
};

export default EventArea;
