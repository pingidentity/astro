import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@pingux/astro';
import { leftContainer } from './LeftContainer.styles';


export default function LeftContainer({
    children,
    styles,
    ...others
}) {
    return (
        <Box sx={{ ...leftContainer, ...styles }} {...others}>
            {children}
        </Box>
    );
}

LeftContainer.propTypes = {
    styles: PropTypes.object,
};
