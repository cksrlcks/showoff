import React, { useState, useEffect } from "react";
import { RiFlashlightFill, RiStickyNoteFill } from "react-icons/ri";
import { useNavigate, Link } from "react-router-dom";
import Page from "./page";
import Welcome from "./welcome";

const MyPage = ({ authService, user, myPosts }) => {
    const navigation = useNavigate();

    useEffect(() => {
        if (!user) navigation("/welcome");
    }, [user]);

    const logout = () => {
        authService.logout();
        navigation("/");
    };

    return (
        <Page>
            {!user ? (
                <Welcome />
            ) : (
                <>
                    <div className="user_info_box">
                        <div className="app_inner">
                            <div className="user_profile">
                                <div className="user_detail">
                                    <div className="user_name">
                                        {user.displayName}
                                    </div>
                                    <div className="user_email">
                                        {user.email}
                                    </div>
                                </div>
                            </div>
                            <div className="user_count">
                                <RiFlashlightFill />
                                내가 작성한 글 수 :{" "}
                                {Object.keys(myPosts).length}
                            </div>
                        </div>
                    </div>
                    <div className="mypage_menu_wrapper">
                        <ul className="mypage_menu">
                            <li>
                                <div className="app_inner">
                                    <Link to="/my/feeds/">
                                        <RiStickyNoteFill /> 내가 작성한 글
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="mypage_footer">
                        <div className="app_inner">
                            <button className="cmm_btn" onClick={logout}>
                                로그아웃
                            </button>
                        </div>
                    </div>
                </>
            )}
        </Page>
    );
};

export default MyPage;
