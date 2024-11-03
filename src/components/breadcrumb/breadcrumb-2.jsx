import { Link } from "@/navigation";
import { useLocale } from "next-intl";
import React from "react";

const BreadcrumbTwo = ({ subtitle }) => {
  const locale = useLocale();
  return (
    <div className="edu-breadcrumb-area" style={{ padding: "16px 0" }}>
      <div className="container">
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
      </div>
    </div>
  );
};

export default BreadcrumbTwo;
