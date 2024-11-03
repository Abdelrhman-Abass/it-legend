import React from "react";
import BreadcrumbThree from "../breadcrumb/breadcrumb-3";
import CartArea from "./cart-area";

const index = () => {
  return (
    <>
      {" "}
      <BreadcrumbThree title="السلة" subtitle="السلة" />
      <CartArea />
    </>
  );
};

export default index;
