import React, { useState, useEffect, useRef } from "react";
import Page from "./page";
import Post from "./post";
import LoadingSpinner from "./loadingSpinner";

const Feeds = ({ posts, user, handleLoadMore, loading, handleDelete }) => {
    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight && loading === false) {
            handleLoadMore();
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
            {Object.keys(posts)
                .sort()
                .reverse()
                .map(key => {
                    return (
                        <Post
                            key={key}
                            post={posts[key]}
                            user={user}
                            handleDelete={handleDelete}
                        />
                    );
                })}
        </Page>
    );
};

export default Feeds;
