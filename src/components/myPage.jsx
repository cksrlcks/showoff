import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "./page";

const MyPage = ({ authService, user, postRepository }) => {
    const [myPostsLength, setMyPostsLength] = useState(0);
    const handleLogout = () => {
        authService.logout();
    };

    useEffect(() => {
        if (!user) return;
        const stopSync = postRepository.getUserData(user.uid, posts => {
            if (posts) {
                setMyPostsLength(Object.keys(posts).length);
            }
        });

        return () => stopSync();
    }, [postRepository, user]);

    return (
        <Page>
            <div className="app_inner">
                {user ? (
                    <>
                        <div className="user_info_box">
                            {user.photoURL && (
                                <figure className="user_pic">
                                    <img
                                        src={user.photoURL}
                                        alt={`${user.displayName}의 프로필사진`}
                                        referrerPolicy="no-referrer"
                                    />
                                </figure>
                            )}
                            <div className="user_detail">
                                <div className="user_name">
                                    {user.displayName}
                                </div>
                                <div className="user_email">{user.email}</div>
                            </div>
                        </div>

                        <button className="cmm_btn" onClick={handleLogout}>
                            로그아웃
                        </button>

                        <div>내가 작성한 글 수 : {myPostsLength}</div>
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
