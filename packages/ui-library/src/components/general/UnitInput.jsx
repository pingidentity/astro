"use strict";

var PropTypes = require("prop-types");

var React = require("react"),
    FormDropDownList = require("../forms/FormDropDownList"),
    FormTextField = require("../forms/form-text-field"),
    classnames = require("classnames");

/**
 * @callback UnitInput~onTextValueChange
 * @param {string} Unit of Value
 *              Unit of value represented as a formatted string.
 */

 /**
  * @callback UnitInput~onDropdownValueChange
  * @param {string} Unit of Value
  *              Unit of value represented as a formatted string.
  */

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
 * @param {string|object} [value]
 *     The value to be set in the text field
 * @property {string|object} selectedOption
 *     The selected option or value of the select option.
 * @param {UnitInput~onTextValueChange} onTextValueChange
 *     Callback to be triggered when the text field element value changes
 * @param {UnitInput~onDropdownValueChange} onDropdownValueChange
 *     Callback to be triggered when the select element value changes
 */
module.exports = class extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.object).isRequired,
        labelText: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        selectedOption: PropTypes.object,
        onTextValueChange: PropTypes.func.isRequired,
        onDropdownValueChange: PropTypes.func.isRequired,
        textFieldClassName: PropTypes.string,
        dropDownClassName: PropTypes.string,
        errorMessage: PropTypes.string,
        required: PropTypes.bool,
        disabled: PropTypes.bool,
        labelHelpText: PropTypes.string,
    };

    static defaultProps = {
        value: "",
        "data-id": "unit-input",
        textFieldClassName: "input-width-xsmall",
        dropDownClassName: "input-width-xsmall",
        required: false,
        disabled: false
    };

    render() {
        var containerClassName = classnames(
            "input-textselect",
            "unit-input",
            this.props.className,
            this.props.disabled
        );

        return (
            <div className={containerClassName} data-id={this.props["data-id"]}>
                <label className="detached">
                    {this.props.labelText}
                </label>
                <FormTextField
                    onChange={this.props.onTextValueChange}
                    value={this.props.value}
                    required={this.props.required}
                    disabled={this.props.disabled}
                    className={this.props.textFieldClassName} />
                <FormDropDownList
                    options={this.props.options}
                    selectedOption={this.props.selectedOption}
                    onValueChange={this.props.onDropdownValueChange}
                    labelHelpText={this.props.labelHelpText}
                    disabled={this.props.disabled}
                    className={this.props.dropDownClassName}
                />
            </div>
        );
    }
};
