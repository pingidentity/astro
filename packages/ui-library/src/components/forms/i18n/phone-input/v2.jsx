"use strict";

var React = require("re-react"),
    _ = require("underscore"),
    classnames = require("classnames"),
    CountryFlagList = require("../CountryFlagList.jsx"),
    FormTextField = require("../../form-text-field").v2,
    Validators = require("../../../../util/Validators"),
    Utils = require("../../../../util/Utils.js");

/**
 * @typedef I18nPhoneInput~PhoneInputValues
 * @property {string|number} dialCode
 *     Selected dial code (country code).
 * @property {string} phoneNumber
 *     Phone number.
 */

/**
* @callback I18nPhoneInput~onValueChange
* @param {I18nPhoneInput~PhoneInputValues} phoneInputValues
*     Dial code and phone number input.
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
*/

/**
* @class I18nPhoneInput
* @desc An international phone number input with dial code drop down.
*
* @param {string} [data-id="i18n-phone-input"]
*     To define the base "data-id" value for top-level HTML container.
* @param {string} [className]
*     CSS classes to set on the top-level HTML container.
* @param {boolean} [controlled=false]
*    To enable the component to be externally managed. True will relinquish control to the component's owner.
*    False or not specified will cause the component to manage state internally.
*
* @param {string} [countryCode="us" = USA]
*     The country code to be selected by default.
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
*     Callback to be triggered when open/close state changes. Used only when controlled=true.
*
* @param {string} [searchString]
*     Value to help with finding an element on keydown.
* @param {number} [searchTime]
*     Time to help clear the search when the user delays their search.
* @param {I18nPhoneInput~onSearch} [onSearch]
*     Callback to be triggered when the state of the search of a country when the flag dropdown is expanded changes.
* @param {I18nPhoneInput~onSearch} [onCountrySearch]
*     DEPRECATED. Use "onSearch" instead.
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
*
* @example
*       <I18nPhoneInput
*           onValueChange={this._handleValueChangeStateful}
*           dialCode={this.state.dialCodeStateful}
*           phoneNumber={this.state.phoneNumberStateful} />
*/

module.exports = React.createClass({

    propTypes: {
        controlled: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            controlled: false
        };
    },

    render: function () {
        return this.props.controlled
            ? React.createElement(I18nPhoneInputStateless, //eslint-disable-line
                _.defaults({ ref: "I18nPhoneInputStateless" }, this.props))
            : React.createElement(I18nPhoneInputStateful, //eslint-disable-line
                _.defaults({ ref: "I18nPhoneInputStateful" }, this.props));
    }
});

var I18nPhoneInputStateless = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        className: React.PropTypes.string,
        controlled: React.PropTypes.bool,
        countryCode: React.PropTypes.string.affectsRendering,
        dialCode: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]).affectsRendering,
        phoneNumber: React.PropTypes.string.affectsRendering,
        onValueChange: React.PropTypes.func,
        open: React.PropTypes.bool.affectsRendering,
        onToggle: React.PropTypes.func,
        searchString: React.PropTypes.string.affectsRendering,
        searchTime: React.PropTypes.number.affectsRendering,
        onSearch: React.PropTypes.func,
        onCountrySearch: React.PropTypes.func, //TODO: remove when v1 no longer supported
        errorMessage: React.PropTypes.string.affectsRendering,
        placeholder: React.PropTypes.string.affectsRendering,
        autoFocus: React.PropTypes.bool,
        useAutoComplete: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            "data-id": "i18n-phone-input",
            className: "",
            controlled: false,
            countryCode: "",
            dialCode: "",
            phoneNumber: "",
            onValueChange: _.noop,
            open: false,
            onToggle: _.noop,
            searchString: "",
            searchTime: 0,
            onSearch: _.noop,
            errorMessage: "Please enter a valid phone number.",
            placeholder: "",
            autoFocus: false,
            useAutoComplete: false
        };
    },

    componentWillMount: function () {
        if (this.props.onCountrySearch) {
            console.warn(Utils.deprecateMessage("onCountrySearch", "onSearch"));
        }
    },

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
    _handleValueChange: function (country) {
        this.props.onValueChange({
            dialCode: country ? country.dialCode : "",
            phoneNumber: this.props.phoneNumber
        });
        this.props.onToggle();
    },

    _handlePhoneNumberChange: function (e) {
        var val = e.target.value;

        this.props.onValueChange({ dialCode: this.props.dialCode, phoneNumber: val });
    },

    render: function () {
        var classname = classnames("intl-tel-input", this.props.className);

        return (
            <div data-id={this.props["data-id"]} className={classname}>
                <CountryFlagList
                        data-id={this.props["data-id"] + "-countryFlagList"}
                        countryCodeClassName="dial-code"
                        countryCodeDisplayType={CountryFlagList.CountryCodeTypes.DIAL_CODE}
                        selectedCountryCode={this.props.dialCode || this.props.countryCode}
                        onValueChange={this._handleValueChange}
                        open={this.props.open}
                        onToggle={this.props.onToggle}
                        searchString={this.props.searchString}
                        searchTime={this.props.searchTime}
                        onSearch={this.props.onCountrySearch || this.props.onSearch} />
                <FormTextField
                        data-id={this.props["data-id"] + "-phoneNumber"}
                        className="form-control"
                        placeholder={this.props.placeholder}
                        value={this.props.phoneNumber}
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
});

var I18nPhoneInputStateful = React.createClass({

    _handleToggle: function () {
        this.setState({
            open: !this.state.open,
            searchString: "",
            searchTime: 0
        });
    },

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
    */
    _handleSearch: function (search, time) {
        this.setState({
            searchString: search,
            searchTime: time
        });
    },

    getInitialState: function () {
        return {
            open: this.props.open || false,
            searchString: "",
            searchTime: 0
        };
    },

    render: function () {
        var props = _.defaults({
            ref: "I18nPhoneInputStateless",
            open: this.state.open,
            onToggle: this._handleToggle,
            searchString: this.state.searchString,
            searchTime: this.state.searchTime,
            onSearch: this._handleSearch
        }, this.props);

        return React.createElement(I18nPhoneInputStateless, props);
    }
});