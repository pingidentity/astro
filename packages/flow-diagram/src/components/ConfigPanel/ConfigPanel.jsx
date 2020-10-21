import React from 'react';
import PropTypes from 'prop-types';
import { Clear } from '@pingux/icons';
import { Text } from '@pingux/compass';
import { configPanel, configPanelClose } from './ConfigPanel.styles';

function ConfigPanel({ category, children, onClose, ...others }) {
    return (
        <div css={configPanel} {...others}>
            <div css={configPanelClose}>
                <Clear onClick={onClose} data-testid="config-panel-close" />
            </div>
            <Text m="15px 0px 15px 0px" fontSize={18} fontWeight="bold">{category}</Text>
            {children}
        </div>
    );
}

ConfigPanel.propTypes = {
    category: PropTypes.string,
    onClose: PropTypes.func,
};

export default ConfigPanel;
