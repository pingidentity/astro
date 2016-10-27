"use strict";

var React = require("re-react"),
    classnames = require("classnames"),
    FormError = require("../FormError.jsx"),
    FormLabel = require("../FormLabel.jsx"),
    _ = require("underscore"),
    Utils = require("../../../util/Utils");

/**
* @calback FormSelectField~onChange
*
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @callback FormSelectField~onValueChange
*
* @param {string|number} value
*     The currently selected value.
*/

/**
* @typedef FormSelectField~option
* @desc A single select option.
*
* @property {string} label
*     The label of the option.
*
* @property {string|number} value
*     The value of the option.
*/

/**
* @deprecated The component is deprecated and subject to be removed in future library versions. See FormDropDownList control as replacement.
*
* @class FormSelectField
* @desc <b>DEPRECATED</b> (see deprecate note below). A generic select (dropdown) component. Encapsulates common markup and designed to be a drop-in replacement.
*       The array of options will insure display order of options.
*
* @param {string} [data-id="form-select-field"]
*     To define the base "data-id" value for top-level HTML container.
* @param {string} [className]
*     CSS classes to set on the top-level HTML container.
* @param {boolean} [controlled=false]
*     To enable the component to be externally managed. True will relinquish control to the component's owner.
*     False or not specified will cause the component to manage state internally.
*
* @param {string|number} value
*     Currently selected value.
* @param {string} [selectClassName]
*     CSS classes to set on the select element.
* @param {array<FormSelectField~option>} options
*     An array of single-item objects with 'value' and 'label' properties to describe the dropdown options.
* @param {FormSelectField~onChange} onChange
*     Callback to be triggered when selected value changed. It will receive the triggering event.
*     The onValueChange callback will also be triggered.
* @param {FormSelectField~onValueChange} onValueChange
*     Callback to be triggered when selected value changed. It will receive the component's value.
*     The onChange callback will also be triggered.
*
* @param {string} [label]
*     The text to display as the field's label.
* @param {string} [labelHelpText]
*     The text to display for the help tooltip.
* @param {string} [helpClassName]
*     CSS classes to set on the HelpHint component.
*
*
* @param {FormSelectField~option} [noneOption]
*     If specified, adds an option which does not count as a selection (e.g., "select an option").
*     This option will be shown at the top of the dropdown list.
*     The object should specify the label and value of the none option.
*
* @param {string} [errorMessage]
*     The message to display if defined when external validation failed.
* @param {boolean} [required=false]
*     If true, the user must select a value for this field.
* @param {boolean} [disabled=false]
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
*/

module.exports = React.createClass({

    propTypes: {
        controlled: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            controlled: false
        };
    },

    render: function () {
        return (
            this.props.controlled
                ? React.createElement(FormSelectFieldStateless, //eslint-disable-line no-use-before-define
                    _.defaults({ ref: "FormSelectFieldStateless" }, this.props))
                : React.createElement(FormSelectFieldStateful, //eslint-disable-line no-use-before-define
                    _.defaults({ ref: "FormSelectFieldStateful" }, this.props))
        );
    }
});

var FormSelectFieldStateless = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        className: React.PropTypes.string.affectsRendering,
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]).isRequired.affectsRendering,
        options: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                label: React.PropTypes.string,
                value: React.PropTypes.oneOfType([
                    React.PropTypes.string,
                    React.PropTypes.number
                ])
            })
        ).affectsRendering,
        onChange: React.PropTypes.func.isRequired,
        onValueChange: React.PropTypes.func.isRequired,
        label: React.PropTypes.string.affectsRendering,
        labelHelpText: React.PropTypes.string.affectsRendering,
        noneOption: React.PropTypes.shape({
            label: React.PropTypes.string,
            value: React.PropTypes.oneOfType([
                React.PropTypes.string,
                React.PropTypes.number
            ])
        }),
        helpClassName: React.PropTypes.string.affectsRendering,
        selectClassName: React.PropTypes.string.affectsRendering,
        errorMessage: React.PropTypes.string.affectsRendering,
        required: React.PropTypes.bool.affectsRendering,
        disabled: React.PropTypes.bool.affectsRendering
    },

    getDefaultProps: function () {
        return {
            "data-id": "form-select-field",
            onChange: _.noop,
            onValueChange: _.noop,
            required: false,
            disabled: false
        };
    },

    componentWillMount: function () {
        if (!Utils.isProduction()) {
            console.warn("** This component is deprecated and will be removed in an upcoming release. " +
            "See the \"FormDropDownList\" component for a replacement.");
        }
    },

    _handleChange: function (e) {
        this.props.onChange(e);
        this.props.onValueChange(e.target.value);
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

    _getOptions: function () {
        var options = [];

        options = this.props.options.map(function (option, index) {
            return this._getOptionHtml(option.value, option.label, index);
        }.bind(this));

        if (this.props.noneOption) {
            options.unshift(this._getOptionHtml(this.props.noneOption.value, this.props.noneOption.label));
        }

        return options;
    },

    render: function () {
        var className = classnames("input-select", this.props.className, {
            "form-error": this.props.errorMessage,
            "value-entered": this.props.value !== (this.props.noneOption && this.props.noneOption.value),
            required: this.props.required,
            disabled: this.props.disabled,
            ie9: Utils.isIE9()
        });

        return (
            <FormLabel data-id={this.props["data-id"]}
                    className={className}
                    value={this.props.label}
                    hint={this.props.labelHelpText}
                    helpClassName={this.props.helpClassName}>
                <div className="input-container">
                    <div className="wrapper">
                        <select
                            data-id={this.props["data-id"] + "-select"}
                            name={this.props["data-id"] + "-select"}
                            className={this.props.selectClassName}
                            value={this.props.value}
                            onChange={this._handleChange}
                            disabled={this.props.disabled} >
                            {this._getOptions()}
                        </select>
                    </div>
                    {this.props.errorMessage && (
                        <FormError.Icon data-id={this.props["data-id"] + "-errorMessage-icon"} />
                    )}
                    {this.props.errorMessage && (
                        <FormError.Message
                            value={this.props.errorMessage}
                            data-id={this.props["data-id"] + "-errorMessage"}
                        />
                    )}
                </div>
            </FormLabel>
        );
    }
});

var FormSelectFieldStateful = React.createClass({

    _handleChange: function (e) {
        this.setState({
            value: e.target.value
        });
    },

    getInitialState: function () {
        return {
            value: this.props.value
        };
    },

    render: function () {
        var props = _.defaults(
            { ref: "FormSelectFieldStateless", value: this.state.value, onChange: this._handleChange }, this.props);

        return React.createElement(FormSelectFieldStateless, props);
    }
});
