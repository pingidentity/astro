import React from 'react';

import Button from './Button';

export default {
    title: 'Button',
    component: Button,
};

export const Default = () => (
    <Button>Click me</Button>
);

export const LinkButton = () => (
    <Button href="#">Go There</Button>
);
