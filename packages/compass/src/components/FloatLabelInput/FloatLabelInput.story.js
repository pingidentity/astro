import React, { useState } from 'react';
import { FloatLabelInput } from '../../.';

export default {
    title: 'Special Inputs/FloatLabelInput',
    component: FloatLabelInput,
};

export const Default = () => {
    const [value, onValueChange] = useState('https://my.pingfed.company.com/admin');
    return (
        <FloatLabelInput
            label="Admin URL"
            value={value}
            onValueChange={onValueChange}
            maxWidth="column"
        />
    );
};
