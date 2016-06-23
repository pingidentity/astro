"use strict";

var React = require("react");
var FormTextField = require("../../forms/form-text-field");

/**
 * @class TextFieldCell
 *
 * @desc TextFieldCell renders data into a FormTextField inside a cell.
 *
 * @param {string} [className] - extra CSS classes to be applied
 * @param {string} [data-id] - it is used for a unique data-id
 * @param {number} [value] - data to display on FormTextField
 * @param {TextFieldCell~onChangeCallback} [onCallBack] - callback to be triggered when FormTextField's value is changed
 **/
var TextFieldCell = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        className: React.PropTypes.string,
        onCallBack: React.PropTypes.func,
        value: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            "data-id": "grid-textfield-cell",
        };
    },

    render: function () {
        return (
            <FormTextField data-id={this.props["data-id"]}
                    className={this.props.className}
                    value={this.props.value}
                    onChange={this.props.onCallBack}
            />
        );
    }
});

module.exports = TextFieldCell;