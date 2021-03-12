import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, Text } from '@pingux/astro';
import { mdiArrowCollapseLeft } from '@mdi/js';
import Icon from '@mdi/react';
import { panel, panelBody, panelTop } from './Panel.styles';

export default function Panel({ children, onCollapse, title, subtitle, styles, ...others }) {
    return (
        <Card sx={{ ...panel, ...styles }} {...others}>
            <Box isRow sx={panelTop}>
                <Box>
                    <Text sx={{ color: '#68747F', fontSize: 15 }}>{title}</Text>
                    <Text sx={{ color: '#253746', fontSize: 15, fontWeight: 700 }}>{subtitle}</Text>
                </Box>
                <Icon
                    path={mdiArrowCollapseLeft}
                    size={1}
                    color="#253746"
                    onClick={onCollapse}
                />
            </Box>
            <Box sx={panelBody} p={25} w="100%">
                {children}
            </Box>
        </Card>
    );
}

Panel.propTypes = {
    onCollapse: PropTypes.func,
    styles: PropTypes.object,
    subtitle: PropTypes.string,
    title: PropTypes.string,
};
