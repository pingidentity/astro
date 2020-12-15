import React from 'react';
import { Box } from '@pingux/astro';
import { leftContainer } from './LeftContainer.styles';


export default function LeftContainer({
    children,
    ...others
}) {
    return (
        <Box width="360px" height="100%" sx={leftContainer} {...others}>
            {children}
        </Box>
    );
}
