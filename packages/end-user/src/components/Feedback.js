import React from "react";
import classnames from "classnames";

const Message = ({children, type}) => {
    const classNames = classnames("feedback", {
        "feedback--error": type === "error"
    });

    return (
        <div className={classNames}>
            {type === "error" && <img className="feedback__icon" src="../icons/error.svg" alt="Error"/>}
            {children}
        </div>
    )
};

export default Message;
