"use strict";

var PropTypes = require("prop-types");

var React = require("react"),
    _ = require("underscore"),
    classnames = require("classnames"),
    CountryFlagList = require("../CountryFlagList"),
    FormTextField = require("../../form-text-field").v2,
    Validators = require("../../../../util/Validators"),
    Utils = require("../../../../util/Utils.js");

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
* @param {I18nPhoneInput~onToggle} [onToggle]
*     Callback to be triggered when open/close state changes. Used only when stateless=true.
*
* @param {number} [searchIndex]
*     The index of the country that was just searched to enable highlighing.
* @param {string} [searchString]
*     Value to help with finding an element on keydown.
* @param {number} [searchTime]
*     Time to help clear the search when the user delays their search.
* @param {I18nPhoneInput~onSearch} [onSearch]
*     Callback to be triggered when the state of the search of a country when the flag dropdown is expanded changes.
*
* @param {string} [errorMessage="Please enter a valid phone number."]
*     The message to display if an invalid phone number is entered.
* @param {string} [placeholder]
*     The phone number input placeholder text.
*
* @param {boolean} [autoFocus="false"]
*     Passes to and auto focuses the FormTextField input.
* @param {boolean} [useAutoComplete="false"]
*     Whether or not the field will support autocomplete.
* @param {array} [flags]
*     Set the flag for "use-portal" to render with popper.js and react-portal
*
* @example
*       <I18nPhoneInput
*           onValueChange={this._handleValueChangeStateful}
*           dialCode={this.state.dialCodeStateful}
*           phoneNumber={this.state.phoneNumberStateful} />
*/

module.exports = class extends React.Component {
    static propTypes = {
        stateless: PropTypes.bool
    };

    static defaultProps = {
        stateless: false
    };

    render() {
        return this.props.stateless
            ? React.createElement(I18nPhoneInputStateless, //eslint-disable-line
                _.defaults({ ref: "I18nPhoneInputStateless" }, this.props))
            : React.createElement(I18nPhoneInputStateful, //eslint-disable-line
                _.defaults({ ref: "I18nPhoneInputStateful" }, this.props));
    }
};

class I18nPhoneInputStateless extends React.Component {

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
        onSearch: PropTypes.func,
        errorMessage: PropTypes.string,
        placeholder: PropTypes.string,
        autoFocus: PropTypes.bool,
        useAutoComplete: PropTypes.bool,
        disabled: PropTypes.bool,
        flags: PropTypes.arrayOf(PropTypes.string),
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
        placeholder: "",
        autoFocus: false,
        useAutoComplete: false,
        disabled: false
    };

    componentWillMount() {
        if (!Utils.isProduction()) {
            if (this.props.controlled !== undefined) {
                throw new Error(Utils.deprecatePropError("controlled", "stateless"));
            }
            if (this.props.onCountrySearch) {
                throw new Error(Utils.deprecatePropError("onCountrySearch", "onSearch"));
            }
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

    _handlePhoneNumberChange = (e) => {
        var val = e.target.value;
        this.props.onValueChange({ dialCode: this.props.dialCode, phoneNumber: val });
    };

    render() {
        var classname = classnames("intl-tel-input", this.props.className, { disabled: this.props.disabled });

        return (
            <div data-id={this.props["data-id"]} className={classname}>
                <CountryFlagList
                    data-id={this.props["data-id"] + "-countryFlagList"}
                    countryCodeClassName="dial-code"
                    countryCodeDisplayType={CountryFlagList.CountryCodeTypes.DIAL_CODE}
                    selectedCountryCode={this.props.countryCode}
                    onValueChange={this._handleValueChange}
                    open={this.props.open}
                    onToggle={this.props.onToggle}
                    searchIndex={this.props.searchIndex}
                    searchString={this.props.searchString}
                    searchTime={this.props.searchTime}
                    name={this.props.name ? this.props.name+"-country" : null}
                    onSearch={this.props.onSearch}
                    flags={this.props.flags}
                />
                <FormTextField
                    data-id={this.props["data-id"] + "-phoneNumber"}
                    className="form-control"
                    placeholder={this.props.placeholder}
                    value={this.props.phoneNumber}
                    name={this.props.name}
                    onChange={this._handlePhoneNumberChange}
                    errorMessage={
                        Validators.isValidPhoneNumber(this.props.phoneNumber)
                            ? null
                            : this.props.errorMessage
                    }
                    autoFocus={this.props.autoFocus}
                    useAutocomplete={this.props.useAutocomplete} />
            </div>
        );
    }
}

class I18nPhoneInputStateful extends React.Component {
    state = {
        open: this.props.open || false,
        searchIndex: -1,
        searchString: "",
        searchTime: 0
    };

    _handleToggle = () => {
        this.setState({
            open: !this.state.open,
            searchIndex: -1,
            searchString: "",
            searchTime: 0
        });
    };

    /**
    * @method _handleSearch
    * @memberof I18nPhoneInputStateful
    * @private
    * @ignore
    *
    * @desc Handles search of country in list.
    *
    * @param {string} search
    *     Search string for country.
    * @param {number} time
    *     Search time for country.
    * @param {Number} index
    *     The index of country searched
    */
    _handleSearch = (search, time, index) => {
        this.setState({
            searchString: search,
            searchTime: time,
            searchIndex: index
        });
    };

    render() {
        var props = _.defaults({
            ref: "I18nPhoneInputStateless",
            open: this.state.open,
            onToggle: this._handleToggle,
            searchIndex: this.state.searchIndex,
            searchString: this.state.searchString,
            searchTime: this.state.searchTime,
            onSearch: this._handleSearch
        }, this.props);

        return React.createElement(I18nPhoneInputStateless, props);
    }
}
