import React, { useState, useEffect } from "react";
import { RiFlashlightFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Page from "./page";

const MyPage = ({ authService, user, myPosts }) => {
    const logout = () => {
        authService.logout();
    };
    return (
        <Page>
            <div className="app_inner">
                {user ? (
                    <>
                        <div className="user_info_box">
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

                        <button className="cmm_btn" onClick={logout}>
                            로그아웃
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="cmm_btn">
                        로그인을 해주세요
                    </Link>
                )}
            </div>
        </Page>
    );
};

export default MyPage;
