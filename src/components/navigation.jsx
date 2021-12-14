import React from "react";
import { NavLink } from "react-router-dom";
import {
    RiFileList2Fill,
    RiChatSmile2Line,
    RiMentalHealthLine,
} from "react-icons/ri";

const Navigation = () => {
    return (
        <nav className="global_nav">
            <NavLink to="/" className="nav_item">
                <RiFileList2Fill className="icon" />
                <span className="name">Feeds</span>
            </NavLink>
            <NavLink to="/write" className="nav_item">
                <RiChatSmile2Line className="icon" />
                <span className="name">Show off</span>
            </NavLink>
            <NavLink to="/my" className="nav_item">
                <RiMentalHealthLine className="icon" />
                <span className="name">My</span>
            </NavLink>
        </nav>
    );
};

export default Navigation;
