import React from 'react';
import { Box } from '@pingux/astro';
import { body } from './Body.styles';

const Body = ({ children, ...others }) => (
    <Box sx={body} {...others} isRow>
        {children}
    </Box>
);

export default Body;
