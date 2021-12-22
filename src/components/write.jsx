import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "./page";
import Welcome from "./welcome";
import FileInput from "./fileInput";

const Write = ({ user, createPost, imageUploader }) => {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const formRef = useRef();
    const textareaRef = useRef();
    const navigation = useNavigate();

    useEffect(() => {
        if (!user) navigation("/welcome");
    }, [user]);

    const onFileChange = file => {
        setFile(file);
    };

    const onFileDelete = () => {
        setFile(null);
    };

    const uploadImg = async file => {
        return await imageUploader.upload(file);
    };

    const onSubmit = async event => {
        event.preventDefault();

        if (!textareaRef.current.value) {
            alert("최소 1자이상 써주세요~");
            return;
        }

        setLoading(true);

        const uploaded = await uploadImg(file);
        const uploadedFileName = uploaded.original_filename;
        const uploadedFileURL = uploaded.secure_url;
        const uploadedFileId = uploaded.public_id;

        const date = new Date();

        const post = {
            id: Date.now(),
            userId: user.uid,
            userName: user.displayName,
            content: textareaRef.current.value,
            createdAt: date.getTime(),
            reverseCreatedAt: -date.getTime(),
            fileName: uploadedFileName || "",
            fileUrl: uploadedFileURL || "",
            fileId: uploadedFileId || ""
        };

        console.log(post);
        formRef.current.reset();
        createPost(post, user.uid);
        setLoading(false);
        navigation("/");
    };

    const handlePreventSubmit = flag => {
        setLoading(flag);
    };

    return (
        <Page>
            <div className="app_inner">
                {!user ? (
                    <Welcome />
                ) : (
                    <form className="write_form" ref={formRef}>
                        <FileInput
                            file={file}
                            onFileChange={onFileChange}
                            onFileDelete={onFileDelete}
                            imageUploader={imageUploader}
                            handlePreventSubmit={handlePreventSubmit}
                        />
                        <textarea
                            ref={textareaRef}
                            placeholder="어디 한번 자랑해봐!"
                        ></textarea>
                        <button
                            className="cmm_btn loading"
                            onClick={onSubmit}
                            disabled={loading}
                        >
                            자랑하기
                        </button>
                    </form>
                )}
            </div>
        </Page>
    );
};

export default Write;
