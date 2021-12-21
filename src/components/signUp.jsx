import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import SubPage from "./subPage";
import { RiSendPlaneFill } from "react-icons/ri";
import { useState } from "react/cjs/react.development";

const SignUp = ({ authService }) => {
    const [disable, setDisable] = useState(false);
    const emailRef = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const navigation = useNavigate();

    //check user input
    const emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const passwordRule = /^[A-Za-z0-9]{6,12}$/;
    const checkUserInput = (userInputData, rule) => {
        return userInputData.match(rule) != null;
    };

    //form reset
    const formReset = () => {
        emailRef.current.value = "";
        nameRef.current.value = "";
        passwordRef.current.value = "";
        passwordConfirmRef.current.value = "";
    };

    const onSignUp = event => {
        if (!emailRef.current.value) {
            alert("아이디를 입력해주세요");
            return;
        }

        if (!passwordRef.current.value) {
            alert("비밀번호를 입력해주세요");
            return;
        }

        if (!passwordConfirmRef.current.value) {
            alert("비밀번호를 다시 한번 입력해주세요");
            return;
        }

        if (passwordRef.current.value != passwordConfirmRef.current.value) {
            alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요");
            return;
        }
        if (!checkUserInput(emailRef.current.value, emailRule)) {
            alert("올바른 이메일을 입력해주세요");
            return;
        }

        if (!checkUserInput(passwordRef.current.value, passwordRule)) {
            alert(
                "숫자와 문자 포함 형태의 6~12자리 이내의 암호를 만들어주세요"
            );
            return;
        }

        setDisable(true);

        const userData = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            displayName: nameRef.current.value
        };
        authService.signUp(userData, (result, err) => {
            if (result) {
                formReset();
                alert("가입을 축하드립니다.");
                navigation("/");
            } else {
                alert(err);
            }
            setDisable(false);
        });
    };

    return (
        <SubPage title="회원가입">
            <div className="app_inner">
                <div className="login_form signUp">
                    <div className="form_input">
                        <input
                            type="text"
                            placeholder="이메일"
                            ref={emailRef}
                        />
                    </div>
                    <div className="form_input">
                        <input type="text" placeholder="닉네임" ref={nameRef} />
                    </div>
                    <div className="form_input">
                        <input
                            type="password"
                            placeholder="비밀번호"
                            ref={passwordRef}
                        />
                    </div>
                    <div className="form_input">
                        <input
                            type="password"
                            placeholder="비밀번호 확인"
                            ref={passwordConfirmRef}
                        />
                    </div>
                    <button
                        className="cmm_btn icon loading"
                        onClick={onSignUp}
                        disabled={disable}
                    >
                        <RiSendPlaneFill className="btn_icon" />
                        이메일로 회원가입
                    </button>
                </div>
            </div>
        </SubPage>
    );
};

export default SignUp;
