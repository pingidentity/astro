import React from 'react';
import classnames from "classnames";

const TextInput = ({placeholder, id, className}) => (
    <input type="text" className={classnames("text-input", className)} placeholder={placeholder} id={id} name={id} />
);

export default TextInput;
