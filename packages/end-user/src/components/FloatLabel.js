import React from 'react';

const FloatLabel = ({label, id, InputType, children}) => (
    <div className="float-label">
        <InputType className="float-label__input" placeholder={label} id={id}/>
        <label className="float-label__label" htmlFor={id}>{label}</label>
        {children}
    </div>
);

export default FloatLabel;
