"use strict";

var React = require("react");
var FormCheckbox = require("../../forms/FormCheckbox.jsx");

/**
 * @class CheckboxCell
 *
 * @desc CheckboxCell displays a checkbox to a cell where users can check or uncheck it inside a cell.
 *       This component is necessary because the value of Checkbox is "checked".
 *       Then it must be wrapped by another component which has "value" as the value
 *
 * @param {string} [className] - extra CSS classes to be applied
 * @param {string} [data-id] - it is used for a unique data-id
 * @param {number} [value] - data to determine the checkbox is checked or not
 * @param {CheckboxCell~onChangeCallback} [onCallBack] - callback to be triggered when checkbox is checked or unchecked
 **/
var CheckboxCell = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        className: React.PropTypes.string,
        onCallBack: React.PropTypes.func,
        value: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            "data-id": "grid-checkbox-cell",
        };
    },

    render: function () {
        return (
            <FormCheckbox data-id={this.props["data-id"]}
                    className={this.props.className}
                    checked={this.props.value}
                    onChange={this.props.onCallBack}
            />
        );
    }
});

module.exports = CheckboxCell;