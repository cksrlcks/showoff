import React, { useState, useEffect, useRef } from "react";
import Page from "./page";
import Post from "./post";
import LoadingSpinner from "./loadingSpinner";

const Feeds = ({ posts, handleLoadMore, loading }) => {
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
                    return <Post key={key} post={posts[key]} />;
                })}
        </Page>
    );
};

export default Feeds;
