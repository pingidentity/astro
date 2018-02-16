import React from 'react';
import FloatLabel from "./FloatLabel";
import PasswordInput from "./PasswordInput";

const FloatLabelPasswordInput = ({label, id}) => (
    <FloatLabel label={label} id={id} InputType={PasswordInput}/>
);

export default FloatLabelPasswordInput;
