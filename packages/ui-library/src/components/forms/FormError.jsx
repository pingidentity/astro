"use strict";

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
var FormError = React.createClass({
    propTypes: {
        value: React.PropTypes.string,
        "data-id": React.PropTypes.string
    },

    render: function () {
        if (!this.props.value) {
            return null;
        }

        var className = classnames(this.props.className, "help-tooltip form-error-message show");

        return (
            <div className={className} data-id={this.props["data-id"]}>
                <div className="tooltip-text">
                    <div className="tooltip-text-content">{this.props.value}</div>
                </div>
            </div>);
    }
});

module.exports = FormError;
