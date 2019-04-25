"use strict";

import PropTypes from "prop-types";
import React, { Component } from "react";
import { FormTextFieldStateless } from "../form-text-field/index";
import classnames from "classnames";
import Utils from "../../../util/Utils.js";
import _ from "underscore";
import validator from "validator";
import { inStateContainer, toggleTransform } from "../../utils/StateContainer";
import { cannonballProgressivelyStatefulWarning } from "../../../util/DeprecationUtils";
import { flagsPropType, hasFlag } from "../../../util/FlagUtils";

const isValid = (value, enforceRange, min, max) => {
    if (value === "") {
        return true;
    }

    const options = { allow_leading_zeroes: false }; //eslint-disable-line camelcase

    if (enforceRange) {
        return validator.isInt(value.toString(), { ...options, min: min, max: max });
    } else {
        return validator.isInt(value.toString(), options);
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
 * @param {boolean} [stateless]
 *     To enable the component to be externally managed. True will relinquish control to the component's owner.
 *     False or not specified will cause the component to manage state internally.
 *
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
 *     Current text field value used when stateless=true.
 * @param {string|number} [initialValue=""]
 *     Initial value (also to be used in conjuction with the undo button) when stateless=false.
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
 *     If true, will remove value masking. Use only when stateless=true.
 * @param {boolean} [showReveal=false]
 *    Whether or not to display a reveal option to remove value masking.
 *     If true, the value shown in the input field will be masked with '*****'. (i.e: passwords).
 * @param {FormTextField~onToggleReveal} [onToggleReveal]
 *    Callack to be triggered when the 'reveal' button is clicked. Use only when stateless=true.
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
 * @param {string} [errorMessage]
 *     The message to display if defined when external validation failed.
 * @param {string} [outOfRangeErrorMessage]
 *     The message displayed when the value is out of range of the min/max.
 *     Oly applied for stateful component (when stateless = false).
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

        errorMessage: PropTypes.string,
        errorClassName: PropTypes.string,

        autoFocus: PropTypes.bool,
        autoComplete: PropTypes.bool,

        increment: PropTypes.number,
        max: PropTypes.number,
        min: PropTypes.number,
        enforceRange: PropTypes.bool,

        tabIndex: PropTypes.number,
    };

    static defaultProps = {
        "data-id": "form-integer-field",
        required: false,
        disabled: false,
        readOnly: false,
        hideControls: false,

        value: "",

        onValueChange: _.noop,
        onBlur: _.noop,
        onFocus: _.noop,

        maxLength: 16,

        maskValue: false,
        reveal: false,
        showReveal: false,
        onToggleReveal: _.noop,
        showSave: false,
        onSave: _.noop,
        showUndo: false,
        onUndo: _.noop,

        autoComplete: false,
        autoFocus: false,

        max: 999999999999999,
        min: 0,
        increment: 1,
        enforceRange: true,

        tabIndex: -1
    };

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
        this.timeout = setTimeout(this._interval.bind(this, inc), 700);
    };

    /**
     * @desc Handles release of the spinner arrows. Clears timeout and interval.
     * @param {object} e
     *     The event object value
     * @private
     * @ignore
     */
    _handleSpinnerRelease = () => {
        clearTimeout(this.timeout);
        clearInterval(this.interval);
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
        this.interval = setInterval(this._counter.bind(this, inc), 50);
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

        // Always enforce range for spinner buttons and up and down keys
        if (newValue < this.props.min) {
            newValue = this.props.min;
        }
        else if (newValue > this.props.max) {
            newValue = this.props.max;
        }

        this.props.onValueChange(newValue);
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

        if (this.props.readOnly) {
            return;
        }

        // do nothing for all other keys
        if (key !== 38 && key !== 40) {
            return;
        }

        e.stopPropagation();

        // Increment/decrement the existing value and send out a notification
        const intValue = parseInt(this.props.value) || this.props.min;
        const newValue = intValue + (key === 38 ? 1 : -1) * this.props.increment;

        this.props.onValueChange(newValue);
    };

    render() {
        let integerControls;

        if (!this.props.disabled && !this.props.readOnly && !this.props.hideControls) {
            integerControls = (
                <span className="integer-controls" onMouseOut={this._handleSpinnerRelease}>
                    <button data-id={this.props["data-id"] + "-up-btn"}
                        data-direction="up"
                        className="integer-up"
                        onMouseDown={this._handleSpinnerPress}
                        onMouseUp={this._handleSpinnerRelease}
                        tabIndex={this.props.tabIndex}
                        type="button"
                    />
                    <button data-id={this.props["data-id"] + "-down-btn"}
                        data-direction="down"
                        className="integer-down"
                        onMouseDown={this._handleSpinnerPress}
                        onMouseUp={this._handleSpinnerRelease}
                        tabIndex={this.props.tabIndex}
                        type="button"
                    />
                </span>
            );
        }
        return (
            <div onKeyDown={this._handleKeyDown} className="form-integer-container input-integer">
                <FormTextFieldStateless {...this.props}
                    ref="formTextField"
                    data-id={this.props["data-id"] + "-text-field"}
                    name={this.props.name}
                    stateless={true}
                    className={this.props.className}
                    labelClassName={classnames(this.props.labelClassName)}
                    onValueChange={this.props.onValueChange}
                    controls={integerControls}
                />
            </div>
        );
    }
}

