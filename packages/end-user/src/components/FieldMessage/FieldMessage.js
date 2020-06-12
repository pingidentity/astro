import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * @enum {string}
 * @alias FieldMessage~fieldMessageStatuses
 * @desc Enum for the different types of text input styling
 */
export const fieldMessageStatuses = {
    PRIMARY: 'primary',
    INFO: 'info',
    ERROR: 'error',
    SUCCESS: 'success',
    WARNING: 'warning',
};

/**
 * @class FieldMessage
 * @description A component for inputting a country code and number
 * @param {node} [children]
 *    Elements to display as the message
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
    status,
    children
}) => {
    const classNames = classnames(className, "field-message", {
        "field-message--error": status === fieldMessageStatuses.ERROR,
        "field-message--info": status === fieldMessageStatuses.INFO,
        "field-message--primary": status === fieldMessageStatuses.PRIMARY,
        "field-message--success": status === fieldMessageStatuses.SUCCESS,
        "field-message--warning": status === fieldMessageStatuses.WARNING
    });

    return (
        <div
            data-id={dataId}
            className={classNames}
        >
            {children}
        </div>
    );
};

FieldMessage.propTypes = {
    'data-id': PropTypes.string,
    children: PropTypes.node,
    status: PropTypes.oneOf(Object.values(fieldMessageStatuses)),
};

FieldMessage.defaultProps = {
    status: fieldMessageStatuses.PRIMARY
};

export default FieldMessage;
