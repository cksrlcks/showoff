import React from "react";
import { RiCloseFill } from "react-icons/ri";

const Toast = ({ push, handleToast }) => {
    return <div className="push-toast">
        <div className="push-content">
            <div className="push-title">{push.title}</div>
            <div className="push-body">{push.body}</div>
        </div>
        <div className="push-control">
            <button type="button" onClick={handleToast}><RiCloseFill /></button>
        </div>
    </div>
}

export default Toast;