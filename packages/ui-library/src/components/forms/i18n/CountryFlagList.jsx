"use strict";

var React = require("re-react"),
    _ = require("underscore"),
    classnames = require("classnames"),
    Translator = require("../../../util/i18n/Translator.js"),
    countryCodes = require("./countryCodes.js"),
    FormDropDownList = require("../FormDropDownList.jsx");

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
* @param {number} searchIndex
*    The index of the country that was just searched.
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
*    The selected country's iso2 or isoNum code.
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
        className: React.PropTypes.string.affectsRendering,
        selectedCountryCode: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]).affectsRendering,
        countryCodeDisplayType: React.PropTypes.oneOf([Types.ISO_2, Types.ISO_NUM, Types.DIAL_CODE]).affectsRendering,
        countryCodeClassName: React.PropTypes.string.affectsRendering,
        onValueChange: React.PropTypes.func,
        labelNoCountry: React.PropTypes.string.affectsRendering,
        open: React.PropTypes.bool.affectsRendering,
        onToggle: React.PropTypes.func,
        searchString: React.PropTypes.string.affectsRendering,
        searchTime: React.PropTypes.number.affectsRendering,
        onSearch: React.PropTypes.func
    },

    /**
    * Returns a country's data by code
    * @param {string} code - the country's iso2 or isoNum code
    * @return {Object} - the country data
    * @ignore
    */
    _findByCountryCode: function (code) {
        return countryCodes.filter(function (country) {
            return country.iso2 === code || country.isoNum === code;
        })[0];
    },

    _translateCountryNames: function (listCountry) {
        if (listCountry !== undefined) {
            listCountry.forEach(function (country) {
                country.name = Translator.translate(country.iso2);
            });
        }
        listCountry = _.sortBy(listCountry, "name");

        return listCountry;
    },

    componentWillMount: function () {
        countryCodes = this._translateCountryNames(countryCodes);
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
        var containerClassName = classnames("flag-container", this.props.className);
        var selectedCountry = this.props.selectedCountryCode
            ? this._findByCountryCode(this.props.selectedCountryCode)
            : {};
        var selectorFlagClassName = !_.isEmpty(selectedCountry)
            ? classnames("iti-flag", selectedCountry.iso2)
            : "no-selection";
        var separator = this.props.countryCodeDisplayType === "dialCode" ? " +" : " | ";
        var title = !_.isEmpty(selectedCountry)
            ? selectedCountry.name + separator + selectedCountry[this.props.countryCodeDisplayType]
            : "No country selected";
        var type = <Flag countryCodeClassName={this.props.countryCodeClassName} />;

        // Set up item props to pass to the contentType
        countryCodes = countryCodes.map(function (item) {
            return _.defaults({
                "data-id": "country-" + item.iso2,
                code: item[this.props.countryCodeDisplayType],
                value: item[this.props.countryCodeDisplayType],
                label: item.name
            }, item);
        }.bind(this));

        return (
            <FormDropDownList controlled={true}
                    data-id={this.props["data-id"]}
                    className={containerClassName}
                    options={countryCodes}
                    contentType={type}
                    onValueChange={this.props.onValueChange}
                    open={this.props.open}
                    onToggle={this.props.onToggle}
                    searchIndex={this.props.searchIndex}
                    searchString={this.props.searchString}
                    searchField="name"
                    searchTime={this.props.searchTime}
                    searchType={FormDropDownList.SearchTypes.KEYBOARD}
                    onSearch={this.props.onSearch}
                    validSearchCharsRegex="/[^a-zA-Z\s]+/"
                    title={title}
                    selectedOption={selectedCountry}
                    selectedOptionLabelClassName={selectorFlagClassName}
                    showSelectedOptionLabel={false}
                    noneOption={{ label: this.props.labelNoCountry }}
                    noneOptionLabelClassName="country-name" />
        );
    }
});

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
* @param {string} [name]
*    The flag's country name.
* @param {string} [code]
*    The flag's country code.
* @param {string} [iso2]
*    The flag's iso2 country code.
* @param {string} [countryCodeClassName]
*    CSS classes to set on the country code text.
*/

var Flag = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        countryCodeClassName: React.PropTypes.string.affectsRendering,
        name: React.PropTypes.string.affectsRendering,
        code: React.PropTypes.string.affectsRendering,
        iso2: React.PropTypes.string.affectsRendering
    },

    getDefaultProps: function () {
        return {
            "data-id": "flag"
        };
    },

    render: function () {
        var flagClassName = classnames("iti-flag", this.props.iso2),
            countryCodeClassName = classnames("country-code", this.props.countryCodeClassName);

        return (
            <div data-id={this.props["data-id"]} className="country" >
                <div className="flag">
                    <div className={flagClassName}></div>
                </div>
                <span className="country-name">{this.props.name}</span>
                <span className={countryCodeClassName}>{this.props.code}</span>
            </div>
        );
    }
});

CountryFlagList.CountryCodeTypes = Types;

CountryFlagList.Flag = Flag; //Internal but exposed for testing only

module.exports = CountryFlagList;
