var React = require("react"),
    ReactDOM = require("react-dom"),
    moment = require("moment-timezone"),
    zonesMetadata = require("../../../node_modules/moment-timezone/data/meta/latest.json"),
    classnames = require("classnames"),
    CollapsibleLink = require("../general/CollapsibleLink.jsx"),
    EventUtils = require("../../util/EventUtils.js"),
    FormError = require("./FormError.jsx"),
    KeyboardUtils = require("../../util/KeyboardUtils.js"),
    _ = require("underscore");

/**
* @callback FormTimeZone~onValueChange
*/

/**
* @callback FormTimeZone~onSearch
*/

/**
* @callback FormTimeZone~onToggle
*/

/**
* @class FormTimeZone
* @desc Input for selecting a time zone
*
* @param {string} [data-id=time-zone]
*     The data-id of the component
* @param {string} [className]
*     Class name(s) to add to the top-level container/div
*
* @param {string} countryLabel
*     The text prompt/label that is displayed above the list of countries
* @param {string} [errorMessage]
*     The message to display if defined when external validation failed.
* @param {string} filterByCountry
*     The two character country code that, when set, displays a list of time zones associated with that country
* @param {boolean} [open=false]
*     Shows/opens the time zone menu when true
* @param {string} searchString
*     Text to used filter the full list of time zone options
*
* @param {FormTimeZone~onValueChange} onValueChange
*     Callback that is triggered when a timezone is selected.
* @param {FormTimeZone~onSearch} onSearch
*     Callback that is triggered when search text is entered
* @param {FormTimeZone~onToggle} onToggle
*     Callback that will be triggered when the timezone menu is to open or close
*
* @example
*     <FormTimeZone
*         controlled={true}
*         open={this.state.open}
*         searchString={this.state.searchString}
*         value={this.state.value}
*         onChange={this._handleChange}
*         onSearch={this._handleSearchChange}
*         onToggle={this._handleToggle}
*     />
*
**/

module.exports = React.createClass({

    renderedCountries: [],
    renderedZones: [],

    propTypes: {
        controlled: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            controlled: false,
            value: moment.tz.guess()
        };
    },

    render: function () {
        return this.props.controlled
            ? React.createElement(TimeZoneStateless, //eslint-disable-line no-use-before-define
                _.defaults({ ref: "TimeZoneStateless" }, this.props))
            : React.createElement(TimeZoneStateful, //eslint-disable-line no-use-before-define
                _.defaults({ ref: "TimeZoneStateful" }, this.props));

    }
});

