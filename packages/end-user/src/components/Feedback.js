import React from "react";
import classnames from "classnames";
import errorIcon from "../icons/error.svg";

const Message = ({children, type}) => {
    const classNames = classnames("feedback", {
        "feedback--error": type === "error"
    });

    return (
        <div className={classNames}>
            {type === "error" && <img className="feedback__icon" src={errorIcon} alt="Error"/>}
            <div className="feedback__message">
                {children}
            </div>
        </div>
    )
};

export default Message;
