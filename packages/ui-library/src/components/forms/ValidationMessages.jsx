import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";

import StatusIndicator from "../general/StatusIndicator";

/**
* @class ValidationMessages
*
* @desc ValidationMessages is a tooltip to display next to an input with
*                  an array of messages, each consisting of a line of text and a status.
*
* @param {ValidationMessages.Status} status
*     The status determines whether the text is for a failing or passing message
*
* @param {ValidationMessages~messages[]} messages
*     Array of messages objects to render, composed of 'text' and 'status'.
*
* @param {string} [className]
*     CSS classes to set on the top-level HTML container.
* @param {boolean} [show]
*     If true, shows the messages.
*
* @example
*     <ValidationMessages
*                 messages=messages={[
*                   { text: "At least 6 characters", status: ValidationMessages.Status.FAIL },
*                   { text: "1 number", status: ValidationMessages.Status.PASS },
*                   { text: "1 UPPERCASE letter", status: ValidationMessages.Status.PASS }
*                 ]} />
*/

/**
 * @enum {string}
 * @alias ValidationMessages.Status
 */
var Status = {
    /** icon-success */
    PASS: "icon-success",
    /** icon-fail */
    FAIL: "icon-fail"
};

const StatusTypes = {
    [Status.PASS]: StatusIndicator.Types.SUCCESS,
    [Status.FAIL]: StatusIndicator.Types.EMPTY,
};

const ValidationMessages = function ({
    className,
    "data-id": dataId,
    messages,
    show
}) {
    return (
        <div
            data-id={dataId}
            className={classnames(
                "validation-messages",
                className,
                {
                    "validation-messages--show": show
                }
            )}>
            {messages.map(({ status, text }, i) => {
                return (
                    <StatusIndicator
                        className="message"
                        key={`${status}-${text}-${i}`}
                        type={StatusTypes[status]}>
                        {text}
                    </StatusIndicator>
                );
            })}
        </div>
    );
};

ValidationMessages.propTypes = {
    "data-id": PropTypes.string,
    messages: PropTypes.array.isRequired,
    className: PropTypes.string,
    show: PropTypes.bool
};

ValidationMessages.defaultProps = {
    "data-id": "validation",
    show: false
};

ValidationMessages.Status = Status;

export default ValidationMessages;
