"use strict";

var React = require("react"),
    ReactDOM = require("react-dom"),
    css = require("classnames"),
    FormFieldConstants = require("../../../constants/FormFieldConstants"),
    FormError = require("../FormError.jsx"),
    HelpHint = require("../../tooltips/HelpHint.jsx"),
    _ = require("underscore");

/**
* @callback FormTextArea~onChange
* @ignore
*
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @callback FormTextArea~onValueChange
* @ignore
*
* @param {string} value
*     The current text area value.
*/

/**
* @callback FormTextArea~onBlur
* @ignore
*
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @class FormTextArea
* @ignore
*
* @desc A text area component that supports edit and readonly modes.
*
* @param {string} [referenceName="form-text-area"]
*     To define the base "data-id" value for the top-level HTML container.
* @param {string} [className]
*     CSS classes to set on the top-level HTML container.
*
* @param {string} [value]
*     The current text field value, used when state is managed outside of component.
*     Must be used with onValueChange handle to get updates.
* @param {string} [defaultValue]
*     The default (initial) value to be shown in the field, when component managing state itself.
* @param {String} [originalValue]
*     The value to set the field to if the undo icon is clicked. If unspecified, no undo control will be shown.
* @param {FormTextArea~onChange} [onChange]
*     Callback to be triggered when the field changes. It will receive the triggering event.
*     The onValueChange callback will also be triggered.
* @param {FormTextArea~onValueChange} [onValueChange]
*     Callback to be triggered when the field changes. It will receive the component's value.
*     The onChange callback will also be triggered.
* @param {FormTextArea~onBlur} [onBlur]
*     Callback to be triggered when the field loses focus (is blurred).
*
* @param {string} [labelText]
*     The text to show as the field's label.
* @param {string} [labelHelpText]
*     The text to display for the help tooltip.
* @param {string} [helpClassName]
*     CSS classes to set on the HelpHint component.
*
* @param {string} [inputCss]
*     CSS classes to set on the input element.
* @param {module:constants/FormFieldConstants.FormFieldTypes} [mode=FormFieldTypes.EDIT]
*     How the field will be shown: FormFieldTypes.EDIT or FormFieldTypes.READ_ONLY.
* @param {number} [maxLength]
*     Max length supported by the field.
* @param {number} [cols]
*     Columns value for sizing, default is taken from CSS styles.
* @param {number} [rows]
*     Rows value for sizing, default is taken from CSS styles.
*
* @param {string} [errorMessage]
*     The message to display if defined when external validation failed.
* @param {string} [placeholder]
*     Placeholder text to show as the field's label.
* @param {boolean} [disabled=false]
*     If true, the text area will be disabled.
* @param {boolean} [isRequired=false]
*     If true, the user must select a value for this field.
*
* @param {boolean} [autoFocus=false]
*     Whether or not to auto-focus the element.
* @param {boolean} [useAutocomplete=false]
*     Whether or not the field will support autocomplete.
*
* @example
*                   <FormTextArea
*                       referenceName={name}
*                       labelText={element.viewName}
*                       isRequired={element.required}
*                       defaultValue={element ? element.value : ''}
*                       onValueChange={myFunction} />
*/

