import PropTypes from "prop-types";
import React, { useEffect } from "react";
import classnames from "classnames";
import { createCustomEvent } from "../../util/Utils";

/** @class FormError
 * @desc A private component shared between form components which display a validation error.
 * @param {node} value
 *    The error message
 * @param {string} [className]
 *    Optional classname to apply to the error container
 * @param {string} [data-id]
 *    Optional data-id
 * @private
 */

/**
* @class Message
* @memberof FormError
* @desc The child tag/object used to display the error message text
*
* @param {string} [data-id="form-error"]
*     To define the base "data-id" value for the top-level HTML container.
* @param {string} [className]
*     CSS classes to set on the top-level HTML container.
*/
export const Message = ({
    className,
    ["data-id"]: dataId,
    value
}) => {
    useEffect(() => {
        const event = createCustomEvent("ui-library-error", "FormErrorMessage");
        document.body.dispatchEvent(event);
    }, []);
    return (
        <div
            data-id={dataId}
            className={classnames(className, "form-error-message")}>
            {value}
        </div>
    );
};

Message.displayName = "FormErrorMessage";

Message.propTypes = {
    value: PropTypes.node,
    "data-id": PropTypes.string
};

Message.defaultProps = {
    "data-id": "form-error"
};

/**
* @class Icon
* @memberof FormError
* @desc The child tag/object used to display the error icon.
*
* @param {string} [data-id="form-error-icon"]
*     To define the base "data-id" value for the top-level HTML container.
*/
export const Icon = ({
    ["data-id"]: dataId
}) => {
    return (
        <div data-id={dataId} className="form-error-icon" />
    );
};

Icon.displayName = "FormErrorIcon";

Icon.propTypes = {
    "data-id": PropTypes.string
};

Icon.defaultProps = {
    "data-id": "form-error-icon"
};

export default {
    Icon,
    Message
};
