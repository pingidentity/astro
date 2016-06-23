"use strict";

var React = require("re-react"),
    _ = require("underscore"),
    classnames = require("classnames"),
    CountryFlagList = require("../CountryFlagList.jsx"),
    FormTextField = require("../../form-text-field").v2,
    Validators = require("../../../../util/Validators");

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
* @callback I18nPhoneInput~onCountrySearch
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
* @param {I18nPhoneInput~onCountrySearch} [onCountrySearch]
*     Callback to handle state change for on search of country when flag dropdown expanded.
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
        return (
            this.props.controlled
                ? <I18nPhoneInputStateless ref="I18nPhoneInputStateless" {...this.props} />
                : <I18nPhoneInputStateful ref="I18nPhoneInputStateful" {...this.props} />
        );
    }
});

var I18nPhoneInputStateless = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        id: React.PropTypes.string,
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
        onCountrySearch: React.PropTypes.func,
        errorMessage: React.PropTypes.string.affectsRendering,
        placeholder: React.PropTypes.string.affectsRendering,
        autoFocus: React.PropTypes.bool,
        useAutoComplete: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            "data-id": "i18n-phone-input",
            id: null,
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
            onCountrySearch: _.noop,
            errorMessage: "Please enter a valid phone number.",
            placeholder: "",
            autoFocus: false,
            useAutoComplete: false
        };
    },

    componentWillMount: function () {
        if (this.props.id) {
            console.warn("Deprecated: use data-id instead of id.  Support for id will be removed in next version");
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
    _handleCountryClick: function (country) {
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
        var id = this.props["data-id"] || this.props.id,
            classname = classnames("intl-tel-input", this.props.className);

        return (
            <div data-id={id} className={classname}>
                <CountryFlagList
                        data-id={this.props["data-id"] + "-countryFlagList"}
                        countryCodeClassName="dial-code"
                        countryCodeDisplayType="dialCode"
                        selectedCountryCode={this.props.dialCode || this.props.countryCode}
                        onCountryClick={this._handleCountryClick}
                        open={this.props.open}
                        onToggle={this.props.onToggle}
                        searchString={this.props.searchString}
                        searchTime={this.props.searchTime}
                        onCountrySearch={this.props.onCountrySearch} />
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
    * @method handleCountrySearch
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
    _handleCountrySearch: function (search, time) {
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
        return (
            <I18nPhoneInputStateless ref="I18nPhoneInputStateless" {...this.props}
                open={this.state.open}
                onToggle={this._handleToggle}
                searchString={this.state.searchString}
                searchTime={this.state.searchTime}
                onCountrySearch={this._handleCountrySearch} />
        );
    }
});