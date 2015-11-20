"use strict";

var React = require("react"),
    css = require("classnames"),
    FormFieldConstants = require("../../constants/FormFieldConstants"),
    HelpHint = require("../tooltips/HelpHint.jsx"),
    _ = require("underscore");

/**
 * @module FormTextArea
 * @desc A text area component that supports edit and readonly modes.
 *
 * @param {string} [referenceName] name used by the parent to get the value/text entered in this component
 *      (default 'form-text-area')
 * @param {boolean} [isRequired] true if the field is required (default false)
 * @param {string} [value] current text field value, used when state is managed outside of component;
 *      must be used with onValueChange handler to get updates
 * @param {string} [defaultValue] the default (initial) value to be shown in the field, when component managing state
 *      itself
 * @param {string} [labelText] the text to show as the field's label
 * @param {string} [placeholder] input placeholder text
 * @param {function} [onValueChange] a callback that will be triggered when the field changes
 * @param {function} [onBlur] a callback that will be triggered when the field loses focus
 * @param {string} [mode] how the field will be shown: edit or readonly (default edit)
 * @param {number} [maxLength] max length (number) supported by the field
 * @param {number} [cols] columns value for sizing, default is css
 * @param {number} [rows] rows value for sizing, default is css
 * @param {string} [originalValue] value to set the field to if the undo icon is clicked.
 *      (if not specified, no undo control will be shown)
 * @param {boolean} [useAutocomplete] whether or not the field will support autocomplete. (default false)
 * @param {string} [inputCss] CSS classes to add to the input element
 * @param {string} [className] CSS classes to add to the parent Label element
 * @param {string} [errorMessage] an error message to show (will be shown if defined)
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
        // prop validations
        mode: React.PropTypes.string,
        isRequired: React.PropTypes.bool,
        defaultValue: React.PropTypes.string,
        value: React.PropTypes.string,
        labelText: React.PropTypes.string,
        labelHelpText: React.PropTypes.string,
        placeholder: React.PropTypes.string,
        onValueChange: React.PropTypes.func,
        onBlur: React.PropTypes.func,
        referenceName: React.PropTypes.string,
        maxLength: React.PropTypes.number,
        originalValue: React.PropTypes.string,
        cols: React.PropTypes.number,
        rows: React.PropTypes.number,
        useAutocomplete: React.PropTypes.bool,
        inputCss: React.PropTypes.string,
        className: React.PropTypes.string,
        errorMessage: React.PropTypes.string
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
        // set the internal state to reflect the new value
        this.setState({
            fieldValue: e.target.value
        });
    },

    /**
     * Handle the field losing focus.
     *
     * @param {object} e the event object
     * @private
     */
    _handleBlur: function (e) {
        this.props.onBlur(e);
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
        e.target = this.refs[this.props.referenceName].getDOMNode();
        e.target.value = originalValue;
        this.props.onValueChange(e);
        // trigger a re-rendering of the field so the 'undo' link dissapears and the value gets reverted
        this.setState({
            fieldValue: originalValue
        });
    },

    getDefaultProps: function () {
        return {
            referenceName: "form-text-area",
            className: "input-textarea",
            mode: FormFieldConstants.FormFieldMode.EDIT,
            defaultValue: "",
            labelText: "",
            useAutocomplete: false,
            onValueChange: function () {
                // do nothing as the default action
            },
            onBlur: function () {
                // do nothing as the default action
            }
        };
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
            labelHelp;

        var labelCss = css(this.props.className, {
                "input-textarea": true,
                required: this.props.isRequired,
                "form-error": this.props.errorMessage,
                edited: edited,
                "value-entered": !!value,
                readonly: readonly
            }),
            errorCss = css("help-tooltip form-error-message", {
                show: this.props.errorMessage
            });

        var undo;
        if (this.props.originalValue !== null &&
                this.props.originalValue !== undefined &&
                (value !== this.props.originalValue)) {
            // only show the undo icon if an original value is passed in and the text area's value has changed
            // empty strings are OK
            undo = (<a data-id="undo" className="undo" onClick={this._handleUndo}>undo</a>);
        }

        if (this.props.labelHelpText) {
            labelHelp = (
                <HelpHint hintText={this.props.labelHelpText} data-id={this.props.referenceName + "_helptooltip"} />
            );
        }

        return (
            <label className={labelCss}>
                <span className="label-text">
                    {this.props.labelText}
                    {labelHelp}
                </span>
                <span className="input-container">
                    <textarea
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
                        onBlur={this._handleBlur}>
                    </textarea>
                    {undo}
                    <div className={errorCss}>
                        <div className="tooltip-text" data-id={this.props.referenceName + "_errormessage"}>
                            {this.props.errorMessage}
                        </div>
                    </div>
                </span>
                {this.props.children}
            </label>
        );
    }

});

module.exports = FormTextArea;
