"use client";
import { Provider } from "react-redux";
import { store } from "../store";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
// if (typeof window !== "undefined") {
//   import("bootstrap/dist/js/bootstrap");
// }
export default function Client({ children }) {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
    // data-aos="fade-up" data-aos-delay="300"
    // data-sal="slide-up" we replace all sal to aos and all slide to fade
  }, []);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />{" "}
      <Provider store={store}>{children}</Provider>
    </>
  );
}
