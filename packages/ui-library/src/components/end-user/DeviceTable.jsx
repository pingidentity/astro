import React from "react";
import PropTypes from "prop-types";

import Table from "../tables/Table";
import Button from "../buttons/Button";
import DeviceIcon, { deviceTypes } from "./DeviceIcon";

const formatBodyData = (devices, onDelete, hasDetails) => {
    return devices.map(({ details = "", name, type }) => {
        const nameNode = (
            <React.Fragment>
                <DeviceIcon icon={type.toLowerCase()} />
                <div className="device-name">
                    {name}
                    <span className="device-name__type">{type}</span>
                </div>
            </React.Fragment>);
        return [
            nameNode,
            type,
            ...hasDetails ? [details] : [],
            <Button iconName="delete" onClick={onDelete(name)} inline/>
        ];
    });
};

const DeviceTable = ({ devices, onDelete }) => {
    const hasDetails = devices.some(({ details }) => details !== undefined);
    return (
        <Table
            headData={["name","type", ...hasDetails ? [""] : [], " "]}
            bodyData={formatBodyData(devices, onDelete, hasDetails)}
            className="width-full device-table"
        />
    );
};

DeviceTable.propTypes = {
    devices: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.oneOf(Object.values(deviceTypes)),
    })),
    onDelete: PropTypes.func,
};

DeviceTable.defaultProps = {
    devices: [],
    onDelete: () => {},
};

export default DeviceTable;
