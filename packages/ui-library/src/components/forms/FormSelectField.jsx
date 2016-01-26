"use strict";

var React = require("react"),
    css = require("classnames"),
    HelpHint = require("../tooltips/HelpHint.jsx");

/**
 * @module FormSelectField
 * @desc A generic select (dropdown) component. Encapsulates common markup and designed to be a drop-in replacement.
 *       Options data may be either an array of objects with 'value' and 'label' properties or an object. Only the array
 *       will insure display order of options.
 * for react controlled <select>. Stateless.
 *
 * @param {function} onChange          delegate function to be called on select element onChange event (will receive same argument)
 * @param {string}   value             currently selected value
 * @param {object}   options           key/value object OR an array of single-item objects with 'value' and 'label' properties to
 *                                     describe the dropdown options
 * @param {boolean}  [required]        if true, the user must select a value for this field
 * @param {string}   [className]       CSS classes to add to the top-level label element (default 'input-select')
 * @param {string}   [selectClassName] CSS classes to add to the select element
 * @param {string}   [label]           label text
 * @param {string}   [labelHelpText]   text for the help tooltip
 * @param {boolean}  [noneOption]      if true, add an option which does not count as a selection (e.g., "select an option").
 *                                     This option will be shown at the top of the dropdown list.
 * @param {string}   [noneOptionText]  the text of the none option (required if noneOption = true)
 * @param {string}   [noneOptionValue] the value of the none option (required if noneOption = true)
 * @param {string}   [id]              the data-id for the select component and label (appended with '_label')
 *                                     (default 'form-select-field')
 * @param {string}   [errorMessage]    an error message (will be shown if defined)
 * @param {boolean}  [disabled]        if true, the select element will be disabled
 * @param {string}   [labelId]         A data-id for easy access to the label's text content
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
        labelId: React.PropTypes.string
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

    _getOptionHtml: function (value, label) {
        return (<option value={value} key={value}>{label}</option>);
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
                required: this.props.isRequired,
                "value-entered": this.state.selectedValue !== this.props.noneOptionValue
            },
            errorCss = css("help-tooltip form-error-message", {
                show: this.props.errorMessage
            });

        if (this.props.className) {
            labelCss[this.props.className] = true;
        }

        for (var index in this.props.options) {
            option = this.props.options[index];
            optionValue = optionsIsArray ? option.value : index;
            optionLabel = optionsIsArray ? option.label : option;
            optionsHtml.push(this._getOptionHtml(optionValue, optionLabel));
        }

        if (this.props.noneOptionText) {
            optionsHtml.unshift(this._getOptionHtml(this.props.noneOptionValue, this.props.noneOptionText));
        }

        if (this.props.labelHelpText) {
            labelHelp = (
                <HelpHint hintText={this.props.labelHelpText} />
            );
        }

        return (
            <label className={css(labelCss)} data-id={this.props.id + "_label"}>
                <span data-id={this.props.labelId} className="label-text">
                    {this.props.label}
                    {labelHelp}
                </span>
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
