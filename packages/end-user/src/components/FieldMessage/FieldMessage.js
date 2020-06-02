import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * @class FieldMessage
 * @description A component for inputting a country code and number
 * @param {node} [value]
 *    The field message
 * @param {string} [className]
 *    Optional classname to apply to the error container
 * @param {string} [data-id]
 *    Optional data-id
 * @param {string} [type]
 *    Determines the styling of the message
 */

const FieldMessage = ({
    className,
    ["data-id"]: dataId,
    type,
    value
}) => {
    const classNames = classnames(className, "field-message", {
        "field-message--error": type === "error",
        "field-message--success": type === "success"
    });

    return (
        <div
            data-id={dataId}
            className={classNames}>
            {value}
        </div>
    );
};

FieldMessage.propTypes = {
    'data-id': PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.node,
};

export default FieldMessage;
