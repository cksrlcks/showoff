import React, { useState, useEffect, useRef } from "react";
import AskLogin from "./askLogin";
import EmptyPosts from "./emptyPosts";
import FirstWrite from "./firstWrite";
import Page from "./page";
import Post from "./post";
import LoadingSpinner from "./loadingSpinner";

const Feeds = ({ loading, user, posts, loadMorePosts, deletePost }) => {
    const [emptyList, setEmptyList] = useState(false);
    const [firstWrite, setFirstWrite] = useState(false);
    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight && loading === false) {
            loadMorePosts();
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    useEffect(() => {
        Object.keys(posts).length ? setEmptyList(false) : setEmptyList(true);
    }, [posts]);

    useEffect(() => {
        if (!user) return;
        user.myPostsLength > 0 ? setFirstWrite(false) : setFirstWrite(true);
    }, [user]);

    return (
        <Page>
            {loading && <LoadingSpinner />}
            {!loading && !user && <AskLogin />}
            {!loading && emptyList && <EmptyPosts />}
            {!loading && firstWrite && <FirstWrite user={user} />}
            {Object.keys(posts)
                .sort()
                .reverse()
                .map(key => {
                    return (
                        <Post
                            key={key}
                            post={posts[key]}
                            user={user}
                            deletePost={deletePost.bind(
                                null,
                                posts[key].id,
                                posts[key].userId,
                                posts[key].fileId
                            )}
                        />
                    );
                })}
        </Page>
    );
};

export default Feeds;
