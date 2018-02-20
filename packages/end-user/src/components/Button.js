import React from "react";
import classnames from "classnames";

const Button = ({disabled, label, primary}) => {
    const classNames = classnames("button",
        {
            "button--primary": primary,
            "button--disabled": disabled,
            "brand-primary-bg": primary,
        }
    );
    return(
        <button className={classNames} disabled={disabled || false}>{label}</button>
    )
};

export default Button;
