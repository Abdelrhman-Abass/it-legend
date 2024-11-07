"use client";
import { Link } from "@/navigation";
import { useLocale } from "next-intl";
import React, { useEffect } from "react";
import SwitchThemeButton from "../common/SwitchThemeButton";
import { useTheme } from "next-themes";
import SwitchLang from "../common/SwitchLang";


const BreadcrumbTwo = ({ subtitle }) => {
  const locale = useLocale();
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    if (!theme) {
      setTheme("light");
    }
  }, [theme]);
  return (
    <div className="edu-breadcrumb-area" style={{ padding: "16px 0" }}>
      <div className="container flex justify-between items-center">

        <div className="breadcrumb-inner">
          <ul
            className="edu-breadcrumb"
            style={{ justifyContent: "flex-start" }}
          >
            <li className="breadcrumb-item">
              <Link href="/learning-path">مساراتي</Link>
            </li>
            <li className="separator">
              {locale == "ar" ? (
                <i className="icon-angle-left"></i>
              ) : (
                <i className="icon-angle-right"></i>
              )}{" "}
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {subtitle}
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <SwitchThemeButton />
          <SwitchLang theme={theme}/>

        </div>

      </div>
    </div>
  );
};

export default BreadcrumbTwo;
