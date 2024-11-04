"use client";
import { Link } from "@/navigation";
import React, { useState } from "react";
import menu_data from "../menu-data";
import Image from "next/image";
import { useTranslations } from "next-intl";

const OffCanvas = ({ isOpen, setIsOpen }) => {
  const [navTitle, setNavTitle] = useState("");

  const openMobileMenu = (menu) => {
    if (navTitle === menu) {
      setNavTitle("");
    } else {
      setNavTitle(menu);
    }
  };
  const t = useTranslations("header");
  return (
    <>
      <div className={`popup-mobile-menu ${isOpen ? "active" : undefined}`}>
        <div className="inner">
          <div className="header-top">
            <div className="logo">
              <Link href="/">
                <Image
                  className="logo-light"
                  src="/assets/main-logo.png"
                  alt="logo"
                  width={140}
                  height={30}
                />
                <Image
                  className="logo-dark"
                  src="/assets/white-logo.png"
                  alt="logo"
                  width={140}
                  height={30}
                />
              </Link>
            </div>

            <div className="close-menu" onClick={() => setIsOpen(false)}>
              <button className="close-button">
                <i className="icon-73"></i>
              </button>
            </div>
          </div>

          <div className="mm-menu">
            <ul>
              {menu_data.map((menu, i) => (
                <li
                  key={i}
                  className={
                    !menu.submenus
                      ? undefined
                      : navTitle === menu?.title
                      ? "has-droupdown active"
                      : "has-droupdown"
                  }
                >
                  {menu.submenus && (
                    <button onClick={() => openMobileMenu(menu.title)}>
                      {menu.title}
                    </button>
                  )}

                  {!menu.mobile_pages_menu && (
                    <ul
                      className={
                        navTitle === menu?.title
                          ? "sub-menu active"
                          : "sub-menu"
                      }
                    >
                      {menu?.submenus?.map((sub, i) => (
                        <li key={i}>
                          <Link href={`${sub.link}`}>{sub.title}</Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  {menu.mobile_pages_menu && (
                    <ul
                      className={
                        navTitle === menu?.title
                          ? "sub-menu active"
                          : "sub-menu"
                      }
                    >
                      {menu?.mobile_pages_menu?.map((sub, i) => (
                        <li key={i}>
                          <Link href={`${sub.link}`}>{sub.title}</Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  {!menu.submenus && (
                    <Link href={menu.link}>{t(menu.title) || menu.title}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* overlay start */}
      <div
        onClick={() => setIsOpen(false)}
        className={`body-overlay ${isOpen ? "apply" : undefined}`}
      ></div>
      {/* overlay end */}
    </>
  );
};

export default OffCanvas;
