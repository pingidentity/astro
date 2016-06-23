"use strict";

var React = require("react"),
    ReactDOM = require("react-dom"),
    _ = require("underscore"),
    classnames = require("classnames"),
    countryCodes = require("./countryCodes.js");

/**
* @class CountryFlagList
* @desc a selectable international country flag list dropdown with optional country codes
*
* @param {string} [data-id="country-flag-list"] - data-id to set on the top HTML element
*    (defaults to "country-flag-list").
* @param {string} [className] - CSS class to set on the top HTML element.
* @param {string} [countryCodeClassName] - CSS class to set on the country code.
* @param {string} [countryCodeDisplayType] - the type of country code displayed, one of: iso2, isoNum, dialCode
*    (defaults to iso2).
* @param {string|number} [selectedCountryCode] - the selected country's iso2, isoNum or dial code.
* @param {bool} [open] - boolean state of the open/closed dropdown menu (defaults to false).
* @param {function} [onCountryClick] - function (country) {...} A callback to be triggered when a country is selected.
* @param {function} [onToggle] - function () {...} delegates to call when open/closed state changed.
*/

var CountryFlagList = React.createClass({

    propTypes: {
        labelNoCountry: React.PropTypes.string,
        "data-id": React.PropTypes.string,
        className: React.PropTypes.string,
        countryCodeClassName: React.PropTypes.string,
        countryCodeDisplayType: React.PropTypes.string,
        selectedCountryCode: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        open: React.PropTypes.bool,
        searchString: React.PropTypes.string,
        searchTime: React.PropTypes.number,
        onCountrySearch: React.PropTypes.func,
        onCountryClick: React.PropTypes.func,
        onToggle: React.PropTypes.func
    },

    /**
    * Toggle the country list if a mouse click happens outside of the country list area
    * and if the country list is open.
    * @param {MouseEvent} e - the mouse event
    * @private
    */
    _handleGlobalClick: function (e) {
        if (!e.target.dataset.hasOwnProperty("target") &&
            e.target.dataset.target !== "list-select" && this.props.open) {
            this.props.onToggle();
        }
    },

    /**
     * On key press try and auto find the country that matches the letters typed on a starts with.
     * Doesn't reduce the list, but just goes to.
     *
     * NOTE: This function is not i18n friendly and would need to be updated to support that.
     *
     * @method I18nPhoneInput#_onKeyDown
     * @param {Object} e The event object
     * @private
     */
    _onKeyDown: function (e) {
        if (this.props.open) { // only do search when country list expanded
            var search;
            var time = Date.now();
            if (e.keyCode === 13) { //enter, so pull previously entered search string
                search = this.props.searchString;
            } else if (e.keyCode === 27) { // esc, so clear
                search = "";
            } else if (String.fromCharCode(e.keyCode).search(/[^a-zA-Z\s]+/) === -1) { // a-z so valid characters, not i18n friendly right now
                search = String.fromCharCode(e.keyCode).toLowerCase(); // again, not i18n friendly
                if (this.props.searchTime !== 0 && (time - this.props.searchTime) < 1000) { // more than a second and reset search
                    search = this.props.searchString + search;
                }
            }
            if (search !== undefined) { // invalid character entered
                if (search !== "") { // don't bother searching if empty
                    var country = _.find(countryCodes,
                        function (c) {
                            if (c.name.toLowerCase().indexOf(search) === 0) { //starts with
                                return c;
                            }
                        });
                    //if country found by search name or enter pressed
                    if (country) {
                        if (e.keyCode === 13) {
                            this.props.onCountryClick(country);
                        } else {
                            var countryList = ReactDOM.findDOMNode(this.refs["countryList"]);
                            var countryListItem = ReactDOM.findDOMNode(this.refs[country.iso2], countryList);
                            countryList.scrollTop = (countryListItem.offsetTop - 50);
                            ///TODO : it would be very nice to highlight the row of what country you're on here.
                        }
                    } else {
                        search = ""; //nonsense entered, not in country list
                    }
                }
                this.props.onCountrySearch(search, time);
            }
        }
    },

    /**
    * Returns a country's data by code
    * @param {string} code - the county iso2, isoNum or dial code
    * @return {Object} - the country data
    */
    _findByCountryCode: function (code) {
        return countryCodes.filter(function (country) {
            return country.iso2 === code || country.isoNum === code || country.dialCode === code;
        })[0];
    },

    componentDidMount: function () {
        window.addEventListener("click", this._handleGlobalClick);
    },

    componentWillUnmount: function () {
        window.removeEventListener("click", this._handleGlobalClick);
    },

    getDefaultProps: function () {
        return {
            labelNoCountry: "— Select a country —",
            "data-id": "country-flag-list",
            className: "",
            countryCodeClassName: "",
            countryCodeDisplayType: "iso2",
            selectedCountryCode: "",
            open: false,
            onCountryClick: _.noop,
            onToggle: _.noop
        };
    },

    render: function () {
        var containerClassName = classnames("flag-container", this.props.className, {
            open: this.props.open
        });
        var selectedCountry = this.props.selectedCountryCode
            ? this._findByCountryCode(this.props.selectedCountryCode)
            : null;
        var selectorFlagClassName = selectedCountry ? classnames("iti-flag", selectedCountry.iso2) : "no-selection";
        var separator = this.props.countryCodeDisplayType === "dialCode" ? " +" : " | ";
        var title = selectedCountry
            ? selectedCountry.name + separator + selectedCountry.isoNum
            : "No country selected";

        return (
            <div data-id={this.props["data-id"]} className={containerClassName}>
                <div data-target="list-select" data-id="selected-flag" tabIndex="0"
                     onClick={this.props.onToggle} onKeyDown={this._onKeyDown}
                     className="selected-flag" title={title}>
                    <div data-target="list-select" className={selectorFlagClassName}></div>
                    <div data-target="list-select" className="arrow"></div>
                </div>
                <ul data-id="country-list" className="country-list" ref="countryList">
                    <li data-id="no-country" className="no-country"
                        onClick={this.props.onCountryClick.bind(null, null)}>
                        <span className="country-name">{this.props.labelNoCountry}</span>
                    </li>

                    {
                        countryCodes.map(function (item) {
                            return (
                                <Flag key={item.iso2} data-id={"country-" + item.iso2} iso2={item.iso2}
                                      name={item.name}
                                      code={item[this.props.countryCodeDisplayType]}
                                      onClick={this.props.onCountryClick.bind(null, item)}
                                      ref={item.iso2}
                                      countryCodeClassName={this.props.countryCodeClassName} />);
                        }.bind(this))
                    }
                </ul>
            </div>
        );
    }
});

var Flag = React.createClass({

    propTypes: {
        key: React.PropTypes.string,
        "data-id": React.PropTypes.string,
        countryCodeClassName: React.PropTypes.string,
        name: React.PropTypes.string,
        code: React.PropTypes.string,
        onClick: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            key: "",
            "data-id": "",
            name: "",
            code: "",
            onClick: _.noop
        };
    },

    render: function () {
        return (
            <li key={this.props.key} data-id={this.props["data-id"]} className="country"
                onClick={this.props.onClick}>
                <div className="flag">
                    <div className={classnames("iti-flag", this.props.iso2)}></div>
                </div>
                <span className="country-name">{this.props.name}</span>
                <span className={classnames("country-code", this.props.countryCodeClassName)}>{this.props.code}</span>
            </li>
        );
    }
});

module.exports = CountryFlagList;