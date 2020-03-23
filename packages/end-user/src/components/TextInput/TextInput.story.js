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
    <TextInput
        placeholder="Error"
        type={textInputTypes.ERROR}
    />
    <TextInput
        placeholder="Success"
        type={textInputTypes.SUCCESS}
    />
    <TextInput
        placeholder="Primary"
        type={textInputTypes.PRIMARY}
    />
</React.Fragment>);
