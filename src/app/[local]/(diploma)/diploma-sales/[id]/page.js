'use server';

import AboutArea from "@/components/diploma/AboutArea";
import BlogMasonryArea from "@/components/diploma/BlogMasonryArea";
import BrandArea from "@/components/diploma/BrandArea";
import PricingArea from "@/components/diploma/PricingArea";
import SalesFaqArea from "@/components/diploma/SalesFaqArea";
import Testimonial from "@/components/diploma/Testimonial";
import VideoArea from "@/layout/Video";
import CountDown from "../../components/CountDown";
import DiplomaCourses from "../../components/DiplomaCourses";
import { UserHeader } from "@/layout";

const data = {
  pre_title: "المميزات",
  title: "مميزات الدبلومة",
  text: "نوفر لك كل طرق التواصل معنا لكي تحظي بفرصه تعلم مميزة وفريدة من نوعها.",
  brands: [
    "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    "https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg",
    "https://upload.wikimedia.org/wikipedia/commons/0/0a/MySQL_textlogo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg",
    "https://raw.githubusercontent.com/dnfield/flutter_svg/7d374d7107561cbd906d7c0ca26fef02cc01e7c8/example/assets/flutter_logo.svg?sanitize=true",
    "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Sql_data_base_with_logo.svg/640px-Sql_data_base_with_logo.svg.png",
  ],
};

// Change to a named export and remove any potential layout wrapping
export default async function DiplomaPage() {
  return (
    <div className="diploma-sales-page">
      <UserHeader />
      <CountDown />
      <VideoArea />
      <BrandArea data={data} />
      <BlogMasonryArea />
      <AboutArea isInstructor={true} />
      <div
        style={{ margin: "-20px" }}
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
      <DiplomaCourses />
      <Testimonial about_p_2={true} />
      <PricingArea />
      <SalesFaqArea />
    </div>
  );
}