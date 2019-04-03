import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import FormFieldConstants from "../../../constants/FormFieldConstants";
import FormLabel from "../FormLabel";
import FormError from "../FormError";
import { InputWidthProptypes, getInputWidthClass } from "../InputWidths";

import classnames from "classnames";
import Utils from "../../../util/Utils.js";
import _ from "underscore";

import { inStateContainer } from "../../utils/StateContainer";
import { cannonballProgressivleyStatefulWarning } from "../../../util/DeprecationUtils";

/**
* @callback FormTextArea~onChange
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @callback FormTextArea~onValueChange
* @param {string} value
*     The current text area value.
*/

/**
* @callback FormTextArea~onBlur
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @callback FormTextArea~onUndo
*/

/**
* @class FormTextArea
* @desc A text area component that supports edit and readonly modes.
*
* @param {string} [className]
*     CSS classes to se ton the top-level HTML container.
* @param {number} [cols]
*     Columns value for sizing, default is taken from CSS styles.
* @param {string} [data-id="form-text-area"]
*     To define the base "data-id" value for the top-level HTML container.
* @param {string} [errorMessage]
*     The message to display if defined when external validation failed.
* @param {string} [helpClassName]
*     CSS classes to set on the HelpHint component.
* @param {string} [inputClassName]
*     CSS classes to set on the input element.
* @param {string} [label]
*     Alias for labelText
* @param {string} [labelHelpText]
*     The text to display for the help tooltip.
* @param {string} [labelText]
*     The text to show as the field's label.
* @param {number} [maxLength]
*     Max length supported by the field.
* @param {string} [name]
*     The name attribute for the input.
* @param {string} [originalValue]
*     The original value of the field. Also used for handling undo when stateless=false as
*     the value to set the field to if the undo icon is clicked - if not specified, no undo control will be shown.
* @param {string} [placeholder]
*     Placeholder text to show as the field's label.
* @param {number} [rows]
*     Rows value for sizing, default is taken from CSS styles.
* @param {string} [value=""]
*     The current text field value, used when state is managed outside of component.
*     Must be used with onValueChange handle to get updates.
* @param {array} [flags=[]]
*     Use progressively stateful behavior by providing the 'p-stateful' flag.
* @param {object} [initialState]
*     When the 'p-stateful' flag is set and 'value' is not being set as a prop,
*     initialState.value determines the initial state of 'value'.
* @param {("XS" | "SM" | "MD" | "LG" | "XL" | "XX" | "MAX")} [width]
*    Specifies the width of the input.
*
* @param {boolean} [autoFocus=false]
*     Whether or not to auto-focus the element.
* @param {boolean} [disabled=false]
*     If true, the text area will be disabled.
* @param {boolean} [edited=false]
*     Whether or not the field has been edited.
* @param {boolean} [required=false]
*     If true, the user must select a value for this field.
* @param {boolean} [showUndo=false]
*     Whether or not to display an undo option when field is edited. Only used when stateless=true.
* @param {boolean} [stateless]
*     WARNING. Default value for "stateless" will be set to true from next version.
*     To enable the component to be externally managed. True will relinquish control to the component's owner.
*     False or not specified will cause the component to manage state internally.
* @param {boolean} [useAutocomplete=false]
*     Whether or not the field will support autocomplete.
*
* @param {FormTextArea~onBlur} [onBlur]
*     Callback to be triggered when the field loses focus (is blurred).
* @param {FormTextArea~onChange} [onChange]
*     Callback to be triggered when the field changes. It will receive the triggering event.
*     The onValueChange callback will also be triggered.
* @param {FormTextArea~onValueChange} [onValueChange]
*     Callback to be triggered when the field changes. It will receive the component's value.
*     The onChange callback will also be triggered.
* @param {FormTextArea~onUndo} [onUndo]
*     Callback to be triggered when the 'undo' icon is clicked. Only used when stateless=true.
*
* @param {module:constants/FormFieldConstants.FormFieldTypes} [mode=FormFieldTypes.EDIT]
*     How the field will be shown: FormFieldTypes.EDIT or FormFieldTypes.READ_ONLY.
*
* @example
*     <FormTextArea
*         data-id={name}
*         labelText={element.viewName}
*         required={element.required}
*         value={element ? element.value : ''}
*         onValueChange={myFunction}
*     />
*/

