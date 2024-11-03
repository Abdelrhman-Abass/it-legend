"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clear_cart, get_cart_courses } from "@/store/features/cart-slice";
import CartItem from "./cart-item";
import OrderSummery from "./order-summery";
import { Link } from "@/navigation";

const CartArea = () => {
  const { cartCourses } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_cart_courses());
  }, [dispatch]);

  return (
    <section className="cart-page-area edu-section-gap">
      {cartCourses.length === 0 && (
        <div className="container py-5">
          <h3>لا يوجد دورات</h3>
          <div className="update-btn">
            <Link
              href="/courses"
              className="edu-btn btn-border btn-medium disabled"
            >
              الرجوع الي الدورات
            </Link>
          </div>
        </div>
      )}
      {cartCourses.length > 0 && (
        <div className="container">
          <div className="table-responsive">
            <table className="table cart-table">
              <thead>
                <tr>
                  <th scope="col" className="product-remove"></th>
                  <th scope="col" className="product-thumbnail"></th>
                  <th scope="col" className="product-title">
                    الاسم
                  </th>
                  <th scope="col" className="product-price">
                    السعر
                  </th>
                  {/* <th scope="col" className="product-quantity">
                    Quantity
                  </th> */}
                  {/* <th scope="col" className="product-subtotal">
                    Subtotal
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {cartCourses.map((item, i) => (
                  <CartItem key={i} item={item} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="cart-update-btn-area">
            <div className="input-group product-cupon">
              <input placeholder="تطبيق كود" type="text" />
              <button type="submit" className="submit-btn">
                <i className="icon-4"></i>
              </button>
            </div>
            <div className="update-btn">
              <a
                style={{ cursor: "pointer" }}
                onClick={() => dispatch(clear_cart())}
                className="edu-btn btn-border btn-medium disabled"
              >
                حذف الكل
                <i className="icon-4"></i>
              </a>
            </div>
          </div>

          <div className="row">
            <div
              className="col-xl-5 col-lg-7 offset-xl-7 offset-lg-5"
              style={{ margin: "0 auto" }}
            >
              <OrderSummery />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartArea;
