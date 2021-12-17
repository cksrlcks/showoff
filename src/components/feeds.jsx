import React from "react";
import Page from "./page";
import Post from "./post";

const Feeds = ({ posts ,handleLoadMore }) => {
    const loadMore = () => {      
        handleLoadMore()
    }
    
    return (
        <Page>
            {Object.keys(posts)
                .sort()
                .reverse()
                .map(key => {
                    return <Post key={key} post={posts[key]} />;
                })}
            <button className="cmm_btn" onClick={loadMore}>더 불러오기</button>
        </Page>
    );
};

export default Feeds;
