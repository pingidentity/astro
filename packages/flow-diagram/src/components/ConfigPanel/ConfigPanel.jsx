import React from 'react';
import PropTypes from 'prop-types';
import { Clear } from '@pingux/icons';
import { Box, Text } from '@pingux/compass';
import Icon from '@mdi/react';
import { mdiDotsVertical } from '@mdi/js';
import { configPanel, configPanelClose, configPanelHeader, line } from './ConfigPanel.styles';

function ConfigPanel({ category, children, onClose, icon, color, ...others }) {
    return (
        <div css={configPanel} {...others}>
            <div css={configPanelClose}>
                <Clear onClick={onClose} data-testid="config-panel-close" />
            </div>
            <div css={configPanelHeader}>
                <Box isRow>
                    {icon}
                    <Text ml="12px" color="#253746" fontSize={15} fontWeight="bold" fontFamily="Helvetica">{category}</Text>
                </Box>
                <Icon
                    path={mdiDotsVertical}
                    size="33px"
                    color="#68747F"
                />
            </div>
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
