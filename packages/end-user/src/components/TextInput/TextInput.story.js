import React from 'react';
import TextInput, { textInputTypes } from './TextInput';

export default {
    title: 'Components/Inputs/Text/Basic',
    component: TextInput,
};

export const Default = () => (<React.Fragment>
    <TextInput
        placeholder="Text"
    />
    <br/>
    <TextInput
        placeholder="Error"
        type={textInputTypes.ERROR}
        fieldMessage='Error Example Message'
    />
     <br/>
    <TextInput
        placeholder="Success"
        type={textInputTypes.SUCCESS}
        fieldMessage='Success Example Message'
    />
     <br/>
    <TextInput
        placeholder="Primary"
        type={textInputTypes.PRIMARY}
        fieldMessage='Primary Example Message'
    />
</React.Fragment>);
