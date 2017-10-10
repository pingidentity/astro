"use strict";

var React = require("react"),
    classnames = require("classnames");

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

var ValidationMessages = function (props) {
        
    var _getMessages = function () {
        var messages = [];

        messages = props.messages.map(function (item, i) {
            return (
                <div key={i} index={i} className="message">
                    <span className={item.status} />{item.text}
                </div>
            );
        }.bind(this));

        return messages;
    };

    var className = classnames("validation-messages", props.className);

    return (
        <div data-id={props["data-id"]} className={className}>
            {_getMessages()}
        </div>
    );
};

ValidationMessages.propTypes = {
    "data-id": React.PropTypes.string,
    messages: React.PropTypes.array.isRequired,
    className: React.PropTypes.string
};

ValidationMessages.defaultProps = {
    "data-id": "validation"
};

ValidationMessages.Status = Status;

module.exports = ValidationMessages;
