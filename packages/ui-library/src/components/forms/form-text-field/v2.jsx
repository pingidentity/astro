"use strict";

var PropTypes = require("prop-types");

var React = require("react"),
    ReactDOM = require("react-dom"),
    classnames = require("classnames"),
    FormLabel = require("../FormLabel"),
    FormError = require("../FormError"),
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
* @param {boolean} [flexWidth=false]
*     When true the width of the input will grow to fit the size of its content.
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

module.exports = class extends React.Component {
    static propTypes = {
        stateless: PropTypes.bool
    };

    static defaultProps = {
        stateless: true
    };

    componentWillMount() {
        if (!Utils.isProduction() && this.props.controlled !== undefined) {
            throw new Error(Utils.deprecatePropError("controlled", "stateless", "false", "true"));
        }
    }

    render() {
        return (this.props.stateless
            ? React.createElement(Stateless, _.defaults({ ref: "stateless" }, this.props)) //eslint-disable-line no-use-before-define
            : React.createElement(Stateful, _.defaults({ ref: "stateful" }, this.props))); //eslint-disable-line no-use-before-define
    }
};


class Stateless extends React.Component {
    static displayName = "FormTextFieldStateless";

    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,

        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        controls: PropTypes.object,
        onChange: PropTypes.func,
        onValueChange: PropTypes.func,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        onKeyDown: PropTypes.func,
        onKeyPress: PropTypes.func,
        onMouseDown: PropTypes.func,
        onSave: PropTypes.func,
        onToggleReveal: PropTypes.func,
        onUndo: PropTypes.func,

        errorMessage: PropTypes.string,
        errorClassName: PropTypes.string,
        inputClassName: PropTypes.string,
        helpClassName: PropTypes.string,
        labelClassName: PropTypes.string,
        labelHelpText: PropTypes.string,
        labelText: PropTypes.string,
        labelLockText: PropTypes.string,
        maxLength: PropTypes.number,
        type: PropTypes.string,
        placeholder: PropTypes.string,

        autoComplete: PropTypes.bool,
        autoFocus: PropTypes.bool,
        disabled: PropTypes.bool,
        flexWidth: PropTypes.bool,
        maskValue: PropTypes.bool,
        readOnly: PropTypes.bool,
        required: PropTypes.bool,
        reveal: PropTypes.bool,
        showReveal: PropTypes.bool,
        showSave: PropTypes.bool,
        showUndo: PropTypes.bool,

