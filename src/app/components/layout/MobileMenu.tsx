import React from "react";
import Logo from "./Logo";
import { IoClose } from "react-icons/io5";
import UseToggleMenu from "@/app/store/ToggleMenu";
import Menu from "./Menu";
import LangSwither from "./LangSwither";

export default function MobileMenu() {
    const { isActiveMenu, closeMenu } = UseToggleMenu();
    return (
        <div className={`mobile-menu-container ${isActiveMenu ? "active_menu" : ""}`}>
            <div className="mobile-menu">
                <div className="menu-mobile_logo f ac jb">
                    <Logo />
                    <div className="close_menu f ac jc" onClick={closeMenu}>
                        <IoClose />
                    </div>
                </div>
                <Menu />
                <LangSwither custom_class="mobile_lang" />
            </div>
        </div>
    );
}
