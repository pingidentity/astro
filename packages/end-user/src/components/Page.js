import React from "react";

const Page = ({children, footer, background}) => {
    const styles = background
        ? {
            background: `center / cover no-repeat url(${background})`
        }
        : {};

    return (
        <div className="page" style={styles}>
            <div className="page__content">{children}</div>
            {footer && <div className="page__footer">{footer}</div>}
        </div>
    );
};

export default Page;
