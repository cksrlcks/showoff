import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Page from "./page";

const Write = ({ user }) => {
    const navigation = useNavigate();
    return (
        <Page>
            {!user ? (
                <Link to="/login" className="cmm_btn">
                    로그인을 해주세요
                </Link>
            ) : (
                <div>작성페이지</div>
            )}
        </Page>
    );
};

export default Write;
