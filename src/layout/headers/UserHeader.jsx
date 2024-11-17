"use client";
import React, { useEffect, useState } from "react";
import { Link, useRouter } from "@/navigation";

import useSticky from "@/hooks/use-sticky";
import OffCanvas from "./component/OffCanvas";
import Image from "next/image";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import SwitchLang from "../../components/common/SwitchLang";


const UserHeader = ({
  header_style = false,
  disable_full_width = false,
  isSticky = true,
  inSign = false,
}) => {
  const router = useRouter();

  const { sticky } = useSticky();
  
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("header");
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); // State to store user information
  const [direction, setDirection] = useState('rtl');



  useEffect(() => {
    const htmlElement = document.documentElement; // or document.querySelector('html')
    const currentDirection = htmlElement.dir
    setDirection(currentDirection);
  }, [direction]);


  useEffect(() => {
    if (!theme) {
      setTheme("light");
    }

    const htmlElement = document.documentElement; // or document.querySelector('html')
    const currentDirection = htmlElement.dir
    setDirection(currentDirection);

    setIsMounted(true);

    // Get user ID from cookies
    const cookies =  document.cookie.split('; ');
    const userCookie = cookies.find((cookie) => cookie.startsWith("user="));
    if (userCookie) {
      // Parse user data from cookie
      const userData = JSON.parse(decodeURIComponent(userCookie.split("=")[1]));
      setUser(userData); // Store user data in state
    }
    
  }, [direction]);

  const handleLogout = () => {
    const cookies = ['user', 'token', 'refreshToken'];
    cookies.forEach(cookieName => {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}; secure;`;
    });
    setUser(null); // Clear user ID from state
    router.push("/");
  };

  return (
    <>
      {isMounted && (
        <>
          <header
            className={`edu-header header-style-${header_style ? header_style : "1"
              } ${disable_full_width
                ? "disbale-header-fullwidth"
                : "header-fullwidth"
              } no-topbar `}
          >
            <div id="edu-sticky-placeholder"></div>
            <div
              className={`header-mainmenu ${sticky && isSticky ? "edu-sticky" : undefined
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
                      {/* main menu start
                      <MainMenu />
                      main menu end */}
                    </nav>
                  </div>
                  <div className="header-right">
                    <ul className="header-action">
                      <li className="dropdown" style={{ position: 'relative', display: 'inline-block' }}>
                        <button
                          style={{ display: "block", background: 'none', border: 'none', cursor: 'pointer' }}
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                          Links
                        </button>
                        {isDropdownOpen && (
                          <div className="dropdown-content" style={{
                            display: 'block',
                            position: 'absolute',
                            backgroundColor: '#f9f9f9',
                            minWidth: '160px',
                            boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                            zIndex: 1
                          }}>
                            <Link href="/course-details/10" style={{ display: 'block', padding: '8px 16px', textDecoration: 'none' }}>Course Details</Link>
                            <Link href="/courses" style={{ display: 'block', padding: '8px 16px', textDecoration: 'none' }}>Courses</Link>
                            <Link href="/diploma-details/10" style={{ display: 'block', padding: '8px 16px', textDecoration: 'none' }}>Diploma Details</Link>
                            <Link href="/diploma-sales" style={{ display: 'block', padding: '8px 16px', textDecoration: 'none' }}>Diploma Sales</Link>
                            <Link href="/auth" style={{ display: 'block', padding: '8px 16px', textDecoration: 'none' }}>Auth</Link>
                            <Link href="/cart" style={{ display: 'block', padding: '8px 16px', textDecoration: 'none' }}>Cart</Link>
                            <Link href="/checkout" style={{ display: 'block', padding: '8px 16px', textDecoration: 'none' }}>Checkout</Link>
                            <Link href="/successful-operation" style={{ display: 'block', padding: '8px 16px', textDecoration: 'none' }}>Successful Operation</Link>
                            <Link href="/diploma/10" style={{ display: 'block', padding: '8px 16px', textDecoration: 'none' }}>Diploma</Link>
                            <Link href="/learning-path" style={{ display: 'block', padding: '8px 16px', textDecoration: 'none' }}>Learning Path</Link>
                          </div>
                        )}
                      </li>
                      {/* <li className="icon cart-icon">
                        <Link href="/cart" className="cart-icon">
                          <i className="icon-3"></i>
                          {quantity > 0 &&
                            <span className="count">{quantity}</span>
                          }
                        </Link>
                        <Cart />

                        

                      </li> */}

                      <li>
                        {/* until i define the redux context this gonna help */}
                        <Link href="/">Home</Link>
                      </li>
                      <li>
                        <button
                          className="btn"
                          style={{ paddingLeft: 0, paddingRight: 0 }}
                          onClick={() =>
                            setTheme(theme === "light" ? "dark" : "light")
                          }
                          aria-label={`Switch to ${theme == "light" ? "dark" : "light"
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
                        <SwitchLang theme={theme} />
                      </li>

                      {!user && (
                        <li className="header-btn">
                          <Link href="/auth" className="edu-btn btn-medium">
                            {direction == "rtl" ? (
                              <ArrowLeft className="d-inline h-[20px]" />
                            ) : (
                              <i className="icon-4 mr-2"></i>
                            )}
                            <span>{t("signin")}</span>
                          </Link>
                        </li>
                      )}



                      {user && (
                        <li className="header-btn">
                          <button
                            onClick={handleLogout}
                            className="edu-btn btn-medium"
                          >
                            {direction == "rtl" ? (
                              <ArrowLeft className="d-inline h-[20px]" />
                            ) : (
                              <i className="icon-4 mr-2"></i>
                            )}
                            <span>{t('signout')}</span>
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
          </header>
          {/* sidebar start */}
          <OffCanvas isOpen={isOpen} setIsOpen={setIsOpen} />
          {/* sidebar end */}
        </>
      )}
    </>
  );
};

export default UserHeader;
