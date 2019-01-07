"use strict";
var PropTypes = require("prop-types");
var React = require("react"),
    classnames = require("classnames");

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
    PASS: "icon-success",
    FAIL: "icon-fail"
};

const StatusTypes = {
    [Status.PASS]: StatusIndicator.Types.SUCCESS,
    [Status.FAIL]: StatusIndicator.Types.ERROR,
};

var ValidationMessages = function (props) {

    var _getMessages = function () {
        return props.messages.map(function (item, i) {
            return (
                <StatusIndicator
                    className="message"
                    key={i}
                    type={StatusTypes[item.status]}>
                    {item.text}
                </StatusIndicator>
            );
        }.bind(this));
    };

    var className = classnames("validation-messages", props.className);

    return (
        <div data-id={props["data-id"]} className={className}>
            {_getMessages()}
        </div>
    );
};

ValidationMessages.propTypes = {
    "data-id": PropTypes.string,
    messages: PropTypes.array.isRequired,
    className: PropTypes.string
};

ValidationMessages.defaultProps = {
    "data-id": "validation"
};

ValidationMessages.Status = Status;

module.exports = ValidationMessages;
