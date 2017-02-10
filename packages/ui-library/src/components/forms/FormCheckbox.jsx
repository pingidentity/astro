var React=require("react"),
    classnames = require("classnames"),
    FormLabel = require("./FormLabel.jsx"),
    FormError = require("./FormError.jsx"),
    Utils = require("../../util/Utils.js");

/**
 * @callback FormCheckbox~onChange
 *
 * @param {object} e
 *    The ReactJS synthetic event object.
 */

 /**
 * @callback FormCheckbox~onValueChange
 *
 * @param {boolean} checked
 *    The current checked state.
 */

/**
 * @class FormCheckbox
 * @desc A checkbox field component.
 *
 * @param {string} [data-id="form-checkbox-container"]
 *    To define the base "data-id" value for the top-level HTML container.
 *    Note that "-container" will be appended to the "data-id" set on the top-level HTML container,
 *    and the "data-id" string will be set on the checkbox "input" elelment under the top-level HTML container.
 * @param {string} [id]
 *    DEPRECATED. Use "data-id" instead.
 * @param {string} [className]
 *    CSS classes to set on the top-level HTML container.
 *
 * @param {boolean} [checked=false]
 *    Whether or not the checkbox is checked.
 * @param {FormCheckbox~onChange} [onChange]
 *    Callback to be triggered when checkbox is toggled. It will receive the triggering event.
 * @param {FormCheckbox~onValueChange} ]onValueChange]
 *    Callback to be triggered when checkbox is toggled. It will receive the component's value.
 *
 * @param {string} [label]
 *    Label text to be displayed.
 * @param {string} [labelHelpText]
 *    Label help text to be displayed.
 * @param {string} [helpClassName]
 *    CSS classes to set on the HelpHint component.
 *
 * @param {string} [name]
 *    The name value for the input.
 * @param {string} [value]
 *    The value for the input.
 *
 * @param {boolean} [disabled=false]
 *    If true, disables current checkbox and styles opacity.
 * @param {string} [errorMessage]
 *    The message to display if defined when external validation failed.
 *
 * @example
 *
 *       <FormCheckbox label="Regular Checkbox"
 *                 data-id="form-checkbox"
 *                 onChange={this._changeCallback} />
 *
 */
var FormCheckbox=React.createClass({
    propTypes: {
        "data-id": React.PropTypes.string,
        id: React.PropTypes.string, //TODO: remove when v1 no longer supported
        className: React.PropTypes.string,
        checked: React.PropTypes.bool,
        onChange: React.PropTypes.func,
        onValueChange: React.PropTypes.func,
        label: React.PropTypes.string,
        labelHelpText: React.PropTypes.string,
        helpClassName: React.PropTypes.string,
        name: React.PropTypes.string,
        value: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        errorMessage: React.PropTypes.string
    },

    getDefaultProps: function () {
        return{
            "data-id": "form-checkbox",
            checked: false,
            disabled: false
        };
    },

    componentWillMount: function () {
        if (this.props.id && !Utils.isProduction()) {
            console.warn(Utils.deprecateMessage("id", "data-id"));
        }
    },

    _handleChange: function (e) {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
        if (this.props.onValueChange) {
            this.props.onValueChange(!!e.target.checked);
        }
    },

    render: function () {
        var id = this.props.id || this.props["data-id"],
            labelClassName = classnames("input-checkbox", this.props.className, {
                disabled: this.props.disabled,
                "form-error": this.props.errorMessage,
            });

        return (
            <FormLabel data-id={id + "-container"}
                    className={labelClassName}
                    helpClassName={this.props.helpClassName}
                    disabled={this.props.disabled}
                    value={this.props.label}
                    hint={this.props.labelHelpText}>
                <input data-id={id}
                        type="checkbox"
                        name={this.props.name ? this.props.name : id}
                        value={this.props.value ? this.props.value: id}
                        onChange={this._handleChange}
                        checked={this.props.checked}
                        disabled={this.props.disabled}
                />
                <div className="icon"/>
                {this.props.errorMessage && (
                    <FormError.Icon data-id={id + "-error-message-icon"} />
                )}
                {this.props.errorMessage && (
                    <FormError.Message
                        value={this.props.errorMessage}
                        data-id={id + "-error-message"}
                    />
                )}
            </FormLabel>
        );
    }
});

module.exports=FormCheckbox;
