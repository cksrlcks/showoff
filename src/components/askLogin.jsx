import React from "react";
import NoticeCard from "./noticeCard";

const AskLogin = () => {
    return (
        <NoticeCard link={"/Login"} btnName="로그인하기">
            로그인후,
            <br />
            일상을 자랑해보세요 👍
        </NoticeCard>
    );
};

export default AskLogin;
