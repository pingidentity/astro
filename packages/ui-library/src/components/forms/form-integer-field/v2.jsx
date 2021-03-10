"use strict";

import PropTypes from "prop-types";
import React, { Component } from "react";
import { FormTextFieldStateless, messageTypes } from "../form-text-field/index";
import classnames from "classnames";
import _ from "underscore";
import { isInt } from "validator";
import StateContainer, { toggleTransform } from "../../utils/StateContainer";
import { deprecatedStatelessProp } from "../../../util/DeprecationUtils";

const isValid = (value, enforceRange, min, max) => {
    const options = { allow_leading_zeroes: false }; //eslint-disable-line camelcase

    if (value === "") {
        return true;
    }

    if (value.toString().split("")[0] === "-" && value.toString().length === 1) {
        return true;
    }

    if (enforceRange) {
        return isInt(value.toString(), { ...options, min: min, max: max });
    } else {
        return isInt(value.toString(), options);
    }
};

/**
* @callback FormIntegerField~onValueChange
* @param {number} value
*     The current field value.
*/

/**
 * @class FormIntegerField
 * @desc A component that extends FormTextField to only accept positive integers with add and subtract arrows.
 *
 * @param {string} [data-id="form-integer-field"]
 *     To define the base "data-id" value for the top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 * @param {boolean} [required=false]
 *     Whether the field is required or not.
 * @param {boolean} [disabled=false]
 *     Whether the field is disabled or not.
 * @param {boolean} [readOnly=false]
 *     Whether or not the input field is readonly.
 * @param {boolean} [hideControls=false]
 *     Whether or not the controls are displayed.
 *
 * @param {string} [labelHelpText]
 *     The text to display for the help tooltip.
 * @param {string} [labelText]
 *     The text to show as the field's label.
 * @param {string} [label]
 *     Alias for labelText
 * @param {string} [name]
 *     The name attribute for the input.
 *
 * @param {string|number} [value=""]
 *     Current text field value used.
 *     When not provided, the component will manage this value.
 * @param {string|number} [initialValue=""]
 *     Initial value (also to be used in conjuction with the undo button).
 *
 * @param {FormIntegerField~onValueChange} [onValueChange]
 *     Callback to be triggered when the field value changes. It will receive the component's value.
 * @param {FormTextField~onBlur} [onBlur]
 *     Callback to be triggered when the field blurs (loses focus).
 * @param {FormTextField~onFocus} [onFocus]
 *     Callback to be triggered when the field gains focus.
 *
 * @param {string} [placeholder]
 *     Placeholder text for the input field.
 * @param {string} [inputClassName]
 *     CSS classes to set on the input element.
 * @param {number} [maxLength=16]
 *     Maximum length supported by the text field.
 *
 * @param {boolean} [maskValue=false]
 *     If true, the value shown in the input field will be masked with '*****'. (i.e: passwords).
 * @param {boolean} [reveal=false]
 *     If true, will remove value masking.
 *     When not provided, the component will manage this value.
 * @param {boolean} [showReveal=false]
 *    Whether or not to display a reveal option to remove value masking.
 *     If true, the value shown in the input field will be masked with '*****'. (i.e: passwords).
 * @param {FormTextField~onToggleReveal} [onToggleReveal]
 *    Callack to be triggered when the 'reveal' button is clicked.
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
 * @param {node} [errorMessage]
 *     The message to display if defined when external validation failed.
 * @param {string} [outOfRangeErrorMessage]
 *     When present, the message that displays when the value is out of range of the min/max.
 * @param {string} [errorClassName]
 *     CSS classes to set on the FormTextFieldError component.
 *
 * @param {boolean} [autoComplete=false]
 *     Whether or not the field will support autocomplete.
 * @param {boolean} [autoFocus=false]
 *     Whether or not to auto-focus the element.
 *
 * @param {number} [increment=1]
 *     Increment for addition and subtraction.
 * @param {number} [max=999999999999999]
 *     The maximum number allowed in field.
 * @param {number} [min=0]
 *     The minimum number allowed in field.
 * @param {boolean} [enforceRange=true]
 *     Whether or not enforce min/max value limit.
 *
 *  @param {number} [tabIndex=-1]
 *     The tab index to use on the up/down buttons.
 *
 * @example
 *     <FormIntegerField
 *              data-id={name}
 *              labelText={element.viewName}
 *              isRequired={element.required}
 *              value={element ? element.value : ""}
 *              onValueChange={myFunction} />
 */


class Stateless extends Component {
    static displayName = "FormIntegerFieldStateless";

    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,

        required: PropTypes.bool,
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool,
        hideControls: PropTypes.bool,
        name: PropTypes.string,

