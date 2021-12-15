import React from "react";
import { useNavigate } from "react-router-dom";
import LogoImg from "../assets/img/logo.svg";
import { RiArrowLeftLine } from "react-icons/ri";

const Header = ({ title }) => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    return (
        <header className="app_header">
            {title && (
                <button className="header_btn back_btn" onClick={goBack}>
                    <RiArrowLeftLine className="icon" />
                </button>
            )}
            <div className="page_title">
                {title ? title : <img src={LogoImg} alt="show off" />}
            </div>
            {title && <div className="header_btn"></div>}
        </header>
    );
};

export default Header;
