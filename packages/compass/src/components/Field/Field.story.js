import React, { useState } from 'react';
import {
    Field,
    Input,
} from '../../.';

export default {
    title: 'Field',
    component: Field,
};

export const Default = () => {
    const [value, onValueChange] = useState('');

    return (
        <Field label="The Data" maxWidth="column">
            <Input onValueChange={onValueChange} value={value} />
        </Field>
    );
};
