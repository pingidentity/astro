"use strict";

import React from "react";
import PropTypes from "prop-types";
import _ from "underscore";
import classnames from "classnames";
import CountryFlagList from "./CountryFlagList";
import { inStateContainer, toggleTransform } from "../../utils/StateContainer";
import { deprecatedStatelessProp } from "../../../util/DeprecationUtils";

/**
* @callback I18nCountrySelector~onValueChange
*
* @param {string|number} countryCode
*     The country code.
*/

/**
* @callback I18nCountrySelector~onToggle
*/

/**
* @callback I18nCountrySelector~onSearch
*
* @param {string} searchString
*    The text to search with.
* @param {number} searchTime
*    The time after which to clear the search when the user delays their search.
* @param {number} searchIndex
*    The index of the country that was just searched.
*/


/**
* @class I18nCountrySelector
* @desc An international country selector with numeric country code drop down.
*
* @param {string} [data-id="i18n-country-selector"]
*     To define the base "data-id" value for top-level HTML container.
* @param {string} [className]
*     CSS classes to set on the top-level HTML container.
* @param {boolean} [stateless]
*    To enable the component to be externally managed. True will relinquish control to the component's owner.
*    False or not specified will cause the component to manage state internally.
* @param {string} [countryCode]
*     The country code to be selected by default.
* @param {I18nCountrySelector~onValueChange}
*     Callback to be triggered when country code changes.
* @param {string} [name]
*    Name attribute for the input.
* @param {boolean} [open=false]
*     State of the open/closed dropdown menu.
*     When not provided, the component will manage this value.
* @param {I18nCountrySelector~onToggle} [onToggle]
*     Callback to be triggered when open/close state changes. Used only when stateless=true.
* @param {number} [searchIndex]
*     Index of searched element if found
*     When not provided, the component will manage this value.
* @param {string} [searchString]
*     Value to help with finding an element on keydown.
*     When not provided, the component will manage this value.
* @param {number} [searchTime]
*     Time to help clear the search when the user delays their search.
*     When not provided, the component will manage this value.
* @param {I18nCountrySelector~onSearch} [onSearch]
*    Callback to be triggered when the state of the search of a country when the flag dropdown is expanded changes.
*/

class I18nCountrySelectorStateless extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        countryCode: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        name: PropTypes.string,
        onValueChange: PropTypes.func,
        open: PropTypes.bool,
        onToggle: PropTypes.func,
        searchIndex: PropTypes.number,
        searchString: PropTypes.string,
        searchTime: PropTypes.number,
        onSearch: PropTypes.func,
        setSearchIndex: PropTypes.func,
        setSearchString: PropTypes.func,
        setSearchTime: PropTypes.func,
    };

    static defaultProps = {
        "data-id": "i18n-country-selector",
        className: "",
        countryCode: "",
        onValueChange: _.noop,
        open: false,
        onToggle: _.noop,
        searchIndex: -1,
        searchString: "",
        searchTime: 0,
        onSearch: _.noop,
        setSearchIndex: _.noop,
        setSearchString: _.noop,
        setSearchTime: _.noop,
    };

    // moving the complexity from the stateful version
    _onToggleProxy = () => {
        this.props.onToggle();
        this.props.setSearchIndex(-1);
        this.props.setSearchString("");
        this.props.setSearchTime(0);
    }

    // moving the complexity from the stateful version
    _onSearchProxy = (search, time, index) => {
        this.props.onSearch(search, time, index);
        this.props.setSearchString(search);
        this.props.setSearchTime(time);
        this.props.setSearchIndex(index);
    };

    /**
    * @method _handleValueChange
    * @memberof I18nCountrySelectorStateless
    * @private
    * @ignore
    *
    * @desc Handles click on a country in the list.
    *
    * @param {object} country
    *     The clicked country item.
    */
    _handleValueChange = (country) => {
        this.props.onValueChange(country.isoNum || "");
    };

    render() {
        var classname = classnames("intl-country-selector", this.props.className);

        return (
            <div className={classname} data-id={this.props["data-id"]}>
                <CountryFlagList
                    countryCodeClassName="isoNum-code"
                    countryCodeDisplayType={CountryFlagList.CountryCodeTypes.ISO_NUM}
                    name={this.props.name}
                    selectedCountryCode={this.props.countryCode}
                    open={this.props.open}
                    onValueChange={this._handleValueChange}
                    onToggle={this._onToggleProxy}
                    onSearch={this._onSearchProxy}
                    searchIndex={this.props.searchIndex}
                    searchString={this.props.searchString}
                    searchTime={this.props.searchTime}
                />
            </div>
        );
    }
}

const I18nCountrySelector = inStateContainer([
    {
        name: "open",
        initial: false,
        callbacks: [
            {
                name: "onToggle",
                transform: toggleTransform,
            }
        ],
    },
    {
        name: "searchIndex",
        initial: -1,
        setter: "setSearchIndex",
    },
    {
        name: "searchString",
        initial: "",
        setter: "setSearchString",
    },
    {
        name: "searchTime",
        initial: 0,
        setter: "setSearchTime",
    },
])(I18nCountrySelectorStateless);

I18nCountrySelector.displayName = "I18nCountrySelector";

I18nCountrySelector.propTypes = {
    stateless: deprecatedStatelessProp,
};

export default I18nCountrySelector;