import React from 'react';
import PropTypes from 'prop-types';
import { Clear } from '@pingux/icons';
import { Box, Text } from '@pingux/astro';
import Icon from '@mdi/react';
import { mdiDotsVertical } from '@mdi/js';
import Separator from '@pingux/astro/lib/components/Separator';
import { configPanel, configPanelClose, configPanelHeader } from './ConfigPanel.styles';

function ConfigPanel({ category, children, onClose, icon, color, ...others }) {
    return (
        <Box sx={configPanel} {...others}>
            <Box sx={configPanelClose}>
                <Clear onClick={onClose} data-testid="config-panel-close" />
            </Box>
            <Box sx={configPanelHeader} isRow>
                <Box isRow>
                    {icon}
                    <Text ml="12px" color="#253746" fontSize={15} fontWeight="bold" fontFamily="Helvetica">{category}</Text>
                </Box>
                <Icon
                    path={mdiDotsVertical}
                    size="33px"
                    color="#68747F"
                />
            </Box>
            <Separator />
            {children}
        </Box>
    );
}

ConfigPanel.propTypes = {
    category: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.node,
    onClose: PropTypes.func,
};

export default ConfigPanel;
