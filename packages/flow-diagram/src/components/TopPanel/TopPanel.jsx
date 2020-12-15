import React from 'react';
import { Box } from '@pingux/astro';
import { topPanel } from './TopPanel.styles';

const TopPanel = ({ children, ...others }) => (
    <Box sx={topPanel} {...others}>
        {children}
    </Box>
);

export default TopPanel;
