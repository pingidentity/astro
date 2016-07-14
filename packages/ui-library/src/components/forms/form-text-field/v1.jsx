"use strict";

var React = require("react"),
    ReactDOM = require("react-dom"),
    classnames = require("classnames"),
    FormError = require("../FormError.jsx"),
    FormFieldConstants = require("../../../constants/FormFieldConstants"),
    HelpHint = require("../../tooltips/HelpHint.jsx"),
    Utils = require("../../../util/Utils.js"),
    _ = require("underscore");

/**
 * @callback FormTextField~eventCallback
 * @param {object} event - reactjs synthetic event object
 */

/**
 * @callback FormTextField~keypressCallback
 * @param {number} keyCode - pressed key, essentially same thing as `event.which`
 * @param {object} event - reactjs synthetic event object
 */

/**
 * @callback FormTextField~validationCallback
 * @param {string} value - value entered in text field
 * @returns {string|falsy} error - error validation message or some falsy value if no error found
 */

/**
 * @callback FormTextField~valueCallback
 * @param {string} value - value entered in text field
 */

/**
 * @class FormTextField
 * @desc A text field component that supports edit, readonly and summary mode
 *
 * @param {string}   [referenceName] name used by the parent to get the value/text entered in this component (default 'formTextField')
 * @param {boolean}  [isRequired]    whether the field is required or not (default false)
 * @param {string}   [value]         current text field value. this is used when state is managed outside of component,
 *                                   must be used with onValueChange/onChange handler to get updates
 * @param {string}   [labelText]     the text to show as the field's label
 * @param {string}   [placeholder]   placeholder text for the input field
 * @param {FormTextField~eventCallback} [onFocus]       a callback that will be triggered when the field gains focus
 * @param {FormTextField~eventCallback} [onBlur]        a callback that will be triggered when the field blurs (loses focus)
 * @param {FormTextField~keypressCallback} [onKeyPress]    a callback that will be triggered when a key is pressed in the field;
 *
 * @param {FormTextField~eventCallback} [onValueChange] a callback that will be triggered when the field value
 *                                                               changes
 * @param {FormTextField~eventCallback} [onChange] same thing as 'onValueChange' to match common naming convention in ReactJS
 * @param {string}   [mode]          how the field will be shown: edit or readonly (default edit)
 * @param {number}   [maxLength]     maximum length supported by the field
 * @param {string}   [defaultValue]  the default (initial) value to be shown in the field, when component managing state itself
 * @param {string}   [originalValue] value to set the field to if the undo icon is clicked. If 'undefined' no undo icon will be shown
 * @param {boolean}  [useAutocomplete]    whether or not the field will support autocomplete (default false)
 * @param {string}   [helpClassName]           CSS classes to add to the help element
 * @param {string}   [inputCss]           CSS classes to add to the input element
 * @param {string}   [labelCss]           CSS classes to add to the label element
 * @param {string}   [className]          CSS classes to add to the parent Label element
 * @param {FormTextField~validationCallback} [validator]          callback function that takes the input data and returns an error message if the data is not valid
 * @param {string}   [validatorTrigger]   defines the event that triggers validation ('onBlur' and 'onChange' are supported values) (default 'onBlur')
 * @param {boolean}  [maskValue]          if true, the value shown in the input field will be masked with '*****' i.e: passwords (default false)
 * @param {string}   [errorMessage]       error message to render if validation is being done externally
 * @param {FormTextField~valueCallback} [save] a callback to be triggred when 'save' icon is clicked; when defined
 *                                             causes the save control to be shown
 * @param {object}   [upDownSpinner]      up down buttons used by FormIntegerField
 * @param {boolean}  [autoFocus]          whether or not to auto-focus the element
 * @param {boolean}  [forceExternalState] Won't switch to internally managed state value if true. Defaults to false
 * @param {string}   [labelId]            A data-id for convenient access to the label's text
 * @param {object}  [controls]           Accepts a React object for extra controls. Used with FormIntegerField.
 *
 * @example <FormTextField
 *              referenceName={name}
 *              labelText={element.viewName}
 *              isRequired={element.required}
 *              defaultValue={element ? element.value : ''}
 *              onValueChange={myFunction} />
 */
