"use strict";

var React = require("react"),
    ReactDOM = require("react-dom"),
    _ = require("underscore"),
    classnames = require("classnames"),
    KeyboardUtils = require("../../../util/KeyboardUtils.js"),
    countryCodes = require("./countryCodes.js");

/**
* @enum {string}
* @alisas CountryFlagList.CountryCodeTypes
* @private
* @ignore
*/
var Types = {
    ISO_2: "iso2",
    ISO_NUM: "isoNum",
    DIAL_CODE: "dialCode"
};

/**
* @callback CountryFlagList~onValueChange
* @private
* @ignore
*
* @param {object} country
*    The newly selected country.
*/

/**
* @callback CountryFlagList~onToggle
* @private
* @ignore
*/

/**
* @callback CountryFlagList~onSearch
* @private
* @ignore
*
* @param {string} searchString
*    The text to search with.
* @param {number} searchTime
*    The time after which to clear the search when the user delays their search.
*/

/**
* @class CountryFlagList
* @private
* @ignore
*
* @desc A selectable international country flag list dropdown with optional country codes.
*
* @param {string} [data-id="country-flag-list"]
*    To define the base "data-id" value for the top-level HTML container.
* @param {string} [className]
*    CSS classes to set on the top-level HTML container.
*
* @param {string|number} [selectedCountryCode]
*    The selected country's iso2, isoNum or dial code.
* @param {CountryFlagList.CountryCodeTypes} [countryCodeDisplayType=CountryFlagList.CountryCodeTypes.ISO_2]
*    The type of country code displayed.
* @param {string} [countryCodeClassName]
*    CSS classes to set on the country code text.
* @param {CountryFlagList~onValueChange} [onValueChange]
*    Callback to be triggered when a country is selected.
*
* @param {string} [labelNoCountry]
*    Text to set on the no country selected option.
*
* @param {boolean} [open=false]
*    State of the open/closed dropdown menu.
* @param {CountryFlagList~onToggle} [onToggle]
*    Callback to be triggered when the open/closed state changes.
* @param {number} [searchIndex]
*   The index of the country that was just searched. Allows for highlighting and up/down arrow movement.
* @param {string} [searchString]
*    Value to help with finding an element on keydown.
* @param {number} [searchTime]
*    Time to help clear the search when the user delays their search.
* @param {CountryFlagList~onSearch} [onSearch]
*    Callback to be triggered when the state of the search of a country when the flag dropdown is expanded changes.
*/

