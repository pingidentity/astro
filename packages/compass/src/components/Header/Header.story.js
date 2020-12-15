import React from 'react';
import {
    Header,
    Box,
} from '../../.';

export default {
    title: 'Header',
    component: Header,
};

export const Default = () => (
    <Box bg="accent.99" pb="xl">
        <Header>
            Children are placed on the right
        </Header>
    </Box>
);
