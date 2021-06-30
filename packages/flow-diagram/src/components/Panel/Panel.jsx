import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card } from '@pingux/astro';
import { panel, panelBody, panelTop } from './Panel.styles';

export default function Panel({ children, icon, title, styles, ...others }) {
    return (
        <Card sx={{ ...panel, ...styles }} {...others}>
            <Box isRow sx={panelTop}>
                <Box mr={10}>
                    {title}
                </Box>
                <Box>
                    {icon}
                </Box>
            </Box>
            <Box sx={panelBody} p={25}>
                {children}
            </Box>
        </Card>
    );
}

Panel.propTypes = {
    icon: PropTypes.node,
    styles: PropTypes.object,
    title: PropTypes.node,
};
