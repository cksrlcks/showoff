import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";

const Welcome = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate("/");
    };
    return (
        <div className="welcome">
            <div className="welcome_inner">
                <button className="back_btn" onClick={goBack}>
                    <RiArrowLeftLine className="icon" />
                </button>
                <div className="welcome_ment">
                    <div className="ment_inner">
                        <div className="ment">
                            <div className="title">
                                작은 이야기부터
                                <br />
                                가볍게 시작해보세요
                            </div>
                            <div className="sub">
                                일상속의 자랑하고 싶은 내용을 적어주세요
                            </div>
                        </div>
                        <Link to="/login" className="cmm_btn">
                            로그인을 해주세요
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
