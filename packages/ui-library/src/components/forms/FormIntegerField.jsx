"use strict";

var React = require("react"),
    FormFieldConstants = require("../../constants/FormFieldConstants"),
    FormTextField = require("./FormTextField.jsx"),
    classnames = require("classnames");

/**
 * @callback FormIntegerField~valueEventCallback
 * @param {string} value - value entered in text field
 * @param {object} event - reactjs synthetic event object
 */

/**
 * @callback FormIntegerField~keypressCallback
 * @param {number} keyCode - pressed key, essentially same thing as `event.which`
 * @param {object} event - reactjs synthetic event object
 */

/**
 * @callback FormIntegerField~validationCallback
 * @param {string} value - value entered in text field
 * @returns {string|falsy} error - error validation message or some falsy value if no error found
 */

/**
 * @callback FormIntegerField~eventCallback
 * @param {object} event - reactjs synthetic event object
 */

/**
 * @callback FormIntegerField~valueCallback
 * @param {string} value - value entered in text field
 */

/**
 * @class FormIntegerField
 * @desc A component that extends FormTextField to only accept positive integers with add and subtract arrows.
 *
 * @param {boolean} [isRequired] whether the field is required or not (default false)
 * @param {string} [value] current integer field value. this is used when state is managed outside of component,
 *           must be used with onValueChange/onChange handler to get updates
 * @param {string} [labelText] the text to show as the field's label
 * @param {string} [placeholder] placeholder text for the input field
 * @param {FormIntegerField~valueEventCallback} [onBlur] a callback that will be triggered when the field blurs (loses focus)
 * @param {FormIntegerField~eventCallback} [onValueChange] a callback that will be triggered when the field changes
 * @param {FormIntegerField~valueEventCallback} onChange required callback for parent to manage state
 * @param {string} [mode] how the field will be shown: edit or readonly (default edit)
 * @param {number} [maxLength] maximum length supported by the field
 * @param {number} [max] - maximum number allowed in field, default 999999999999999
 * @param {number} [min] - minimum number allowed in field, default 0
 * @param {number} [increment] - increment for addition and subtraction, default 1
 * @param {string} [defaultValue] the default (initial) value to be shown in the field, when component managing state itself
 * @param {string} [originalValue] value to set the field to if the undo icon is clicked. If 'undefined' no undo icon will be shown
 * @param {boolean} [useAutocomplete] whether or not the field will support autocomplete (default false)
 * @param {string} [inputCss] CSS classes to add to the input element
 * @param {string} [labelCss] CSS classes to add to the label element
 * @param {string} [className] CSS classes to add to the parent Label element
 * @param {FormIntegerField~validationCallback} [validator] callback function that takes the input data and returns an error message if the data is not valid
 * @param {string} [validatorTrigger] defines the event that triggers validation ('onBlur' and 'onChange' are supported values) (default 'onBlur')
 * @param {boolean} [maskValue] if true, the value shown in the input field will be masked with '*****' i.e: passwords (default false)
 * @param {string} [errorMessage] error message to render if validation is being done externally
 * @param {FormIntegerField~valueCallback} [save] a method to be called to save the value; causes the save control to be shown
 * @param {boolean} [autoFocus] whether or not to auto-focus the element
 * @param {boolean} [enforceRange=true] whether or not enforce max value limit
 *
 * @example <FormIntegerField
 *              referenceName={name}
 *              labelText={element.viewName}
 *              isRequired={element.required}
 *              defaultValue={element ? element.value : ""}
 *              onValueChange={myFunction} />
 */


