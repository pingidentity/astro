import React, { useState } from 'react';

import { CheckSVG, RightContentInput, makeIconButton } from '../../.';

const CheckButton = makeIconButton(CheckSVG, 'Save');

export default {
    title: 'Special Inputs/RightContentInput',
    component: RightContentInput,

};

export const Default = () => {
    const [value, onValueChange] = useState('https://my.pingfed.company.com/admin');
    return (
        <RightContentInput
            value={value}
            onValueChange={onValueChange}
            maxWidth="column"
            rightContent={<CheckButton isInverted isSquare />}
        />
    );
};
