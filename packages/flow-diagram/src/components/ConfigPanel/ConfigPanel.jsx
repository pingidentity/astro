import React from 'react';
import PropTypes from 'prop-types';
import { Clear } from '@pingux/icons';
import { Box, Text } from '@pingux/compass';
import { configPanel, configPanelClose, line } from './ConfigPanel.styles';

function ConfigPanel({ category, children, onClose, icon, color, ...others }) {
    return (
        <div css={configPanel} {...others}>
            <div css={configPanelClose}>
                <Clear onClick={onClose} data-testid="config-panel-close" />
            </div>
            <Box isRow alignItems="center">
                {React.cloneElement(icon, { fill: color, height: 18, width: 18 })}
                <Text m="15px 0px 15px 15px" fontSize={18} fontWeight="bold">{category}</Text>
            </Box>
            <hr css={line} />
            {children}
        </div>
    );
}

ConfigPanel.propTypes = {
    category: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.node,
    onClose: PropTypes.func,
};

export default ConfigPanel;
