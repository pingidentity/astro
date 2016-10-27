var React = require("react"),
    ReactDOM = require("react-dom"),
    moment = require("moment-timezone"),
    zonesMetadata = require("moment-timezone/data/meta/latest.json"),
    classnames = require("classnames"),
    CollapsibleLink = require("../general/CollapsibleLink.jsx"),
    EventUtils = require("../../util/EventUtils.js"),
    FormError = require("./FormError.jsx"),
    KeyCodes = require("../../util/KeyboardUtils.js").KeyCodes,
    _ = require("underscore");

/**
* @callback FormTimeZone~onValueChange
*
* @param {type} type
*    What has changed (either "country" or "zone")
* @param {value} value
*    When type=="country", this is the country name.
*    When type=="zone", this is an object with the unique zone name "name", the UTC offset "offset", the abbreviation,
*        and time.
*/

/**
* @callback FormTimeZone~onSearch
*
* @param {string}
*     The value currently entered into the search field
* @param {selectedIndex}
*     The index of the item that is selected and that will be selected if ENTER is pressed
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
* @param {boolean} [controlled=false]
*     To enable the component to be externally managed. True will relinquish control to the component's owner.
*     False or not specified will cause the component to manage state internally.
* @param {string} [className]
*     Class name(s) to add to the top-level container/div
*
* @param {string=Select a Country} selectCountryLabel
*     The text prompt/label that is displayed above the list of countries
* @param {string=Country} selectCountryLabel
*     The text to display over the selected country (usually "Country")
* @param {string} [displayValue] Value to be displayed other than the unique string value. For example the abbreviation
*     could be displayed instead.
* @param {string} [errorMessage]
*     The message to display if defined when external validation failed.
* @param {string} [filterByCountry]
*     The two character country code that, when set, displays a list of time zones associated with that country
* @param {boolean} [open=false]
*     Shows/opens the time zone menu when true
* @param {string} [searchString]
*     Text to used filter the full list of time zone options
* @param {string} value
*     The initial value of the input
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
*         selectCountryLabel="Select a Country"
*         countryLabel="Country"
*     />
*
**/

