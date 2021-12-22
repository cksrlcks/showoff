import React from "react";
import { Link } from "react-router-dom";
const Welcome = () => {
    return (
        <div className="welcome">
            <Link to="/login" className="cmm_btn">
                로그인을 해주세요
            </Link>
        </div>
    );
};

export default Welcome;
