import React from 'react';

import { withKnobs } from '@storybook/addon-knobs';

import { Box, Row } from '../../.';

export default {
    title: 'Row',
    component: Row,
    decorators: [withKnobs],
};

export const Default = () => (
    <Box padding="xx" bg="accent.99">
        <Row>Content in the row</Row>
    </Box>
);

export const Selected = () => (
    <Box padding="xx" bg="accent.99">
        <Row isSelected>Content in the row</Row>
    </Box>
);
