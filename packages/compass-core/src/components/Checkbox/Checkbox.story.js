import React, { useState } from 'react';

import Checkbox from './Checkbox';

export default {
    title: 'Checkbox',
    component: Checkbox,
};

export const Default = () => (
    <Checkbox />
);

export const WithState = () => {
    const [isChecked, setIsChecked] = useState(true);
    const handleChange = checked => setIsChecked(checked);
    return (
        <Checkbox isChecked={isChecked} onChange={handleChange} />
    );
};
