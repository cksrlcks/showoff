import React from "react";
import { Link } from "react-router-dom";

const NoticeCard = ({ children, link, btnName }) => {
    return (
        <div className="notice_card">
            <div className="box">
                <div className="ment">{children}</div>
                <Link to={link} className="btn">
                    {btnName}
                </Link>
            </div>
        </div>
    );
};

export default NoticeCard;
