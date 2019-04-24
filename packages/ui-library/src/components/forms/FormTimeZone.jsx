import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";
import moment from "moment-timezone";
import zonesMetadata from "moment-timezone/data/meta/latest.json";
import classnames from "classnames";
import CollapsibleLink from "../general/CollapsibleLink";
import EventUtils from "../../util/EventUtils.js";
import FormError from "./FormError";
import FormLabel from "./FormLabel";
import FormSearchBox from "./FormSearchBox";
import { isEnter, isArrowDown, isArrowUp } from "../../util/KeyboardUtils.js";
import Utils from "../../util/Utils.js";
import _ from "underscore";
import { inStateContainer, toggleTransform } from "../utils/StateContainer";
import { cannonballProgressivelyStatefulWarning } from "../../util/DeprecationUtils";

import Popover from "../tooltips/Popover";
import { cannonballPortalWarning } from "../../util/DeprecationUtils";
import { flagsPropType } from "../../util/FlagUtils";

const PopoverBase = Popover.Base;

const getCountryData = () => {
    let countryCode;
    let countryData = [];

    for (countryCode in zonesMetadata.countries) {
        countryData.push(zonesMetadata.countries[countryCode]);
    }

    return _.sortBy(countryData, function (country) {
        return country.name;
    });
};

const getZoneData = () => {
    const currentUtcTime = moment().utc();
    const zoneNames = moment.tz.names();

    return zoneNames.map(function (tz) {
        return {
            abbr: moment.tz(tz).zoneAbbr(),
            name: tz,
            time: moment.tz(currentUtcTime, tz).format("h:mm A"),
            offset: moment.tz(currentUtcTime, tz).format("Z")
        };
    });
};

const isValidTimeZone = (zoneName, zoneData = getZoneData()) => {
    var matchedZone = zoneData.filter(function (tz) {
        return zoneName === tz.name;
    });
    return matchedZone[0] ? matchedZone[0] : false;
};

/**
* @function FormTimeZone~getZoneNameDisplayValue
* @desc Replaces underscores in time zone names with a space and returns this display value.
*
* @param {string} zoneName
*    The name of the time zone to be filtered.
*
* @returns {string} The filtered time zone name
*/
var getZoneNameDisplayValue = function (zoneName) {
    return zoneName.replace(/_/g, " ");
};


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
* @callback FormTimeZone~onZoneChange
*
* @param {value} value
*       The name of the time zone
*/

/**
* @callback FormTimeZone~onCountryChange
*
* @param {value} value
*       The abbreviation of the country
*/

/**
* @callback FormTimeZone~setSearchString
*
* @param {value} value
*       New search string
*/

/**
* @callback FormTimeZone~setSelectedIndex
*
* @param {value} value
*       New selected index
*/

/**
* @callback FormTimeZone~setOpen
*
* @param {value} value
*       New open state
*/

