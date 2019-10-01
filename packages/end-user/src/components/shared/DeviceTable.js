import React from 'react';
import PropTypes from 'prop-types';

import Table from './Table';
import TextBlock from '../TextBlock';
import FlexRow, { alignment, flexDirectionOptions } from './FlexRow';
import Button from '../Button';
import DeviceIcon, { deviceTypes } from './DeviceIcon';

const getDevices = (devices, onDelete, hasDetails) => {
    return devices.map(({ details = "", name, type }) => {
        return (
            <FlexRow className="device-table__row no-mobile-break" key={name}>
                <div className="device-table__icon">
                    <DeviceIcon icon={type.toLowerCase()} />
                </div>
                <div style={{ flex: 1, flexGrow: 1, textAlign: 'left' }}>
                    <TextBlock className="device-table__row-details">
                        <span>
                            <div className="device-table__type">{type}</div>
                            <div className="device-table__name">{name}</div>
                        </span>
                    </TextBlock>
                </div>
                <div style={{ textAlign: 'right', flex: 1, flexGrow: 0 }}><Button iconName="delete" onClick={onDelete(name)} inline /></div>
            </FlexRow>
        );
    });
};

const DeviceTable = ({ devices, onDelete }) => {
    const hasDetails = devices.some(({ details }) => details !== undefined);
    return (
        <FlexRow flexDirection={flexDirectionOptions.COLUMN} className="device-table no-mobile-break">
            {getDevices(devices, onDelete)}
        </FlexRow>
    );
};

DeviceTable.propTypes = {
    devices: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
    })),
    onDelete: PropTypes.func,
};

DeviceTable.defaultProps = {
    devices: [],
    onDelete: () => { },
};

export default DeviceTable;
