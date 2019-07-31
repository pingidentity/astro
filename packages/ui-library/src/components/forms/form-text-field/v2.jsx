import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import classnames from "classnames";

import FormLabel from "../FormLabel";
import FormMessage from "../FormMessage";
import { InputWidthProptypes, getInputWidthClass } from "../InputWidths";
import Translator from "../../../util/i18n/Translator.js";

import _ from "underscore";
import Utils from "../../../util/Utils.js";
import { cannonballChangeWarning } from "../../../util/DeprecationUtils";

import { inStateContainer, toggleTransform } from "../../utils/StateContainer";
import { flagsPropType, hasFlag } from "../../../util/FlagUtils";
import { getIcon } from "../../../util/PropUtils";

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
* @param {string} [className]
*     CSS classes to set on the top-level HTML container.
* @param {node} [subText]
*     A node that will add text or a component below the textbox.
* @param {string} [data-id="form-text-field"]
*     To define the base "data-id" value for the top-level HTML container.
* @param {node} [description]
*     Description to display below the label.
* @param {string} [errorClassName]
*     CSS classes to set on the FormTextFieldError component.
* @param {string} [errorMessage]
*     The message to display if defined when external validation failed.
* @param {string} [helpClassName]
*     CSS classes to apply to the label help hint (bottom, left, etc)
* @param {string|element} [iconRight]
*     Icon to be rendered on the right side. If it is a string it will be passed to an Icon compononet
*     as the iconName. If the element is passed it will render the element.
* @param {string|element} [iconLeft]
*     Icon to be rendered on the left side. If it is a string it will be passed to an Icon compononet
*     as the iconName. If the element is passed it will render the element.
* @param {string} [inputClassName]
*     CSS classes to set on the input element.
* @param {node} [labelHelpText]
*     A string or JSX object to display for the help tooltip.
* @param {string} [labelLockText]
*     The text to display for the lock help tooltip.
* @param {string} [labelText]
*     The text to show as the field's label.
* @param {string} [label]
*     Alias for labelText
* @param {number} [maxLength]
*     Maximum length supported by the text field.
* @param {string} [message]
*    The message text to display.
* @param {string} [messageType=error]
*    The type of message (error = red, info = blue, success = green, warning = yellow).
* @param {string} [name]
*     Name attribute on input
* @param {string} [placeholder]
*     Placeholder text for the input field.
* @param {number} [type]
*     An input type to be applied to the input. The input type often adds easily accessible and type-specific input
*     controls that often makes it easier to enter the field data.
* @param {string|number} [value=""]
*     Current text field value.
* @param {("XS" | "SM" | "MD" | "LG" | "XL" | "XX" | "MAX")} [width]
*    Specifies the width of the input.
*
* @param {boolean|string} [autoComplete="nope"]
*     Whether or not the field will support autocomplete.
* @param {boolean} [autoFocus=false]
*     Whether or not to auto-focus the element.
* @param {boolean} [disabled=false]
*     If true, the text field will be disabled.
* @param {boolean} [flexWidth=false]
*     When true the width of the input will grow to fit the size of its content.
* @param {boolean} [maskValue=false]
*     If true, the value shown in the input field will be masked with '*****'. (i.e: passwords).
* @param {boolean} [readOnly=false]
*     Whether or not the input field is readonly.
* @param {boolean} [required=false]
*     If true, the user must select a value for this field.
* @param {boolean} [reveal=false]
*     If true, will remove value masking.
* @param {boolean} [showReveal=false]
*    Whether or not to display a reveal option to remove value masking.
* @param {boolean} [showSave=false]
*     Whether or not to display a save option.
* @param {boolean} [showUndo=false]
*     Whether or not to display an undo option.
* @param {boolean} [stateless]
*     WARNING. Default value for "stateless" will be set to true from next version.
*     To enable the component to be externally managed. True will relinquish control to the component's owner.
*     False or not specified will cause the component to manage state internally.
*
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
* @param {FormTextField~onSave} [onSave]
*     Callback to be triggered when the 'save' icon is clicked.
* @param {FormTextField~onUndo} [onUndo]
*     Callback to be triggered when the 'undo' icon is clicked.
* @param {FormTextField~onToggleReveal} [onToggleReveal]
*    Callback to be triggered when the 'reveal' button is clicked.
*
* @param {object} [controls]
*    Accepts a React object for extra controls. Used with FormIntegerField.
*
* @example
*     <FormTextField
*         data-id="my-data-id"
*         labelText={element.viewName}
*         required={element.required}
*         value="default value"
*         onValueChange={myFunction}
*     />
*/

