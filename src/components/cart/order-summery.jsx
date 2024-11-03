import React from "react";
import useCartInfo from "@/hooks/use-cart-info";
import { Link } from "@/navigation";

const OrderSummery = () => {
  const { total } = useCartInfo();
  return (
    <div className="order-summery">
      <h4 className="title">الملخص</h4>
      <table className="table summery-table">
        <tbody>
          <tr className="order-subtotal">
            <td>المجموع الفرعي</td>
            <td>${total.toFixed(2)}</td>
          </tr>
          <tr className="order-total">
            <td>المجموع الكلي</td>
            <td>${total.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <Link
        href="/checkout"
        className="edu-btn btn-medium checkout-btn"
        style={{ justifyContent: "center" }}
      >
        احصل عليه <i className="icon-4"></i>
      </Link>
    </div>
  );
};

export default OrderSummery;