class FormTextAreaStateless extends React.Component {
    static propTypes = {
        autoFocus: PropTypes.bool,
        children: PropTypes.node,
        className: PropTypes.string,
        cols: PropTypes.number,
        "data-id": PropTypes.string,
        disabled: PropTypes.bool,
        edited: PropTypes.bool,
        errorMessage: PropTypes.string,
        helpClassName: PropTypes.string,
        inputClassName: PropTypes.string,
        label: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
            PropTypes.string
        ]),
        labelHelpText: PropTypes.string,
        labelText: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
            PropTypes.string
        ]),
        mode: PropTypes.string,
        maxLength: PropTypes.number,
        name: PropTypes.string,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onUndo: PropTypes.func,
        onValueChange: PropTypes.func,
        originalValue: PropTypes.string,
        placeholder: PropTypes.string,
        required: PropTypes.bool,
        rows: PropTypes.number,
        showUndo: PropTypes.bool,
        useAutocomplete: PropTypes.bool,
        value: PropTypes.string,
        width: PropTypes.oneOf(InputWidthProptypes),
    };

    static defaultProps = {
        autoFocus: false,
        "data-id": "form-text-area",
        disabled: false,
        edited: false,
        mode: FormFieldConstants.FormFieldMode.EDIT,
        onBlur: _.noop,
        onChange: _.noop,
        onUndo: _.noop,
        onValueChange: _.noop,
        required: false,
        showUndo: false,
        useAutocomplete: false,
        value: "",
    };

    _handleChange = (e) => {
        this.props.onChange(e);
        this.props.onValueChange(e.target.value);
    };

    render() {
        const
            readonly = this.props.mode.toUpperCase() === FormFieldConstants.FormFieldMode.READ_ONLY,
            className = classnames(
                "input-textarea",
                getInputWidthClass({
                    className: this.props.className,
                    width: this.props.width,
                }),
                this.props.className,
                {
                    required: this.props.required,
                    "form-error": this.props.errorMessage,
                    disabled: this.props.disabled,
                    edited: this.props.edited,
                    "value-entered": !!this.props.value,
                    readonly: readonly,
                    actions: this.props.showUndo
                }
            );

        return (
            <FormLabel
                data-id={this.props["data-id"]}
                className={className}
                value={this.props.labelText || this.props.label}
                hint={this.props.labelHelpText}
                helpClassName={this.props.helpClassName}>
                <span className="input-container">
                    <textarea
                        data-id={this.props["data-id"] + "-textarea"}
                        ref={this.props["data-id"] + "-textarea"}
                        name={this.props.name || (this.props["data-id"] + "-textarea")}
                        className={this.props.inputClassName}
                        disabled={this.props.disabled}
                        placeholder={this.props.placeholder}
                        required={this.props.required}
                        readOnly={readonly}
                        maxLength={this.props.maxLength}
                        value={this.props.value}
                        onChange={this._handleChange}
                        onBlur={this.props.onBlur}
                        cols={this.props.cols}
                        rows={this.props.rows}
                        autoFocus={this.props.autoFocus}
                        autoComplete={this.props.useAutocomplete ? "on" : "off"}>
                    </textarea>
                    {this.props.edited && this.props.showUndo &&
                        <a data-id="undo" className="undo" onClick={this.props.onUndo}>undo</a>
                    }
                    {this.props.errorMessage && (
                        <FormError.Icon data-id={this.props["data-id"] + "-errorMessage-icon"} />
                    )}
                    {this.props.errorMessage && (
                        <FormError.Message
                            value={this.props.errorMessage}
                            data-id={this.props["data-id"] + "-errorMessage"}
                        />
                    )}
                </span>
                {this.props.children}
            </FormLabel>
        );
    }
}

class FormTextAreaStateful extends React.Component {
    static defaultProps = {
        "data-id": "form-text-area",
        onChange: _.noop,
        onValueChange: _.noop
    };

    state = {
        value: this.props.value || ""
    };

    _handleUndo = (e) => {
        // update the event with the reverted data and send back to the parent
        // otherwise the parent won't be aware of the reverted field even though the browser displays the original value
        e.target = ReactDOM.findDOMNode(this.refs.FormTextAreaStateless.refs[this.props["data-id"] + "-textarea"]);
        e.target.value = this.props.originalValue;
        this.props.onChange(e);
        this.props.onValueChange(e.target.value);

        this.setState({
            value: this.props.originalValue
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

    render() {
        const props = _.defaults({
            ref: "FormTextAreaStateless",
            value: this.state.value,
            onValueChange: this._handleValueChange,
            edited: this.props.originalValue && this.state.value !== this.props.originalValue,
            showUndo: this.props.originalValue && this.state.value !== this.props.originalValue,
            onUndo: this._handleUndo
        }, this.props);

        return React.createElement(FormTextAreaStateless, props, this.props.children);
    }
}

const resetToOriginal = (value, current, { originalValue }) => originalValue;

const isEdited = ({ value }, { originalValue }) => {
    if (value !== undefined && originalValue !== undefined) {
        return { edited: (value !== originalValue) };
    }
    return {};
};

const PStatefulFormTextArea = inStateContainer([
    {
        name: "value",
        initial: "",
        setter: "onValueChange",
        callbacks: [{
            name: "onUndo",
            transform: resetToOriginal,
        }],
    },
], isEdited)(FormTextAreaStateless);

export default class FormTextArea extends React.Component {
    static propTypes = {
        stateless: PropTypes.bool,
        flags: PropTypes.arrayOf(PropTypes.oneOf([ "p-stateful" ])),
    };

    static defaultProps = {
        stateless: true,
        flags: [],
    };

    _usePStateful = () => this.props.flags.includes("p-stateful");

    componentDidMount() {
        if (!this._usePStateful()) {
            cannonballProgressivleyStatefulWarning({ name: "FormTextArea" });
        }

        if (!Utils.isProduction() && this.props.controlled !== undefined) {
            throw new Error(Utils.deprecatePropError("controlled", "stateless", "false", "true"));
        }
    }

    render() {
        if (this._usePStateful()) {
            return (
                <PStatefulFormTextArea
                    {...this.props}
                />);
        }

        const { stateless, children } = this.props;

        return (
            stateless
                ? React.createElement(FormTextAreaStateless,
                    _.defaults({ ref: "FormTextAreaStateless" }, this.props), children)
                : React.createElement(FormTextAreaStateful,
                    _.defaults({ ref: "FormTextAreaStateful" }, this.props), children)
        );
    }
}