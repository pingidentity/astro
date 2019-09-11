import React from 'react';
import PropTypes from 'prop-types';

import Table from './Table';
import Button from '../Button';
import DeviceIcon, { deviceTypes } from './DeviceIcon';

const formatBodyData = (devices, onDelete, hasDetails) => {
    return devices.map(({ details = "", name, type }) => {
        const nameNode = (<DeviceIcon icon={type.toLowerCase()} />);
        return [
            nameNode,
            <div className="device-name">
                {name}
            </div>,
            ...hasDetails ? [details] : [],
            <div style={{ textAlign: 'right' }}><Button iconName="delete" onClick={onDelete(name)} inline /></div>
        ];
    });
};

const DeviceTable = ({ devices, onDelete }) => {
    const hasDetails = devices.some(({ details }) => details !== undefined);
    return (
        <Table
            bodyData={formatBodyData(devices, onDelete, hasDetails)}
            className="width-full device-table"
        />
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
