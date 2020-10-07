import React from 'react';
import { HR } from '../../.';

export default {
    title: 'HR',
    component: HR,
};

export const Default = () => (
    <div>
        Above
        <HR />
        Below
    </div>
);

export const BlueWithGap = () => (
    <div>
        Above
        <HR gap="md" color="active" />
        Below
    </div>
);
