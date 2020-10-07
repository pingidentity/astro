import React from 'react';
import PropTypes from 'prop-types';
import { Clear } from '@pingux/icons';
import { Checkbox, Field, Input, Text } from '@pingux/compass';
import { configPanel, configPanelClose, configPanelInput } from './ConfigPanel.styles';

function ConfigPanel({ data, onClose }) {
    const getInput = (label, value) => {
        switch (typeof value) {
            case 'string':
                return (
                    <Field label={label} maxWidth="column" mb={10} width="85%">
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
                    <Field label={label} maxWidth="column" mb={10} width="85%">
                        <Input value={value} />
                    </Field>
                );
        }
    };

    return (
        <div css={configPanel}>
            <div css={configPanelClose}>
                <Clear onClick={onClose} />
            </div>
            <Text m="15px 0px 15px 0px" fontSize={18} fontWeight="bold">{data.type}</Text>
            {Object.entries(data.configuration).map(([name, value]) => {
                return getInput(name, value);
            })}
        </div>
    );
}

ConfigPanel.propTypes = {
    data: PropTypes.object,
    onClose: PropTypes.func,
};

export default ConfigPanel;