        children: PropTypes.node
    };

    static defaultProps = {
        "data-id": "form-text-field",
        errorClassName: "",
        value: "",
        onBlur: _.noop,
        onChange: _.noop,
        onFocus: _.noop,
        onKeyDown: _.noop,
        onKeyPress: _.noop,
        onMouseDown: _.noop,
        onSave: _.noop,
        onToggleReveal: _.noop,
        onUndo: _.noop,
        onValueChange: _.noop,
        autoComplete: false,
        autoFocus: false,
        disabled: false,
        flexWidth: false,
        maskValue: false,
        readOnly: false,
        required: false,
        reveal: false,
        selectOnFocus: false,
        showReveal: false,
        showSave: false,
        showUndo: false
    };

    state = {
        labelWidth: 0
    };

    /**
     * Perform any operations that need to happen when the field value changes.
     *
     * @param {object} e the event object
     * @private
     */
    _handleFieldChange = (e) => {
        this.props.onValueChange(e.target.value);
        this.props.onChange(e);
    };

    _setFlexWidth = () => {
        if (this.props.flexWidth) {
            var content = this._getInputType() === "password" ? Array(this.props.value.length + 1).join(this.pwChar)
                    : this.props.value,
                contentWidth,
                newWidth;

            this._contentMeasurerInput.innerHTML = content;
            contentWidth = this._contentMeasurerLabel.offsetWidth;

            if (contentWidth > this.initialInputWidth) {
                newWidth = contentWidth + 10;

            } else if (contentWidth < this.initialInputWidth) {
                newWidth = this.initialInputWidth;
            }

            this.setState({
                labelWidth: newWidth
            });
        }
    };

    _getInputType = () => {
        var inputType;

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

        return inputType;
    };

    _handleFocus = () => {
        if (this.props.selectOnFocus && this.refs[this.props["data-id"] + "-input"]) {
            this.selectField();
        }
        this.props.onFocus();
    };

    selectField = /* istanbul ignore next */ () => {
        this.refs[this.props["data-id"] + "-input"].select();
    };

    componentDidMount() {
        var label = ReactDOM.findDOMNode(this.refs["container"]),
            container = this.refs["input-container"],
            input = this.refs[this.props["data-id"] + "-input"],
            copyLabelProperties = [
                "box-sizing",
                "padding-left",
                "padding-right",
            ],
            copyContainerProperties = [
                "box-sizing",
                "padding-left",
                "padding-right",
                "margin-left",
                "margin-right"
            ],
            copyInputProperties = [
                "box-sizing",
                "padding-left",
                "padding-right",
                "font-size",
                "font-family",
                "text-transform",
                "border-left-width",
                "border-right-width",
                "border-left-style",
                "border-right-style"
            ],
            labelStyles = "",
            containerStyles = "",
            inputStyles = "white-space: nowrap; ";

        if (this.props.flexWidth) {
            // copy label, container, and input css to width measuring elements
            copyLabelProperties.map(function (property) {
                labelStyles += property;
                labelStyles += ":";
                labelStyles += window.getComputedStyle(label, null).getPropertyValue(property);
                labelStyles += "; ";
            });
            copyContainerProperties.map(function (property) {
                containerStyles += property;
                containerStyles += ":";
                containerStyles += window.getComputedStyle(container, null).getPropertyValue(property);
                containerStyles += "; ";
            });
            copyInputProperties.map(function (property) {
                inputStyles += property;
                inputStyles += ":";
                inputStyles += window.getComputedStyle(input, null).getPropertyValue(property);
                inputStyles += "; ";
            });
            this.contentMeasurerLabel.setAttribute("style", labelStyles);
            this.contentMeasurerContainer.setAttribute("style", containerStyles);
            this.contentMeasurerInput.setAttribute("style", inputStyles);

            // get intitial width for later use
            this.initialInputWidth = label.offsetWidth;

            // detect if IE and set password character for later use
            this.pwChar = Utils.browserType() === Utils.Browsers.IE ? "●" : "•";

            // set ref to content measuring elements
            this._contentMeasurerLabel = ReactDOM.findDOMNode(this.contentMeasurerLabel);
            this._contentMeasurerContainer = ReactDOM.findDOMNode(this.contentMeasurerContainer);
            this._contentMeasurerInput = ReactDOM.findDOMNode(this.contentMeasurerInput);

            this.lastValue = this.props.value;

            // initial call with long content was measuring wrong width - delay allows for comnplete loading of DOM
            setTimeout(function () {
                this._setFlexWidth();
            }.bind(this), 10);
        }
    }

    componentDidUpdate() {
        if (this.props.flexWidth) {
            if (this.lastValue !== this.props.value) {
                this._setFlexWidth();
            }
            this.lastValue = this.props.value;
        }
    }

    render() {
        var id = this.props["data-id"],
            className = classnames(this.props.className, "input-text", {
                disabled: this.props.disabled,
                edited: this.props.isEdited,
                "flex-width": this.props.flexWidth,
                "form-error": this.props.errorMessage,
                "inline-save": this.props.showSave,
                "masking-controls": this.props.showReveal,
                readonly: this.props.readOnly,
                required: this.props.required,
                "value-entered": this.props.value || this.props.value !== ""
            }),
            undo = Translator.translate("undo"),
            save = Translator.translate("save"),
            inputType = this._getInputType();

        return (
            <FormLabel
                className={className}
                ref="container"
                data-id={id}
                value={this.props.labelText}
                hint={this.props.labelHelpText}
                lockText={this.props.labelLockText}
                helpClassName={this.props.helpClassName}
                style={this.state.labelWidth ? { width: this.state.labelWidth } : null}>

                <span className="input-container" ref="input-container">
                    <input
                        className={this.props.inputClassName}
                        onFocus={this._handleFocus}
                        onBlur={this.props.onBlur}
                        onKeyPress={this.props.onKeyPress}
                        onKeyDown={this.props.onKeyDown}
                        onMouseDown={this.props.onMouseDown}
                        onChange={this._handleFieldChange}
                        onPaste={this._handleFieldChange}
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
                    {this.props.flexWidth && (
                        <div
                            data-id={id + "-content-measurer"}
                            className="content-measurer"
                            ref={function (node) { this.contentMeasurerLabel = node; }.bind(this)}>
                            <div
                                className="content-measurer-container"
                                ref={function (node) { this.contentMeasurerContainer = node; }.bind(this)}>
                                <div
                                    className="content-measurer-input"
                                    ref={function (node) { this.contentMeasurerInput = node; }.bind(this)}
                                />
                            </div>
                        </div>
                    )}
                    {this.props.showReveal && (
                        <a
                            data-id="reveal"
                            onClick={!this.props.disabled ? this.props.onToggleReveal : null}
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
}

class Stateful extends React.Component {
    static displayName = "FormTextFieldStateful";

    state = {
        reveal: false,
        value: this.props.value || ""
    };

    _handleToggleReveal = () => {
        // prevents focus on characters in input field
        this.setState({
            reveal: !this.state.reveal
        });
    };

    _handleValueChange = (value) => {
        this.setState({
            value: value
        }, function () {
            if (this.props.onValueChange) {
                this.props.onValueChange(value);
            }
        });
    };

    componentWillReceiveProps(newProps) {
        if (newProps.value !== this.props.value) {
            this.setState({
                value: newProps.value
            });
        }
    }

    render() {
        var props = _.defaults({
            ref: "stateless",
            reveal: this.state.reveal,
            onToggleReveal: this._handleToggleReveal,
            value: this.state.value,
            onValueChange: this._handleValueChange
        }, this.props);

        return React.createElement(Stateless, props);
    }
}
