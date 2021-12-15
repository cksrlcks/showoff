import React from "react";
import Header from "./header";

const subPage = ({ children, title }) => {
    return (
        <>
            <Header title={title} />
            <div className="m_container">{children}</div>
        </>
    );
};

export default subPage;
