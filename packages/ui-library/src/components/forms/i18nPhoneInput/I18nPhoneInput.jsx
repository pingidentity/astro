"use strict";

var React = require("react");
var data = require("./countryCodes");
var TextField = require("../FormTextField.jsx");
var Validators = require("../../../util/Validators");
var _ = require("underscore");
var cx = require("classnames");

/**
 * @class I18nPhoneInput
 * @desc an international phone number input with dial code drop down
 *
 * @param {string} [id] data-id to set on the top HTML element (defaults to "i18n-phone-input")
 * @param {string} [className] CSS class to set on the top HTML element
 * @param {function} [onValueChange] callback executed when dialCode or phone number input change
 * @param {string} [countryCode] the country code to be selected by default (defaults to "us" as in USA)
 * @param {string} [placeholder] the country code to be selected by default
 * @param {string} [invalidPhoneNumberMessage] the message to display if an invalid ph no is entered (defaults to "Please enter a valid phone number.")
 * @param {boolean} [autoFocus] passes to and auto focuses the FormTextField input
 * @param {boolean} [useAutocomplete] whether or not the field will support autocomplete (default false)
 */
var I18nPhoneInput = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        className: React.PropTypes.string,
        onValueChange: React.PropTypes.func,
        countryCode: React.PropTypes.string,
        placeholder: React.PropTypes.string,
        invalidPhoneNumberMessage: React.PropTypes.string,
        autoFocus: React.PropTypes.bool,
        useAutoComplete: React.PropTypes.bool
    },

    /**
     * Handles value change
     * @method I18nPhoneInput#_onChange
     * @param {Object} e The event object
     */
    _onChange: function (e) {
        var val = e.target.value;

        this.props.onValueChange(this.state.selected.dialCode, val);

        this.setState({
            phoneNumber: val
        });
    },

    /**
     * Closes list if click originates elsewhere
     * @method I18nPhoneInput#_onClick
     * @param  {Object} e The event object
     */
    _onClick: function (e) {
        if (!e.target.dataset.hasOwnProperty("target") && e.target.dataset.target !== "list-select") {
            this.setState({
                listOpen: false
            });
        }
    },

    /**
     * Handles click on a country in the list
     * @method I18nPhoneInput#_onCountryClick
     * @param  {Object} country The clicked country item
     */
    _onCountryClick: function (country) {
        this.setState({
            selected: country,
            listOpen: false
        }, function () {
            this.props.onValueChange(this.state.selected.dialCode, this.state.phoneNumber);
        }.bind(this));
    },

    /**
     * Returns a country's data by code
     * @param  {String} code The iso2 country code
     * @return {Object}      The country data
     */
    _findByCountryCode: function (code) {
        return _.findWhere(data, { iso2: code });
    },

    /**
     * Toggles the country list
     * @method I18nPhoneInput#_toggleList
     */
    _toggleList: function () {
        this.setState({
            listOpen: !this.state.listOpen
        });
    },

    /**
     * Returns an error message if invalid
     * @method I18nPhoneInput#_validatePhoneNumber
     * @param  {String}      str The user input
     * @return {null|String}     Either an error message or null
     */
    _validatePhoneNumber: function (str) {
        return Validators.isValidPhoneNumber(str) ? null : this.props.invalidPhoneNumberMessage;
    },

    componentWillMount: function () {
        document.addEventListener("click", this._onClick);
    },

    componentWillUnmount: function () {
        document.removeEventListener("click", this._onClick);
    },

    getDefaultProps: function () {
        return {
            id: "i18n-phone-input",
            className: "",
            onValueChange: _.noop,
            countryCode: "us",
            placeholder: "",
            invalidPhoneNumberMessage: "Please enter a valid phone number."
        };
    },

    getInitialState: function () {
        return {
            phoneNumber: "",
            listOpen: false,
            selected: this._findByCountryCode(this.props.countryCode)
        };
    },

    render: function () {
        var countries = _.map(data, function (item) {
            var styles = cx("iti-flag", item.iso2);

            return (
                <li key={item.iso2} data-id={"country-" + item.iso2} className="country"
                    onClick={this._onCountryClick.bind(this, item)}>
                    <div className="flag">
                        <div className={styles}></div>
                    </div>
                    <span className="country-name">{item.name}</span>
                    <span className="dial-code">+{item.dialCode}</span>
                </li>
            );
        }.bind(this));
        var container = cx("intl-tel-input", this.props.className);
        var selected = this.state.selected;
        var selection = cx("iti-flag", selected.iso2);
        var list = cx("country-list", {
            hide: !this.state.listOpen
        });
        var title = selected.name + " +" + selected.dialCode;

        return (
            <div className={container} data-id={this.props.id}>
                <div className="flag-container">
                    <div data-target="list-select" data-id="selected-flag" tabIndex="0"
                         onClick={this._toggleList} className="selected-flag" title={title}>
                        <div data-target="list-select" className={selection}></div>
                        <div data-target="list-select" className="arrow"></div>
                    </div>
                    <ul data-id="country-list" className={list}>{countries}</ul>
                </div>
                <TextField type="tel" onChange={this._onChange}
                           value={this.state.phoneNumber}
                           className="form-control" placeholder={this.props.placeholder}
                           validator={this._validatePhoneNumber}
                           autoFocus={this.props.autoFocus}
                           useAutocomplete={this.props.useAutocomplete} />
            </div>
        );
    }
});

module.exports = I18nPhoneInput;
