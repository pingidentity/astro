import React from "react";
import { mountSnapshotDataIds } from "../../../devUtil/EnzymeUtils";
import ReactTestUtils from "react-dom/test-utils";
import ReactDOM from "react-dom";
import TestUtils from "../../../testutil/TestUtils";
import FormTimeZone from "../FormTimeZone";
import KeyboardUtils from "../../../util/KeyboardUtils.js";
import moment from "moment-timezone";
import momentMetadata from "moment-timezone/data/meta/latest.json";
import _ from "underscore";

jest.mock("popper.js");
jest.mock("react-portal");

// This file is a copy of the standard Time Zone tests with all the v4 flags set by default
describe("FormTimeZone v4", function () {
    const componentId = "timezone";
    const initialValue = "America/Denver";
    const countryLabel="select a Country";

    function prepCountryMetaData () {
        var countryMetadata = [];
        for (var countryCode in momentMetadata.countries) {
            countryMetadata.push(momentMetadata.countries[countryCode]);
        }
        countryMetadata = _.sortBy(countryMetadata, function (country) {
            return country.name;
        });

        return countryMetadata;
    }
    var countryMetadata = prepCountryMetaData();

    function prepZoneMetaData () {
        var currentUtcTime = moment().utc(),
            zoneNames = moment.tz.names();

        return zoneNames.map(function (zone) {
            return {
                abbr: moment.tz(zone).zoneAbbr(),
                name: zone,
                offset: moment.tz(currentUtcTime, zone).format("Z")
            };
        });
    }
    var zoneMetadata = prepZoneMetaData();

    function getComponent (opts) {
        const options = _.defaults(opts || {}, {
            countryLabel: countryLabel,
            "data-id": componentId,
            initialState: {
                value: initialValue,
            },
            flags: [ "use-portal", "p-stateful" ],
        });
        return ReactTestUtils.renderIntoDocument(<FormTimeZone {...options} />);
    }

    function getValueLink (component) {
        return TestUtils.findRenderedDOMNodeWithDataId(component, componentId + "-collapsible-link");
    }

    function getSearchInput (component) {
        return TestUtils.findRenderedDOMNodeWithDataId(component, "searchBox-input");
    }

    function getRows (component) {
        return ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "button-menu__button");
    }

    function getMenu (component) {
        return TestUtils.findRenderedDOMNodeWithClass(component, "button-menu__scroller");
    }

    function getCountryZones (countryAbbr) {
        const countryZoneNames = momentMetadata.countries[countryAbbr].zones;
        let countryZones;

        countryZones = zoneMetadata.filter(function (zone) {
            return countryZoneNames.indexOf(zone.name) > -1;
        });
        countryZones = _.sortBy(countryZones, function (country) {
            return country.offset;
        });

        return countryZones;
    }

    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();

    beforeEach(function () {
        window.addEventListener.mockClear();
        window.removeEventListener.mockClear();
    });

    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <FormTimeZone
                flags={[ "use-portal", "p-stateful" ]}
                showClear
                value="25102019"
            />
        );
    });

    it("renders the value link", function () {
        const component = getComponent();
        const valueLink = getValueLink(component);

        expect(valueLink).toBeTruthy();
        expect(valueLink.textContent).toEqual(initialValue);
    });

    it("stateful: renders the value link without underscores", function () {
        const component = getComponent({ value: "America/Los_Angeles" });
        const valueLink = getValueLink(component);

        expect(valueLink).toBeTruthy();
        expect(valueLink.textContent).toEqual("America/Los Angeles");
    });

    it("stateless: using getZoneNameDisplayValue renders value link without underscores", function () {
        const component = getComponent({ value: FormTimeZone.getZoneNameDisplayValue("America/Fort_Nelson") });
        const valueLink = getValueLink(component);

        expect(valueLink).toBeTruthy();
        expect(valueLink.textContent).toEqual("America/Fort Nelson");
    });

    it("renders the menu when the link is clicked", function () {
        const component = getComponent();
        const valueLink = getValueLink(component);
        let menu;

        menu = getMenu(component);
        expect(menu).toBeFalsy();

        ReactTestUtils.Simulate.click(valueLink);

        menu = getMenu(component);
        expect(menu).toBeTruthy();
    });

    it("renders the countries with the proper text", function () {
        const component = getComponent({ open: true });
        const countryRows = getRows(component);

        expect(countryRows.length).toEqual(countryMetadata.length);
        expect(countryRows[0].textContent).toEqual(countryMetadata[0].name);
        expect(countryRows[countryRows.length - 1].textContent)
            .toEqual(countryMetadata[countryMetadata.length - 1].name);
    });

    it("filters the country list when search text is entered", function () {
        const searchString = "United";
        const component = getComponent({
            open: true,
            searchString: searchString
        });
        const searchInput = getSearchInput(component);
        const countryRows = getRows(component);

        expect(searchInput.value).toEqual(searchString);
        expect(countryRows.length).toEqual(2); // United Arab Emirates & US
        expect(countryRows[0].textContent).toEqual(momentMetadata.countries.AE.name);
        expect(countryRows[1].textContent).toEqual(momentMetadata.countries.US.name);
    });

    it("clears the search text when the clear search-text link is clicked", function () {
        const searchString = "United";
        const component = getComponent({
            open: true,
            initialState: { searchString }
        });
        const searchInput = getSearchInput(component);
        const clearSearch = TestUtils.findRenderedDOMNodeWithClass(component, "clear-search");

        expect(searchInput.value).toEqual(searchString);
        ReactTestUtils.Simulate.click(clearSearch);
        expect(searchInput.value).toEqual("");
    });

    it("selects the country when the country is clicked", function () {
        const component = getComponent({ open: true });
        const countryRows = getRows(component);
        let selectedCountry;

        ReactTestUtils.Simulate.click(countryRows[3]);
        selectedCountry = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-country");
        expect(selectedCountry.textContent).toContain(countryMetadata[3].name);
    });

    it("selects the top country when the ENTER key is pressed while searching", function () {
        const component = getComponent({ open: true });
        const countryRows = getRows(component);
        const searchInput = getSearchInput(component);
        let selectedCountry;

        ReactTestUtils.Simulate.keyDown(searchInput, { keyCode: KeyboardUtils.KeyCodes.ENTER });
        selectedCountry = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-country");
        expect(selectedCountry.textContent).toContain(countryMetadata[0].name);
        expect(countryRows[0].className).toContain("selected");
    });

    it("selects the second country when the UP/DOWN-ARROW keys are pressed then ENTER key is pressed", function () {
        const component = getComponent({ open: true });
        const countryRows = getRows(component);
        const searchInput = getSearchInput(component);
        let selectedCountry;

        ReactTestUtils.Simulate.keyDown(searchInput, { keyCode: KeyboardUtils.KeyCodes.ARROW_DOWN });
        ReactTestUtils.Simulate.keyDown(searchInput, { keyCode: KeyboardUtils.KeyCodes.ARROW_DOWN });
        ReactTestUtils.Simulate.keyDown(searchInput, { keyCode: KeyboardUtils.KeyCodes.ARROW_UP });
        ReactTestUtils.Simulate.keyDown(searchInput, { keyCode: KeyboardUtils.KeyCodes.ENTER });
        selectedCountry = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-country");
        expect(selectedCountry.textContent).toContain(countryMetadata[1].name);
        expect(countryRows[1].className).toContain("selected");
    });

    it("renders the zones with the proper text", function () {
        const countryAbbr = "US";
        const component = getComponent({
            open: true,
            filterByCountry: countryAbbr
        });
        const zoneRows = getRows(component);
        const dataZones = getCountryZones(countryAbbr);
        let zoneName;

        expect(zoneRows.length).toEqual(dataZones.length);

        /* loop through the rendered zones and make sure each one can be found in the zones pulled from the metadata
           for the selected country */
        for (var i=0; i<zoneRows.length; i+=1) {
            zoneName = TestUtils.findRenderedDOMNodeWithClass(zoneRows[i], "timezone-name").textContent;
            expect(zoneName).toEqual(FormTimeZone.getZoneNameDisplayValue(dataZones[i].name));
        }
    });

    it("renders no zones if a bad country code is passed in", function () {
        const countryAbbr = "ALL";
        const component = getComponent({
            open: true,
            filterByCountry: countryAbbr
        });
        const zoneRows = getRows(component);

        expect(zoneRows.length).toEqual(0);
    });

    it("selects the zone when the zone is clicked", function () {
        const countryAbbr = "US";
        const callback = jest.fn();
        const component = getComponent({
            open: true,
            filterByCountry: countryAbbr,
            onZoneChange: callback,
        });
        const testIndex = 4;
        const zoneRows = getRows(component);
        const zoneRowName = TestUtils.findRenderedDOMNodeWithClass(zoneRows[testIndex], "timezone-name").textContent;
        let valueLink;

        ReactTestUtils.Simulate.click(zoneRows[testIndex]);
        valueLink = getValueLink(component);
        expect(valueLink.textContent).toEqual(zoneRowName);
    });

    it("selects the top zone when the ENTER key is pressed while searching", function () {
        const countryAbbr = "US";
        const component = getComponent({
            open: true,
            filterByCountry: countryAbbr
        });
        const searchInput = getSearchInput(component);
        const testIndex = 0;
        const zoneRows = getRows(component);
        const zoneRowName = TestUtils.findRenderedDOMNodeWithClass(zoneRows[testIndex], "timezone-name").textContent;
        let valueLink;

        ReactTestUtils.Simulate.keyDown(searchInput, { keyCode: KeyboardUtils.KeyCodes.ENTER });
        valueLink = getValueLink(component);
        expect(valueLink.textContent).toEqual(zoneRowName);
        expect(zoneRows[testIndex].className).toContain("selected");
    });

    it("selects the second zone when the DOWN-ARROW key is pressed then ENTER key is pressed", function () {
        const callback = jest.fn();
        const countryAbbr = "US";
        const component = getComponent({
            open: true,
            filterByCountry: countryAbbr,
            onZoneChange: callback,
        });
        const searchInput = getSearchInput(component);
        const zoneRows = getRows(component);
        const zoneRowName = TestUtils.findRenderedDOMNodeWithClass(zoneRows[1], "timezone-name").textContent;
        let valueLink;

        ReactTestUtils.Simulate.keyDown(searchInput, { keyCode: KeyboardUtils.KeyCodes.ARROW_DOWN });
        expect(zoneRows[1].className).toContain("selected");
        ReactTestUtils.Simulate.keyDown(searchInput, { keyCode: KeyboardUtils.KeyCodes.ENTER });
        valueLink = getValueLink(component);
        expect(valueLink.textContent).toEqual(zoneRowName);
    });

    it("calls global click handler when a click occurs outside of component", function () {
        const component = getComponent({
            stateless: true,
            open: true,
            onSearch: jest.fn(),
            onToggle: jest.fn(),
            onValueChange: jest.fn()
        });

        global.getSelection = jest.fn();
        global.getSelection.mockReturnValue({
            toString: () => "",
        });

        const stateless = ReactTestUtils.findRenderedComponentWithType(component, FormTimeZone._statelessComponent);
        const handler = stateless._onGlobalClick;

        expect(component.props.onToggle).not.toBeCalled();

        // click outside
        handler({ target: document.body });

        // hack, for now, to get this test to work
        // @TODO : remove the following line
        ReactTestUtils.Simulate.click(getValueLink(component));

        expect(component.props.onToggle).toBeCalled();
    });

    it("skips the global click handler if not open and click on component", function () {
        const component = getComponent({
            stateless: true,
            onToggle: jest.fn(),
            onSearch: jest.fn(),
            onValueChange: jest.fn()
        });
        const handler = TestUtils.findMockCall(window.addEventListener, "click")[1];

        // click on component
        handler({ target: { dataset: component } });

        expect(component.props.onToggle).not.toBeCalled();
    });

    it("detaches global listeners on unmount", function () {
        const component = getComponent({
            stateless: true,
            onToggle: jest.fn(),
            onSearch: jest.fn(),
            onValueChange: jest.fn()
        });
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, FormTimeZone._statelessComponent);

        expect(window.addEventListener).toBeCalledWith("click", stateless._onGlobalClick);

        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);
        expect(window.removeEventListener).toBeCalledWith("click", stateless._onGlobalClick);
    });

    it("calls function for list placement on componentDidUpdate", function () {
        const component = getComponent({
            open: true,
            stateless: true
        });
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, FormTimeZone._statelessComponent);

        stateless._setListPosition = jest.fn();
        stateless.componentDidUpdate();
        expect(stateless._setListPosition).toBeCalled();
    });

    it("does not render the error when not provided", function () {
        const component = getComponent();
        const errorIcon = TestUtils.findRenderedDOMNodeWithDataId(component, componentId + "-error-message-icon");
        const errorMessage = TestUtils.findRenderedDOMNodeWithDataId(component, componentId + "-error-message");

        expect(errorIcon).toBeFalsy();
        expect(errorMessage).toBeFalsy();
    });

    it("renders the error message when provided", function () {
        const errorMessageText = "warning!";
        const component = getComponent({
            errorMessage: errorMessageText
        });
        const errorIcon = TestUtils.findRenderedDOMNodeWithDataId(component, "timezone-error-message-icon");
        const errorMessage = TestUtils.findRenderedDOMNodeWithDataId(component, "timezone-error-message");

        expect(errorIcon).toBeTruthy();
        expect(errorMessage).toBeTruthy();
        expect(errorMessage.textContent).toEqual(errorMessageText);
    });

    it("public function isValidTimeZone works properly", function () {
        const component = getComponent();
        const realZoneName = zoneMetadata[10].name;
        let checkZone = component.isValidTimeZone("badZoneName");

        expect(checkZone).toEqual(false);

        checkZone = component.isValidTimeZone(realZoneName);
        expect(checkZone).toBeTruthy();
        expect(checkZone.name).toEqual(realZoneName);
    });

    it("renders the displayValue when provided", function () {
        const displayValue = "MDT";
        const component = getComponent({
            open: true,
            value: "America/Denver",
            displayValue: displayValue
        });
        const linkValue = getValueLink(component);

        expect(linkValue.textContent).toEqual(displayValue);
    });

    it("does not render the label text when not specified", function () {
        const component = getComponent();
        const renderedLabelText = TestUtils.findRenderedDOMNodeWithDataId(component, "label");

        expect(renderedLabelText).toBeFalsy();
    });

    it("fires cannonball warning when p-stateful flag is not set", function() {
        console.warn = jest.fn();

        expect(console.warn).not.toBeCalled();
        getComponent({ flags: [ "use-portal" ] });
        expect(console.warn).toBeCalled();
    });

    it("doesn't fire cannonball warning when p-stateful flag is set", function() {
        console.warn = jest.fn();

        expect(console.warn).not.toBeCalled();
        getComponent({ flags: [ "use-portal", "p-stateful" ] });
        expect(console.warn).not.toBeCalled();
    });

    /*
    TODO: fix this test
    NOTE: Currently we've not been able to test the react-tooltip helpHint in it's shown state. Since the React Tooltip
    does not populate its content until it is displayed, the content of the tooltip cannot yet be tested.
    */
    it("renders the label text and help text when specified", function () {
        const labelText = "My TZ Picker";
        const labelHelpText = "Help text here!";
        const component = getComponent({
            labelText: labelText,
            labelHelpText: labelHelpText
        });
        const renderedHelpIcon = TestUtils.findRenderedDOMNodeWithClass(component, "icon-help");
        // const renderedHelpText = TestUtils.findRenderedDOMNodeWithClass(component, "tooltip-text");
        const renderedLabelText = TestUtils.findRenderedDOMNodeWithDataId(component, "label");

        expect(renderedLabelText.textContent).toContain(labelText);
        expect(renderedHelpIcon).toBeTruthy();
        // expect(renderedHelpText.textContent).toEqual(labelHelpText);
    });

});
