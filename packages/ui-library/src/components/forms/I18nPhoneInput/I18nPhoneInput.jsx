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
 * @param {string} [placeholder] the country code to be selected by default (defaults to "(555) 555-5555")
 * @param {string} [invalidPhoneNumberMessage] the message to display if an invalid ph no is entered (defaults to "Please enter a valid phone number.")
 */
var I18nPhoneInput = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        className: React.PropTypes.string,
        onValueChange: React.PropTypes.func,
        countryCode: React.PropTypes.string,
        placeholder: React.PropTypes.string,
        invalidPhoneNumberMessage: React.PropTypes.string
    },

    /**
     * @param {object} e - the event object
     */
    _onChange: function (e) {
        var val = e.target.value;

        this.props.onValueChange(this.state.selected.dialCode, val);

        this.setState({
            phoneNumber: val
        });
    },

    /**
     * @param  {object} country the clicked country item
     */
    _onCountryClick: function (country) {
        this.setState({
            selected: country,
            listOpen: !this.state.listOpen
        }, function () {
            this.props.onValueChange(this.state.selected.dialCode, this.state.phoneNumber);
        }.bind(this));
    },

    _findByCountryCode: function (code) {
        return _.findWhere(data, { iso2: code });
    },

    _toggleList: function () {
        this.setState({
            listOpen: !this.state.listOpen
        });
    },

    _validatePhoneNumber: function (str) {
        return Validators.isValidPhoneNumber(str) ? null : this.props.invalidPhoneNumberMessage;
    },

    getDefaultProps: function () {
        return {
            id: "i18n-phone-input",
            className: "",
            onValueChange: _.noop,
            countryCode: "us",
            placeholder: "(555) 555-5555",
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
                <li key={item.is} className="country" onClick={this._onCountryClick.bind(this, item)}>
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
                    <div tabIndex="0" onClick={this._toggleList} className="selected-flag" title={title}>
                        <div className={selection}></div>
                        <div className="arrow"></div>
                    </div>
                    <ul className={list}>{countries}</ul>
                </div>
                <TextField type="tel" onChange={this._onChange} value={this.state.phoneNumber}
                    className="form-control" autoComplete="off" placeholder={this.props.placeholder}
                    validator={this._validatePhoneNumber} />
            </div>
        );
    }
});

module.exports = I18nPhoneInput;
