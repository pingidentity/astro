import React from 'react';
import FloatLabel from "./FloatLabel";
import TextInput from "./TextInput";

const FloatLabelTextInput = ({label, id}) => (
    <FloatLabel label={label} id={id} InputType={TextInput}/>
);

export default FloatLabelTextInput;
