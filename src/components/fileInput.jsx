import React, { useState, useRef } from "react";
import { RiImageAddFill, RiCloseFill } from "react-icons/ri";

const FileInput = ({ file, onFileChange, onFileDelete, imageUploader }) => {
    const fileRef = useRef();

    const onClick = event => {
        event.preventDefault();
        fileRef.current.click();
    };

    const onChange = async event => {
        const file = event.target.files[0];
        const fileSize = file.size || file.fileSize;
        var limit = 512000;
        if (fileSize > limit) {
            alert("용량이 너무 큽니다. 500kb이내의 이미지만 올려주세요");
            fileRef.value = "";
            return;
        }
        onFileChange(file);
    };

    const onDelete = event => {
        event.preventDefault();
        onFileDelete();
    };

    return (
        <>
            {file ? (
                <div className="preview_box">
                    <button className="delete" onClick={onDelete}>
                        <RiCloseFill />
                    </button>
                    <img src={window.URL.createObjectURL(file)} alt="" />
                </div>
            ) : (
                <div className="upload_box">
                    <input
                        type="file"
                        accept="image/*"
                        name="file"
                        hidden
                        ref={fileRef}
                        onChange={onChange}
                    />
                    <button className="upload_btn" onClick={onClick}>
                        <RiImageAddFill />
                    </button>
                </div>
            )}
        </>
    );
};

export default FileInput;
