import React from 'react';
import { Box } from '@pingux/astro';
import { outerContainer } from './OuterContainer.styles';

export default function OuterContainer({ children, ...others }) {
    return (
        <Box sx={outerContainer} {...others}>
            {children}
        </Box>
    );
}
