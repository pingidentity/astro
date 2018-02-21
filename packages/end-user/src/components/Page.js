import React from "react";

const Page = ({children, footer, background}) => {
    return (
        <div className="page brand-background">
            <div className="page__content">{children}</div>
            {footer && <div className="page__footer brand-footer-color">{footer}</div>}
        </div>
    );
};

export default Page;
