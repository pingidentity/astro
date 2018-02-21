import React from "react";

const Form = ({children}) => {
    return (
        <form className="form">
            {children}
        </form>
    )
};

export default Form;
