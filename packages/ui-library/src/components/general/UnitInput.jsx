"use strict";

var PropTypes = require("prop-types");

var React = require("react"),
    FormDropDownList = require("../forms/FormDropDownList"),
    FormTextField = require("../forms/form-text-field"),
    classnames = require("classnames");

/**
 * @class UnitInput
 * @desc  A text field and drop-down compound input for entering a unit and a value.
 *
 * @param {string} [data-id="unit-selection"]
 *     The data-id assigned to the top-level of the component
 * @param {string}   [className]
 *     CSS class names to assign to the top-level of the component
 * @param {string}   [labelText]
 *     The label text for the compound input
 * @param {object} [textFieldProps]
 *              The value to the properties for the FormTextField
 * @param {object} [dropDownListProps]
 *              The value of the properties for the DropDownList
 */
module.exports = class extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        labelText: PropTypes.string,
        labelHelpText: PropTypes.string,
        textFieldProps: PropTypes.object,
        dropDownListProps: PropTypes.object
    };

    static defaultProps = {
        "data-id": "unit-input"
    };

    render() {
        var containerClassName = classnames(
            "input-textselect",
            "unit-input",
            this.props.className
        );

        return (
            <div className={containerClassName} data-id={this.props["data-id"]}>
                <label className="detached">
                    {this.props.labelText}
                </label>
                <FormTextField
                    {...this.props.textFieldProps}
                />
                <FormDropDownList
                    {...this.props.dropDownListProps}
                />
            </div>
        );
    }
};
