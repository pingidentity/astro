import React, { useState } from 'react';
import { Input } from '../../.';

export default {
    title: 'Input',
    component: Input,
};

export const Default = () => {
    const [value, onValueChange] = useState('https://my.pingfed.company.com/admin');
    return (
        <Input value={value} onValueChange={onValueChange} maxWidth="column" />
    );
};
