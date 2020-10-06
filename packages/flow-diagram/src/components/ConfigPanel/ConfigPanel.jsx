import React from 'react';
import PropTypes from 'prop-types';
import { Clear } from '@pingux/icons';
import { Checkbox, Field, Input } from '@pingux/compass';

import './ConfigPanel.css';

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
                    <Checkbox isChecked={value} label={label} className="config-panel--input" />
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
        <div className="config-panel">
            <div className="config-panel--close">
                <Clear onClick={onClose} />
            </div>
            {Object.entries(data.configuration).map(([name, value]) => {
                return getInput(name, value)
            })}
        </div>
    );
}

ConfigPanel.propTypes = {
    data: PropTypes.object,
    onClose: PropTypes.func,
};

export default ConfigPanel;
