import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@pingux/astro';
import { container } from './PanelContainer.styles';

export default function PanelContainer({ children, styles, ...others }) {
    return (
        <Box isRow sx={{ ...container, ...styles }} {...others}>
            {children}
        </Box>
    );
}

PanelContainer.propTypes = {
    styles: PropTypes.object,
};
