import React from 'react';
import { Box } from '@pingux/astro';
import { diagramWrapper } from './DiagramWrapper.styles';

export default function DiagramWrapper({ children, ...others }) {
    return (
        <Box sx={diagramWrapper} {...others}>
            {children}
        </Box>
    );
}