var CountryFlagList = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        className: React.PropTypes.string,
        selectedCountryCode: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        countryCodeDisplayType: React.PropTypes.oneOf([Types.ISO_2, Types.ISO_NUM, Types.DIAL_CODE]),
        countryCodeClassName: React.PropTypes.string,
        onValueChange: React.PropTypes.func,
        labelNoCountry: React.PropTypes.string,
        open: React.PropTypes.bool,
        onToggle: React.PropTypes.func,
        searchString: React.PropTypes.string,
        searchTime: React.PropTypes.number,
        onSearch: React.PropTypes.func
    },

    /**
    * Toggle the country list if a mouse click happens outside of the country list area
    * and if the country list is open.
    * @param {MouseEvent} e - the mouse event
    * @private
    * @ignore
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
     * @ignore
     */
    _onKeyDown: function (e) {
        if (this.props.open) { // only do search when country list expanded
            var search;
            var time = Date.now();
            if (e.keyCode === KeyboardUtils.KeyCodes.ENTER) { //enter, so pull previously entered search string
                if (this.props.searchIndex > -1) {
                    this.props.onValueChange(countryCodes[this.props.searchIndex]);
                }
            } else if (e.keyCode === KeyboardUtils.KeyCodes.ESC) { // esc, so clear
                search = "";
            } else if (e.keyCode === KeyboardUtils.KeyCodes.ARROW_UP ||
                e.keyCode === KeyboardUtils.KeyCodes.ARROW_DOWN) {
                this._handleUpDownKeys(e);
            } else if (String.fromCharCode(e.keyCode).search(/[^a-zA-Z\s]+/) === -1) { // a-z so valid characters, not i18n friendly right now
                search = String.fromCharCode(e.keyCode).toLowerCase();
                 // again, not i18n friendly
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
                    var index = countryCodes.indexOf(country);
                    if (!country) {
                        search = ""; //nonsense entered, not in country list
                    }
                }
                this.props.onSearch(search, time, index);
            }
        }
    },

    /**
     * When Up or Down keys are pressed, increment/decrement the searchIndex accordingly
     * and call this.props.onCountrySearch
     *
     *
     * @method I18nPhoneInput#_handleUpDownKeys
     * @param {Object} e The event object
     * @private
     */
    _handleUpDownKeys: function (e) {
        var index = this.props.searchIndex;
        if (e.keyCode === KeyboardUtils.KeyCodes.ARROW_UP) {
            index = index - 1;
        }
        else {
            index = index + 1;
        }
        //Dont allow index to go below -1 or higher than the lenght of Country Codes
        index = index < -1 || index >= countryCodes.length ? -1 : index;
        this.props.onSearch("",0, index);
        e.preventDefault();
        e.stopPropagation();
    },

    /**
     * Centers the search list on last searched item. Called on componentDidUpdate.
     *
     *
     * @method I18nPhoneInput#_setSearchListPosition
     * @private
     */
    _setSearchListPosition: function () {
        if (!this.props.open) {
            return;
        }
        var country = countryCodes[this.props.searchIndex],
            countryList = ReactDOM.findDOMNode(this.refs["countryList"]),
            countryListTarget= country ? country.iso2 : "no-country",
            countryListItem = ReactDOM.findDOMNode(this.refs[countryListTarget]);

        countryList.scrollTop = (countryListItem.offsetTop - 50);
    },

    /**
    * Returns a country's data by code
    * @param {string} code - the county iso2, isoNum or dial code
    * @return {Object} - the country data
    * @ignore
    */
    _findByCountryCode: function (code) {
        return countryCodes.filter(function (country) {
            return country.iso2 === code || country.isoNum === code || country.dialCode === code;
        })[0];
    },

    componentDidUpdate: function () {
        this._setSearchListPosition();
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
            countryCodeDisplayType: Types.ISO_2,
            selectedCountryCode: "",
            open: false,
            onValueChange: _.noop,
            onToggle: _.noop
        };
    },

    render: function () {
        var containerClassName = classnames("flag-container", this.props.className, { open: this.props.open }),
            noCountryClassName = classnames("no-country", { highlighted: this.props.searchIndex === -1 });
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
                    <li data-id="no-country" ref="no-country" className={noCountryClassName}
                        onClick={this.props.onValueChange.bind(null, null)}>
                        <span className="country-name">{this.props.labelNoCountry}</span>
                    </li>

                    {
                        countryCodes.map(function (item, index) {
                            return (
                                <Flag key={item.iso2} data-id={"country-" + item.iso2} iso2={item.iso2}
                                      highlighted={index === this.props.searchIndex}
                                      name={item.name}
                                      code={item[this.props.countryCodeDisplayType]}
                                      onClick={this.props.onValueChange.bind(null, item)}
                                      ref={item.iso2}
                                      countryCodeClassName={this.props.countryCodeClassName} />);
                        }.bind(this))
                    }
                </ul>
            </div>
        );
    }
});

/**
* @callback Flag~onClick
* @private
* @ignore
*
* @param {object} e
*    The ReactJS synthetic event object.
*/

/**
* @class CountryFlagList~Flag
* @private
* @ignore
*
* @desc A single flag list component.
*
* @param {string} [data-id="flag"]
*    To define the base "data-id" value for the top-level HTML container.
*
* @param {string} [key]
*    A unique key for the list item.
* @param {string} [name]
*    The flag's country name.
* @param {string} [code]
*    The flag's country code.
* @param {string} [countryCodeClassName]
*    CSS classes to set on the country code text.
* @param {Flag~onClick} [onClick]
*    Callback to be triggered when the flag is clicked.
*/

var Flag = React.createClass({

    propTypes: {
        key: React.PropTypes.string,
        "data-id": React.PropTypes.string,
        countryCodeClassName: React.PropTypes.string,
        name: React.PropTypes.string,
        code: React.PropTypes.string,
        onClick: React.PropTypes.func,
        highlighted: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            "data-id": "flag",
            onClick: _.noop
        };
    },


    render: function () {
        var flagClassName = classnames("iti-flag", this.props.iso2),
            countryCodeClassName = classnames("country-code", this.props.countryCodeClassName),
            className = classnames("country", { highlighted: this.props.highlighted });

        return (
            <li key={this.props.key}
                data-id={this.props["data-id"]}
                className={className}
                onClick={this.props.onClick}>
                <div className="flag">
                    <div className={flagClassName}></div>
                </div>
                <span className="country-name">{this.props.name}</span>
                <span className={countryCodeClassName}>{this.props.code}</span>
            </li>
        );
    }
});

CountryFlagList.CountryCodeTypes = Types;

CountryFlagList.Flag = Flag; //Internal but exposed for testing only

module.exports = CountryFlagList;
