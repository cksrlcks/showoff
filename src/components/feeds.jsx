import React from "react";
import Page from "./page";
import Post from "./post";

const Feeds = ({ posts }) => {
    return (
        <Page>
            {Object.keys(posts)
                .sort()
                .reverse()
                .map(key => {
                    console.log(key);
                    return <Post key={key} post={posts[key]} />;
                })}
        </Page>
    );
};

export default Feeds;
