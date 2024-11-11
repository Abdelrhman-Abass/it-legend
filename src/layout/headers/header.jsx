"use client";
import React, { useEffect, useState } from "react";
import { Link, useRouter } from "@/navigation";
import MainMenu from "../headers/component/main-menu";
import useSticky from "@/hooks/use-sticky";
import useCartInfo from "@/hooks/use-cart-info";
import OffCanvas from "./component/OffCanvas";
import Cart from "./component/cart";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import SwitchLang from "../../components/common/SwitchLang";


const Header = ({
  header_style = false,
  disable_full_width = false,
  isSticky,
  inSign = false,
}) => {
  const router = useRouter();
  const { sticky } = useSticky();
  const { quantity } = useCartInfo();
  // const wishlists = useSelector(wishlistItems);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("header");
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [userId, setUserId] = useState(null); // State to hold user ID

  useEffect(() => {
    if (!theme) {
      setTheme("light");
    }

    setIsMounted(true);

    // Get user ID from cookies
    const cookies = document.cookie.split("; ");
    const userIdCookie = cookies.find((cookie) =>
      cookie.startsWith("user_id=")
    );
    if (userIdCookie) {
      setUserId(userIdCookie.split("=")[1]); // Extract user ID
    }
  }, []);

  const handleLogout = () => {
    // Delete user_id cookie
    document.cookie =
      "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Set cookie to expire in the past
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Set cookie to expire in the past
    setUserId(null); // Clear user ID from state
    router.push("/");
  };

  return (
    <>
      {isMounted && (
        <>
          <header
            className={`edu-header header-style-${
              header_style ? header_style : "1"
            } ${
              disable_full_width
                ? "disbale-header-fullwidth"
                : "header-fullwidth"
            } no-topbar `}
          >
            <div id="edu-sticky-placeholder"></div>
            <div
              className={`header-mainmenu ${
                sticky && isSticky ? "edu-sticky" : undefined
              }`}
            >
              <div className="container-fluid">
                <div className="header-navbar">
                  <div className="header-brand">
                    <div className="logo">
                      <Link href="/">
                        <Image
                          className="logo-light"
                          src="/assets/main-logo.png"
                          alt="logo"
                          width={150}
                          height={25}
                        />
                        <Image
                          className="logo-dark"
                          src="/assets/white-logo.png"
                          alt="logo"
                          width={150}
                          height={25}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="header-mainnav">
                    <nav className="mainmenu-nav">
                      {/* main menu start */}
                      <MainMenu />
                      {/* main menu end */}
                    </nav>
                  </div>
                  <div className="header-right">
                    <ul className="header-action">
                      {/* <li className="search-bar">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                          />
                          <button className="search-btn" type="button">
                            <i className="icon-2"></i>
                          </button>
                        </div>
                      </li> */}
                      {/* <li className="icon search-icon">
              <a
                style={{ cursor: "pointer" }}
                onClick={() => setIsSearchOpen(true)}
                className="search-trigger"
              >
                <i className="icon-2"></i>
              </a>
            </li>
            <li className="icon">
              <Link href="/" className="wishlist">
                <i className="icon-22"></i>
                <span className="count">{wishlists?.length}</span>
              </Link>
            </li> */}
                      <li className="icon cart-icon">
                        <Link href="/cart" className="cart-icon">
                          <i className="icon-3"></i>
                          <span className="count">{quantity}</span>
                        </Link>
                        <Cart />
                      </li>
                      <li>
                        <button
                          className="btn"
                          style={{ paddingLeft: 0, paddingRight: 0 }}
                          onClick={() =>
                            setTheme(theme === "light" ? "dark" : "light")
                          }
                          aria-label={`Switch to ${
                            theme == "light" ? "dark" : "light"
                          } mode`}
                        >
                          {theme == "light" ? (
                            <Moon
                              strokeWidth={2}
                              size={28}
                              style={{ cursor: "pointer" }}
                              color="#181818"
                            />
                          ) : (
                            <Sun
                              strokeWidth={2}
                              size={32}
                              style={{ cursor: "pointer" }}
                              color="#FFEB3B"
                            />
                          )}
                        </button>
                      </li>
                      <li>
                        {/* until i define the redux context this gonna help */}
                        <SwitchLang theme={theme}/>
                      </li>

                      {!userId && (
                        <li className="header-btn">
                          <Link href="/auth" className="edu-btn btn-medium">
                            <i className="icon-4"></i>
                            <span> {t("signin")} </span>
                          </Link>
                        </li>
                      )}

                      {userId && (
                        <li className="header-btn">
                          <button
                            onClick={handleLogout}
                            className="edu-btn btn-medium"
                          >
                            {t('signout')}
                          </button>
                        </li>
                      )}

                      <li className="mobile-menu-bar d-block d-xl-none">
                        <button
                          className="hamberger-button"
                          onClick={() => setIsOpen(true)}
                        >
                          <i className="icon-54"></i>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Start Search Popup  --> */}
            {/* <SearchPopup
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
        /> */}
            {/* <!-- End Search Popup  --> */}
          </header>
          {/* sidebar start */}
          <OffCanvas isOpen={isOpen} setIsOpen={setIsOpen} />
          {/* sidebar end */}
        </>
      )}
    </>
  );
};

export default Header;
