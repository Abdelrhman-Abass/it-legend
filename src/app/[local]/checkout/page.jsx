import BreadcrumbThree from "@/components/breadcrumb/breadcrumb-3";
import CheckoutArea from "@/components/checkout/checkout-area";
import React from "react";

const page = () => {
  return (
    <>
      <BreadcrumbThree title="الدفع" subtitle="الدفع" />
      <CheckoutArea />
    </>
  );
};

export default page;
