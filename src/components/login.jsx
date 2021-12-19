import React from "react";
import { useNavigate, Link } from "react-router-dom";
import SubPage from "./subPage";
import googleIcon from "../assets/img/icon_google.svg";
import { RiSendPlaneFill } from "react-icons/ri";

const Login = ({ authService }) => {
    const navigation = useNavigate();
    const handleLogin = () => {
        authService.login().then(() => {
            navigation(-1);
        });
    };
    return (
        <SubPage title="로그인">
            <div className="app_inner">
                <button className="cmm_btn icon google" onClick={handleLogin}>
                    <img src={googleIcon} className="btn_icon" alt="google" />
                    구글로 로그인
                </button>
                <button className="cmm_btn icon" disabled>
                    <RiSendPlaneFill className="btn_icon" />
                    이메일로 로그인
                </button>

                <Link to="/join" className="text_btn">
                    회원가입
                </Link>
            </div>
        </SubPage>
    );
};

export default Login;
