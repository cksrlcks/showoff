import React from "react";
import LogoImg from "../assets/img/logo.svg";

const Header = () => {
    return (
        <header className="app_header">
            <div className="page_title">
                <img src={LogoImg} alt="show off" />
            </div>
        </header>
    );
};

export default Header;
