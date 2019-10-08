import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "underscore";
import classnames from "classnames";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import CountryFlagList from "../CountryFlagList";
import { v2 as FormTextField } from "../../form-text-field";
import Validators from "../../../../util/Validators";
import { inStateContainer, toggleTransform } from "../../../utils/StateContainer";
import { deprecatedStatelessProp } from "../../../../util/DeprecationUtils";

/**
 * @typedef I18nPhoneInput~PhoneInputValues
 * @property {string|number} countryCode
 *     Selected iso2 country code.
 * @property {string|number} dialCode
 *     Selected dial code.
 * @property {string} phoneNumber
 *     Phone number.
 */

/**
* @callback I18nPhoneInput~onValueChange
* @param {I18nPhoneInput~PhoneInputValues} phoneInputValues
*     Country code, dial code and phone number input.
*/

/**
* @callback I18nPhoneInput~onToggle
* /

/**
* @callback I18nPhoneInput~onSearch
*
* @param {string} searchString
*    The text to search with.
* @param {number} searchTime
*    The time after which to clear the search when the user delays their search.
* @param {number} searchIndex
*    The index of the country that was just searched.
*/

/**
* @class I18nPhoneInput
* @desc An international phone number input with dial code drop down.
*
* @param {string} [data-id="i18n-phone-input"]
*     To define the base "data-id" value for top-level HTML container.
* @param {string} [className]
*     CSS classes to set on the top-level HTML container.
* @param {boolean} [stateless]
*    To enable the component to be externally managed. True will relinquish control to the component's owner.
*    False or not specified will cause the component to manage state internally.
* @param {string} [name]
*    Name attribute for the input.
*
* @param {string} [countryCode="us" = USA]
*     The country code corresponding to the dial code for the country to be selected by default.
* @param {string|number} [dialCode="1" = USA]
*     The dial code to be selected by default.
* @param {string} [phoneNumber]
*     The initial value of the phone number excluding dial code.
* @param {I18nPhoneInput~onValueChange} [onValueChange]
*     Callback to be triggered when dial code or phone number changes.
*
* @param {boolean} [open=false]
*     State of the open/closed dropdown menu.
*     When not provided, the component will manage this value.
* @param {I18nPhoneInput~onToggle} [onToggle]
*     Callback to be triggered when open/close state changes. Used only when stateless=true.
*
* @param {number} [searchIndex]
*     The index of the country that was just searched to enable highlighing.
*     When not provided, the component will manage this value.
* @param {string} [searchString]
*     Value to help with finding an element on keydown.
*     When not provided, the component will manage this value.
* @param {number} [searchTime]
*     Time to help clear the search when the user delays their search.
*     When not provided, the component will manage this value.
* @param {I18nPhoneInput~onSearch} [onSearch]
*     Callback to be triggered when the state of the search of a country when the flag dropdown is expanded changes.
*
* @param {string} [errorMessage="Please enter a valid phone number."]
*     The message to display if an invalid phone number is entered.
* @param {boolean} [showError=false]
*     When true, the error message will show regardless of validation.
* @param {string} [placeholder]
*     The phone number input placeholder text.
*
* @param {boolean} [autoFocus="false"]
*     Passes to and auto focuses the FormTextField input.
* @param {boolean} [useAutoComplete="false"]
*     Whether or not the field will support autocomplete.
*
* @example
*       <I18nPhoneInput
*           onValueChange={this._handleValueChangeStateful}
*           dialCode={this.state.dialCodeStateful}
*           phoneNumber={this.state.phoneNumberStateful} />
*/

