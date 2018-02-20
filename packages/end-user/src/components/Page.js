import React from "react";

const Page = ({children, footer, background}) => {
    return (
        <div className="page brand-background">
            <div className="page__content">{children}</div>
            {footer && <div className="page__footer">{footer}</div>}
        </div>
    );
};

export default Page;
