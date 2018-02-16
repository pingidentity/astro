import React from 'react';

const FloatLabel = ({label, id, InputType}) => (
    <div className="float-label">
        <InputType className="float-label__input" placeholder={label} id={id}/>
        <label className="float-label__label" htmlFor={id}>{label}</label>
    </div>
);

export default FloatLabel;
