import React from 'react';
import Heading from './Heading';

export default {
    title: 'Components/Display/Heading',
    component: Heading,
};

export const Default = () => (
    <Heading>
        I&apos;m a heading!
    </Heading>
);

export const SubHeading = () => (
    <Heading level={4}>
        I&apos;m a sub-heading!
    </Heading>
);