var FormTextArea = React.createClass({

    propTypes: {
        referenceName: React.PropTypes.string,
        className: React.PropTypes.string,
        value: React.PropTypes.string,
        defaultValue: React.PropTypes.string,
        originalValue: React.PropTypes.string,
        onChange: React.PropTypes.func,
        onValueChange: React.PropTypes.func,
        onBlur: React.PropTypes.func,
        labelText: React.PropTypes.string,
        labelHelpText: React.PropTypes.string,
        helpClassName: React.PropTypes.string,
        inputCss: React.PropTypes.string,
        mode: React.PropTypes.string,
        maxLength: React.PropTypes.number,
        cols: React.PropTypes.number,
        rows: React.PropTypes.number,
        errorMessage: React.PropTypes.string,
        placeholder: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        isRequired: React.PropTypes.bool,
        autoFocus: React.PropTypes.bool,
        useAutocomplete: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            referenceName: "form-text-area",
            mode: FormFieldConstants.FormFieldMode.EDIT,
            defaultValue: "",
            labelText: "",
            disabled: false,
            isRequired: false,
            autoFocus: false,
            useAutocomplete: false,
            onChange: _.noop,
            onValueChange: _.noop,
            onBlur: _.noop
        };
    },

    componentWillMount: function () {
        console.warn("** This version of the FormTextArea is deprecated and will be removed in the next release");
    },

    /**
     * Handle a change of the field's value.
     *
     * @param {object} e the event object
     * @private
     */
    _handleFieldChange: function (e) {
        // return the event to the parent so it can perform whatever operations it needs
        this.props.onValueChange(e);
        this.props.onChange(e.target.value);

        // set the internal state to reflect the new value
        this.setState({
            fieldValue: e.target.value
        });
    },

    /**
     * Handle the undo operation by changing the value back to originalValue.
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
        this.props.onValueChange(e);
        // trigger a re-rendering of the field so the 'undo' link dissapears and the value gets reverted
        this.setState({
            fieldValue: originalValue
        });
    },

    getInitialState: function () {
        return {
            fieldValue: this.props.defaultValue
        };
    },

    render: function () {
        var value = _.isUndefined(this.props.value) ? this.state.fieldValue : this.props.value,
            edited = this.props.originalValue && this.props.originalValue !== value,
            readonly = this.props.mode.toUpperCase() === FormFieldConstants.FormFieldMode.READ_ONLY,
            labelHelp,
            undoValue = this.props.originalValue !== null &&
                        this.props.originalValue !== undefined &&
                        (value !== this.props.originalValue);

        var labelCss = css(this.props.className, "input-textarea", {
            required: this.props.isRequired,
            "form-error": this.props.errorMessage,
            disabled: this.props.disabled,
            edited: edited,
            "value-entered": !!value,
            readonly: readonly,
            actions: undoValue
        });

        var undo;
        if (undoValue) {
            // only show the undo icon if an original value is passed in and the text area's value has changed
            // empty strings are OK
            undo = (<a data-id="undo" className="undo" onClick={this._handleUndo}>undo</a>);
        }

        if (this.props.labelHelpText) {
            labelHelp = (
                <HelpHint
                    className={css("inline", this.props.helpClassName)}
                    hintText={this.props.labelHelpText}
                    data-id={this.props.referenceName + "_helptooltip"} />
            );
        }

        return (
            <label className={labelCss}>
                {this.props.labelText && (
                    <span className="label-text">
                        {this.props.labelText}
                        {labelHelp}
                    </span>
                )}
                <span className="input-container">
                    <textarea
                        disabled={this.props.disabled}
                        className={this.props.inputCss}
                        placeholder={this.props.placeholder}
                        isRequired={this.props.isRequired}
                        ref={this.props.referenceName}
                        data-id={this.props.referenceName}
                        name={this.props.referenceName}
                        readOnly={readonly}
                        maxLength={this.props.maxLength}
                        value={value}
                        cols={this.props.cols}
                        rows={this.props.rows}
                        autoComplete={this.props.useAutocomplete ? "on" : "off"}
                        onChange={this._handleFieldChange}
                        onBlur={this.props.onBlur}
                        autoFocus={this.props.autoFocus}>
                    </textarea>
                    {undo}
                    {this.props.errorMessage && (
                        <FormError.Icon data-id={this.props.referenceName + "_errormessage-icon"} />
                    )}
                    {this.props.errorMessage && (
                        <FormError.Message
                            value={this.props.errorMessage}
                            data-id={this.props.referenceName + "_errormessage"}
                        />
                    )}
                </span>
                {this.props.children}
            </label>
        );
    }

});

module.exports = FormTextArea;
