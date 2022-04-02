import React, { useState, useEffect } from "react";
import Page from "../page";
import { RiFlashlightFill, RiStickyNoteFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Dashboard = ({ onLogout, user }) => {
    return (
        <Page>
            <div className="user_info_box">
                <div className="app_inner">
                    <div className="user_profile">
                        <div className="user_detail">
                            <div className="user_name">{user.displayName}</div>
                            <div className="user_email">{user.email}</div>
                        </div>
                    </div>
                    <div className="user_count">
                        <RiFlashlightFill />
                        내가 작성한 글 수 : {user.myPostsLength}
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
                    <button className="cmm_btn" onClick={onLogout}>
                        로그아웃
                    </button>
                </div>
            </div>
        </Page>
    );
};

export default Dashboard;
