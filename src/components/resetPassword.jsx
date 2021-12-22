import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SubPage from "./subPage";
import { RiSendPlaneFill } from "react-icons/ri";

const ResetPassword = ({ authService }) => {
    const [disable, setDisable] = useState(false);
    const navigation = useNavigate();
    const emailRef = useRef();

    useEffect(() => {
        return () => setDisable(false);
    }, []);

    const handleReset = () => {
        var userEmail = emailRef.current.value;

        if (!userEmail) {
            alert("이메일을 입력해주세요");
            return;
        }

        setDisable(true);

        authService.sendRestEmail(userEmail, (res, err) => {
            setDisable(false);
            if (res == "success") {
                alert("비밀번호 재설정 메일을 보냈습니다.");
                navigation(-1);
            } else {
                alert(err);
            }
        });
    };

    return (
        <SubPage title="비밀번호 재설정">
            <div className="app_inner">
                <div className="login_form alone">
                    <div className="form_input">
                        <input
                            type="text"
                            placeholder="이메일"
                            ref={emailRef}
                        />
                    </div>
                    <button
                        className="cmm_btn icon loading"
                        onClick={handleReset}
                        disabled={disable}
                    >
                        <RiSendPlaneFill className="btn_icon" />
                        비밀번호 재설정 이메일 보내기
                    </button>
                </div>
            </div>
        </SubPage>
    );
};

export default ResetPassword;
