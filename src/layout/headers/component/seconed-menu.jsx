"use client";
import React from "react";
import user_data from "../user-data";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

const SeconedMenu = () => {
  const t = useTranslations("userHeader");

  return (
    <ul className="mainmenu">
      {user_data.map((menu, i) => (
        <li key={i} className={menu.mega_menu && "has-droupdown"}>
          <Link href={menu.link}>{t(menu.title) || menu.title}</Link>
          {menu?.mega_menu && (
            <ul className="submenu">
              {menu?.submenus?.map((nav, i) => (
                <li key={i}>
                  <Link href={`${nav.link}`}>
                    {nav.title}
                    {nav?.hot && <span className="badge-1">hot</span>}
                    {nav?.new && <span className="badge">new</span>}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {menu?.mega_menu && (
            <ul className="mega-menu">
              {menu?.submenus?.map((nav, i) => (
                <li key={i}>
                  <h6 className="menu-title">{nav.title}</h6>
                  <ul className="submenu mega-sub-menu-01">
                    {nav.mega_submenu.map((m, i) => (
                      <li key={i}>
                        <Link href={`${m.link}`}>{m.title}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default SeconedMenu;
