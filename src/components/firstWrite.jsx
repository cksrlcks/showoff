import React from "react";
import NoticeCard from "./noticeCard";

const FirstWrite = ({ user }) => {
    return (
        <NoticeCard link={"/write"} btnName="작성하기">
            아직 글을 쓰지 않았어요
            <br />
            {user && user.displayName}님의 일상을 자랑해보세요 ✨
        </NoticeCard>
    );
};

export default FirstWrite;