var FormIntegerField=React.createClass({

    propTypes: {
        // prop validations
        autoFocus: React.PropTypes.bool,
        className: React.PropTypes.string,
        defaultValue: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        disabled: React.PropTypes.bool,
        errorMessage: React.PropTypes.string,
        errorCss: React.PropTypes.string,
        enforceRange: React.PropTypes.bool,
        increment: React.PropTypes.number,
        inputCss: React.PropTypes.string,
        isRequired: React.PropTypes.bool,
        labelHelpText: React.PropTypes.string,
        labelText: React.PropTypes.string,
        maskValue: React.PropTypes.bool,
        maxLength: React.PropTypes.number,
        max: React.PropTypes.number,
        min: React.PropTypes.number,
        mode: React.PropTypes.string,
        onBlur: React.PropTypes.func,
        onChange: React.PropTypes.func.isRequired,
        onValueChange: React.PropTypes.func,
        originalValue: React.PropTypes.number,
        placeholder: React.PropTypes.string,
        save: React.PropTypes.func,
        tabIndex: React.PropTypes.number,
        type: React.PropTypes.string,
        useAutocomplete: React.PropTypes.bool,
        validator: React.PropTypes.func,
        validatorTrigger: React.PropTypes.string,
        value: React.PropTypes.number
    },

    /**
     * Initial check on Integer and Range validity then return event to parent.
     *
     * @param {object} e the event object
     * @private
     */
    _handleChange: function (e) {
        // pass the event to the parent so it can perform whatever operations it needs

        var input = e.target.value;

        // check Integer and Range
        if (!this._isValid(input)) {
            return;
        }
        input = parseInt(input);

        // remove leading 0s
        var value = isNaN(input) ? "" : input ;

        // pass value and event to parent
        this.props.onChange(value, e);
    },

    _handleBlur: function (e) {
        var value = e.target.value;

        if (this.props.onBlur) {
            this.props.onBlur(value, e);
        }
    },

    /**
     * Determines if the input value is an integer and falls in acceptable range
     *
     * @param {number} value the value to be evaluated
     * @returns {boolean} returns true if integer false if not
     * @private
     */
    _isValid: function (value) {
        //check number without decimal
        if (isNaN(value) || value.toString().indexOf(".") !== -1) {
            return false;
        }
        // check max range if enforceRange is true
        if (this.props.enforceRange && value > this.props.max) {
            return false;
        }
        // check int
        return value % 1 === 0;
    },

    /**
     * Handles down press of the spinner arrows
     *
     * @param {value} e the event object value
     * @private
     */
    _handleSpinnerPress: function (e) {
        var inc = this.props.increment;

        //set negative increment for down spinner
        inc = (e.target.getAttribute("data-direction") === "down") ? -inc : inc;

        //preform addition or subraction
        this._counter(e, inc);

        //set timeout for rapid addition or subtraction when held
        this.timeout = setTimeout(this._interval.bind(this, e, inc), 700);

    },

    /**
     * Handles release of the spinner arrows. Clears timeout and interval.
     *
     * @param {value} e the event object value
     * @private
     */
    _handleSpinnerRelease: function () {
        clearTimeout(this.timeout);
        clearInterval(this.interval);
    },

    /**
     * Handles down press of key to increment with up and down arrows. Sends to spinner handlers
     *
     * @param {value} e the event object value
     * @private
     */
    _handleKeyPress: function (e) {
        var key = e.keyCode;
        //do nothing for all other keys
        if (key !== 38 && key !== 40) {return;}

        e.stopPropagation();

        var inc = (key === 38) ? this.props.increment : - this.props.increment;

        // preform addition or subraction
        this._counter(e, inc);
    },

    /**
     * Handle interval for rapid counting when spinner or arrow pressed
     * @param {object} e the event object
     * @param {number} inc the increment for count function
     * @private
     */
    _interval: function (e, inc) {
        clearInterval(this.interval);
        this.interval = setInterval(this._counter.bind(this, e, inc), 50);
    },

    /**
     * Preforms internal count operation for rapid counting without sending to parent. Value must be sent to after counter finishes.
     *
     * @param {object} e The event object
     * @param {number} inc The increment to apply to current field value
     * @private
     */
    _counter: function (e, inc) {
        var inputValue = this.props.value,
            newValue = isNaN(parseInt(inputValue)) ? this.props.min : parseInt(inputValue) + inc,
            value;
        // Always enforce range for spinner buttons and up and down keys
        if (newValue < this.props.min) {
            value = this.props.min;
        }
        else if (newValue > this.props.max) {
            value = this.props.max;
        }
        else {
            value = newValue;
        }
        this.props.onChange(value, e);
    },

    getDefaultProps: function () {
        return {
            defaultValue: "",
            errorCss: "",
            enforceRange: true,
            increment: 1,
            labelText: "",
            max: 999999999999999,
            maxLength: 16,
            min: 0,
            mode: FormFieldConstants.FormFieldMode.EDIT,
            referenceName: "formIntegerField",
            tabIndex: -1
        };
    },

    render: function () {
        var isReadonly = this.props.mode.toUpperCase() === FormFieldConstants.FormFieldMode.READ_ONLY,
            integerControls;

        if (!this.props.disabled && !isReadonly) {
            integerControls = (
                <span
                    className="integer-controls"
                    onMouseOut={this._handleSpinnerRelease}>
                    <button
                        className="integer-up"
                        data-direction="up"
                        data-id={this.props.referenceName + "-up-btn"}
                        onMouseDown={this._handleSpinnerPress}
                        onMouseUp={this._handleSpinnerRelease}
                        tabIndex={this.props.tabIndex}
                        type="button"
                    />
                    <button
                        className="integer-down"
                        data-direction="down"
                        data-id={this.props.referenceName + "-up-btn"}
                        onMouseDown={this._handleSpinnerPress}
                        onMouseUp={this._handleSpinnerRelease}
                        tabIndex={this.props.tabIndex}
                        type="button"
                    />
                </span>
            );
        }

        return (
            <div onKeyDown={this._handleKeyPress}>
                <FormTextField
                    {...this.props}
                    ref="formTextField"
                    referenceName={this.props.referenceName}
                    labelCss={classnames(this.props.labelCss, { "form-integer-container input-integer": true })}
                    onChange={this._handleChange}
                    onBlur={this._handleBlur} >
                    {integerControls}
                </FormTextField>
            </div>
        );
    }

});

module.exports = FormIntegerField;
