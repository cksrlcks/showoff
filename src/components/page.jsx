import React from "react";
import Header from "./header";
import Navigation from "./navigation";

const Page = ({ children }) => {
    return (
        <>
            <Header />
            <div className="m_container">{children}</div>
            <Navigation />
        </>
    );
};

export default Page;
