import React from 'react';
import TextInput, { textInputTypes } from '../TextInput';

export default {
    title: 'Components/Inputs/FieldMessage',
    component: TextInput,
};

export const Default = () => (<React.Fragment>
    <TextInput
        placeholder="Text"
        fieldMessage="Here is a default message"
    />
    <TextInput
        placeholder="Error"
        type={textInputTypes.ERROR}
        fieldMessage="Here is an error message"
    />
    <TextInput
        placeholder="Success"
        type={textInputTypes.SUCCESS}
        fieldMessage="Here is a success message"
    />
    <TextInput
        placeholder="Primary"
        type={textInputTypes.PRIMARY}
        fieldMessage="Here is a primary (default) message"
    />
</React.Fragment>);
