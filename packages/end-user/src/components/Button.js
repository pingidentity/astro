import React from "react";
import classnames from "classnames";

const Button = ({disabled, label, primary}) => {
    const classNames = classnames("button",
        {
            "button--primary": primary,
            "button--disabled": disabled
        }
    );
    return(
        <button className={classNames}>{label}</button>
    )
};

export default Button;