/**
* @class FormTimeZone
* @desc Input for selecting a time zone
*
* @param {string} [data-id=time-zone]
*     The data-id of the component
* @param {boolean} [stateless]
*     WARNING. Default value for "stateless" will be set to true from next version.
*     To enable the component to be externally managed. True will relinquish control to the component's owner.
*     False or not specified will cause the component to manage state internally.
* @param {string} [className]
*     Class name(s) to add to the top-level container/div
*
* @param {array} [flags]
*     Set the flag for "use-portal" to render with popper.js and react-portal
* @param {string} [countryLabel="Country"]
*     The text to display over the selected country
* @param {string} [displayValue] Value to be displayed other than the unique string value. For example the abbreviation
*     could be displayed instead.
* @param {string} [errorMessage]
*     The message to display if defined when external validation failed.
* @param {string} [filterByCountry]
*     The two character country code that, when set, displays a list of time zones associated with that country
* @param {string} [helpClassName]
*     CSS classes to apply to the label help hint (bottom, left, etc)
* @param {string} [labelHelpText]
*     The text to display for the help tooltip.
* @param {string} [labelText]
*     The text to show as the field's label.
* @param {string} [label]
*     Alias for labelText
* @param {boolean} [open=false]
*     Shows/opens the time zone menu when true
* @param {string} [searchString]
*     Text to used filter the full list of time zone options
* @param {string} [selectCountryLabel="Select a Country"]
*     The text prompt/label that is displayed above the list of countries
* @param {string} [selectLabel="Select a Time Zone"]
*     The text that shows when there's no value
* @param {string} value
*     The initial value of the input
*
* @param {FormTimeZone~onValueChange} onValueChange
*     Callback that is triggered when a timezone is selected.
* @param {FormTimeZone~onSearch} onSearch
*     Callback that is triggered when search text is entered
* @param {FormTimeZone~onToggle} onToggle
*     Callback that will be triggered when the timezone menu is to open or close
* @param {FormTimeZone~onZoneChange} onZoneChange
*     Callback that will be triggered when the selected timezone changes
* @param {FormTimeZone~onCountryChange} onCountryChange
*     Callback that will be triggered when the country filter changes
* @param {FormTimeZone~setSearchString} setSearchString
*     Callback that will be triggered when the search string is changed
* @param {FormTimeZone~setSelectedIndex} setSelectedIndex
*     Callback that will be triggered when the selected index changes
* @param {FormTimeZone~setOpen} setOpen
*     Callback that will be triggered when the open state is set directly
*
* @example
*     <FormTimeZone
*         stateless={true}
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


var LABEL_DEFAULTS = {
    COUNTRY: "Country",
    "SELECT-COUNTRY": "Select a Country",
    CLEAR: "Clear timezone",
    "SELECT-TIME-ZONE": "Select a Time Zone",
};

class TimeZoneStateless extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        countryLabel: PropTypes.string,
        displayValue: PropTypes.string,
        errorMessage: PropTypes.string,
        filterByCountry: PropTypes.string,
        helpClassName: PropTypes.string,
        labelHelpText: PropTypes.string,
        labelText: PropTypes.string,
        label: PropTypes.string,
        onValueChange: PropTypes.func,
        onZoneChange: PropTypes.func,
        onCountryChange: PropTypes.func,
        onSearch: PropTypes.func,
        setSearchString: PropTypes.func,
        setSelectedIndex: PropTypes.func,
        setOpen: PropTypes.func,
        onToggle: PropTypes.func,
        open: PropTypes.bool,
        searchString: PropTypes.string,
        selectCountryLabel: PropTypes.string.isRequired,
        selectLabel: PropTypes.string,
        selectedIndex: PropTypes.number,
        value: PropTypes.string,
        flags: flagsPropType,
    };

    static defaultProps = {
        clearLabel: LABEL_DEFAULTS.CLEAR,
        countryLabel: LABEL_DEFAULTS.COUNTRY,
        filterByCountry: undefined,
        onValueChange: _.noop,
        onZoneChange: _.noop,
        onCountryChange: _.noop,
        onSearch: _.noop,
        onToggle: _.noop,
        setSearchString: _.noop,
        setSelectedIndex: _.noop,
        setOpen: _.noop,
        open: false,
        selectCountryLabel: LABEL_DEFAULTS["SELECT-COUNTRY"],
        selectLabel: LABEL_DEFAULTS["SELECT-TIME-ZONE"],
        selectedIndex: 0,
        value: moment.tz.guess(),
        flags: [],
    };

    constructor(props) {
        super(props);

        this.zoneData = getZoneData();
        this.countryData = getCountryData();
    }

    _handleSearch = (searchString, selectedIndex = this.props.selectedIndex) => {
        this.props.onSearch(searchString, selectedIndex);
        this.props.setSearchString(searchString);
        this.props.setSelectedIndex(selectedIndex);
    }

    _clearSearchString = () => {
        this._handleSearch("");
    };

    _onCountryChange = (e) => {
        this._onValueChange("country", e.target.getAttribute("data-value"));
        this._killEvent(e);
    };

    _onZoneChange = (e) => {
        var index = e.target.getAttribute("data-index") || e.target.parentElement.getAttribute("data-index");
        this._onValueChange("zone", this._getZones()[index]);
        this._killEvent(e);
    };

    _onValueChange = (type, value) => {
        this.props.onValueChange(type, value);
        if (type === "country") {
            this.props.onCountryChange(value);
        } else if (type === "zone") {
            this.props.onZoneChange(value.name);
            this.props.setOpen(false);
        }
        this._handleSearch(this.props.searchString, 0);
    };

    _onGlobalClick = (e) => {
        if (!this.props.open) {
            return;
        }
        EventUtils.callIfOutsideOfContainer(
            ReactDOM.findDOMNode(this.refs["input-timezone"]),
            this.props.onToggle,
            e
        );
    };

    _onKeyDown = ({ keyCode }) => {
        let newIndex;
        const countries = this._getCountries();
        const zones = this._getZones();
        const {
            selectedIndex,
            filterByCountry,
            searchString,
        } = this.props;

        if (isEnter(keyCode)) {

            if (filterByCountry && zones[selectedIndex]) {
                this._onValueChange("zone", {
                    name: zones[selectedIndex].name,
                    offset: zones[selectedIndex].offset
                });

            } else if (countries[selectedIndex]) {
                this._onValueChange("country", countries[selectedIndex].abbr);
            }

        } else if (isArrowUp(keyCode)) {
            newIndex = selectedIndex - 1;
            newIndex = newIndex < 0 ? 0 : newIndex;

            if (newIndex !== selectedIndex) {
                this._handleSearch(searchString, newIndex);
            }

        } else if (isArrowDown(keyCode)) {
            const items = filterByCountry ? zones : countries;

            newIndex = selectedIndex + 1;
            newIndex = newIndex > items.length - 1
                ? items.length - 1 : newIndex;

            if (newIndex !== selectedIndex) {
                this._handleSearch(searchString, newIndex);
            }
        }
    };

    _killEvent = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    _onSearch = (value) => {
        this._handleSearch(value);
    };

    _renderCountries = () => {
        return ([
            <div className="label-text underlined" key="country-label">
                {this.props.selectCountryLabel}
            </div>,
            <div
                key="country-menu"
                ref="country-menu"
                className="button-menu__scroller"
                data-id={`${this.props["data-id"]}-tooltip-menu-options`}>
                {this._getCountries().map((country, i) => {
                    const rowCss = i === this.props.selectedIndex ? "button-menu__button--selected" : null;
                    return (
                        <button
                            data-value={country.abbr}
                            onClick={this._onCountryChange}
                            ref={"country-option-" + i}
                            key={"country-option-" + i}
                            className={classnames(
                                "button-menu__button button-menu__button button-menu__button--nopad",
                                rowCss
                            )}>
                            {country.name}
                        </button>
                    );
                })}
            </div>
        ]);
    };

    _getTimeForZone = tz => moment.tz(moment().utc(), tz.name).format("h:mm A");

    _renderZones = () => {
        return (
            <div>
                {zonesMetadata.countries[this.props.filterByCountry] && (
                    <div data-id="selected-country">
                        <div className="label-text underlined">
                            {this.props.countryLabel}:
                            <span className="input-timezone__selected-country">
                                {zonesMetadata.countries[this.props.filterByCountry].name}
                            </span>
                            <a
                                data-id={`${this.props["data-id"]}-clear-country`}
                                data-value=""
                                className="input-timezone__clear-country icon-clear"
                                onClick={this._onCountryChange}
                            />
                        </div>
                    </div>
                )}
                <div
                    className="button-menu__scroller"
                    ref="zone-menu"
                    data-id={`${this.props["data-id"]}-tooltip-menu-options`}>
                    {this._getZones().map((tz, i) => {
                        const rowCss = i === this.props.selectedIndex ? "button-menu__button--selected" : null;
                        return (
                            <button
                                data-index={i}
                                onClick={this._onZoneChange}
                                ref={"zone-option-" + i}
                                key={"zone-option-" + i}
                                className={classnames(
                                    "button-menu__button button-menu__button--nopad",
                                    rowCss
                                )}>
                                <span className="timezone-abbr">{tz.abbr}</span>
                                &nbsp;-&nbsp;
                                <span className="timezone-name">{getZoneNameDisplayValue(tz.name)}</span>
                                <span className="timezone-offset input-timezone__offset">
                                    {this._getTimeForZone(tz)}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    _renderLabel = () => {
        return (
            <CollapsibleLink
                data-id={`${this.props["data-id"]}-collapsible-link`}
                title={this.props.displayValue || getZoneNameDisplayValue(this.props.value) || this.props.selectLabel}
                expanded={this.props.open}
                onToggle={this.props.onToggle}
            />
        );
    }

    _getCountries = () => {
        const { searchString } = this.props || "";
        const { countryData } = this;

        let filteredCountries;

        if (searchString) {
            filteredCountries = countryData.filter(function (country) {
                return country.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1;
            });

        } else {
            filteredCountries = countryData;
        }
        return filteredCountries;
    };

    _getZones = () => {
        const { filterByCountry } = this.props;
        const { zoneData } = this;
        if (!filterByCountry || !zonesMetadata.countries[filterByCountry]) {
            return [];
        }

        const countryZoneNames = zonesMetadata.countries[filterByCountry].zones.reverse();

        let countryZones = zoneData.filter(function (zone) {
            return countryZoneNames.indexOf(zone.name) > -1;
        });
        countryZones = _.sortBy(countryZones, function (country) {
            return country.offset;
        });

        return countryZones;
    };

    _setListPosition = () => {
        if (!this.props.open) {
            return;
        }

        const updatedItem = this.props.filterByCountry ? "zone" : "country";
        const menuItem = ReactDOM.findDOMNode(this.refs[updatedItem + "-option-" + this.props.selectedIndex]);

        if (menuItem && menuItem.offsetTop) {
            const menu = ReactDOM.findDOMNode(this.refs[updatedItem + "-menu"]);
            menu.scrollTop = menuItem.offsetTop + 1; // add 1 for the border on each option
        }
    };

    _handleClear = () => {
        if (this.props.onClear) {
            this.props.onClear();
        }
        this.props.setOpen(false);
        this.props.onCountryChange("");
        this.props.onZoneChange("");
        this.props.setSearchString("");
    }

    isValidTimeZone = (zoneName) => isValidTimeZone(zoneName, this.zoneData);

    componentDidMount() {
        window.addEventListener("click", this._onGlobalClick);
    }

    componentWillUnmount() {
        window.removeEventListener("click", this._onGlobalClick);
    }

    componentDidUpdate() {
        if (this.props.open) {
            ReactDOM.findDOMNode(this.refs.searchString).focus();
        }
        this._setListPosition();
    }

    _focusSearch = () => this.refs.searchString.searchBoxFocus();

    render() {
        const classNames = {
            "form-error": !!this.props.errorMessage,
            "input-timezone--country-selected": !!this.props.filterByCountry
        };

        return (
            <FormLabel
                value={this.props.labelText || this.props.label}
                data-id={this.props["data-id"]}
                className={classnames("input-timezone", classNames, this.props.className)}
                hint={this.props.labelHelpText}
                helpClassName={this.props.helpClassName}
                ref="input-timezone"
            >

                <PopoverBase
                    data-id="tooltip-menu"
                    label={this._renderLabel()}
                    open={this.props.open}
                    placement="right"
                    padded
                    flags={this.props.flags}
                    popperClassName={classnames("input-timezone", classNames)}
                    onPopperClick={this._focusSearch}
                >
                    <div className="popover-search" onClick={this._killEvent}>
                        <FormSearchBox
                            className="input-timezone__search"
                            data-id={`${this.props["data-id"]}-search-input`}
                            queryString={this.props.searchString}
                            onValueChange={this._onSearch}
                            onKeyDown={this._onKeyDown}
                            onClear={this._clearSearchString}
                            ref="searchString"
                            autoFocus
                        />
                    </div>
                    {this.props.filterByCountry ? this._renderZones() : this._renderCountries()}
                    {(this.props.onClear || this.props.showClear) && this.props.value && (
                        <div className="button-menu__options">
                            <a className="button-menu__option-link" onClick={this._handleClear}>
                                {this.props.clearLabel}
                            </a>
                        </div>
                    )}
                </PopoverBase>
                {this.props.errorMessage && (
                    <FormError.Icon data-id={`${this.props["data-id"]}-error-message-icon`} />
                )}
                {this.props.errorMessage && (
                    <FormError.Message
                        value={this.props.errorMessage}
                        data-id={`${this.props["data-id"]}-error-message`}
                    />
                )}
            </FormLabel>
        );
    }
}

class TimeZoneStateful extends React.Component {
    state = {
        filterByCountry: this.props.filterByCountry,
        index: 0,
        open: this.props.open,
        searchString: this.props.searchString || "",
        value: this.props.value
    };

    _toggleMenu = () =>
        this.setState(({ open }) => ({
            open: !open
        }));

    _onSearch = (searchString, selectedIndex) => {
        this.setState({
            searchString: searchString,
            selectedIndex: selectedIndex
        });
    };

    _onValueChange = (type, value) => {
        let newState = {};

        if (type === "country") {
            newState.filterByCountry = value;
            newState.searchString = "";

        } else if (type === "zone") {
            newState.value = value.name;
            newState.offset = value.offset;
            newState.filterByCountry = undefined;
            newState.open = false;
        }

        this.setState(newState);
    };

    isValidTimeZone = (zoneText) => {
        return this.refs.TimeZoneStateless.isValidTimeZone(zoneText);
    };

    render() {
        var value = this.state.value || moment.tz.guess();
        var props = _.defaults({
            filterByCountry: this.state.filterByCountry,
            onToggle: this._toggleMenu,
            onSearch: this._onSearch,
            onValueChange: this._onValueChange,
            open: this.state.open,
            ref: "TimeZoneStateless",
            searchString: this.state.searchString,
            selectedIndex: this.state.selectedIndex,
            value: value,
            displayValue: this.props.displayValue || getZoneNameDisplayValue(value)
        }, this.props);

        return <TimeZoneStateless {...props} />;
    }
}

const PStatefulFormTimeZone = inStateContainer([
    {
        name: "filterByCountry",
        initial: "",
        setter: "onCountryChange",
    },
    {
        name: "open",
        initial: false,
        setter: "setOpen",
        callbacks: [{
            name: "onToggle",
            transform: toggleTransform,
        }],
    },
    {
        name: "searchString",
        initial: "",
        setter: "setSearchString",
    },
    {
        name: "selectedIndex",
        initial: 0,
        setter: "setSelectedIndex",
    },
    {
        name: "value",
        initial: moment.tz.guess(),
        setter: "onZoneChange",
    },
])(TimeZoneStateless);
PStatefulFormTimeZone.displayName = PStatefulFormTimeZone;

export default class FormTimeZone extends React.Component {

    static propTypes = {
        stateless: PropTypes.bool,
        flags: flagsPropType,
    };

    static defaultProps = {
        stateless: true,
        flags: [],
    };

    static _statelessComponent = TimeZoneStateless; // this is to enable testing

    static getZoneNameDisplayValue = getZoneNameDisplayValue;

    componentDidMount() {
        /* istanbul ignore if  */
        if (!Utils.isProduction() && this.props.controlled !== undefined) {
            /* istanbul ignore next  */
            throw new Error(Utils.deprecatePropError("controlled", "stateless"));
        }
        if (!this._usePStateful()) {
            cannonballProgressivelyStatefulWarning({ name: "FormTimeZone" });
        }
        if (!this.props.flags.includes("use-portal")) {
            cannonballPortalWarning({ name: "FormTimeZone" });
        }
    }

    _usePStateful = () => this.props.flags.findIndex(item => item === "p-stateful") >= 0;

    isValidTimeZone = (zoneText) => {
        if (this._usePStateful()) {
            return isValidTimeZone(zoneText);
        }

        return this.props.stateless
            ? this.refs.TimeZoneStateless.isValidTimeZone(zoneText)
            : this.refs.TimeZoneStateful.isValidTimeZone(zoneText);
    };

    render() {
        if (this._usePStateful()) {
            return <PStatefulFormTimeZone {...this.props} />;
        }

        return this.props.stateless
            ? <TimeZoneStateless {..._.defaults({ ref: "TimeZoneStateless" }, this.props)} />
            : <TimeZoneStateful {..._.defaults({ ref: "TimeZoneStateful" }, this.props)} />;
    }
}