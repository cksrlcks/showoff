import React from "react";
import { Link } from "react-router-dom";
import Header from "./header";

const My = () => {
    return (
        <div>
            <Header />
            마이페이지
            <Link to="/login">로그인</Link>
        </div>
    );
};

export default My;
