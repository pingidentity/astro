import React from 'react';
import { Box } from '@pingux/astro';
import { paletteWrapper } from './PaletteWrapper.styles';

export default function PaletteWrapper({ children, ...others }) {
    return (
        <Box sx={paletteWrapper} {...others}>
            {children}
        </Box>
    );
}

