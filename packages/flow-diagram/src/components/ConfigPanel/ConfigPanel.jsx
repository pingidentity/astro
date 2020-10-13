import React from 'react';
import PropTypes from 'prop-types';
import { Clear } from '@pingux/icons';
import { Checkbox, Field, Input, Text } from '@pingux/compass';
import { configPanel, configPanelClose, configPanelInput } from './ConfigPanel.styles';

function ConfigPanel({ data, onClose, ...others }) {
    const getInput = (label, value) => {
        switch (typeof value) {
            case 'string':
                return (
                    <Field label={label} mb={10} width="85%">
                        <Input value={value} />
                    </Field>
                );
            case 'boolean':
                return (
                    <div css={configPanelInput}>
                        <Checkbox isChecked={value} label={label} className="config-panel--input" />
                    </div>
                );
            default:
                return (
                    <Field label={label} mb={10} width="85%">
                        <Input value={value} />
                    </Field>
                );
        }
    };

    return (
        <div css={configPanel} {...others}>
            <div css={configPanelClose}>
                <Clear onClick={onClose} data-testid="config-panel-close" />
            </div>
            <Text m="15px 0px 15px 0px" fontSize={18} fontWeight="bold">{data.category}</Text>
            {Object.entries(data.configuration).map(([name, value], i) => {
                return (
                    <React.Fragment key={name}>
                        {getInput(name, value)}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

ConfigPanel.propTypes = {
    data: PropTypes.object,
    onClose: PropTypes.func,
};

export default ConfigPanel;
