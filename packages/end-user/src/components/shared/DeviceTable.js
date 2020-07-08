import React from 'react';
import PropTypes from 'prop-types';

import TextBlock, { alignments } from '../TextBlock';
import FlexRow, { alignment, flexDirectionOptions, spacing } from './FlexRow';
import Button from '../Button';
import DeviceIcon, { deviceTypes } from './DeviceIcon';
import { overflowTypes } from '../TextBlock/TextBlock';

const getDevices = (devices, onDelete, hasDetails) => {
    return devices.map((device) => {
        const { details = "", name, type, id } = device;
        return (
            <FlexRow className="device-table__row no-mobile-break" key={id || name}>
                <div className="device-table__icon">
                    <DeviceIcon icon={type.toLowerCase()} />
                </div>
                <div className="device-table__row-info">
                    <div className="device-table__row-details">
                        <span>
                            <TextBlock
                                className="device-table__row-type"
                                alignment={alignments.LEFT}
                                overflow={overflowTypes.ELLIPSIS}
                                spacing="small"
                            >
                                {type}
                            </TextBlock>
                            <TextBlock
                                className="device-table__row-name"
                                alignment={alignments.LEFT}
                                overflow={overflowTypes.ELLIPSIS}
                                spacing="small"
                            >
                                {name}
                            </TextBlock>
                        </span>
                    </div>
                </div>
                <div className="device-table__row-delete">
                    <Button iconName="delete" onClick={onDelete(name, id)} inline />
                </div>
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
        id: PropTypes.string,
    })),
    onDelete: PropTypes.func,
};

DeviceTable.defaultProps = {
    devices: [],
    onDelete: () => { },
};

export default DeviceTable;
