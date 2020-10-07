import React, { useState } from 'react';
import { FloatLabelTextArea } from '../../.';

export default {
    title: 'Special Inputs/FloatLabelTextArea',
    component: FloatLabelTextArea,
};

export const Default = () => {
    const [value, onValueChange] = useState('https://my.pingfed.company.com/admin');
    return (
        <FloatLabelTextArea
            label="Admin URL"
            value={value}
            onValueChange={onValueChange}
            maxWidth="column"
            rows={5}
        />
    );
};
