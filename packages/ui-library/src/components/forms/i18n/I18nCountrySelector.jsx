"use strict";

var React = require("react"),
    _ = require("underscore"),
    classnames = require("classnames"),
    CountryFlagList = require("./CountryFlagList.jsx");

/**
* @callback I18nCountrySelector~onValueChange
* @param {string|number} countryCode
*     The country code.
*/

/**
* @callback I18nCountrySelector~onToggle
* /

/**
* @callback I18nCountrySelector~onCountrySearch
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
*
* @param {string} [countryCode]
*     The country code to be selected by default.
* @param {I18nCountrySelector~onValueChange}
*     Callback to be triggered when country code changes.
*
* @param {boolean} [open=false]
*     State of the open/closed dropdown menu.
* @param {I18nCountrySelector~onToggle} [onToggle]
*     Callback to be triggered when open/close state changes. Used only when controlled=true.
*
* @param {string} [searchString]
*     Value to help with finding an element on keydown.
* @param {number} [searchTime]
*     Time to help clear the search when the user delays their search.
* @param {I18nCountrySelector~onCountrySearch} [onCountrySearch]
*     Callback to handle state change for on search of country when flag dropdown expanded.
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
        return (
            this.props.controlled
                ? <I18nCountrySelectorStateless ref="I18nCountrySelectorStateless" {...this.props} />
                : <I18nCountrySelectorStateful ref="I18nCountrySelectorStateful" {...this.props} />
        );
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
        searchString: React.PropTypes.string,
        searchTime: React.PropTypes.number,
        onCountrySearch: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            "data-id": "i18n-country-selector",
            className: "",
            countryCode: "",
            onValueChange: _.noop,
            open: false,
            onToggle: _.noop,
            searchString: "",
            searchTime: 0,
            onCountrySearch: _.noop
        };
    },

    /**
    * @method _handleCountryClick
    * @memberof I18nCountrySelectorStateless
    * @private
    * @ignore
    *
    * @desc Handles click on a country in the list.
    *
    * @param {object} country
    *     The clicked country item.
    */
    _handleCountryClick: function (country) {
        this.props.onValueChange(country ? country.isoNum : "" );
        this.props.onToggle();
    },

    render: function () {
        var classname = classnames("intl-country-selector", this.props.className);

        return (
            <div className={classname} data-id={this.props["data-id"]}>
                <CountryFlagList
                    countryCodeClassName="isoNum-code"
                    countryCodeDisplayType="isoNum"
                    selectedCountryCode={this.props.countryCode}
                    open={this.props.open}
                    onCountryClick={this._handleCountryClick}
                    onToggle={this.props.onToggle}
                    onCountrySearch={this.props.onCountrySearch}
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
            searchString: "",
            searchTime: 0
        });
    },

     /**
     * @method _handleCountrySearch
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
     */
    _handleCountrySearch: function (search, time) {
        this.setState({
            searchString: search,
            searchTime: time
        });
    },

    getInitialState: function () {
        return {
            open: this.props.open || false,
            searchString: "",
            searchTime: 0
        };
    },

    render: function () {
        return (
            <I18nCountrySelectorStateless ref="I18nCountrySelectorStateless" {...this.props}
                onToggle={this._handleToggle}
                open={this.state.open}
                onCountrySearch={this._handleCountrySearch}
                searchString={this.state.searchString}
                searchTime={this.state.searchTime}
            />
        );
    }
});

