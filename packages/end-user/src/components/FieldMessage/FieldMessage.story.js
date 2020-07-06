import React from 'react';
import TextInput, { textInputTypes } from '../TextInput';
import { fieldMessageStatuses } from './FieldMessage';

export default {
    title: 'Components/Inputs/FieldMessage',
    decorators: [],
    component: TextInput,
};

export const Default = () => (
    <TextInput
        placeholder="Text"
        fieldMessage="Here is a default message"
    />
);

export const Error = () => (
    <TextInput
        placeholder="Error"
        fieldMessage="Here is an error message"
        fieldMessageProps={{ status: fieldMessageStatuses.ERROR }}
    />
);

export const Info = () => (
    <TextInput
        placeholder="Info"
        fieldMessage="Here is an info message"
        fieldMessageProps={{ status: fieldMessageStatuses.INFO }}
    />
);

export const Success = () => (
    <TextInput
        placeholder="Success"
        fieldMessage="Here is a success message"
        fieldMessageProps={{ status: fieldMessageStatuses.SUCCESS }}
    />
);

export const Warning = () => (
    <TextInput
        placeholder="Warning"
        fieldMessage="Here is a warning message"
        fieldMessageProps={{ status: fieldMessageStatuses.WARNING }}
    />
);
