import React from 'react';
import classnames from "classnames";

const TextInput = ({placeholder, id, className, error}) => {
    const classNames = classnames("text-input", className, {
        "text-input--error": error
    });

    return (
        <input type="text" className={classNames} placeholder={placeholder} id={id} name={id} />
    );
};

export default TextInput;
