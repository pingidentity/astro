import React from 'react';
import FormRow from './FormRow';
import TextInput from '../TextInput';

export default {
    title: 'Components/Inputs/FormRow',
    component: FormRow,
};

export const Default = () => (
    <FormRow>
        <TextInput
            id="firstName"
            placeholder="First Name"
        />
        <TextInput
            id="lastName"
            placeholder="Last Name"
        />
    </FormRow>
);
