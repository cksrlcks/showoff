import React from "react";
import NoticeCard from "./noticeCard";

const EmptyPosts = () => {
    return (
        <NoticeCard link={"/write"} btnName="첫글 남기기">
            커뮤니티에 작성된 글이 없습니다.
            <br />
            첫글을 올려보세요. 🎈
        </NoticeCard>
    );
};

export default EmptyPosts;