var TimeZoneStateless = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        className: React.PropTypes.string,
        countryLabel: React.PropTypes.string.isRequired,
        errorMessage: React.PropTypes.string,
        filterByCountry: React.PropTypes.string,
        onValueChange: React.PropTypes.func,
        onSearch: React.PropTypes.func,
        onToggle: React.PropTypes.func,
        open: React.PropTypes.bool,
        searchString: React.PropTypes.string,
        selectedIndex: React.PropTypes.number
    },

    _clearSearchString: function () {
        this.props.onSearch("", this.props.selectedIndex);
    },

    _onValueChange: function (type, value) {
        this.props.onValueChange(type, value);
        this.props.onSearch(this.props.searchString, 0);
    },

    _onGlobalClick: function (e) {
        if (!this.props.open) {
            return;
        }

        var timezoneInput = ReactDOM.findDOMNode(this.refs["input-timezone"]);
        EventUtils.callIfOutsideOfContainer(timezoneInput, this.props.onToggle, e);
        this.props.onSearch(this.props.searchString, 0);
    },

    _onKeyDown: function (e) {
        var newIndex,
            renderedItems;

        if (e.keyCode === KeyboardUtils.KeyCodes.ENTER) {

            if (this.props.filterByCountry && this.renderedZones[this.props.selectedIndex]) {
                this._onValueChange("zone", this.renderedZones[this.props.selectedIndex].name);

            } else if (this.renderedCountries[this.props.selectedIndex]) {
                this._onValueChange("country", this.renderedCountries[this.props.selectedIndex].abbr);
            }

        } else if (e.keyCode === KeyboardUtils.KeyCodes.ARROW_UP) {
            newIndex = this.props.selectedIndex - 1;
            newIndex = newIndex < 0 ? 0 : newIndex;

            if (newIndex !== this.props.selectedIndex) {
                this.props.onSearch(this.props.searchString, newIndex);
            }
            this._killEvent(e);
        } else if (e.keyCode === KeyboardUtils.KeyCodes.ARROW_DOWN) {
            renderedItems = this.props.filterByCountry ? "renderedZones" : "renderedCountries";

            newIndex = this.props.selectedIndex + 1;
            newIndex = newIndex > this[renderedItems].length - 1 ? this[renderedItems].length - 1 : newIndex;

            if (newIndex !== this.props.selectedIndex) {
                this.props.onSearch(this.props.searchString, newIndex);
            }
            this._killEvent(e);
        }
    },

    _killEvent: function (e) {
        e.preventDefault();
        e.stopPropagation();
    },

    _onSearch: function (e) {
        this.props.onSearch(e.target.value, this.props.selectedIndex);
    },

    _renderCountries: function () {
        var countries,
            rowCss,
            self = this,
            searchString = this.props.searchString ? this.props.searchString.toLowerCase() : "",
            isSearch = !!searchString;

        countries = this.countryData.filter(function (country) {
            return !isSearch || country.name.toLowerCase().indexOf(searchString) > -1;
        });

        this.renderedCountries = countries;

        return (
            <div>
                <div className="tooltip-menu-option-title">
                    {this.props.countryLabel}
                </div>
                <div className="tooltip-menu-options" ref="country-menu" data-id="tooltip-menu-options">
                    {countries.map(function (country, i) {
                        rowCss = i === self.props.selectedIndex ? "selected" : null;
                        return (
                            <div
                                onClick={self._onValueChange.bind(null, "country", country.abbr)}
                                className={classnames("tooltip-menu-option", rowCss)}
                                ref={"country-option-" + i}
                                key={i}>
                                {country.name}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    },

    _renderZones: function () {
        var countryZones,
            countryZoneNames,
            rowCss,
            self = this;

        // Get the zones associated with the selected country from the moment metadata and assemble data to be displayed
        if (zonesMetadata.countries[this.props.filterByCountry]) {
            countryZoneNames = zonesMetadata.countries[this.props.filterByCountry].zones;

            countryZones = this.zoneData.filter(function (zone) {
                return countryZoneNames.indexOf(zone.name) > -1;
            });
            countryZones = _.sortBy(countryZones, function (country) {
                return country.offset;
            });
            countryZones.reverse();

        } else {
            countryZones = this.zoneData;
        }

        this.renderedZones = countryZones;

        return (
            <div>
                {zonesMetadata.countries[this.props.filterByCountry] && (
                    <div className="tooltip-menu-option-title" data-id="selected-country">
                        {zonesMetadata.countries[this.props.filterByCountry].name}
                        <a
                            className="icon-clear"
                            data-id="clear-country"
                            onClick={this._onValueChange.bind(null, "country", "")}>
                        </a>
                    </div>
                )}
                <div className="tooltip-menu-options" ref="zone-menu" data-id="tooltip-menu-options">
                    {countryZones.map(function (tz, i) {
                        rowCss = i === self.props.selectedIndex ? "selected" : null;
                        return (<div
                            onClick={self._onValueChange.bind(null, "zone", tz.name)}
                            className={classnames("tooltip-menu-option", rowCss)}
                            ref={"zone-option-" + i}
                            key={i}>
                            <span className="timezone-abbr">{tz.abbr}</span>
                            &nbsp;-&nbsp;
                            <span className="timezone-name">{tz.name}</span>
                            <span className="timezone-offset">{tz.time}</span>
                        </div>);
                    })}
                </div>
            </div>
        );
    },

    _setListPosition: function () {
        if (!this.props.open) {
            return;
        }
        var updatedItem = this.props.filterByCountry ? "zone" : "country",
            menu = ReactDOM.findDOMNode(this.refs[updatedItem + "-menu"]),
            menuItem = ReactDOM.findDOMNode(this.refs[updatedItem + "-option-" + this.props.selectedIndex]);

        if (menuItem && menuItem.offsetTop) {
            menu.scrollTop = menuItem.offsetTop;
        }
    },

    componentWillMount: function () {
        var countryCode,
            countryData = [],
            currentUtcTime = moment().utc(),
            zoneData,
            zoneNames = moment.tz.names();

        zoneData = zoneNames.map(function (tz) {
            return {
                abbr: moment.tz(tz).zoneAbbr(),
                name: tz,
                time: moment.tz(currentUtcTime, tz).format("h:mm A"),
                offset: moment.tz(currentUtcTime, tz).format("Z")
            };
        });
        for (countryCode in zonesMetadata.countries) {
            countryData.push(zonesMetadata.countries[countryCode]);
        }

        this.zoneData = zoneData;
        this.countryData = _.sortBy(countryData, function (country) {
            return country.name;
        });
    },

    componentDidMount: function () {
        window.addEventListener("click", this._onGlobalClick);
    },

    componentWillUnmount: function () {
        window.removeEventListener("click", this._onGlobalClick);
    },

    componentDidUpdate: function () {
        if (this.props.open) {
            ReactDOM.findDOMNode(this.refs.searchString).focus();
        }
        this._setListPosition();
    },

    getInitialState: function () {
        return {
            renderedCountries: [],
            renderedZones: []
        };
    },

    getDefaultProps: function () {
        return {
            filterByCountry: undefined,
            onValueChange: _.noop,
            onSearch: _.noop,
            onToggle: _.noop,
            open: false,
            selectedIndex: 0
        };
    },

    render: function () {
        var classNames = {
            "form-error": !!this.props.errorMessage,
            countries: !!this.props.filterByCountry
        };

        return (
            <div
                data-id={this.props["data-id"]}
                className={classnames("input-timezone", classNames, this.props.className)}
                ref="input-timezone">
                <CollapsibleLink
                    title={this.props.value}
                    expanded={this.props.open}
                    onToggle={this.props.onToggle}
                />
                {this.props.open && (
                    <div className="tooltip-menu" data-id="tooltip-menu">
                        <div className="tooltip-menu-search">
                            <input
                                data-id="country-search"
                                type="text"
                                value={this.props.searchString}
                                onChange={this._onSearch}
                                onKeyDown={this._onKeyDown}
                                ref="searchString"
                            />
                            <a
                                className="tooltip-menu-search-clear"
                                data-id="clear-search"
                                onClick={this._clearSearchString}>
                            </a>
                        </div>
                        {this.props.filterByCountry ? this._renderZones() : this._renderCountries()}
                    </div>
                )}
                {this.props.errorMessage && (
                    <FormError.Icon data-id={this.props["data-id"] + "-error-message-icon"} />
                )}
                {this.props.errorMessage && (
                    <FormError.Message
                        value={this.props.errorMessage}
                        data-id={this.props["data-id"] + "-error-message"}
                    />
                )}
            </div>
        );
    }
});

var TimeZoneStateful = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        errorMessage: React.PropTypes.string,
        value: React.PropTypes.string
    },

    _toggleMenu: function () {
        this.setState({
            open: !this.state.open
        });
    },

    _onSearch: function (searchString, selectedIndex) {
        this.setState({
            searchString: searchString,
            selectedIndex: selectedIndex
        });
    },

    _onValueChange: function (type, value) {
        var newState = {};

        if (type === "country") {
            newState.filterByCountry = value;
            newState.searchString = "";

        } else if (type === "zone") {
            newState.value = value;
            newState.filterByCountry = undefined;
            this._toggleMenu();
        }

        this.setState(newState);
    },

    getInitialState: function () {
        return {
            filterByCountry: this.props.filterByCountry,
            index: 0,
            open: this.props.open,
            searchString: this.props.searchString || "",
            value: this.props.value
        };
    },

    render: function () {
        var props = _.defaults({
            filterByCountry: this.state.filterByCountry,
            onToggle: this._toggleMenu,
            onSearch: this._onSearch,
            onValueChange: this._onValueChange,
            open: this.state.open,
            ref: "TimeZoneStateless",
            searchString: this.state.searchString,
            selectedIndex: this.state.selectedIndex,
            value: this.state.value
        }, this.props);

        return React.createElement(TimeZoneStateless, props);
    }
});
