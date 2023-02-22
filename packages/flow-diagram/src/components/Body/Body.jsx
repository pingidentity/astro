import React from 'react';
import { Box } from '@pingux/astro';
import { body } from './Body.styles';

function Body({ children, ...others }) {
    return (
        <Box sx={body} {...others} isRow>
            {children}
        </Box>
    );
}

export default Body;
