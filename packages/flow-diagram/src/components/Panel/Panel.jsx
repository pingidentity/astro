import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, Text } from '@pingux/astro';
import { panel, panelBody, panelTop } from './Panel.styles';

export default function Panel({ children, icon, title, subtitle, styles, ...others }) {
    return (
        <Card sx={{ ...panel, ...styles }} {...others}>
            <Box isRow sx={panelTop}>
                <Box mr={10}>
                    <Text sx={{ color: '#68747F', fontSize: 15 }}>{title}</Text>
                    <Text sx={{ color: '#253746', fontSize: 15, fontWeight: 700 }}>{subtitle}</Text>
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
    subtitle: PropTypes.string,
    title: PropTypes.string,
};
