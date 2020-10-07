import React from 'react';
import Button from '@pingux/compass-core/src/components/Button';
import { CloseButton, IconButton } from '../../.';

export default {
    title: 'CloseButton',
    component: CloseButton,
    subcomponents: { IconButton, Button },
};

export const Default = () => (
    <CloseButton>Look Here</CloseButton>
);

export const OnTheLeft = () => (
    <CloseButton right="auto" left="xs">Look Here</CloseButton>
);
