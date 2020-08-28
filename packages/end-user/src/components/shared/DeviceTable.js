import React from 'react';
import PropTypes from 'prop-types';

import TextBlock, { alignments } from '../TextBlock';
import FlexRow, { flexDirectionOptions } from './FlexRow';
import Button from '../Button';
import DeviceIcon from './DeviceIcon';
import { overflowTypes } from '../TextBlock/TextBlock';

const getDevices = (devices, onDelete, canDelete) => {
    return devices.map((device, index) => {
        const { name, type, typeLabel, id } = device;
        return (
            <FlexRow className="device-table__row no-mobile-break" key={id || name || index}>
                <div className="device-table__icon" key="icon">
                    <DeviceIcon icon={type.toLowerCase()} />
                </div>
                <div className="device-table__row-info" key="info">
                    <div className="device-table__row-details">
                        <span>
                            <TextBlock
                                className="device-table__row-type"
                                alignment={alignments.LEFT}
                                overflow={overflowTypes.ELLIPSIS}
                                spacing="small"
                                key="device-type"
                            >
                                {typeLabel || type}
                            </TextBlock>
                            <TextBlock
                                className="device-table__row-name"
                                alignment={alignments.LEFT}
                                overflow={overflowTypes.ELLIPSIS}
                                spacing="small"
                                key="device-name"
                            >
                                {name}
                            </TextBlock>
                        </span>
                    </div>
                </div>
                {canDelete && (
                    <div className="device-table__row-delete" key="delete">
                        <Button iconName="delete" onClick={onDelete(name, id)} inline/>
                    </div>
                )}
            </FlexRow>
        );
    });
};

const DeviceTable = ({ devices, onDelete, canDelete }) => {
    return (
        <FlexRow flexDirection={flexDirectionOptions.COLUMN} className="device-table no-mobile-break">
            {getDevices(devices, onDelete, canDelete)}
        </FlexRow>
    );
};

DeviceTable.propTypes = {
    devices: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
        typeLabel: PropTypes.string,
        id: PropTypes.string,
    })),
    onDelete: PropTypes.func,
    canDelete: PropTypes.bool,
};

DeviceTable.defaultProps = {
    devices: [],
    onDelete: () => { },
    canDelete: true,
};

export default DeviceTable;