var FormTextField = React.createClass({

    propTypes: {
        // prop validations
        className: React.PropTypes.string,
        defaultValue: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        disabled: React.PropTypes.bool,
        errorMessage: React.PropTypes.string,
        labelHelpText: React.PropTypes.string,
        errorCss: React.PropTypes.string,
        helpClassName: React.PropTypes.string,
        inputCss: React.PropTypes.string,
        isRequired: React.PropTypes.bool,
        labelText: React.PropTypes.string,
        maskValue: React.PropTypes.bool,
        maxLength: React.PropTypes.number,
        mode: React.PropTypes.string,
        onFocus: React.PropTypes.func,
        onBlur: React.PropTypes.func,
        onKeyPress: React.PropTypes.func,
        onChange: React.PropTypes.func,
        onValueChange: React.PropTypes.func,
        originalValue: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        placeholder: React.PropTypes.string,
        referenceName: React.PropTypes.string,
        save: React.PropTypes.func,
        useAutocomplete: React.PropTypes.bool,
        validator: React.PropTypes.func,
        validatorTrigger: React.PropTypes.string,
        value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        autoFocus: React.PropTypes.bool,
        forceExternalState: React.PropTypes.bool,
        labelId: React.PropTypes.string,
        controls: React.PropTypes.object
    },

    componentWillMount: function () {
        console.warn(Utils.deprecateMessage("FormTextField v1", "FormTextField v2"));
    },

    /**
     * Handle field validation and the display of an error message.
     *
     * @param {object} e the event object
     * @private
     */
    _handleFieldErrorMessage: function (e) {
        // run the validator, if passed in, otherwise assume that the data is valid
        var errorMessage = "";
        if (this.props.errorMessage) {
            errorMessage = this.props.errorMessage;
        }
        if (this.props.validator) {
            errorMessage = this.props.validator(e.target.value);
        }
        // set the internal state to reflect the new value
        this.setState({
            fieldValue: e.target.value,
            errorMessage: errorMessage
        });
    },

    /**
     * Perform any operations that need to happen when the field value changes.
     *
     * @param {object} e the event object
     * @private
     */
    _handleFieldChange: function (e) {
        // return the event to the parent so it can perform whatever operations it needs
        if (this.props.onValueChange) {
            this.props.onValueChange(e);
        }
        if (this.props.onChange) {
            this.props.onChange(e);
        }

        if (this.props.validatorTrigger === "onChange") {
            this._handleFieldErrorMessage(e);
        }
        if (this.props.validatorTrigger === "onBlur") {
            // set the internal state to reflect the new value
            this.setState({
                fieldValue: e.target.value
            });
        }
    },

    /**
     * Perform any operations that need to happen when the field gains focus.
     *
     * @param {object} e the event object
     * @private
     */
    _handleFieldFocus: function (e) {
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    },

    /**
     * Perform any operations that need to happen when the field blurs (loses focus).
     *
     * @param {object} e the event object
     * @private
     */
    _handleFieldBlur: function (e) {
        if (this.props.validatorTrigger === "onBlur") {
            this._handleFieldErrorMessage(e);
        }
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    },

    /**
     * Perform any operations that need to happen when a key is pressed in this field.
     *
     * @param {object} e the event object
     * @private
     */
    _handleFieldKeyPress: function (e) {
        if (this.props.onKeyPress) {
            this.props.onKeyPress(e.which, e);
        }
    },

    /**
     * Perform the undo operation when the undo control is clicked.
     *
     * @param {object} e the event object
     * @private
     */
    _handleUndo: function (e) {
        var originalValue = this.props.originalValue;
        // update the event with the reverted data and send back to the parent
        // otherwise the parent won't be aware of the reverted field even though the browser displays the original value
        e.target = ReactDOM.findDOMNode(this.refs[this.props.referenceName]);
        e.target.value = originalValue;

        if (this.props.onValueChange) {
            this.props.onValueChange(e);
        }

        if (this.props.onChange) {
            this.props.onChange(e);
        }

        // trigger a re-rendering of the field so the 'undo' link dissapears and the value gets reverted
        this.setState({
            fieldValue: originalValue
        });
    },

    /**
     * Perform the save operation when the save control is clicked.
     *
     * @param {object} e the event object
     * @private
     */
    _handleSave: function () {
        if (this.props.save) {
            this.props.save(this.state.fieldValue);
        }
    },

    getDefaultProps: function () {
        return {
            referenceName: "formTextField",
            mode: FormFieldConstants.FormFieldMode.EDIT,
            defaultValue: "",
            labelText: "",
            errorCss: "",
            useAutocomplete: false,
            validatorTrigger: "onBlur",
            forceExternalState: false,
            originalValue: null,
            onValueChange: _.noop
        };
    },

    getInitialState: function () {
        return {
            fieldValue: this.props.value || this.props.defaultValue,
            errorMessage: this.props.errorMessage
        };
    },

    componentWillReceiveProps: function (nextProps) {
        if (typeof nextProps.errorMessage !== "undefined") {
            this.setState({ errorMessage: nextProps.errorMessage });
        }
    },

    render: function () {
        var value = _.isUndefined(this.props.value) ? this.state.fieldValue : this.props.value;
        // if forcing external state, only use prop value
        value = this.props.forceExternalState ? this.props.value : value;

        var edited = this.props.originalValue !== null && this.props.originalValue !== value,
            readonly = this.props.mode.toUpperCase() === FormFieldConstants.FormFieldMode.READ_ONLY,
            undo,
            save,
            labelHelp;

        var labelCss = classnames(this.props.labelCss, {
            "input-text": true,
            required: this.props.isRequired,
            "form-error": this.state.errorMessage,
            readonly: readonly,
            edited: edited,
            "value-entered": !!value,
            disabled: this.props.disabled
        });

        if (this.props.className) {
            labelCss += " " + this.props.className;
        }

        if (edited) {
            // only show the undo icon if an original value is passed in and the field's value has changed
            // empty strings are OK
            undo = (<a data-id="undo" className="undo" onClick={this._handleUndo}>undo</a>);
        }

        if (this.props.save && this.state.fieldValue !== this.props.originalValue) {
            save = (<a data-id="save" className="save" onClick={this._handleSave}>save</a>);

            labelCss += " inline-save";
        }

        if (this.props.labelHelpText) {
            labelHelp = (
                <HelpHint
                    className={classnames("inline", this.props.helpClassName)}
                    hintText={this.props.labelHelpText}
                    id={this.props.referenceName + "_helptooltip"} />
            );
        }

        return (
            <label className={labelCss} data-id={this.props.referenceName + "_label"}>
                {this.props.labelText && (
                    <span data-id={this.props.labelId} className="label-text">
                        {this.props.labelText}
                        {labelHelp}
                    </span>
                )}
                <span className="input-container">
                    <input
                        className={this.props.inputCss}
                        placeholder={this.props.placeholder}
                        did={this.props.validate ? this.props.referenceName : ""}
                        isRequired={this.props.isRequired}
                        ref={this.props.referenceName}
                        data-id={this.props.referenceName}
                        name={this.props.referenceName}
                        id={this.props.referenceName}
                        type={this.props.maskValue ? "password" : "text"}
                        readOnly={readonly}
                        maxLength={this.props.maxLength}
                        value={value}
                        autoComplete={this.props.useAutocomplete ? "on" : "off"}
                        onChange={this._handleFieldChange}
                        onFocus={this._handleFieldFocus}
                        onBlur={this._handleFieldBlur}
                        onKeyPress={this._handleFieldKeyPress}
                        disabled={this.props.disabled}
                        autoFocus={this.props.autoFocus}/>

                    {undo}
                    {save}

                    {this.props.controls}

                    <FormError value={this.state.errorMessage}
                        data-id={this.props.referenceName + "_errormessage"} />
                </span>
                {this.props.children}
            </label>
        );
    }

});

module.exports = FormTextField;
