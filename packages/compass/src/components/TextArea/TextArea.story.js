import React, { useState } from 'react';

import { TextArea } from '../../.';

export default {
    title: 'TextArea',
    component: TextArea,

};

export const Default = () => {
    const [value, onValueChange] = useState('Hey, there!');

    return (
        <TextArea
            value={value}
            onValueChange={onValueChange}
            maxWidth="column"
            rows={5}
        />
    );
};
