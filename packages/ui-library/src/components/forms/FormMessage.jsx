import React from "react";
import PropTypes from "prop-types";

/** @class FormMessage
 * @desc A private component shared between form components which display a validation error.
 *
 * @param {string} [data-id]
 *    Optional data-id
 * @param {node} [message]
 *    The message text to display
 * @param {string} [type=error]
 *    The type of message (error = red, info = blue, success = green, warning = yellow)
 *
 * @private
 */

const messageTypes = {
    ERROR: "error",
    INFO: "info",
    SUCCESS: "success",
    WARNING: "warning",
};

const FormMessage = ({
    "data-id": dataId,
    message,
    type,
}) => {
    const typeName = messageTypes[type] || messageTypes.ERROR;

    return (
        <div className="input-message" data-id={dataId}>
            <div
                data-id={`${dataId}-${typeName}-message-icon`}
                className={`input-message__icon`}
            />
            <div
                data-id={`${dataId}-${typeName}-message`}
                className={`input-message__text`}>
                {message}
            </div>
        </div>
    );
};

FormMessage.defaultProps = {
    "data-id": "form-message",
    type: messageTypes.ERROR,
};

FormMessage.propTypes = {
    "data-id": PropTypes.string,
    type: PropTypes.oneOf([
        messageTypes.ERROR,
        messageTypes.INFO,
        messageTypes.SUCCESS,
        messageTypes.WARNING,
    ])
};

FormMessage.messageTypes = messageTypes;

export default FormMessage;