class Stateful extends Component {
    static displayName = "FormIntegerFieldStateful";

    static propTypes = {
        initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        max: PropTypes.number,
        min: PropTypes.number,
        enforceRange: PropTypes.bool,
        outOfRangeErrorMessage: PropTypes.string,
        onBlur: PropTypes.func,
    };

    static defaultProps = {
        initialValue: "",
        max: 999999999999999,
        min: 0,
        enforceRange: true,
        onBlur: _.noop,
    };

    state = {
        reveal: false,
        value: this.props.initialValue
    };

    /**
     * @desc Verify the new value and call the onValueChange callback
     * only if the value is valid.
     * @param {string} value
     *     The new value
     * @private
     * @ignore
     */
    _handleValueChange = (value) => {

        // Don't restrict "min" when checking typing so that numbers outside range can be inputed
        // e.g. If range is restricted to 3 - 30, we want users to be able to input 2 and 1 for 21
        if (!isValid(value, this.props.enforceRange, null, this.props.max)) {

            // Reset the field to the previous valid value
            this.setState({
                value: this.state.value
            });
            return;
        } else {
            let intValue = value === "" ? value : parseInt(value);

            this.setState({
                value: intValue,
                lastValue: this.state.value,
                errorMessage: this.props.errorMessage || ""
            }, function () {
                this.props.onValueChange(intValue);
            });
        }
    };

    _handleBlur = () => {

        // Check validity of value onBlur to enforce min restriction that's not checked onValueChange above
        if (!isValid(this.state.value, this.props.enforceRange, this.props.min, this.props.max)) {

            // Reset the field to the previous valid value
            // Set error message
            this.setState({
                value: this.state.lastValue,
                errorMessage: this.props.outOfRangeErrorMessage
            });
        }

        this.props.onBlur();
    };

    _toggleReveal = () => {
        this.setState({
            reveal: !this.state.reveal
        });
    };

    _handleUndo = () => {
        if (this.props.initialValue) {
            const value = this.props.initialValue;
            this.setState({
                value: value
            }, function () {
                this.props.onValueChange(value);
            });
        }
    };

    render() {
        const defaultProps = {
            ref: "stateless",
            reveal: this.state.reveal,
            onToggleReveal: this._toggleReveal,
            onValueChange: this._handleValueChange,
            onUndo: this._handleUndo,
            value: this.state.value,
            onBlur: this._handleBlur,
            errorMessage: this.state.errorMessage
        };
        const props = _.defaults(defaultProps, this.props);

        return <Stateless {...props} />;
    }
}

export default class FormIntegerFieldV2 extends Component {
    static propTypes = {
        stateless: PropTypes.bool,
        flags: flagsPropType,
    };

    static defaultProps = {
        stateless: true,
    };

    _usePStateful = () => hasFlag(this, "p-stateful");

    componentDidMount() {
        if (!this._usePStateful()) {
            cannonballProgressivelyStatefulWarning({ name: "FormIntegerField" });
        }
    }

    constructor(props) {
        super(props);
        if (!Utils.isProduction() && props.controlled !== undefined) {
            throw new Error(Utils.deprecatePropError("controlled", "stateless"));
        }
    }

    render() {
        if (this._usePStateful()) {
            return (
                <PStatefulFormIntegerField {...this.props} />
            );
        }

        return this.props.stateless
            ? <Stateless { ...{ ref: "formIntegerFieldStateless", ...this.props }} />
            : <Stateful {...{ ref: "formIntegerFieldStateful", ...this.props }} />;
    }
}

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
FormIntegerFieldV2.isValid = isValid;

FormIntegerFieldV2.resetToOriginal = (value, current, { originalValue }) => originalValue;

FormIntegerFieldV2.validateInt = (value, current, { enforceRange, max }) => {
    if (!isValid(value, enforceRange, null, max)) {
        return value.substring(0, value.length - 1);
    } else {
        const intValue = value === "" ? value : parseInt(value);
        return intValue;
    }
};

const PStatefulFormIntegerField = inStateContainer([
    {
        name: "value",
        initial: "",
        callbacks: [
            {
                name: "onValueChange",
                transform: FormIntegerFieldV2.validateInt
            },
            {
                name: "onUndo",
                transform: FormIntegerFieldV2.resetToOriginal
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
])(Stateless);