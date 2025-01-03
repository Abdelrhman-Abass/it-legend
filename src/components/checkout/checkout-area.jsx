"use client";
import React from "react";
import { useState } from "react";
import OrderPayment from "./order-payment";
import OrderSummery from "./order-summery";

const countries = [
  "Select Option",
  "Australia",
  "England",
  "New Zealand",
  "Switzerland",
  "United Kindom (UK)",
  "United States (USA)",
];

const CheckoutArea = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="checkout-page-area section-gap-equal">
      <div className="container">
        <form>
          {/* <div className="checkout-notice">
            <div className="coupn-box">
              <h6 className="toggle-bar">
                {" "}
                Have a coupon?
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsOpen(!isOpen)}
                  className="toggle-btn"
                >
                  Click here to enter your code
                </a>
              </h6>
              {isOpen && (
                <div className="toggle-open">
                  <p>If you have a coupon code, please apply it below.</p>
                  <div className="input-group">
                    <input placeholder="Enter coupon code" type="text" />
                    <div className="apply-btn">
                      <button type="submit" className="edu-btn btn-medium">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div> */}

          <div className="row row--25">
            <div className="col-lg-6">
              <div className="checkout-billing">
                <h3 className="title">التفاصيل</h3>
                <div className="row g-lg-5">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>الاسم الاول*</label>
                      <input type="text" id="first-name" />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>الاسم الاخير*</label>
                      <input type="text" id="last-name" />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>اسم الشركة</label>
                  <input type="text" id="company-name" />
                </div>

                <div className="form-group">
                  <label>البريد الالكتروني*</label>
                  <input type="email" id="email" />
                </div>

                <div className="row g-lg-5">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>رقم الهاتف*</label>
                      <input type="tel" id="phone" />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>المدينة*</label>
                      <select id="country">
                        {countries.map((country, i) => (
                          <option key={i}>{country}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>العنوان*</label>
                  <input type="text" id="address1" />
                </div>

                <div className="form-group">
                  <label>المدينة*</label>
                  <input type="text" id="town" />
                </div>

                <div className="row g-lg-5">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>الحي*</label>
                      <select id="state">
                        {countries.map((country, i) => (
                          <option key={i}>{country}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>الرمز الريدي*</label>
                      <input type="tel" id="phone" />
                    </div>
                  </div>
                </div>

                {/* <div className="form-group">
                  <div className="edu-form-check">
                    <input type="checkbox" id="crt-accnt" className="w-25" />
                    <label htmlFor="crt-accnt">Create an Accoutn?</label>
                  </div>
                </div> */}

                <div className="form-group mt--50 mb-0">
                  <label>ملاحظات</label>
                  <textarea
                    id="notes"
                    rows="4"
                    placeholder="اذا كان لديك اي ملاحظة ف اتركها."
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <OrderSummery />
              <OrderPayment />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutArea;
