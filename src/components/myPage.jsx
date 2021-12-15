import React from "react";
import { Link } from "react-router-dom";
import Page from "./page";

const MyPage = () => {
    return (
        <Page>
            <Link to="/login" className="cmm_btn">
                로그인
            </Link>
        </Page>
    );
};

export default MyPage;
