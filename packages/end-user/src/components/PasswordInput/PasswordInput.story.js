import React from 'react';
import PasswordInput, { passwordInputTypes } from './PasswordInput';


export default {
    title: 'Components/Inputs/Password/Basic',
    component: PasswordInput,
};

export const Default = () => (<>
    <PasswordInput
        placeholder="Password"
    />
    <PasswordInput
        placeholder="Error"
        type={passwordInputTypes.ERROR}
    />
    <PasswordInput
        placeholder="Success"
        type={passwordInputTypes.SUCCESS}
    />
</>);
