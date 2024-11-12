"use client";
import { cart_course } from "@/store/features/cart-slice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function PricingTable({
  title,
  delay,
  amount,
  sm_text,
  numStage,
  numCourse,
  amountBefore,
  isBest,
  id,
}) {
  const { cartCourses } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // handle add to cart
  const handleAddToCart = () => {
    dispatch(
      cart_course({
        id,
        img: `/assets/images/course/course-06/course-01.jpg`,
        price: amount,
        title,
      })
    );
  };
  return (
    <div
      className="col-lg-4"
      data-aos-delay={delay}
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div className="pricing-table">
        <div className="pricing-header">
          <h6 className="title">{title}</h6>
          <div className="price-wrap">
            <span className="amount">${amount}</span>
            <span
              className="duration"
              style={{
                textDecoration: "line-through",
                textDecorationColor: "red",
              }}
            >
              ${amountBefore}
            </span>
          </div>
          <p style={{ marginBottom: 4 }}>نسبة توفير 30%</p>
          <p>{sm_text}</p>
        </div>

        <div className="pricing-body">
          <ul className="list-item">
            <li>
              <i className="icon-20"></i>عدد المراحل : {numStage}
            </li>
            <li>
              <i className="icon-20"></i>عدد الكورسات : {numCourse}
            </li>
            <li className={`${!isBest ? "item-off" : ""}`}>
              <i className="icon-20"></i> الأعلى قيمة، الأفضل سعراً.
            </li>
          </ul>
        </div>

        <div className="pricing-btn">
          <a
            style={{ cursor: "pointer" }}
            onClick={handleAddToCart}
            className="edu-btn btn-border btn-medium"
            href="/en/cart"
          >
            {cartCourses.some((item) => item.id == id)
              ? "حذف من السلة"
              : " طلب الاشتراك "}

            <i className="icon-east"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

const PricingArea = () => {
  return (
    <div className="edu-section-gap">
      <div className="container">
        <div
          className="section-title section-center"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <span className="pre-title"> الباكدجات</span>
          <h2 className="title">خطط الدبلومة</h2>
          <span className="shape-line">
            <i className="icon-19"></i>
          </span>
        </div>

        <div className="row g-5">
          <PricingTable
            id={10130}
            delay="100"
            title="الخطة الأولي"
            amount="29"
            amountBefore="34"
            numStage={1}
            numCourse={7}
            sm_text="هذه الخطة مخصصة اذا كنت تريد تعلم الاساسيات فقط."
          />

          <PricingTable
            id={10100}
            delay="200"
            title="الخطة الثانية"
            amount="49"
            amountBefore="54"
            numStage={2}
            numCourse={12}
            sm_text="هذه الخطة تناسبك لتطوير مهاراتك بشكل أكبر واشمل ومتقدم."
          />

          <PricingTable
            id={130}
            delay="300"
            title="الخطة الثالثة"
            amount="69"
            amountBefore="74"
            numStage={3}
            numCourse={15}
            sm_text="هذه الخطة شاملة وتقدم كل ما تحتاجه للتميز وبدأ مزول سوق العمل."
            isBest={true}
          />
        </div>
      </div>
    </div>
  );
};

export default PricingArea;
