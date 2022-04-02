import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Welcome from "../welcome";
import Dashboard from "./dashboard";
import MyPosts from "./myPosts";

const MyPage = ({ postRepository, authService, user, deletePost }) => {
    const navigation = useNavigate();
    useEffect(() => {
        if (!user) navigation("/welcome");
    }, [user]);

    const onLogout = () => {
        authService.logout();
        navigation("/");
    };

    return (
        <>
            {!user ? (
                <Welcome />
            ) : (
                <Routes>
                    <Route
                        path="/*"
                        element={<Dashboard onLogout={onLogout} user={user} />}
                    />
                    <Route
                        path="feeds"
                        element={
                            <MyPosts
                                user={user}
                                postRepository={postRepository}
                                authService={authService}
                                deletePost={deletePost}
                            />
                        }
                    />
                </Routes>
            )}
        </>
    );
};

export default MyPage;
