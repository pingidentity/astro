"use strict";

var PropTypes = require("prop-types");

var React = require("react"),
    classnames = require("classnames");

/** @class FormError
 * @desc A private component shared between form components which display a validation error.
 * @param {string} value
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
* @param {string} [data-id="row"]
*     To define the base "data-id" value for the top-level HTML container.
* @param {string} [className]
*     CSS classes to set on the top-level HTML container.
*/
class Message extends React.Component {
    static propTypes = {
        value: PropTypes.string,
        "data-id": PropTypes.string
    };

    render() {
        return (
            <div
                data-id={this.props["data-id"]}
                className={classnames(this.props.className, "form-error-message")}>
                {this.props.value}
            </div>
        );
    }
}

/**
* @class Icon
* @memberof FormError
* @desc The child tag/object used to display the error icon.
*
* @param {string} [data-id="row"]
*     To define the base "data-id" value for the top-level HTML container.
*/
class Icon extends React.Component {
    static propTypes = {
        show: PropTypes.bool,
        "data-id": PropTypes.string
    };

    render() {
        return (
            <div data-id={this.props["data-id"]} className="form-error-icon" />
        );
    }
}

exports.Message = Message;
exports.Icon = Icon;
