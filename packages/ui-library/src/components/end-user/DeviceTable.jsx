import React from "react";
import PropTypes from "prop-types";

import Table from "../tables/Table";
import Button from "../buttons/Button";
import DeviceIcon from "./DeviceIcon";

const formatBodyData = (devices, onDelete) => {
    return devices.map(({ name, type }) => {
        const nameNode = (
            <React.Fragment>
                <DeviceIcon icon={type.toLowerCase()} />
                <div className="device-name">
                    {name}
                    <span className="device-name__type">{type}</span>
                </div>
            </React.Fragment>);
        return [nameNode, type, <Button iconName="delete" onClick={onDelete(name)} inline/>];
    });
};

const DeviceTable = ({ devices, onDelete }) => {
    return (
        <Table
            headData={["name","type", " "]}
            bodyData={formatBodyData(devices, onDelete)}
            className="width-full device-table"
        />
    );
};

DeviceTable.propTypes = {
    devices: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.oneOf(["Email", "SMS"]),
    })),
    onDelete: PropTypes.func,
};

DeviceTable.defaultProps = {
    devices: {},
    onDelete: () => {},
};

export default DeviceTable;
