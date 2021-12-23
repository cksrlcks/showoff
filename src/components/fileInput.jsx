import React, { useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import { RiImageAddFill, RiCloseFill } from "react-icons/ri";
const FileInput = ({
    file,
    onFileChange,
    onFileDelete,
    handlePreventSubmit
}) => {
    const [loading, setLoading] = useState(false);
    const fileRef = useRef();

    const onClick = event => {
        event.preventDefault();
        fileRef.current.click();
    };

    const onChange = async event => {
        const file = event.target.files[0];

        //그냥 제한 :old version
        // const fileSize = file.size || file.fileSize;
        // var limit = 512000;
        // if (fileSize > limit) {
        //     alert("용량이 너무 큽니다. 500kb이내의 이미지만 올려주세요");
        //     fileRef.value = "";
        //     return;
        // }

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        };
        handlePreventSubmit(true);
        setLoading(true);
        try {
            const compressedFile = await imageCompression(file, options);

            await onFileChange(compressedFile);
        } catch (error) {
            throw new Error(error);
        }
        handlePreventSubmit(false);
        setLoading(false);
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
            ) : loading ? (
                <div className="compressing">이미지를 압축중입니다.</div>
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
