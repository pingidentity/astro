import React from 'react';
import PasswordInput, { passwordInputTypes } from './PasswordInput';


export default {
    title: 'Components/Inputs/Password/Basic',
    component: PasswordInput,
};

export const Default = () => (
    <PasswordInput
        placeholder="Password"
    />
);

export const Error = () => (
    <PasswordInput
        placeholder="Error"
        type={passwordInputTypes.ERROR}
        fieldMessage="This is an error message"
    />
);

export const Success = () => (
    <PasswordInput
        placeholder="Success"
        type={passwordInputTypes.SUCCESS}
        fieldMessage="This is a success message"
    />
);
