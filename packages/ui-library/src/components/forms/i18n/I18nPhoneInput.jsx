"use strict";

var React = require("react"),
    data = require("./countryCodes"),
    CountryFlagList = require("./CountryFlagList.jsx"),
    FormTextField = require("../form-text-field").v1,
    Validators = require("../../../util/Validators"),
    _ = require("underscore"),
    classnames = require("classnames");

/**
 * @callback I18nPhoneInput~onValueChange
 * @param {string|number} dialCode - selected dial code (country code)
 * @param {string} phoneNumber - phone number
 */

/**
 * @class I18nPhoneInput
 * @desc an international phone number input with dial code drop down
 *
 * @param {string} [id="i18n-phone-input"] data-id to set on the top HTML element (defaults to "i18n-phone-input")
 * @param {string} [className] CSS class to set on the top HTML element
 * @param {I18nPhoneInput~onValueChange} [onValueChange] callback to be triggered when dialCode or phone number change
 * @param {string} [countryCode] the country code to be selected by default (defaults to "us" as in USA)
 * @param {string} [dialCode] the dial code to be selected by default (defaults to "1"/USA)
 * @param {string} [phoneNumber] the initial value of the phone number excluding dial code
 * @param {string} [placeholder] the phone number input placeholder text
 * @param {string} [invalidPhoneNumberMessage="Please enter a valid phone number."] the message to display if an invalid ph no is entered.
 * @param {boolean} [autoFocus] passes to and auto focuses the FormTextField input
 * @param {boolean} [useAutocomplete] whether or not the field will support autocomplete (default false)
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
     * Handles value change
     * @method I18nPhoneInput#_onChange
     * @param {Object} e The event object
     * @private
     */
    _onChange: function (e) {
        var val = e.target.value;

        this.props.onValueChange(this.state.selected.dialCode, val);

        this.setState({
            phoneNumber: val
        });
    },

    /**
     * Handles click on a country in the list
     * @method I18nPhoneInput#_onCountryClick
     * @param  {Object} country The clicked country item
     * @private
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
     * Handles search of country in list
     * @method I18nPhoneInput#_onCountrySearch
     * @param {String} search The search value
     * @param {Number} time The search time
     * @private
     */
    _onCountrySearch: function (search, time) {
        this.setState({
            searchString: search,
            searchTime: time
        });
    },
    

    /**
     * Returns a country's data by code
     * @param  {String} code The iso2 country code
     * @return {Object}      The country data
     * @private
     */
    _findByCountryCode: function (code) {
        return _.findWhere(data, { iso2: code });
    },

    /**
     * Returns a country's data by code
     * @param  {String} code The dial code
     * @return {Object}      The country data
     * @private
     */
    _findByDialCode: function (code) {
        return _.findWhere(data, { dialCode: code });
    },

    /**
     * Toggles the country list
     * @method I18nPhoneInput#_toggleList
     * @private
     */
    _toggleList: function () {
        this.setState({
            listOpen: !this.state.listOpen,
            searchString: "",
            searchTime: 0
        });
    },

    /**
     * Returns an error message if invalid
     * @method I18nPhoneInput#_validatePhoneNumber
     * @private
     * @param  {String}      str The user input
     * @return {null|String}     Either an error message or null
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
