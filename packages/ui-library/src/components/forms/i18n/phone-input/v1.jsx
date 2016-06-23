"use strict";

var React = require("react"),
    data = require("../countryCodes"),
    CountryFlagList = require("../CountryFlagList.jsx"),
    FormTextField = require("../../form-text-field").v1,
    Validators = require("../../../../util/Validators"),
    _ = require("underscore"),
    classnames = require("classnames");



/**
* @callback I18nPhoneInput~onValueChange
* @param {string|number} dialCode
*     Dial code and phone number input.
* @param {string} phoneNumber
*     Phone number.
*/

/**
* @class I18nPhoneInput
* @desc An international phone number input with dial code drop down.
*
* @param {string} [id="i18n-phone-input"]
*     To define the base "data-id" value for top-level HTML container.
* @param {string} [className]
*     CSS classes to set on the top-level HTML container.
*
* @param {string} [countryCode="us"/USA]
*     The country code to be selected by default.
* @param {string|number} [dialCode="1"/USA]
*     The dial code to be selected by default.
* @param {string} [phoneNumber]
*     The initial value of the phone number excluding dial code.
* @param {I18nPhoneInput~onValueChange} [onValueChange]
*     Callback to be triggered when dial code or phone number changes.
*
* @param {string} [invalidPhoneNumberMessage="Please enter a valid phone number."]
*     The message to display if an invalid phone number is entered.
* @param {string} [placeholder]
*     The phone number input placeholder text.
*
* @param {boolean} [autoFocus="false"]
*     Passes to and auto focuses the FormTextField input.
* @param {boolean} [useAutoComplete="false"]
*     Whether or not the field will support autocomplete.
*/

var I18nPhoneInput = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        className: React.PropTypes.string,
        onValueChange: React.PropTypes.func,
        countryCode: React.PropTypes.string,
        dialCode: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ]),
        phoneNumber: React.PropTypes.string,
        placeholder: React.PropTypes.string,
        invalidPhoneNumberMessage: React.PropTypes.string,
        autoFocus: React.PropTypes.bool,
        useAutoComplete: React.PropTypes.bool
    },

    /**
    * @method I18nPhoneInput#_onChange
    * @private
    * @ignore
    *
    * @desc Handles value change.
    *
    * @param {Object} e
    *     The event object.
    */
    _onChange: function (e) {
        var val = e.target.value;

        this.props.onValueChange(this.state.selected.dialCode, val);

        this.setState({
            phoneNumber: val
        });
    },

    /**
    * @method I18nPhoneInput#_onCountryClick
    * @private
    * @ignore
    *
    * @desc Hanles click on a country in the list.
    *
    * @param {Object} country
    *     The clicked country item
    */
    _onCountryClick: function (country) {
        this.setState({
            selected: country,
            listOpen: false
        }, function () {
            var dialCode = country ? this.state.selected.dialCode : "";
            this.props.onValueChange(dialCode, this.state.phoneNumber);
        }.bind(this));
    },

    /**
    * @method I18nPhoneInput#_onCountrySearch
    * @private
    * @ignore
    *
    * @desc Handles search of country in list.
    *
    * @param {String} search
    *     The search value.
    * @param {Number} time
    *     The search time.
    */
    _onCountrySearch: function (search, time) {
        this.setState({
            searchString: search,
            searchTime: time
        });
    },
    
    /**
    * @method I18nPhoneInput#_findByCountryCode
    * @private
    * @ignore
    *
    * @desc Returns a country's data by code.
    *
    * @param {String} code
    *     The iso2 country code.
    *
    * @return {object} The country data.
    */
    _findByCountryCode: function (code) {
        return _.findWhere(data, { iso2: code });
    },

    /**
    * @method I18nPhoneInput#_findByDialCode
    * @private
    * @ignore
    *
    * @desc Returns a country's data by code.
    *
    * @param {String} code
    *     The dial code.
    *
    * @return {object} The country data.
    */
    _findByDialCode: function (code) {
        return _.findWhere(data, { dialCode: code });
    },

    /**
    * @method I18nPhoneInput#_toggleList
    * @private
    * @ignore
    */
    _toggleList: function () {
        this.setState({
            listOpen: !this.state.listOpen,
            searchString: "",
            searchTime: 0
        });
    },

    /**
    * @method I18nPhoneInput#_validatePhoneNumber
    * @private
    * @ignore
    *
    * @param {string} str
    *     The user input.
    *
    * @return {null|string} Either an erro message or null.
    */
    _validatePhoneNumber: function (str) {
        return Validators.isValidPhoneNumber(str) ? null : this.props.invalidPhoneNumberMessage;
    },

    getDefaultProps: function () {
        return {
            id: "i18n-phone-input",
            className: "",
            onValueChange: _.noop,
            countryCode: "us",
            dialCode: null,
            placeholder: "",
            invalidPhoneNumberMessage: "Please enter a valid phone number."
        };
    },

    getInitialState: function () {
        var selected = this.props.dialCode ? this._findByDialCode(this.props.dialCode)
            : this._findByCountryCode(this.props.countryCode);

        return {
            phoneNumber: this.props.phoneNumber || "",
            listOpen: false,
            selected: selected,
            searchString: "",
            searchTime: 0
        };
    },

    render: function () {
        var container = classnames("intl-tel-input", this.props.className);
        var selected = this.state.selected;

        return (
            <div className={container} data-id={this.props.id}>
                <CountryFlagList
                    countryCodeClassName="dial-code"
                    countryCodeDisplayType="dialCode"
                    selectedCountryCode={selected ? selected.iso2 : ""}
                    open={this.state.listOpen}
                    searchString={this.state.searchString}
                    searchTime={this.state.searchTime}
                    onCountrySearch={this._onCountrySearch}
                    onCountryClick={this._onCountryClick}
                    onToggle={this._toggleList}
                />
                <FormTextField
                    onChange={this._onChange}
                    value={this.state.phoneNumber}
                    className="form-control"
                    placeholder={this.props.placeholder}
                    validator={this._validatePhoneNumber}
                    autoFocus={this.props.autoFocus}
                    useAutocomplete={this.props.useAutocomplete}
                    referenceName={this.props.id + "_phonenumber"} />
            </div>
        );
    }
});

module.exports = I18nPhoneInput;
