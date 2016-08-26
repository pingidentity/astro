"use strict";

var React = require("react"),
    _ = require("underscore"),
    classnames = require("classnames"),
    CountryFlagList = require("./CountryFlagList.jsx"),
    Utils = require("../../../util/Utils.js");

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
* @param {boolean} [controlled=false]
*    To enable the component to be externally managed. True will relinquish control to the component's owner.
*    False or not specified will cause the component to manage state internally.
* @param {string} [countryCode]
*     The country code to be selected by default.
* @param {I18nCountrySelector~onValueChange}
*     Callback to be triggered when country code changes.
* @param {boolean} [open=false]
*     State of the open/closed dropdown menu.
* @param {I18nCountrySelector~onToggle} [onToggle]
*     Callback to be triggered when open/close state changes. Used only when controlled=true.
* @param {number} [searchIndex]
*     Index of searched element if found
* @param {string} [searchString]
*     Value to help with finding an element on keydown.
* @param {number} [searchTime]
*     Time to help clear the search when the user delays their search.
* @param {I18nCountrySelector~onSearch} [onSearch]
*    Callback to be triggered when the state of the search of a country when the flag dropdown is expanded changes.
* @param {I18nCountrySelector~onSearch} [onCountrySearch]
*    DEPRECATED. Use "onSearch" instead.
*/

module.exports = React.createClass({
    propTypes: {
        controlled: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            controlled: false
        };
    },

    render: function () {
        return this.props.controlled
            ? React.createElement(I18nCountrySelectorStateless, //eslint-disable-line
                _.defaults({ ref: "I18nCountrySelectorStateless" }, this.props))
            : React.createElement(I18nCountrySelectorStateful, //eslint-disable-line
                _.defaults({ ref: "I18nCountrySelectorStateful" }, this.props));
    }
});

var I18nCountrySelectorStateless = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        className: React.PropTypes.string,
        countryCode: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        onValueChange: React.PropTypes.func,
        open: React.PropTypes.bool,
        onToggle: React.PropTypes.func,
        searchIndex: React.PropTypes.number,
        searchString: React.PropTypes.string,
        searchTime: React.PropTypes.number,
        onSearch: React.PropTypes.func,
        onCountrySearch: React.PropTypes.func //TODO: remove when v1 no longer supported
    },

    getDefaultProps: function () {
        return {
            "data-id": "i18n-country-selector",
            className: "",
            countryCode: "",
            onValueChange: _.noop,
            open: false,
            onToggle: _.noop,
            searchIndex: -1,
            searchString: "",
            searchTime: 0,
            onSearch: _.noop
        };
    },

    componentWillMount: function () {
        if (this.props.onCountrySearch) {
            console.warn(Utils.deprecateMessage("onCountrySearch", "onSearch"));
        }
    },

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
    _handleValueChange: function (country) {
        this.props.onValueChange(country.isoNum || "");
        this.props.onToggle();
    },

    render: function () {
        var classname = classnames("intl-country-selector", this.props.className);
        return (
            <div className={classname} data-id={this.props["data-id"]}>
                <CountryFlagList
                    countryCodeClassName="isoNum-code"
                    countryCodeDisplayType={CountryFlagList.CountryCodeTypes.ISO_NUM}
                    selectedCountryCode={this.props.countryCode}
                    open={this.props.open}
                    onValueChange={this._handleValueChange}
                    onToggle={this.props.onToggle}
                    onSearch={this.props.onCountrySearch || this.props.onSearch}
                    searchIndex={this.props.searchIndex}
                    searchString={this.props.searchString}
                    searchTime={this.props.searchTime}
                />
            </div>
        );
    }
});

var I18nCountrySelectorStateful = React.createClass({

    _handleToggle: function () {
        this.setState({
            open: !this.state.open,
            searchIndex: -1,
            searchString: "",
            searchTime: 0
        });
    },

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
    _handleSearch: function (search, time, index) {
        this.setState({
            searchString: search,
            searchTime: time,
            searchIndex: index
        });
    },

    getInitialState: function () {
        return {
            open: this.props.open || false,
            searchIndex: -1,
            searchString: "",
            searchTime: 0
        };
    },

    render: function () {
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
});
