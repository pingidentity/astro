import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

const renderValue = (value) => {
    if (typeof value === 'object') {
        return <SerializedData data={value} />;
    }
    return value;
};

const renderRow = (dataKey, value) => (
    <div className="serialized-data__item" key={dataKey}>
        <div className="serialized-data__key">{dataKey}:</div>
        <div className="serialized-data__value">{value}</div>
    </div>
);

const renderObject = object => (Array.isArray(object)
    ? (object.map(item => (
        <div className="serialized-data__list-item" key={uuid()}>{renderObject(item)}</div>
    )))
    : Object.keys(object).map(dataKey => renderRow(dataKey, renderValue(object[dataKey])))
);

/**
 * Display an array or object in an organized fashion
 */
const SerializedData = ({ data }) => (
    <div className="serialized-data">{renderObject(data)}</div>
);

SerializedData.propTypes = {
    /**
     * Data to show in the rows
     */
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

SerializedData.defaultProps = {
    data: {},
};

export default SerializedData;
