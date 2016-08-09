"use strict";

var React = require("react"),
    classnames = require("classnames"),
    FormLabel = require("../FormLabel.jsx"),
    FormError = require("../FormError.jsx"),
    Translator = require("../../../util/i18n/Translator.js"),
    _ = require("underscore");

/**
/**
* @callback FormTextField~onChange
*
* @param {object} e
*     The ReactJS synthetic event object.
*

/**
* @callback FormTextField~onValueChange
*
* @param {string} value
*     The current text field value.
*/

/**
* @callback FormTextField~onBlur
*
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @callback FormTextField~onFocus
*
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @callback FormTextField~onKeyDown
*
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @callback FormTextField~onKeyPress
*
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @callback FormTextField~onMouseDown
*
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @callback FormTextField~onSave
*/

/**
* @callback FormTextField~onUndo
*/

/**
* @callback FormTextField~onToggleReveal
*/

/**
* @class FormTextField
* @desc A text field component.
*
* @param {string} [data-id="form-text-field"]
*     To define the base "data-id" value for the top-level HTML container.
* @param {string} [className]
*     CSS classes to set on the top-level HTML container.
* @param {boolean} [controlled=false]
*     To enable the component to be externally managed. True will relinquish control to the component's owner.
*     False or not specified will cause the component to manage state internally.
*
* @param {string|number} [value=""]
*     Current text field value.
* @param {FormTextField~onChange} [onChange]
*     Callback to be triggered when the field value changes. It will receive the triggering event.
* @param {FormTextField~onValueChange} [onValueChange]
*     Callback to be triggered when the field value changes. It will receive the component's value.
* @param {FormTextField~onBlur} [onBlur]
*     Callback to be triggered when the field blurs (loses focus).
* @param {FormTextField~onFocus} [onFocus]
*     Callback to be triggered when the field gains focus.
* @param {FormTextField~onKeyDown} [onKeyDown]
*     Callback to be triggered when a key is pressed down in the field.
* @param {FormTextField~onKeyPress} [onKeyPress]
*     Callback to be triggered when a key is pressed in the field.
* @param {FormTextField~onMouseDown} [onMouseDown]
*     Callback to be triggered when the field registers a mouse down.
*
* @param {string} [labelHelpText]
*     The text to display for the help tooltip.
* @param {string} [labelText]
*     The text to show as the field's label.
*
* @param {string} [placeholder]
*     Placeholder text for the input field.
* @param {string} [inputClassName]
*     CSS classes to set on the input element.
* @param {number} [maxLength]
*     Maximum length supported by the text field.
* @param {number} [type]
*     An input type to be applied to the input. The input type often adds easily accessable and type-specific input
*     controls that often makes it easier to enter the field data.
*
* @param {string} [errorMessage]
*     The message to display if defined when external validation failed.
* @param {string} [errorClassName]
*     CSS classes to set on the FormTextFieldError component.
* @param {boolean} [disabled=false]
*     If true, the text field will be disabled.
* @param {boolean} [required=false]
*     If true, the user must select a value for this field.
*
* @param {boolean} [autoComplete=false]
*     Whether or not the field will support autocomplete.
* @param {boolean} [autoFocus=false]
*     Whether or not to auto-focus the element.
* @param {boolean} [maskValue=false]
*     If true, the value shown in the input field will be masked with '*****'. (i.e: passwords).
* @param {boolean} [readOnly=false]
*     Whether or not the input field is readonly.
*
* @param {boolean} [showSave=false]
*     Whether or not to display a save option.
* @param {FormTextField~onSave} [onSave]
*     Callback to be triggered when the 'save' icon is clicked.
*
* @param {boolean} [showUndo=false]
*     Whether or not to display an undo option.
* @param {FormTextField~onUndo} [onUndo]
*     Callback to be triggred when the 'undo' icon is clicked.
*
* @param {boolean} [reveal=false]
*     If true, will remove value masking.
* @param {boolean} [showReveal=false]
*    Whether or not to display a reveal option to remove value masking.
* @param {FormTextField~onToggleReveal} [onToggleReveal]
*    Callack to be triggered when the 'reveal' button is clicked.
*
* @param {object} [controls]
*    Accepts a React object for extra controls. Used with FormIntegerField.
*
* @example <FormTextField
*              data-id="my-data-id"
*              labelText={element.viewName}
*              required={element.required}
*              value="default value"
*              onValueChange={myFunction} />
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
        return (this.props.controlled
            ? React.createElement(Stateless, _.defaults({ ref: "stateless" }, this.props)) //eslint-disable-line no-use-before-define
            : React.createElement(Stateful, _.defaults({ ref: "stateful" }, this.props))); //eslint-disable-line no-use-before-define
    }
});


var Stateless = React.createClass({
    displayName: "FormTextFieldStateless",

    propTypes: {
        "data-id": React.PropTypes.string,
        className: React.PropTypes.string,

        value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        controls: React.PropTypes.object,
        onChange: React.PropTypes.func,
        onValueChange: React.PropTypes.func,
        onBlur: React.PropTypes.func,
        onFocus: React.PropTypes.func,
        onKeyDown: React.PropTypes.func,
        onKeyPress: React.PropTypes.func,
        onMouseDown: React.PropTypes.func,
        onSave: React.PropTypes.func,
        onToggleReveal: React.PropTypes.func,
        onUndo: React.PropTypes.func,

        errorMessage: React.PropTypes.string,
        errorClassName: React.PropTypes.string,
        inputClassName: React.PropTypes.string,
        labelClassName: React.PropTypes.string,
        labelHelpText: React.PropTypes.string,
        labelText: React.PropTypes.string,
        maxLength: React.PropTypes.number,
        type: React.PropTypes.string,
        placeholder: React.PropTypes.string,

        autoComplete: React.PropTypes.bool,
        autoFocus: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        maskValue: React.PropTypes.bool,
        readOnly: React.PropTypes.bool,
        required: React.PropTypes.bool,
        reveal: React.PropTypes.bool,
        showReveal: React.PropTypes.bool,
        showSave: React.PropTypes.bool,
        showUndo: React.PropTypes.bool
    },

    /**
     * Perform any operations that need to happen when the field value changes.
     *
     * @param {object} e the event object
     * @private
     */
    _handleFieldChange: function (e) {
        this.props.onValueChange(e.target.value);
        this.props.onChange(e);
    },

    getDefaultProps: function () {
        return {
            "data-id": "form-text-field",
            onChange: _.noop,
            onValueChange: _.noop,
            onBlur: _.noop,
            onFocus: _.noop,
            onKeyDown: _.noop,
            onKeyPress: _.noop,
            onMouseDown: _.noop,
            errorClassName: "",
            disabled: false,
            required: false,
            autoComplete: false,
            autoFocus: false,
            maskValue: false,
            readOnly: false,
            showSave: false,
            onSave: _.noop,
            showUndo: false,
            onUndo: _.noop,
            reveal: false,
            showReveal: false,
            onToggleReveal: _.noop,
            value: ""
        };
    },

    render: function () {

        var id = this.props["data-id"],
            className = classnames(this.props.className, "input-text", {
                edited: this.props.isEdited,
                required: this.props.required,
                disabled: this.props.disabled,
                "value-entered": this.props.value,
                "inline-save": this.props.showSave,
                "form-error": this.props.errorMessage,
                actions: this.props.showReveal || this.props.showUndo
            }),
            undo = Translator.translate("undo"),
            save = Translator.translate("save"),
            inputType;

        if (this.props.maskValue && !this.props.reveal) {
            inputType = "password";

        } else if (this.props.type) {
            inputType = this.props.type;

            if (this.props.type === "color") {
                console.warn("Please use the ColorPicker component.");
            }

        } else {
            inputType = "text";
        }

        return (
            <FormLabel
                    className={className}
                    ref="container"
                    data-id={id}
                    value={this.props.labelText}
                    hint={this.props.labelHelpText}>
                <span className="input-container">
                    <input
                        className={this.props.inputClassName}
                        onFocus={this.props.onFocus}
                        onBlur={this.props.onBlur}
                        onKeyPress={this.props.onKeyPress}
                        onKeyDown={this.props.onKeyDown}
                        onMouseDown={this.props.onMouseDown}
                        onChange={this._handleFieldChange}
                        placeholder={this.props.placeholder}
                        ref={id + "-input"}
                        readOnly={this.props.readOnly}
                        data-id={id + "-input"}
                        type={inputType}
                        maxLength={this.props.maxLength}
                        value={this.props.value}
                        autoComplete={this.props.autoComplete ? "on" : "off"}
                        disabled={this.props.disabled}
                        autoFocus={this.props.autoFocus}
                    />
                    { this.props.showReveal &&
                        <a data-id="reveal" onClick={this.props.onToggleReveal}
                            className={classnames("password-show-button", {
                                "icon-view-hidden": !this.props.reveal,
                                "icon-view": this.props.reveal
                            })} />
                    }
                    { this.props.showUndo &&
                        <a data-id="undo" className="undo"
                            onClick={this.props.onUndo}>{undo}</a>}
                    { this.props.showSave &&
                        <a data-id="save" className="save"
                            onClick={this.props.onSave}>{save}</a>}
                    { this.props.controls }

                    <FormError value={this.props.errorMessage}
                        data-id={this.props["data-id"] + "-error-message"} />

                </span>
            </FormLabel>
        );
    }
});

var Stateful = React.createClass({
    displayName: "FormTextFieldStateful",

    getInitialState: function () {
        return {
            reveal: false,
            value: this.props.value || ""
        };
    },

    _handleToggleReveal: function () {
        this.setState({
            reveal: !this.state.reveal
        });
    },

    _handleValueChange: function (value) {
        this.setState({
            value: value
        }, function () {
            if (this.props.onValueChange) {
                this.props.onValueChange(value);
            }
        });
    },

    componentWillReceiveProps: function (newProps) {
        if (newProps.value !== this.props.value) {
            this.setState({
                value: newProps.value
            });
        }
    },

    render: function () {
        var props = _.defaults({
            ref: "stateless",
            reveal: this.state.reveal,
            onToggleReveal: this._handleToggleReveal,
            value: this.state.value,
            onValueChange: this._handleValueChange
        }, this.props);

        return React.createElement(Stateless, props);
    }
});
