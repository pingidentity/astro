import React from "react";
import classnames from "classnames";

const Stack = ({children, header}) => {
    const classNames = classnames("stack",
        {
            "stack--with-header": header
        }
    );

    return (
        <div className={classNames}>
            {children}
        </div>
    )
};

export default Stack;