        labelHelpText: PropTypes.string,
        labelText: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
            PropTypes.string
        ]),
        label: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
            PropTypes.string
        ]),

        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

        onValueChange: PropTypes.func,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,

        placeholder: PropTypes.string,
        inputClassName: PropTypes.string,
        maxLength: PropTypes.number,

        maskValue: PropTypes.bool,
        reveal: PropTypes.bool,
        showReveal: PropTypes.bool,
        onToggleReveal: PropTypes.func,

        showSave: PropTypes.bool,
        onSave: PropTypes.func,

        showUndo: PropTypes.bool,
        onUndo: PropTypes.func,

        errorMessage: PropTypes.node,
        errorClassName: PropTypes.string,
        outOfRangeErrorMessage: PropTypes.string,

        autoFocus: PropTypes.bool,
        autoComplete: PropTypes.bool,

        increment: PropTypes.number,
        max: PropTypes.number,
        min: PropTypes.number,
        enforceRange: PropTypes.bool,
        initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

        tabIndex: PropTypes.number,
    };

    static defaultProps = {
        "data-id": "form-integer-field",
        required: false,
        disabled: false,
        readOnly: false,
        hideControls: false,
        initialValue: "",

        value: "",

        onValueChange: _.noop,

        maxLength: 16,

        maskValue: false,
        reveal: false,
        showReveal: false,
        onToggleReveal: _.noop,
        showSave: false,
        onSave: _.noop,
        showUndo: false,

        autoComplete: false,
        autoFocus: false,

        max: 999999999999999,
        min: 0,
        increment: 1,
        enforceRange: true,

        tabIndex: -1
    };

    state = { showRangeError: false, showRangeWarning: false };

    /**
     * @desc Handles down press of the spinner arrows.
     * @param {object} e
     *     The event object value
     * @private
     * @ignore
     */
    _handleSpinnerPress = (e) => {
        let inc = this.props.increment;

        // Set negative increment for down spinner
        inc = (e.target.getAttribute("data-direction") === "down") ? -inc : inc;

        // Preform addition or subraction
        this._counter(inc);

        // Set timeout for rapid addition or subtraction when held
        this.timeout = global.setTimeout(this._interval.bind(this, inc), 700);
    };

    /**
     * @desc Handles release of the spinner arrows. Clears timeout and interval.
     * @param {object} e
     *     The event object value
     * @private
     * @ignore
     */
    _handleSpinnerRelease = () => {
        global.clearTimeout(this.timeout);
        global.clearInterval(this.interval);
    };

    /**
     * @desc Handle interval for rapid counting when spinner or arrow pressed
     * @param {number} inc
     *     The increment for count function
     * @private
     * @ignore
     */
    _interval = (inc) => {
        clearInterval(this.interval);
        this.interval = global.setInterval(this._counter.bind(this, inc), 50);
    };

    /**
     * @desc Preforms internal count operation for rapid counting without sending to parent.
     * Value must be sent to after counter finishes.
     * @param {number} inc
     *     The increment to apply to current field value.
     * @private
     * @ignore
     */
    _counter = (inc) => {
        const value = this.props.value;
        let newValue = isNaN(parseInt(value)) ? this.props.min : parseInt(value) + inc;

        if (this._checkForMin(newValue)) { // when changing with spinner, always enforce min
            this._handleValueChange(newValue);
        }
    };

    /**
     * @desc Handles key down on the field to increment with up and down arrows.
     * @param {value} e
     *     The event object value
     * @private
     * @ignore
     */
    _handleKeyDown = (e) => {
        const key = e.keyCode;
        const { readOnly, value, min, increment } = this.props;

        if (readOnly) {
            return;
        }

        // do nothing for all other keys
        if (key !== 38 && key !== 40) {
            return;
        }

        e.stopPropagation();

        // Increment/decrement the existing value and send out a notification
        const intValue = parseInt(value) || min;
        const newValue = intValue + (key === 38 ? 1 : -1) * increment;

        if (this._checkForMin(newValue, e)) { // when changing with keys, we always enforce the min limit
            this._handleValueChange(newValue, e);
        }
    };

    // our behavior for enforcing the minimum has to be complex
    // because you might be typing '1' to get to '14'
    _checkForMin = (value, e) => {
        if (value === "") {
            return true;
        }
        const { min, enforceRange, outOfRangeErrorMessage } = this.props;

        // if a range error message is provided, check to see if we should show it
        // and whether it should be a warning (we've kept it valid) or an error (it's invalid)
        if ((value < min) && outOfRangeErrorMessage) {
            this.setState({
                [enforceRange ? "showRangeWarning" : "showRangeError"]: true,
            });
        }
        if (enforceRange) {
            if (this.props.value < min) {
                this._handleValueChange(min, e);
            }
            // these are making sure we handle two cases
            // if this function is being called for a change that already happened
            // we need the above code
            // if it's for a pending change, we need what's below
            if (value < min) {
                if (this.props.value > min) {
                    this._handleValueChange(min, e);
                }
                return false;
            }
        }
        return true;
    }

    _handleFocus = () => {
        if (this.props.enforceRange) {
            this.setState({ showRangeWarning: false });
        }
    }

    _handleBlur = e => {
        if (this._checkForMin(this.props.value, e) && this.state.showRangeWarning) {
            this.setState({ showRangeWarning: false });
        }
    }

    _rangeErrorShowing = () => {
        const { value, max } = this.props;
        const { showRangeError } = this.state;

        if (showRangeError) {
            return true;
        }

        if (value === "") {
            return false;
        }

        if (value > max) {
            return true;
        }

        return false;
    }

    _handleValueChange = (value, e) => {
        const { min, max, enforceRange } = this.props;

        if (enforceRange) {
            if (value > max) {
                this.props.onValueChange(max, e);
                this.setState({ showRangeWarning: true });
                return;
            }
        }
        this.props.onValueChange(value, e);
        if (this.state.showRangeError && value >= min && value <= max) {
            this.setState({ showRangeError: false });
        }
        if (this.state.showRangeWarning) {
            this.setState({ showRangeWarning: false });
        }
    }

    _handleUndo = e => {
        this._handleValueChange(this.props.initialValue, e);
    }

    render() {
        let integerControls;
        const {
            "data-id": dataId,
            outOfRangeErrorMessage,
            errorMessage,
            messageType,
            value,
            ...props
        } = this.props;

        if (!props.disabled && !props.readOnly && !props.hideControls) {
            integerControls = (
                <span className="integer-controls" onMouseOut={this._handleSpinnerRelease}>
                    <button data-id={dataId + "-up-btn"}
                        data-direction="up"
                        className="integer-up"
                        onMouseDown={this._handleSpinnerPress}
                        onMouseUp={this._handleSpinnerRelease}
                        tabIndex={props.tabIndex}
                        type="button"
                    />
                    <button data-id={dataId + "-down-btn"}
                        data-direction="down"
                        className="integer-down"
                        onMouseDown={this._handleSpinnerPress}
                        onMouseUp={this._handleSpinnerRelease}
                        tabIndex={props.tabIndex}
                        type="button"
                    />
                </span>
            );
        }

        const showRangeMessage = !errorMessage && (this._rangeErrorShowing() || this.state.showRangeWarning);

        const stringifiedVal = value.toString();

        return (
            <div onKeyDown={this._handleKeyDown} className="form-integer-container input-integer">
                <FormTextFieldStateless
                    onFocus={this._handleFocus}
                    onBlur={this._handleBlur}
                    onUndo={this._handleUndo}
                    {...props}
                    value={stringifiedVal}
                    ref="formTextField"
                    data-id={dataId + "-text-field"}
                    name={props.name}
                    className={props.className}
                    labelClassName={classnames(props.labelClassName)}
                    onValueChange={this._handleValueChange}
                    controls={integerControls}
                    errorMessage={showRangeMessage ? outOfRangeErrorMessage : errorMessage}
                    messageType={
                        (showRangeMessage && this.props.enforceRange)
                            ? messageTypes.WARNING
                            : messageType
                    }
                />
            </div>
        );
    }
}