class Stateless extends React.Component {
    static displayName = "FormTextFieldStateless";

    static propTypes = {
        autoComplete: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]),
        autoFocus: PropTypes.bool,
        children: PropTypes.node,
        className: PropTypes.string,
        controls: PropTypes.object,
        description: PropTypes.node,
        subText: PropTypes.node,
        "data-id": PropTypes.string,
        disabled: PropTypes.bool,
        errorMessage: PropTypes.string,
        errorClassName: PropTypes.string,
        flexWidth: PropTypes.bool,
        helpClassName: PropTypes.string,
        iconRight: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.string
        ]),
        iconLeft: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.string
        ]),
        inputClassName: PropTypes.string,
        label: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
            PropTypes.string
        ]),
        labelClassName: PropTypes.string,
        labelHelpText: PropTypes.node,
        labelLockText: PropTypes.string,
        labelText: PropTypes.node,
        maskValue: PropTypes.bool,
        maxLength: PropTypes.number,
        message: PropTypes.string,
        messageType: PropTypes.string,
        name: PropTypes.string,
        onChange: PropTypes.func,
        onValueChange: PropTypes.func,
        onBlur: PropTypes.func,
        onClick: PropTypes.func,
        onFocus: PropTypes.func,
        onKeyDown: PropTypes.func,
        onKeyPress: PropTypes.func,
        onMouseDown: PropTypes.func,
        onSave: PropTypes.func,
        onToggleReveal: PropTypes.func,
        onUndo: PropTypes.func,
        placeholder: PropTypes.string,
        type: PropTypes.string,
        readOnly: PropTypes.bool,
        required: PropTypes.bool,
        reveal: PropTypes.bool,
        showReveal: PropTypes.bool,
        showSave: PropTypes.bool,
        showUndo: PropTypes.bool,
        size: PropTypes.number,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        width: PropTypes.oneOf(InputWidthProptypes),
        withArrow: PropTypes.bool
    };

    static defaultProps = {
        autoComplete: "nope",
        autoFocus: false,
        "data-id": "form-text-field",
        disabled: false,
        errorClassName: "",
        flexWidth: false,
        maskValue: false,
        onBlur: _.noop,
        onClick: _.noop,
        onChange: _.noop,
        onFocus: _.noop,
        onKeyDown: _.noop,
        onKeyPress: _.noop,
        onMouseDown: _.noop,
        onSave: _.noop,
        onToggleReveal: _.noop,
        onUndo: _.noop,
        onValueChange: _.noop,
        readOnly: false,
        required: false,
        reveal: false,
        selectOnFocus: false,
        showReveal: false,
        showSave: false,
        showUndo: false,
        value: "",
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
        const content = this._getInputType() === "password"
            ? Array(this.props.value.length + 1).join(this.pwChar)
            : this.props.value;
        let newWidth;

        this._contentMeasurerInput.innerHTML = content;
        const contentWidth = this._contentMeasurerLabel.offsetWidth;

        if (contentWidth > this.initialInputWidth) {
            newWidth = contentWidth + 10;

        } else if (contentWidth < this.initialInputWidth) {
            newWidth = this.initialInputWidth;
        }

        this.setState({
            labelWidth: newWidth
        });
    };

    _getInputType = () => {
        if (this.props.maskValue && !this.props.reveal) {
            return "password";

        } else if (this.props.type) {
            if (this.props.type === "color") {
                if (!Utils.isProduction()) { console.warn("Please use the ColorPicker component."); }
            }
            return this.props.type;

        } else {
            return "text";
        }
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
        const
            label = ReactDOM.findDOMNode(this.refs["container"]),
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
            ];

        let labelStyles = "",
            containerStyles = "",
            inputStyles = "white-space: nowrap; ";

        if (this.props.flexWidth) {
            // copy label, container, and input css to width measuring elements
            copyLabelProperties.map(function (property) {
                labelStyles += `${property}:${window.getComputedStyle(label, null).getPropertyValue(property)}; `;
            });
            copyContainerProperties.map(function (property) {
                containerStyles += `${property}:${window.getComputedStyle(container, null)
                    .getPropertyValue(property)}; `;
            });
            copyInputProperties.map(function (property) {
                inputStyles += `${property}:${window.getComputedStyle(input, null).getPropertyValue(property)}; `;
            });
            this.contentMeasurerLabel.setAttribute("style", labelStyles);
            this.contentMeasurerContainer.setAttribute("style", containerStyles);
            this.contentMeasurerInput.setAttribute("style", inputStyles);

            // get initial width for later use
            this.initialInputWidth = label.offsetWidth;

            // detect if IE and set password character for later use
            this.pwChar = Utils.browserType() === Utils.Browsers.IE ? "●" : "•";

            // set ref to content measuring elements
            this._contentMeasurerLabel = ReactDOM.findDOMNode(this.contentMeasurerLabel);
            this._contentMeasurerContainer = ReactDOM.findDOMNode(this.contentMeasurerContainer);
            this._contentMeasurerInput = ReactDOM.findDOMNode(this.contentMeasurerInput);

            this.lastValue = this.props.value;

            // initial call with long content was measuring wrong width - delay allows for complete loading of DOM
            setTimeout(this._setFlexWidth, 10);
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

    _getAutoComplete = () => {
        if (typeof this.props.autoComplete === "string") {
            return this.props.autoComplete;
        } else if (this.props.autoComplete) {
            return "on";
        } else {
            return "nope";
        }
    }

    render() {
        const dataId = this.props["data-id"];
        const inputType = this._getInputType();
        const message = this.props.errorMessage || this.props.message;
        const undo = Translator.translate("undo");
        const save = Translator.translate("save");

        const className = classnames(
            this.props.className,
            this.props.size ? null : getInputWidthClass({
                className: this.props.className,
                width: this.props.width,
            }),
            "input-text",
            {
                disabled: this.props.disabled,
                edited: this.props.isEdited,
                "flex-width": this.props.flexWidth,
                "input-message": message,
                [`input-message--${this.props.messageType}`]: this.props.messageType,
                "inline-save": this.props.showSave,
                "masking-controls": this.props.showReveal,
                readonly: this.props.readOnly,
                required: this.props.required,
                "value-entered": this.props.value || this.props.value !== "",
                "input-text--right-icon": this.props.iconRight,
                "input-text--left-icon": this.props.iconLeft,
                "input-text--right-arrow": this.props.withArrow,
            },
        );

        return (
            <FormLabel
                className={className}
                ref="container"
                data-id={dataId}
                description={this.props.description}
                value={this.props.labelText || this.props.label}
                hint={this.props.labelHelpText}
                lockText={this.props.labelLockText}
                helpClassName={this.props.helpClassName}
                style={this.state.labelWidth ?{ width: this.state.labelWidth } : null}>
                <span
                    className={
                        classnames(
                            "input-container",
                            {
                                "input-text__container--right-arrow": this.props.withArrow,
                            }
                        )
                    }
                    data-id="text-field_container"
                    ref="input-container"
                    onClick={this.props.onClick}
                >
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
                        ref={dataId + "-input"}
                        readOnly={this.props.readOnly}
                        data-id={dataId + "-input"}
                        type={inputType}
                        maxLength={this.props.maxLength || this.props.size}
                        name={this.props.name}
                        value={this.props.value}
                        autoComplete={this._getAutoComplete()}
                        disabled={this.props.disabled}
                        autoFocus={this.props.autoFocus}
                        size={this.props.size}
                        style={{
                            width: this.props.size ? "auto" : null,
                            padding: this.props.inline ? "2px" : null,
                            height: this.props.inline ? "25px" : null,
                            fontSize: this.props.inline ? "13px" : null,
                            verticalAlign: this.props.inline ? "top" : null,
                            marginTop: this.props.inline ? "-5px" : null
                        }}
                    />
                    {this.props.flexWidth && (
                        <div
                            data-id={dataId + "-content-measurer"}
                            className="content-measurer"
                            ref={node => { this.contentMeasurerLabel = node; }}>
                            <div
                                className="content-measurer-container"
                                ref={node => { this.contentMeasurerContainer = node; }}>
                                <div
                                    className="content-measurer-input"
                                    ref={node => { this.contentMeasurerInput = node; }}
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
                    {this.props.iconRight &&
                    <span className="input-icon input-icon--right">
                        {getIcon(this.props.iconRight, { type: "inline" })}
                    </span>
                    }
                    {this.props.iconLeft &&
                     <span className="input-icon input-icon--left">
                         {getIcon(this.props.iconLeft, { type: "leading" })}
                     </span>
                    }
                    {message && (
                        <FormMessage
                            data-id={dataId}
                            message={message}
                            type={this.props.messageType}
                        />
                    )}
                    {this.props.subText ? <span className="sub-text">{this.props.subText}</span>
                        : null}
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
        const props = _.defaults({
            ref: "stateless",
            reveal: this.state.reveal,
            onToggleReveal: this._handleToggleReveal,
            value: this.state.value,
            onValueChange: this._handleValueChange
        }, this.props);

        return <Stateless {...props} />;
    }
}

const PStatefulFormTextField = inStateContainer([
    {
        name: "reveal",
        initial: false,
        callbacks: [{
            name: "onToggleReveal",
            transform: toggleTransform,
        }],
    },
    {
        name: "value",
        initial: "",
        setter: "onValueChange",
    },
])(Stateless);

class FormTextField extends React.Component {

    static messageTypes = FormMessage.messageTypes;
    static FormTextFieldStateless = Stateless; // we'd rather this were a named export, but the index.js/v2.jsx scheme prevents that

    static propTypes = {
        stateless: PropTypes.bool,
        flags: flagsPropType,
    };

    static defaultProps = {
        stateless: true,
    };

    static contextTypes = { flags: PropTypes.arrayOf(PropTypes.string) };

    componentDidMount() {
        if (!Utils.isProduction() && this.props.controlled !== undefined) {
            throw new Error(Utils.deprecatePropError("controlled", "stateless", "false", "true"));
        }
        if (!this._usePStateful()) {
            cannonballChangeWarning({
                message: `The 'reveal' prop will no longer serve as an initial state for FormTextField. ` +
                `If it is present, it will control the current value of the component. ` +
                `Set the 'p-stateful' flag to switch to this behavior now.`,
            });

            cannonballChangeWarning({
                message: `The 'value' prop will no longer serve as an initial state for FormTextField. ` +
                `If it is present, it will control the current value of the component. ` +
                `Set the 'p-stateful' flag to switch to this behavior now.`,
            });
        }
    }

    _usePStateful = () => hasFlag(this, "p-stateful");

    render() {
        if (this._usePStateful()) {
            return <PStatefulFormTextField {...this.props} />;
        }

        return (this.props.stateless
            ? <Stateless ref="stateless" {...this.props} />
            : <Stateful ref="stateful" {...this.props} />
        );
    }
}

export default FormTextField;