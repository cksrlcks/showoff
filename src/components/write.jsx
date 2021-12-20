import React, { useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Page from "./page";

const Write = ({ user, createPost }) => {
    const formRef = useRef();
    const textareaRef = useRef();
    const navigation = useNavigate();

    const onSubmit = event => {
        event.preventDefault();

        if (!textareaRef.current.value) {
            alert("최소 1자이상 써주세요~");
            return;
        }

        const date = new Date();
        const post = {
            id: Date.now(),
            userId: user.uid,
            userName: user.displayName,
            content: textareaRef.current.value,
            createdAt: date.getTime(),
            reverseCreatedAt: -date.getTime()
        };
        formRef.current.reset();
        createPost(post);

        navigation("/");
    };
    return (
        <Page>
            <div className="app_inner">
                {!user ? (
                    <Link to="/login" className="cmm_btn">
                        로그인을 해주세요
                    </Link>
                ) : (
                    <form className="write_form" ref={formRef}>
                        <textarea
                            ref={textareaRef}
                            placeholder="어디 한번 자랑해봐!"
                        ></textarea>
                        <button className="cmm_btn" onClick={onSubmit}>
                            자랑하기
                        </button>
                    </form>
                )}
            </div>
        </Page>
    );
};

export default Write;
