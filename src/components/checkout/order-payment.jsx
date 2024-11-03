import { Link } from "@/navigation";
import React from "react";

const OrderPayment = () => {
  return (
    <div className="order-payment">
      <h4 className="title">وسيلة الدفع</h4>
      <div className="payment-method">
        {/* <div className="form-group">
          <div className="edu-form-check">
            <input type="radio" id="pay-bank" name="payment" />
            <label htmlFor="pay-bank">Direct Bank Transfer</label>
          </div>
          <p>
            Please send a check to Store Name, Store Street, Store Town, Store
            State / County, Store Postcode.
          </p>
        </div> */}

        <div className="form-group">
          <div className="edu-form-check">
            <input type="radio" id="pay-pal" name="payment" />
            <a>ادفع بايبال فورا</a>
          </div>
        </div>
      </div>

      <Link href="/successful-operation" className="edu-btn order-place">
        ادفع <i className="icon-4"></i>
      </Link>
    </div>
  );
};

export default OrderPayment;
