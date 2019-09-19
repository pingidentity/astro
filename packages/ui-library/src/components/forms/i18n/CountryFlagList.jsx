"use strict";


import React from "react";
import PropTypes from "prop-types";
import _ from "underscore";
import classnames from "classnames";
import Translator from "../../../util/i18n/Translator.js";
import FormDropDownList from "../FormDropDownList";
import { flagsPropType, getFlags } from "../../../util/FlagUtils";
import countryCodes from "./countryCodes.js";


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
* @param {string} [name]
*    Name attribute for the input.
* @param {array} [flags]
*     Set the flag for "use-portal" to render with popper.js and react-portal
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

class CountryFlagList extends React.Component {

    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        selectedCountryCode: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        countryCodeDisplayType: PropTypes.oneOf([Types.ISO_2, Types.ISO_NUM, Types.DIAL_CODE]),
        countryCodeClassName: PropTypes.string,
        onValueChange: PropTypes.func,
        labelNoCountry: PropTypes.string,
        name: PropTypes.string,
        open: PropTypes.bool,
        onToggle: PropTypes.func,
        searchString: PropTypes.string,
        searchTime: PropTypes.number,
        setSearchIndex: PropTypes.func,
        setSearchString: PropTypes.func,
        setSearchTime: PropTypes.func,
        onSearch: PropTypes.func,
        flags: flagsPropType,
    };

    static defaultProps = {
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

    static contextTypes = { flags: PropTypes.arrayOf(PropTypes.string) };

    /**
    * Returns a country's data by code
    * @param {string} code - the country's iso2 or isoNum code
    * @return {Object} - the country data
    * @ignore
    */
    _findByCountryCode = (code, countryCodesWithValues) => {
        return countryCodesWithValues.filter(function (country) {
            return country.iso2 === code || country.isoNum === code;
        })[0];
    };

    _translateCountryNames = (listCountry) => {
        if (listCountry !== undefined) {
            listCountry.forEach(function (country) {
                country.name = Translator.translate(country.iso2);
            });
        }
        listCountry = _.sortBy(listCountry, "name");

        return listCountry;
    };


    render() {
        const {
            countryCodeDisplayType,
            selectedCountryCode,
            open
        } = this.props;
        var containerClassName = classnames(
            "flag-container",
            selectedCountryCode === "" ? "flag-container--none-selected" : "",
            this.props.className
        );

        const countryCodesWithValues = this._translateCountryNames(countryCodes).map(item => {
            return _.defaults({
                "data-id": "country-" + item.iso2,
                code: item[countryCodeDisplayType],
                value: item.iso2,
                label: item.name
            }, item);
        });

        var selectedCountry = selectedCountryCode
            ? this._findByCountryCode(selectedCountryCode, countryCodesWithValues)
            : {};
        var selectorFlagClassName = !_.isEmpty(selectedCountry)
            ? classnames("iti-flag", selectedCountry.iso2)
            : "no-selection";
        var separator = countryCodeDisplayType === "dialCode" ? " +" : " | ";
        var title = !_.isEmpty(selectedCountry)
            ? selectedCountry.name + separator + selectedCountry[countryCodeDisplayType]
            : "No country selected";
        var type = <Flag countryCodeClassName={this.props.countryCodeClassName} />;

        // Set up item props to pass to the contentType
        return (
            <FormDropDownList
                flags={getFlags(this)}
                stateless={true}
                data-id={this.props["data-id"]}
                className={containerClassName}
                options={countryCodesWithValues}
                contentType={type}
                onValueChange={this.props.onValueChange}
                open={open}
                onToggle={this.props.onToggle}
                searchIndex={this.props.searchIndex}
                searchString={this.props.searchString}
                searchField="name"
                searchTime={this.props.searchTime}
                searchType={FormDropDownList.SearchTypes.KEYBOARD}
                setSearchIndex={this.props.setSearchIndex}
                setSearchString={this.props.setSearchString}
                setSearchTime={this.props.setSearchTime}
                onSearch={this.props.onSearch}
                validSearchCharsRegex="/[^a-zA-Z\s]+/"
                title={title}
                selectedOption={selectedCountry}
                selectedOptionLabelClassName={selectorFlagClassName}
                showSelectedOptionLabel={false}
                name={this.props.name}
                noneOption={{ label: this.props.labelNoCountry, value: this.props.labelNoCountry }}
                noneOptionLabelClassName="country-name" />
        );
    }
}

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

class Flag extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        countryCodeClassName: PropTypes.string,
        name: PropTypes.string,
        code: PropTypes.string,
        iso2: PropTypes.string
    };

    static defaultProps = {
        "data-id": "flag"
    };

    render() {
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
}

CountryFlagList.CountryCodeTypes = Types;

CountryFlagList.Flag = Flag; //Internal but exposed for testing only

module.exports = CountryFlagList;