import React from "react";
import { Link } from "react-router-dom";

const AskLogin = () => {
    return (
        <div className="ask_login">
            <div className="box">
                <div className="ment">
                    로그인후,
                    <br />
                    일상을 자랑해보세요 👍
                </div>
                <Link to="/Login" className="btn">
                    로그인하기
                </Link>
            </div>
        </div>
    );
};

export default AskLogin;
