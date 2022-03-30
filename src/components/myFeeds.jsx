import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SubPage from "./subPage";

const MyFeeds = ({ user, postRepository }) => {
    const navigation = useNavigate();

    useEffect(() => {
        if (!user) navigation("/welcome");
    }, [user]);

    useEffect(() => {
        user && postRepository.getUserPosts(user.uid);
    }, []);

    return (
        <SubPage title="내가 작성한 글">
            <div className="app_inner">내가 작성한글</div>
        </SubPage>
    );
};

export default MyFeeds;
