import React, { useState, useEffect, useRef } from "react";
import AskLogin from "./askLogin";
import EmptyPosts from "./emptyPosts";
import FirstWrite from "./firstWrite";
import Page from "./page";
import Post from "./post";
import LoadingSpinner from "./loadingSpinner";

const Feeds = ({
    loading,
    user,
    myPosts,
    posts,
    loadMorePosts,
    deletePost
}) => {
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

    return (
        <Page>
            {loading && <LoadingSpinner />}
            {!loading && !user && <AskLogin />}
            {!Object.keys(posts).length && <EmptyPosts />}
            {user && !Object.keys(myPosts).length && <FirstWrite user={user} />}
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
                                user.uid,
                                posts[key].fileId
                            )}
                        />
                    );
                })}
        </Page>
    );
};

export default Feeds;
