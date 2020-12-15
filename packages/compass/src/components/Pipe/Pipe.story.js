import React from 'react';
import { Pipe } from '../../.';

export default {
    title: 'Pipe',
    component: Pipe,
};

export const Default = () => (
    <React.Fragment>
        <Pipe color="neutral.30" gap="md" />
        Text
        <Pipe color="neutral.30" gap="md" />
        Between
        <Pipe color="neutral.30" gap="md" />
        Pipes
        <Pipe color="neutral.30" gap="md" />
    </React.Fragment>
);