class I18nPhoneInputStateless extends Component {

    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        countryCode: PropTypes.string,
        dialCode: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        phoneNumber: PropTypes.string,
        name: PropTypes.string,
        onValueChange: PropTypes.func,
        open: PropTypes.bool,
        onToggle: PropTypes.func,
        searchIndex: PropTypes.number,
        searchString: PropTypes.string,
        searchTime: PropTypes.number,
        setSearchIndex: PropTypes.func,
        setSearchString: PropTypes.func,
        setSearchTime: PropTypes.func,
        onSearch: PropTypes.func,
        errorMessage: PropTypes.string,
        showError: PropTypes.bool,
        placeholder: PropTypes.string,
        autoFocus: PropTypes.bool,
        useAutoComplete: PropTypes.bool,
        disabled: PropTypes.bool,
    };

    static defaultProps = {
        "data-id": "i18n-phone-input",
        className: "",
        countryCode: "",
        dialCode: "",
        phoneNumber: "",
        onValueChange: _.noop,
        open: false,
        onToggle: _.noop,
        searchIndex: -1,
        searchString: "",
        searchTime: 0,
        onSearch: _.noop,
        errorMessage: "Please enter a valid phone number.",
        showError: false,
        placeholder: "",
        autoFocus: false,
        useAutoComplete: false,
        disabled: false
    };

    _getCountryCode() {
        const {
            countryCode,
            dialCode = "",
            phoneNumber
        } = this.props;
        if (countryCode !== "") {
            return countryCode;
        } else if (phoneNumber !== "") {
            const numberWithCode = `${dialCode}${phoneNumber}`;
            const { country = "" } = parsePhoneNumberFromString(
                `${numberWithCode.startsWith("+") ? "" : "+"}${numberWithCode}`
            ) || {};
            return country.toLowerCase();
        } else {
            return "";
        }
    }

    /**
    * @method handleCountryClick
    * @memberof I18nPhoneInputStateless
    * @private
    * @ignore
    *
    * @desc Handles click on a country in the list.
    *
    * @param {object} country
    *     The clicked country item.
    */
    _handleValueChange = (country) => {
        if (!this.props.disabled) {
            this.props.onValueChange({
                countryCode: country.iso2 || "",
                dialCode: country.dialCode || "",
                phoneNumber: this.props.phoneNumber
            });
        }
    };

    _handlePhoneNumberChange = ({ target: { value } }) => {
        const {
            country = "",
            countryCallingCode,
            nationalNumber
        } = parsePhoneNumberFromString(value) || {};
        this.props.onValueChange({
            countryCode: this.props.countryCode || country.toLowerCase(),
            dialCode: this.props.dialCode || countryCallingCode,
            phoneNumber: value,
            nationalNumber: nationalNumber
        });
    };

    render() {
        const classname = classnames(
            "intl-tel-input",
            this.props.className,
            { disabled: this.props.disabled }
        );

        return (
            <div data-id={this.props["data-id"]} className={classname}>
                <CountryFlagList
                    data-id={this.props["data-id"] + "-countryFlagList"}
                    countryCodeClassName="dial-code"
                    countryCodeDisplayType={CountryFlagList.CountryCodeTypes.DIAL_CODE}
                    selectedCountryCode={this._getCountryCode()}
                    onValueChange={this._handleValueChange}
                    open={this.props.open}
                    onToggle={this.props.onToggle}
                    searchIndex={this.props.searchIndex}
                    searchString={this.props.searchString}
                    searchTime={this.props.searchTime}
                    setSearchIndex={this.props.setSearchIndex}
                    setSearchString={this.props.setSearchString}
                    setSearchTime={this.props.setSearchTime}
                    name={this.props.name ? this.props.name+"-country" : null}
                    onSearch={this.props.onSearch}
                />
                <FormTextField
                    data-id={this.props["data-id"] + "-phoneNumber"}
                    className="form-control"
                    placeholder={this.props.placeholder}
                    value={this.props.phoneNumber}
                    name={this.props.name}
                    onChange={this._handlePhoneNumberChange}
                    errorMessage={
                        (!this.props.showError && Validators.isValidPhoneNumber(this.props.phoneNumber))
                            ? null
                            : this.props.errorMessage
                    }
                    autoFocus={this.props.autoFocus}
                    useAutocomplete={this.props.useAutocomplete}
                />
            </div>
        );
    }
}

const I18nPhoneInput = inStateContainer([
    {
        name: "open",
        initial: false,
        callbacks: [{
            name: "onToggle",
            transform: toggleTransform
        }]
    },
    {
        name: "searchIndex",
        initial: -1,
        setter: "setSearchIndex",
    },
    {
        name: "searchString",
        initial: "",
        setter: "setSearchString",
    },
    {
        name: "searchTime",
        initial: 0,
        setter: "setSearchTime",
    },
])(I18nPhoneInputStateless);
I18nPhoneInput.displayName = "PhoneInput";

I18nPhoneInput.propTypes = {
    stateless: deprecatedStatelessProp
};

I18nPhoneInput.I18nPhoneInputStateless = I18nPhoneInputStateless;

export default I18nPhoneInput;