const validateInt = (value, current, { enforceRange, max }) => {
    if (!isValid(value, enforceRange, null, max)) {
        return value.substring(0, value.length - 1);
    } else {
        if (value.toString().split("")[0] === "-") {
            if (value.toString().length > 1) {
                if (isInt(value.toString().split("").shift())) {

                    return value;
                }
            } else {
                return value;
            }
        }
        const intValue = value === "" ? value : parseInt(value);
        return intValue;
    }
};

const stateDefs = [
    {
        name: "value",
        initial: "",
        callbacks: [
            {
                name: "onValueChange",
                transform: validateInt
            },
        ],
    }, {
        name: "reveal",
        initial: false,
        callbacks: [
            {
                name: "onToggleReveal",
                transform: toggleTransform,
            }
        ],
    }
];

const FormIntegerField = ({ initialState = {}, initialValue, ...props }) => (
    <StateContainer
        stateDefs={stateDefs}
        initialState={initialValue !== undefined ? { ...initialState, value: initialValue } : initialState}
        passedProps={props}
    >
        {containerProps => <Stateless {...containerProps} initialValue={initialValue} />}
    </StateContainer>
);

FormIntegerField.displayName = "FormIntegerField";

FormIntegerField.propTypes = {
    stateless: deprecatedStatelessProp,
};

FormIntegerField._statelessComponent = Stateless;

/**
 * @alias FormIntegerField.isValid
 * @desc Verifies if the provided value is an integer and that it falls in acceptable range
 * (only if the enforceRange argument is true).
 *
 * @param {string} value the value to be evaluated
 * @param {boolean} [enforceRange=false]
 *     Whether or not enforce max value limit.
 * @param {number} [min]
 *     The minimum number allowed in field. Required if enforceRange is true.
 * @param {number} [max]
 *     The maximum number allowed in field. Required if enforceRange is true.
 *
 * @returns {boolean} returns true if integer false if not
 */
FormIntegerField.isValid = isValid;

FormIntegerField.validateInt = validateInt;

export default FormIntegerField;
