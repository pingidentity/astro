import React from "react";
import classnames from "classnames";
import errorIcon from "../icons/error.svg";
import alertIcon from "../icons/alert.svg";

const Message = ({children, type}) => {
    const classNames = classnames("feedback", {
        "feedback--error": type === "error",
        "feedback--alert": type === "alert"
    });

    return (
        <div className={classNames}>
            {type === "error" && <img className="feedback__icon" src={errorIcon} alt="Error"/>}
            {type === "alert" && <img className="feedback__icon" src={alertIcon} alt="Alert"/>}
            <div className="feedback__message">
                {children}
            </div>
        </div>
    )
};

export default Message;
