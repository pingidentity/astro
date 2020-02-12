import React from 'react';
import Requirements from './Requirements';

export default {
    title: 'Components/Display/Requirements',
    component: Requirements,
};

export const Default = () => (
    <Requirements
        requirements={[
            {
                name: '6 characters',
                status: 'no',
            },
            {
                name: '1 UPPERCASE letter',
                status: 'yes',
            },
            {
                name: '1 lowercase letter',
                status: 'yes',
            },
            {
                name: '1 number (0-9)',
                status: 'no',
            },
        ]}
    />
);
