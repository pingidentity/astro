import React from "react";
import classnames from "classnames";

const PasswordInput = ({placeholder, id, className}) => (
    <input type="password" className={classnames("text-input", className)} placeholder={placeholder} id={id} name={id} />
);

export default PasswordInput;
