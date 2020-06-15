import React from 'react';
import TextInput, { textInputTypes } from '../TextInput';
import FloatLabelTextInput from '../FloatLabelTextInput'
import { fieldMessageStatuses } from './FieldMessage';

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
        fieldMessage="Here is an error message"
        fieldMessageStatus={fieldMessageStatuses.ERROR}
    />
    <TextInput
        placeholder="Info"
        fieldMessage="Here is a success message"
        fieldMessageStatus={fieldMessageStatuses.INFO}
    />
    <TextInput
        placeholder="Success"
        fieldMessage="Here is a success message"
        fieldMessageStatus={fieldMessageStatuses.SUCCESS}
    />
    <TextInput
        placeholder="Warning"
        fieldMessage="Here is a success message"
        fieldMessageStatus={fieldMessageStatuses.WARNING}
    />
    <TextInput
        placeholder="Primary"
        fieldMessage="Here is a primary (default) message"
        fieldMessageStatus={fieldMessageStatuses.DEFAULT}
    />
</React.Fragment>);