module.exports = React.createClass({

    propTypes: {
        controlled: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            controlled: false
        };
    },

    isValidTimeZone: function (zoneText) {
        return this.props.controlled
            ? this.refs.TimeZoneStateless.isValidTimeZone(zoneText)
            : this.refs.TimeZoneStateful.isValidTimeZone(zoneText);
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
        countryLabel: React.PropTypes.string,
        displayValue: React.PropTypes.string,
        errorMessage: React.PropTypes.string,
        filterByCountry: React.PropTypes.string,
        onValueChange: React.PropTypes.func,
        onSearch: React.PropTypes.func,
        onToggle: React.PropTypes.func,
        open: React.PropTypes.bool,
        searchString: React.PropTypes.string,
        selectCountryLabel: React.PropTypes.string.isRequired,
        selectedIndex: React.PropTypes.number,
        value: React.PropTypes.string,
    },

    _clearSearchString: function () {
        this.props.onSearch("", this.props.selectedIndex);
    },

    _onCountryChange: function (e) {
        this._onValueChange("country", e.target.getAttribute("data-value"));
    },

    _onZoneChange: function (e) {
        var index = e.target.getAttribute("data-index") || e.target.parentElement.getAttribute("data-index");
        this._onValueChange("zone", this.state.renderedZones[index]);
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

        if (e.keyCode === KeyCodes.ENTER) {

            if (this.props.filterByCountry && this.state.renderedZones[this.props.selectedIndex]) {
                this._onValueChange("zone", {
                    name: this.state.renderedZones[this.props.selectedIndex].name,
                    offset: this.state.renderedZones[this.props.selectedIndex].offset
                });

            } else if (this.state.renderedCountries[this.props.selectedIndex]) {
                this._onValueChange("country", this.state.renderedCountries[this.props.selectedIndex].abbr);
            }

        } else if (e.keyCode === KeyCodes.ARROW_UP) {
            newIndex = this.props.selectedIndex - 1;
            newIndex = newIndex < 0 ? 0 : newIndex;

            if (newIndex !== this.props.selectedIndex) {
                this.props.onSearch(this.props.searchString, newIndex);
            }
            this._killEvent(e);

        } else if (e.keyCode === KeyCodes.ARROW_DOWN) {
            renderedItems = this.props.filterByCountry ? "renderedZones" : "renderedCountries";

            newIndex = this.props.selectedIndex + 1;
            newIndex = newIndex > this.state[renderedItems].length - 1
                ? this.state[renderedItems].length - 1 : newIndex;

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
        var rowCss,
            self = this;

        return (
            <div>
                <div className="tooltip-menu-option-title">
                    {this.props.selectCountryLabel}
                </div>
                <div
                    className="tooltip-menu-options"
                    ref="country-menu"
                    data-id={this.props["data-id"] + "-tooltip-menu-options"}>
                    {this.state.renderedCountries.map(function (country, i) {
                        rowCss = i === self.props.selectedIndex ? "selected" : null;
                        return (
                            <div
                                data-value={country.abbr}
                                onClick={self._onCountryChange}
                                ref={"country-option-" + i}
                                key={country.abbr}
                                className={classnames("tooltip-menu-option", rowCss)}>
                                {country.name}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    },

    _renderZones: function () {
        var rowCss,
            self = this;

        return (
            <div>
                {zonesMetadata.countries[this.props.filterByCountry] && (
                    <div className="tooltip-menu-option-title" data-id="selected-country">
                        <div className="country-label">{this.props.countryLabel}</div>
                        {zonesMetadata.countries[this.props.filterByCountry].name}
                        <a
                            data-id={this.props["data-id"] + "-clear-country"}
                            data-value=""
                            className="icon-clear"
                            onClick={this._onCountryChange}>
                        </a>
                    </div>
                )}
                <div
                    className="tooltip-menu-options"
                    ref="zone-menu"
                    data-id={this.props["data-id"] + "-tooltip-menu-options"}>
                    {this.state.renderedZones.map(function (tz, i) {
                        rowCss = i === self.props.selectedIndex ? "selected" : null;
                        return (
                            <div
                                data-index={i}
                                onClick={self._onZoneChange}
                                ref={"zone-option-" + i}
                                key={tz.name}
                                className={classnames("tooltip-menu-option", rowCss)}>
                                <span className="timezone-abbr">{tz.abbr}</span>
                                &nbsp;-&nbsp;
                                <span className="timezone-name">{tz.name}</span>
                                <span className="timezone-offset">{tz.time}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    },

    _refreshData: function (nextProps) {
        var countryZones,
            countryZoneNames,
            filteredCountries,
            newState = {},
            searchString = nextProps.searchString ? nextProps.searchString.toLowerCase() : "";

        // if a country is passed/selected, get the zones for that country
        if (nextProps.filterByCountry) {

            if (zonesMetadata.countries[nextProps.filterByCountry]) {
                countryZoneNames = zonesMetadata.countries[nextProps.filterByCountry].zones;

                countryZones = this.state.zoneData.filter(function (zone) {
                    return countryZoneNames.indexOf(zone.name) > -1;
                });
                countryZones = _.sortBy(countryZones, function (country) {
                    return country.offset;
                });
                countryZones.reverse();

            } else {
                countryZones = this.state.zoneData;
            }
            newState.renderedZones = countryZones;

        // if a country is not yet selected, filter the all countries by the search text has been entered
        } else {
            if (searchString) {
                filteredCountries = this.state.countryData.filter(function (country) {
                    return country.name.toLowerCase().indexOf(searchString) > -1;
                });

            } else {
                filteredCountries = this.state.countryData;
            }
            newState.renderedCountries = filteredCountries;
        }

        this.setState(newState);
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

    isValidTimeZone: function (zoneName) {
        var matchedZone = this.state.zoneData.filter(function (tz) {
            return zoneName === tz.name;
        });
        return matchedZone[0] ? matchedZone[0] : false;
    },

    _getCountryData: function () {
        var countryCode,
            countryData = [];

        for (countryCode in zonesMetadata.countries) {
            countryData.push(zonesMetadata.countries[countryCode]);
        }

        return _.sortBy(countryData, function (country) {
            return country.name;
        });
    },

    _getZoneData: function () {
        var currentUtcTime = moment().utc(),
            zoneNames = moment.tz.names();

        return zoneNames.map(function (tz) {
            return {
                abbr: moment.tz(tz).zoneAbbr(),
                name: tz,
                time: moment.tz(currentUtcTime, tz).format("h:mm A"),
                offset: moment.tz(currentUtcTime, tz).format("Z")
            };
        });
    },

    componentWillMount: function () {
        this.setState({
            zoneData: this._getZoneData(),
            countryData: this._getCountryData()
        }, function () {
            this._refreshData(this.props);
        });
    },

    componentDidMount: function () {
        window.addEventListener("click", this._onGlobalClick);
    },

    componentWillUnmount: function () {
        window.removeEventListener("click", this._onGlobalClick);
    },

    componentWillReceiveProps: function (nextProps) {

        // refresh the time for each of the zones
        var currentUtcTime = moment().utc();
        this.setState({
            zoneData: this.state.zoneData.map(function (tz) {
                return {
                    abbr: tz.abbr,
                    name: tz.name,
                    time: moment.tz(currentUtcTime, tz.name).format("h:mm A"),
                    offset: tz.offset
                };
            })

        });

        this._refreshData(nextProps);
    },

    componentDidUpdate: function () {
        if (this.props.open) {
            ReactDOM.findDOMNode(this.refs.searchString).focus();
        }
        this._setListPosition();
    },

    getInitialState: function () {
        return {
            countryData: null,
            renderedCountries: [],
            renderedZones: [],
            zoneData: null
        };
    },

    getDefaultProps: function () {

        this.labelDefaults = {
            COUNTRY: "Country",
            "SELECT-COUNTRY": "Select a Country"
        };

        return {
            countryLabel: this.labelDefaults.COUNTRY,
            filterByCountry: undefined,
            onValueChange: _.noop,
            onSearch: _.noop,
            onToggle: _.noop,
            open: false,
            selectCountryLabel: this.labelDefaults["SELECT-COUNTRY"],
            selectedIndex: 0,
            value: moment.tz.guess()
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
                    data-id={this.props["data-id"] + "-collapsible-link"}
                    title={this.props.displayValue || this.props.value}
                    expanded={this.props.open}
                    onToggle={this.props.onToggle}
                />
                {this.props.open && (
                    <div className="tooltip-menu" data-id="tooltip-menu">
                        <div className="tooltip-menu-search">
                            <input
                                data-id={this.props["data-id"] + "-search-input"}
                                type="text"
                                value={this.props.searchString}
                                onChange={this._onSearch}
                                onKeyDown={this._onKeyDown}
                                ref="searchString"
                            />
                            <a
                                className="tooltip-menu-search-clear"
                                data-id={this.props["data-id"] + "-search-clear"}
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
            newState.value = value.name;
            newState.offset = value.offset;
            newState.filterByCountry = undefined;
            this._toggleMenu();
        }

        this.setState(newState);
    },

    isValidTimeZone: function (zoneText) {
        return this.refs.TimeZoneStateless.isValidTimeZone(zoneText);
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
