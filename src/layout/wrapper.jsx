"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { get_cart_courses } from "@/store/features/cart-slice";
import { get_wishlist_products } from "@/store/features/wishlist-slice";
import ScrollToTop from "@/ui/scroll-to-top";
import Header from "./headers/header";
import LandingFooter from "./footers/LandingFooter";

export default function Wrapper({
  children,
  no_top_bar = true,
  isSticky = true,
  inSign = false,
  hideFooter = false,
  hideHeader = false,
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_wishlist_products());
    dispatch(get_cart_courses());
  }, [dispatch]);

  return (
    <div>
      {!hideHeader && (
        <Header inSign={inSign} no_top_bar={no_top_bar} isSticky={isSticky} />
      )}
      {children}
      <ScrollToTop />
      <ToastContainer />
      {!hideFooter && <LandingFooter />}
    </div>
  );
}
