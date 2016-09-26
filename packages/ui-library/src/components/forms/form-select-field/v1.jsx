"use strict";

var React = require("react"),
    classnames = require("classnames"),
    FormError = require("../FormError.jsx"),
    HelpHint = require("../../tooltips/HelpHint.jsx");

/**
* @callback FormSelectField~onChange
* @ignore
*
*
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @class FormSelectField
* @ignore
*
* @desc A generic select (dropdown) component. Encapsulates common markup and designed to be a drop-in replacement.
*       Options data may be either an array of objects with 'value' and 'label' properties or an object. Only the array
*       will insure display order of options. For react controlled `<select>`. Stateless.
*
* @param {string} [id="form-select-field_label"]
*     To define the base "data-id" value for top-level HTML container.
* @param {string} [className]
*     CSS classes to set on the top-level HTML container.
*
* @param {string|number} value
*     Currently selected value.
* @param {string} [selectClassName]
*     CSS classes to set on the select element.
* @param {object|array} options
*     Key/value object OR an array of single-item objects with 'value' and 'label' properties to describe the
*     dropdown options.
* @param {FormSelectField~onChange} onChange
*     Callback to be triggered when selected value changed
*
* @param {string} [label]
*     The text to display as the field's label.
* @param {string} [labelId]
*     A data-id for easy access to the label's text content.
* @param {string} [labelHelpText]
*     The text to display for the help tooltip.
* @param {string} [helpClassName]
*     CSS classes to set on the HelpHint component.
*
* @param {boolean} [noneOption=false]
*     If true, add an option which does not count as a selection (e.g., "select an option").
*     This option will be shown at the top of the dropdown list.
* @param {string} [noneOptionText]
*     The text of the none option. Required if "noneOption = true".
* @param {string} [noneOptionValue]
*     The value of the none option. Required if "noneOption = true".
*
*
* @param {string} [errorMessage]
*     The error message that will be shown if defined.
* @param {boolean} [isRequired=false]
*     If true, the user must select a value for this field.
* @param {boolean} [isDisabled=false]
*     If true, the select element will be disabled.
*
* @example
*     <FormSelectField className="css classes to use on label or input-select as default"
*         label={element.viewName}
*         onChange={myFunction}
*         value={this.state.value}
*         options={[
*             {value: value1, label: 'label1'},
*             {value: value2, label: 'label2'},
*             {value: value3, label: 'label3'}
*         ]}>
*     </FormSelectField>
*     <FormSelectField
*         onChange={myFunction}
*         value={this.state.value}
*         options={{
*             value1: 'label1',
*             value2: 'label2',
*             value3: 'label3'
*         }}
*         errorMessage="Oops, something went wrong">
*     </FormSelectField>
*/

var FormSelectField = React.createClass({
    propTypes: {
        className: React.PropTypes.string,
        isRequired: React.PropTypes.bool,
        label: React.PropTypes.string,
        labelHelpText: React.PropTypes.string,
        noneOptionText: React.PropTypes.string,
        noneOptionValue: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired,
        options: React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.array
        ]).isRequired,
        id: React.PropTypes.string,
        selectClassName: React.PropTypes.string,
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]).isRequired,
        errorMessage: React.PropTypes.string,
        isDisabled: React.PropTypes.bool,
        labelId: React.PropTypes.string,
        helpClassName: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            noneOption: false,
            noneOptionText: null,
            noneOptionValue: "",
            id: "form-select-field",
            isDisabled: false
        };
    },

    componentWillMount: function () {
        console.warn("** This version of the FormSelectField is deprecated and will be removed in the next release");
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            selectedValue: nextProps.value
        });
    },

    getInitialState: function () {
        return {
            selectedValue: this.props.value
        };
    },

    /**
     * @desc Handle a change of the selected value.
     * @method FormSelectField#handleChange
     * @private
     * @param {object} e the event object
     */
    _handleChange: function (e) {
        this.setState({ selectedValue: e.target.value });

        if (this.props.onChange) {
            this.props.onChange(e);
        }
    },

    /**
     * @desc Build options select
     * @param  {string} value
     *         Value of option
     * @param  {string} label
     *         Label of option
     * @param  {string} index
     *         Index to make key unique. For example, 12:00AM and 12:00PM
     *         will be translated into the same value such as 12:00XX.
     * @return {string}
     *         Option string
     * @private
     * @ignore
     */
    _getOptionHtml: function (value, label, index) {
        return (<option value={value} key={value + "_" + index}>{label}</option>);
    },

    render: function () {
        var option,
            optionValue,
            optionLabel,
            optionsIsArray = Array.isArray(this.props.options),
            optionsHtml = [],
            labelHelp,
            labelCss = {
                "input-select": true,
                "form-error": this.props.errorMessage,
                disabled: this.props.isDisabled,
                required: this.props.isRequired,
                "value-entered": this.state.selectedValue !== this.props.noneOptionValue
            };

        if (this.props.className) {
            labelCss[this.props.className] = true;
        }

        for (var index in this.props.options) {
            option = this.props.options[index];
            optionValue = optionsIsArray ? option.value : index;
            optionLabel = optionsIsArray ? option.label : option;
            optionsHtml.push(this._getOptionHtml(optionValue, optionLabel, index));
        }

        if (this.props.noneOptionText) {
            optionsHtml.unshift(this._getOptionHtml(this.props.noneOptionValue, this.props.noneOptionText));
        }

        if (this.props.labelHelpText) {
            labelHelp = (
                <HelpHint
                    hintText={this.props.labelHelpText}
                    className={classnames("inline", this.props.helpClassName)}/>
            );
        }

        return (
            <label className={classnames(labelCss)} data-id={this.props.id + "_label"}>
                {this.props.label && (
                    <span data-id={this.props.labelId} className="label-text">
                        {this.props.label}
                        {labelHelp}
                    </span>
                )}
                <div className="input-container">
                    <div className="wrapper">
                        <select
                            data-id={this.props.id}
                            name={this.props.id}
                            className={this.props.selectClassName}
                            onChange={this._handleChange}
                            value={this.state.selectedValue}
                            disabled={this.props.isDisabled}>
                            {optionsHtml}
                        </select>
                    </div>
                    {this.props.errorMessage && (
                        <FormError.Icon data-id={this.props.id + "_errormessage-icon"} />
                    )}
                    {this.props.errorMessage && (
                        <FormError.Message
                            value={this.props.errorMessage}
                            data-id={this.props.id + "_errormessage"}
                        />
                    )}
                </div>
            </label>
        );
    }
});

module.exports = FormSelectField;
