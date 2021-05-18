import React, { useState } from 'react';
import zxcvbn from 'zxcvbn';

import PasswordStrengthMeter from './PasswordStrengthMeter';
import TextInput from '../TextInput';

export default {
    title: 'Components/Inputs/PasswordStrengthMeter',
    component: PasswordStrengthMeter,
};

export const Default = () => {
    const [password, setPassword] = useState('');

    let score;

    // Adjust password score returned from zxcvbn
    if (password.length === 0) {
        score = 0;
    } else if (zxcvbn(password).score === 0) {
        score = 1;
    } else {
        score = zxcvbn(password).score;
    }

    return (
        <div>
            <TextInput
                onChange={({ target }) => setPassword(target.value)}
                placeholder="Enter a password"
                value={password}
                width="MAX"
            />
            <PasswordStrengthMeter
                score={score}
            />
        </div>
    );
}