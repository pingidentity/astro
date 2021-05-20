import React from 'react';
import PropTypes from 'prop-types';
import { Clear } from '@pingux/icons';
import { Box } from '@pingux/astro';
import { configPanel, configPanelClose } from './ConfigPanel.styles';

function ConfigPanel({ children, onClose, topPanel, styles, ...others }) {
    return (
        <Box sx={{ ...configPanel, ...styles }} {...others}>
            <Box sx={configPanelClose}>
                <Clear onClick={onClose} data-testid="config-panel-close" />
            </Box>
            {topPanel}
            {children}
        </Box>
    );
}

ConfigPanel.propTypes = {
    onClose: PropTypes.func,
    styles: PropTypes.object,
    topPanel: PropTypes.node,
};

export default ConfigPanel;
