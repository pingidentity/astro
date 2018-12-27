import React from 'react';
import PropTypes from 'prop-types';

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
    ? (object.map(item => <div className="serialized-data__list-item">{renderObject(item)}</div>))
    : Object.keys(object).map(dataKey => renderRow(dataKey, renderValue(object[dataKey])))
);

const SerializedData = ({ data }) => (
    <div className="serialized-data">{renderObject(data)}</div>
);

SerializedData.propTypes = {
    data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

SerializedData.defaultProps = {
    data: {},
};

export default SerializedData;
