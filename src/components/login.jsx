import React, { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import SubPage from "./subPage";
import googleIcon from "../assets/img/icon_google.svg";
import { RiSendPlaneFill } from "react-icons/ri";

const Login = ({ authService }) => {
    const navigation = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const handleLogin = () => {
        const userData = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        };
        authService
            .loginWithEmail(userData) //
            .then(() => {
                navigation(-1);
            });
    };

    const handleProviderLogin = provider => {
        authService
            .loginWithProvider(provider) //
            .then(() => {
                navigation(-1);
            });
    };
    return (
        <SubPage title="로그인">
            <div className="app_inner">
                <div className="login_form">
                    <div className="form_input">
                        <input
                            type="text"
                            placeholder="이메일"
                            ref={emailRef}
                        />
                    </div>
                    <div className="form_input">
                        <input
                            type="password"
                            placeholder="비밀번호"
                            ref={passwordRef}
                        />
                    </div>
                    <button className="cmm_btn icon" onClick={handleLogin}>
                        <RiSendPlaneFill className="btn_icon" />
                        이메일로 로그인
                    </button>
                </div>
                <button
                    className="cmm_btn icon google"
                    onClick={() => handleProviderLogin("google")}
                >
                    <img src={googleIcon} className="btn_icon" alt="google" />
                    구글로 로그인
                </button>

                <Link to="/signUp" className="text_btn">
                    <span>아직 회원이 아니세요?</span>
                    <span className="emp">회원가입</span>
                </Link>
            </div>
        </SubPage>
    );
};

export default Login;
