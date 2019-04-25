"use strict";

import React from "react";
import PropTypes from "prop-types";
import _ from "underscore";
import classnames from "classnames";
import CountryFlagList from "./CountryFlagList";
import Utils from "../../../util/Utils.js";
import { inStateContainer, toggleTransform } from "../../utils/StateContainer";
import { cannonballProgressivelyStatefulWarning, cannonballPortalWarning } from "../../../util/DeprecationUtils";
import { flagsPropType, hasFlag } from "../../../util/FlagUtils";

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
* @param {array} [flags]
*     Set the flag for "use-portal" to render with popper.js and react-portal
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
* @param {I18nCountrySelector~onToggle} [onToggle]
*     Callback to be triggered when open/close state changes. Used only when stateless=true.
* @param {number} [searchIndex]
*     Index of searched element if found
* @param {string} [searchString]
*     Value to help with finding an element on keydown.
* @param {number} [searchTime]
*     Time to help clear the search when the user delays their search.
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
        flags: flagsPropType,
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
        const { flags } = this.props;

        return (
            <div className={classname} data-id={this.props["data-id"]}>
                <CountryFlagList
                    countryCodeClassName="isoNum-code"
                    countryCodeDisplayType={CountryFlagList.CountryCodeTypes.ISO_NUM}
                    flags={flags}
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

class I18nCountrySelectorStateful extends React.Component {
    state = {
        open: this.props.open || false,
        searchIndex: -1,
        searchString: "",
        searchTime: 0
    };

    _handleToggle = () => {
        this.setState({
            open: !this.state.open,
            searchIndex: -1,
            searchString: "",
            searchTime: 0
        });
    };

    /**
    * @method _handleSearch
    * @memberof I18nCountrySelectorStateful
    * @private
    * @ignore
    *
    * @desc Handles search of country in list.
    *
    * @param {string} search
    *     Search string for country.
    * @param {number} time
    *     Search time for country.
    * @param {Number} index
    *     The index of country searched
    */
    _handleSearch = (search, time, index) => {
        this.setState({
            searchString: search,
            searchTime: time,
            searchIndex: index
        });
    };

    render() {
        var props = _.defaults({
            ref: "I18nCountrySelectorStateless",
            onToggle: this._handleToggle,
            open: this.state.open,
            onSearch: this._handleSearch,
            searchIndex: this.state.searchIndex,
            searchString: this.state.searchString,
            searchTime: this.state.searchTime
        }, this.props);

        return React.createElement(I18nCountrySelectorStateless, props);
    }
}

const PStatefulCountrySelector = inStateContainer([
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
PStatefulCountrySelector.displayName = PStatefulCountrySelector;

export default class I18nCountrySelector extends React.Component {

    static propTypes = {
        stateless: PropTypes.bool,
        flags: flagsPropType,
    };

    static defaultProps = {
        stateless: false,
    };

    _usePStateful = () => hasFlag(this, "p-stateful");

    componentDidMount() {
        if (!this._usePStateful()) {
            cannonballProgressivelyStatefulWarning({ name: "CountrySelector" });
        }
        if (!hasFlag(this, "use-portal")) {
            cannonballPortalWarning({ name: "I18nCountrySelector" });
        }
        if (!Utils.isProduction()) {
            if (this.props.controlled !== undefined) {
                throw new Error(Utils.deprecatePropError("controlled", "stateless"));
            }
            if (this.props.onCountrySearch) {
                throw new Error(Utils.deprecatePropError("onCountrySearch", "onSearch"));
            }
        }
    }

    render() {
        if (this._usePStateful()) {
            return <PStatefulCountrySelector {...this.props} />;
        }

        return this.props.stateless
            ? React.createElement(I18nCountrySelectorStateless,
                _.defaults({ ref: "I18nCountrySelectorStateless" }, this.props))
            : React.createElement(I18nCountrySelectorStateful,
                _.defaults({ ref: "I18nCountrySelectorStateful" }, this.props));
    }
}