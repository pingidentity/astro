"use strict";

var React = require("react"),
    css = require("classnames"),
    HelpHint = require("../tooltips/HelpHint.jsx"),
    _ = require("underscore");

/**
 * @module FormSelectField
 * @desc A generic select (dropdown) component. Encapsulates common markup and designed to be a drop-in replacement
 * for react controlled <select>. Stateless.
 *
 * @param {function} onChange delegate function to be called on select element onChange event (will receive same argument)
 * @param {string} value currently selected value
 * @param {object} options value -> label map to describe dropdown options
 * @param {boolean} [required] if true, the user must select a value for this field
 * @param {string} [className] CSS classes to add to the top-level label element (default 'input-select')
 * @param {string} [selectClassName] CSS classes to add to the select element
 * @param {string} [label] label text
 * @param {string} [labelHelpText] text for the help tooltip
 * @param {boolean} [noneOption] if true, add an option which does not count as a selection (e.g., "select an option").
 * This option will be shown at the top of the dropdown list.
 * @param {string} [noneOptionText] the text of the none option (required if noneOption = true)
 * @param {string} [noneOptionValue] the value of the none option (required if noneOption = true)
 * @param {string} [id] the data-id for the select component and label (appended with '_label')
 * (default 'form-select-field')
 * @param {string} [errorMessage] an error message (will be shown if defined)
 * @param {boolean} [disabled] if true, the select element will be disabled
 *
 *  @example
 *                   <FormSelectField className="css classes to use on label or input-select as default"
 *                       label={element.viewName}
 *                       onChange={myFunction}
 *                       value={this.state.value}
 *                       options={value1: 'option-1', value2: 'option-2', value3: 'option-3'} />
 *
 *                   <FormSelectField
 *                       onChange={myFunction}
 *                       value={this.state.value}
 *                       options={value1: 'option-1', value2: 'option-2', value3: 'option-3'}
 *                       errorMessage="Oops, something went wrong">
 *                   </FormSelectField>
 */

var FormSelectField = React.createClass({
    propTypes: {
        className: React.PropTypes.string,
        isRequired: React.PropTypes.bool,
        label: React.PropTypes.string,
        labelHelpText: React.PropTypes.string,
        noneOption: React.PropTypes.bool,
        noneOptionText: React.PropTypes.string,
        noneOptionValue: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired,
        options: React.PropTypes.object.isRequired,
        id: React.PropTypes.string,
        selectClassName: React.PropTypes.string,
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]).isRequired,
        errorMessage: React.PropTypes.string,
        isDisabled: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            noneOption: false,
            noneOptionValue: "",
            id: "form-select-field",
            isDisabled: false
        };
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
    handleChange: function (e) {
        this.setState({ selectedValue: e.target.value });

        if (this.props.onChange) {
            this.props.onChange(e);
        }
    },

    render: function () {
        var options,
            noneOptionObj = {},
            labelHelp,
            labelCss = css({
                "input-select": true,
                "form-error": this.props.errorMessage,
                required: this.props.isRequired,
                "value-entered": this.state.selectedValue !== this.props.noneOptionValue
            }),
            errorCss = css("help-tooltip form-error-message", {
                show: this.props.errorMessage
            });

        if (this.props.className) {
            labelCss += " " + this.props.className;
        }

        if (this.props.noneOption) {
            noneOptionObj[this.props.noneOptionValue] = this.props.noneOptionText;
            options = _.extend(noneOptionObj, this.props.options);
        } else {
            options = this.props.options;
        }

        if (this.props.labelHelpText) {
            labelHelp = (
                <HelpHint hintText={this.props.labelHelpText} />
            );
        }

        options = _.map(options, function (option, value) {
            return <option value={value} key={value}>{option}</option>;
        });

        return (
            <label className={labelCss} data-id={this.props.id + "_label"}>
                <span className="label-text">
                    {this.props.label}
                    {labelHelp}
                </span>
                <div className="input-container">
                    <div className="wrapper">
                        <select
                            data-id={this.props.id}
                            name={this.props.id}
                            className={this.props.selectClassName}
                            onChange={this.handleChange}
                            value={this.state.selectedValue}
                            disabled={this.props.isDisabled}>
                            {options}
                        </select>
                    </div>
                    <div className={errorCss}>
                        <div className="tooltip-text" data-id={this.props.id + "_errormessage"}>
                            {this.props.errorMessage}
                        </div>
                    </div>
                </div>
            </label>
        );
    }
});

module.exports = FormSelectField;
