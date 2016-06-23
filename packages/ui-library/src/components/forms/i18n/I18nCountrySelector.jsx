"use strict";

var React = require("react"),
    _ = require("underscore"),
    classnames = require("classnames"),
    CountryFlagList = require("./CountryFlagList.jsx");

/**
* @class I18nCountrySelector
* @desc an international country selector with numeric country code drop down.
*
* @param {string} [data-id="i18n-country-selector"] - data-id to set on the top HTML element
*   (defaults to "I18n-country-selector").
* @param {string} [className] - CSS class to set on the top HTML element.
* @param {bool} [open] - boolean state of the open/closed dropdown menu. Used only in stateless mode.
*   (defaults to false).
* @param {function} [onValueChange] - function (countryCode) {...} A callback to be triggered when the country code changes.
* @param {function} [onToggle] - function () {...} delegates to call when open/closed state changed.
* @param {string|number} [countryCode] - the country code to be selected by default.
* @param {function} [onCountrySearch] - function () {...} handles state change for on search of country when flag dropdown expanded
* @param {string} [searchString] - value to help with finding an element on keydown
* @param {number} [searchTime] - time to help clear the search when the user delays his search
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
        open: React.PropTypes.bool,
        onValueChange: React.PropTypes.func,
        onCountrySearch: React.PropTypes.func,
        searchString: React.PropTypes.string,
        searchTime: React.PropTypes.number,
        onToggle: React.PropTypes.func,
        countryCode: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ])
    },

    /**
    * Handles click on a country in the list
    * @method I18nCountrySelector#_handleCountryClick
    * @param {Object} country - the clicked country item
    * @private
    */
    _handleCountryClick: function (country) {
        this.props.onValueChange(country ? country.isoNum : "" );
        this.props.onToggle();
    },

    getDefaultProps: function () {
        return {
            "data-id": "i18n-country-selector",
            className: "",
            open: false,
            onValueChange: _.noop,
            onToggle: _.noop,
            countryCode: "",
            onCountrySearch: _.noop,
            searchString: "",
            searchTime: 0
        };
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
     * Handles search of country in list
     * @method I18nCountrySelectorStateful#_onCountrySearch
     * @param {String} search - Search string for country
     * @param {Number} time - Search time for country
     * @private
     */
    _onCountrySearch: function (search, time) {
        this.setState({
            searchString: search,
            searchTime: time
        });
    },

    getInitialState: function () {
        return {
            open: false,
            searchString: "",
            searchTime: 0
        };
    },

    render: function () {
        return (
            <I18nCountrySelectorStateless ref="I18nCountrySelectorStateless" {...this.props}
                onToggle={this._handleToggle}
                open={this.state.open}
                onCountrySearch={this._onCountrySearch}
                searchString={this.state.searchString}
                searchTime={this.state.searchTime}
            />
        );
    }
});

