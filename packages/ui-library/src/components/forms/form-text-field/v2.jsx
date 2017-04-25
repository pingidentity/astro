"use strict";

var React = require("re-react"),
    classnames = require("classnames"),
    FormLabel = require("../FormLabel.jsx"),
    FormError = require("../FormError.jsx"),
    Translator = require("../../../util/i18n/Translator.js"),
    _ = require("underscore"),
    Utils = require("../../../util/Utils.js");

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
* @param {boolean} [stateless]
*     WARNING. Default value for "stateless" will be set to true from next version.
*     To enable the component to be externally managed. True will relinquish control to the component's owner.
*     False or not specified will cause the component to manage state internally.
* @param {boolean} [controlled=false]
*     DEPRECATED. Use "stateless" instead.
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
* @param {string} [helpClassName]
*     CSS classes to apply to the label help hint (bottom, left, etc)
* @param {string} [labelHelpText]
*     The text to display for the help tooltip.
* @param {string} [labelLockText]
*     The text to display for the lock help tooltip.
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
        controlled: React.PropTypes.bool, //TODO: remove in new version
        stateless: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            controlled: false //TODO: change to stateless with true default in new version
        };
    },

    componentWillMount: function () {
        if (!Utils.isProduction()) {
            console.warn(Utils.deprecateMessage("controlled", "stateless", "false", "true"));
        }
    },

    render: function () {
        var stateless = this.props.stateless !== undefined ? this.props.stateless : this.props.controlled;

        return (stateless
            ? React.createElement(Stateless, _.defaults({ ref: "stateless" }, this.props)) //eslint-disable-line no-use-before-define
            : React.createElement(Stateful, _.defaults({ ref: "stateful" }, this.props))); //eslint-disable-line no-use-before-define
    }
});


var Stateless = React.createClass({
    displayName: "FormTextFieldStateless",

    propTypes: {
        "data-id": React.PropTypes.string,
        className: React.PropTypes.string.affectsRendering,

        value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).affectsRendering,
        controls: React.PropTypes.object.affectsRendering,
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

        errorMessage: React.PropTypes.string.affectsRendering,
        errorClassName: React.PropTypes.string.affectsRendering,
        inputClassName: React.PropTypes.string.affectsRendering,
        helpClassName: React.PropTypes.string.affectsRendering,
        labelClassName: React.PropTypes.string.affectsRendering,
        labelHelpText: React.PropTypes.string.affectsRendering,
        labelText: React.PropTypes.string.affectsRendering,
        labelLockText: React.PropTypes.string.affectsRendering,
        maxLength: React.PropTypes.number.affectsRendering,
        type: React.PropTypes.string.affectsRendering,
        placeholder: React.PropTypes.string.affectsRendering,

        autoComplete: React.PropTypes.bool.affectsRendering,
        autoFocus: React.PropTypes.bool.affectsRendering,
        disabled: React.PropTypes.bool.affectsRendering,
        maskValue: React.PropTypes.bool.affectsRendering,
        readOnly: React.PropTypes.bool.affectsRendering,
        required: React.PropTypes.bool.affectsRendering,
        reveal: React.PropTypes.bool.affectsRendering,
        showReveal: React.PropTypes.bool.affectsRendering,
        showSave: React.PropTypes.bool.affectsRendering,
        showUndo: React.PropTypes.bool.affectsRendering,

        children: React.PropTypes.node.affectsRendering
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
                "value-entered": this.props.value || this.props.value !== "",
                "inline-save": this.props.showSave,
                "form-error": this.props.errorMessage,
                readonly: this.props.readOnly,
                "masking-controls": this.props.showReveal
            }),
            undo = Translator.translate("undo"),
            save = Translator.translate("save"),
            inputType;

        if (this.props.maskValue && !this.props.reveal) {
            inputType = "password";

        } else if (this.props.type) {
            inputType = this.props.type;

            if (this.props.type === "color") {
                if (!Utils.isProduction()) { console.warn("Please use the ColorPicker component."); }
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
                hint={this.props.labelHelpText}
                lockText={this.props.labelLockText}
                helpClassName={this.props.helpClassName}>

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
                    {this.props.showReveal && (
                        <a
                            data-id="reveal"
                            onClick={this.props.onToggleReveal}
                            className={classnames("password-show-button", {
                                "icon-view-hidden": !this.props.reveal,
                                "icon-view": this.props.reveal
                            })}
                        />
                    )}
                    {this.props.children}
                    {this.props.showUndo && (
                        <a
                            data-id="undo"
                            className="undo"
                            onClick={this.props.onUndo}>
                            {undo}
                        </a>
                    )}
                    {this.props.showSave && (
                        <a
                            data-id="save"
                            className="save"
                            onClick={this.props.onSave}>
                            {save}
                        </a>
                    )}
                    {this.props.controls}
                    {this.props.errorMessage && (
                        <FormError.Icon data-id={this.props["data-id"] + "-error-message-icon"} />
                    )}
                    {this.props.errorMessage && (
                        <FormError.Message
                            value={this.props.errorMessage}
                            data-id={this.props["data-id"] + "-error-message"}
                        />
                    )}
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
        // prevents focus on characters in input field
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
