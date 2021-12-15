import React from "react";
import { useNavigate } from "react-router-dom";
import SubPage from "./subPage";

const Login = ({ authService }) => {
    const navigation = useNavigate();
    const handleLogin = () => {
        authService.login().then(() => {
            navigation(-1);
        });
    };
    return (
        <SubPage title="로그인">
            <button className="cmm_btn" onClick={handleLogin}>
                구글로 로그인
            </button>
        </SubPage>
    );
};

export default Login;
