import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import {
    mdiDotsVertical,
} from '@mdi/js';

export const DeviceSelectorTitle = ({ children }) => (
    <div className="device-selector__item-title">
        {children}
    </div>
);

export const DeviceSelectorDescription = ({ children }) => (
    <div className="device-selector__item-description">
        {children}
    </div>
);

export const DeviceSelectorOption = ({
    icon,
    status,
    controls,
    children,
    onClick,
}) => (
    <div className="device-selector__item" onClick={onClick}>
        <div className="device-selector__item-icon">
            {icon}
        </div>
        <div className="device-selector__item-details">
            {children}
        </div>
        <div className="device-selector__item-status">
            {status}
        </div>
        <div className="device-selector__item-controls">
            {controls}
        </div>
    </div>
);

const DeviceSelector = ({
    children,
    'data-id': dataId,
}) => {
    return (
        <div data-id={dataId} className="device-selector">
            {children}
        </div>
    );
};

DeviceSelector.propTypes = {
    'data-id': PropTypes.string,
};

export default DeviceSelector;