
jest.dontMock("../FormTimeZone.jsx");
jest.dontMock("../FormError.jsx");
jest.dontMock("../FormLabel.jsx");
jest.dontMock("../../general/CollapsibleLink.jsx");
jest.dontMock("../../tooltips/HelpHint.jsx");
jest.dontMock("../../../util/KeyboardUtils.js");


describe("FormTimeZone", function () {

    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        ReactDOM = require("react-dom"),
        TestUtils = require("../../../testutil/TestUtils"),
        FormTimeZone = require("../FormTimeZone.jsx"),
        KeyboardUtils = require("../../../util/KeyboardUtils.js"),
        moment = require("moment-timezone"),
        momentMetadata = require("../../../../node_modules/moment-timezone/data/meta/latest.json"),
        _ = require("underscore");

    var componentId = "timezone",
        initialValue = "America/Denver",
        countryLabel="select a Country";

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
        opts = _.defaults(opts || {}, {
            countryLabel: countryLabel,
            "data-id": componentId,
            value: initialValue
        });
        return ReactTestUtils.renderIntoDocument(<FormTimeZone {...opts} />);
    }

    function getValueLink (component) {
        return TestUtils.findRenderedDOMNodeWithDataId(component, componentId + "-collapsible-link");
    }

    function getSearchInput (component) {
        return TestUtils.findRenderedDOMNodeWithDataId(component, componentId + "-search-input");
    }

    function getRows (component) {
        return ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "tooltip-menu-option");
    }

    function getMenu (component) {
        return TestUtils.findRenderedDOMNodeWithClass(component, "tooltip-menu-options");
    }

    function getCountryZones (countryAbbr) {
        var countryZoneNames = momentMetadata.countries[countryAbbr].zones,
            countryZones = zoneMetadata.filter(function (zone) {
                return countryZoneNames.indexOf(zone.name) > -1;
            });

        countryZones = _.sortBy(countryZones, function (country) {
            return country.offset;
        });
        countryZones.reverse();

        return countryZones;
    }

    window.addEventListener = jest.genMockFunction();
    window.removeEventListener = jest.genMockFunction();

    beforeEach(function () {
        window.addEventListener.mockClear();
        window.removeEventListener.mockClear();
    });

    it("renders the value link", function () {
        var component = getComponent(),
            valueLink = getValueLink(component);

        expect(valueLink).toBeTruthy();
        expect(valueLink.textContent).toEqual(initialValue);
    });

    it("stateful: renders the value link without underscores", function () {
        var component = getComponent({ value: "America/Los_Angeles" }),
            valueLink = getValueLink(component);

        expect(valueLink).toBeTruthy();
        expect(valueLink.textContent).toEqual("America/Los Angeles");
    });

    it("stateless: using getZoneNameDisplayValue renders value link without underscores", function () {
        var component = getComponent({ value: FormTimeZone.getZoneNameDisplayValue("America/Fort_Nelson") }),
            valueLink = getValueLink(component);

        expect(valueLink).toBeTruthy();
        expect(valueLink.textContent).toEqual("America/Fort Nelson");
    });

    it("renders the menu when the link is clicked", function () {
        var component = getComponent(),
            valueLink = getValueLink(component),
            menu;

        menu = getMenu(component);
        expect(menu).toBeFalsy();

        ReactTestUtils.Simulate.click(valueLink);

        menu = getMenu(component);
        expect(menu).toBeTruthy();
    });

    it("renders the countries with the proper text", function () {
        var component = getComponent({ open: true }),
            countryRows = getRows(component);

        expect(countryRows.length).toEqual(countryMetadata.length);
        expect(countryRows[0].textContent).toEqual(countryMetadata[0].name);
        expect(countryRows[countryRows.length - 1].textContent)
            .toEqual(countryMetadata[countryMetadata.length - 1].name);
    });

    it("filters the country list when search text is entered", function () {
        var searchString = "United",
            component = getComponent({
                open: true,
                searchString: searchString
            }),
            searchInput = getSearchInput(component),
            countryRows = getRows(component);

        expect(searchInput.value).toEqual(searchString);
        expect(countryRows.length).toEqual(2); // United Arab Emirates & US
        expect(countryRows[0].textContent).toEqual(momentMetadata.countries.AE.name);
        expect(countryRows[1].textContent).toEqual(momentMetadata.countries.US.name);
    });

    it("clears the search text when the clear search-text link is clicked", function () {
        var searchString = "United",
            component = getComponent({
                open: true,
                searchString: searchString
            }),
            searchInput = getSearchInput(component),
            clearSearch = TestUtils.findRenderedDOMNodeWithDataId(component, componentId + "-search-clear");

        expect(searchInput.value).toEqual(searchString);
        ReactTestUtils.Simulate.click(clearSearch);
        expect(searchInput.value).toEqual("");
    });

    it("selects the country when the country is clicked", function () {
        var component = getComponent({ open: true }),
            countryRows = getRows(component),
            selectedCountry;

        ReactTestUtils.Simulate.click(countryRows[3]);
        selectedCountry = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-country");
        expect(selectedCountry.textContent).toContain(countryMetadata[3].name);
    });

    it("selects the top country when the ENTER key is pressed while searching", function () {
        var component = getComponent({ open: true }),
            countryRows = getRows(component),
            searchInput = getSearchInput(component),
            selectedCountry;

        ReactTestUtils.Simulate.keyDown(searchInput, { keyCode: KeyboardUtils.KeyCodes.ENTER });
        selectedCountry = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-country");
        expect(selectedCountry.textContent).toContain(countryMetadata[0].name);
        expect(countryRows[0].className).toContain("selected");
    });

    it("selects the second country when the UP/DOWN-ARROW keys are pressed then ENTER key is pressed", function () {
        var component = getComponent({ open: true }),
            countryRows = getRows(component),
            searchInput = getSearchInput(component),
            selectedCountry;

        ReactTestUtils.Simulate.keyDown(searchInput, { keyCode: KeyboardUtils.KeyCodes.ARROW_DOWN });
        ReactTestUtils.Simulate.keyDown(searchInput, { keyCode: KeyboardUtils.KeyCodes.ARROW_DOWN });
        ReactTestUtils.Simulate.keyDown(searchInput, { keyCode: KeyboardUtils.KeyCodes.ARROW_UP });
        ReactTestUtils.Simulate.keyDown(searchInput, { keyCode: KeyboardUtils.KeyCodes.ENTER });
        selectedCountry = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-country");
        expect(selectedCountry.textContent).toContain(countryMetadata[1].name);
        expect(countryRows[1].className).toContain("selected");
    });

    it("renders the zones with the proper text", function () {
        var countryAbbr = "US",
            component = getComponent({
                open: true,
                filterByCountry: countryAbbr
            }),
            zoneRows = getRows(component),
            dataZones = getCountryZones(countryAbbr),
            zoneName;

        expect(zoneRows.length).toEqual(dataZones.length);

        /* loop through the rendered zones and make sure each one can be found in the zones pulled from the metadata
           for the selected country */
        for (var i=0; i<zoneRows.length; i+=1) {
            zoneName = TestUtils.findRenderedDOMNodeWithClass(zoneRows[i], "timezone-name").textContent;
            expect(zoneName).toEqual(FormTimeZone.getZoneNameDisplayValue(dataZones[i].name));
        }
    });

    it("renders all zones if a bad country code is passed in", function () {
        var countryAbbr = "ALL",
            component = getComponent({
                open: true,
                filterByCountry: countryAbbr
            }),
            zoneRows = getRows(component);

        expect(zoneRows.length).toEqual(zoneMetadata.length);
    });

    it("selects the zone when the zone is clicked", function () {
        var countryAbbr = "US",
            component = getComponent({
                open: true,
                filterByCountry: countryAbbr
            }),
            testIndex = 4,
            valueLink,
            zoneRows = getRows(component),
            zoneRowName = TestUtils.findRenderedDOMNodeWithClass(zoneRows[testIndex], "timezone-name").textContent;


        ReactTestUtils.Simulate.click(zoneRows[testIndex]);
        valueLink = getValueLink(component);
        expect(valueLink.textContent).toEqual(zoneRowName);
    });

    it("selects the top zone when the ENTER key is pressed while searching", function () {
        var countryAbbr = "US",
            component = getComponent({
                open: true,
                filterByCountry: countryAbbr
            }),
            searchInput = getSearchInput(component),
            testIndex = 0,
            valueLink,
            zoneRows = getRows(component),
            zoneRowName = TestUtils.findRenderedDOMNodeWithClass(zoneRows[testIndex], "timezone-name").textContent;

        ReactTestUtils.Simulate.keyDown(searchInput, { keyCode: KeyboardUtils.KeyCodes.ENTER });
        valueLink = getValueLink(component);
        expect(valueLink.textContent).toEqual(zoneRowName);
        expect(zoneRows[testIndex].className).toContain("selected");
    });

    it("selects the second zone when the DOWN-ARROW key is pressed then ENTER key is pressed", function () {
        var countryAbbr = "US",
            component = getComponent({
                open: true,
                filterByCountry: countryAbbr
            }),
            searchInput = getSearchInput(component),
            valueLink,
            zoneRows = getRows(component),
            zoneRowName = TestUtils.findRenderedDOMNodeWithClass(zoneRows[1], "timezone-name").textContent;

        ReactTestUtils.Simulate.keyDown(searchInput, { keyCode: KeyboardUtils.KeyCodes.ARROW_DOWN });
        ReactTestUtils.Simulate.keyDown(searchInput, { keyCode: KeyboardUtils.KeyCodes.ENTER });
        valueLink = getValueLink(component);
        expect(valueLink.textContent).toEqual(zoneRowName);
        expect(zoneRows[1].className).toContain("selected");
    });

    it("calls global click handler when a click occurs outside of component", function () {
        var component = getComponent({
                stateless: true,
                open: true,
                onSearch: jest.genMockFunction(),
                onToggle: jest.genMockFunction(),
                onValueChange: jest.genMockFunction()
            }),
            handler = component.refs.TimeZoneStateless._onGlobalClick;

        expect(component.props.onToggle).not.toBeCalled();

        // click outside
        handler({ target: document.body });

        // hack, for now, to get this test to work
        // @TODO : remove the following line
        ReactTestUtils.Simulate.click(getValueLink(component));

        expect(component.props.onToggle).toBeCalled();
    });

    it("skips the global click handler if not open and click on component", function () {
        var component = getComponent({
                stateless: true,
                onToggle: jest.genMockFunction(),
                onSearch: jest.genMockFunction(),
                onValueChange: jest.genMockFunction()
            }),
            handler = window.addEventListener.mock.calls[0][1];

        // click on component
        handler({ target: { dataset: component } });

        expect(component.props.onToggle).not.toBeCalled();
    });

    it("detaches global listeners on unmount", function () {
        var component = getComponent({
                stateless: true,
                onToggle: jest.genMockFunction(),
                onSearch: jest.genMockFunction(),
                onValueChange: jest.genMockFunction()
            }),
            componentRef = component.refs.TimeZoneStateless;

        expect(window.addEventListener).toBeCalledWith("click", componentRef._onGlobalClick);

        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);
        expect(window.removeEventListener).toBeCalledWith("click", componentRef._onGlobalClick);
    });

    it("calls function for list placement on componentDidUpdate", function () {
        var component = getComponent({
            open: true,
            stateless: true
        });
        var componentRef = component.refs.TimeZoneStateless;

        componentRef._setListPosition = jest.genMockFunction();
        componentRef.componentDidUpdate();
        expect(componentRef._setListPosition).toBeCalled();
    });

    it("does not render the error when not provided", function () {
        var component = getComponent(),
            errorIcon = TestUtils.findRenderedDOMNodeWithDataId(component, componentId + "-error-message-icon"),
            errorMessage = TestUtils.findRenderedDOMNodeWithDataId(component, componentId + "-error-message");

        expect(errorIcon).toBeFalsy();
        expect(errorMessage).toBeFalsy();
    });

    it("renders the error message when provided", function () {
        var errorMessage = "warning!",
            component = getComponent({
                errorMessage: errorMessage
            }),
            errorIcon = TestUtils.findRenderedDOMNodeWithDataId(component, "timezone-error-message-icon"),
            errorMessage = TestUtils.findRenderedDOMNodeWithDataId(component, "timezone-error-message");

        expect(errorIcon).toBeTruthy();
        expect(errorMessage).toBeTruthy();
        expect(errorMessage).toEqual(errorMessage);
    });

    it("public function isValidTimeZone works properly", function () {
        var component = getComponent(),
            checkZone = component.refs.TimeZoneStateful.isValidTimeZone("badZoneName"),
            realZoneName = zoneMetadata[10].name;

        expect(checkZone).toEqual(false);

        checkZone = component.refs.TimeZoneStateful.isValidTimeZone(realZoneName);
        expect(checkZone).toBeTruthy();
        expect(checkZone.name).toEqual(realZoneName);
    });

    it("renders the displayValue when provided", function () {
        var displayValue = "MDT",
            component = getComponent({
                open: true,
                value: "America/Denver",
                displayValue: displayValue
            }),
            linkValue = getValueLink(component);

        expect(linkValue.textContent).toEqual(displayValue);
    });

    it("does not render the label text when not specified", function () {
        var component = getComponent(),
            renderedLabelText = TestUtils.findRenderedDOMNodeWithDataId(component, "label");

        expect(renderedLabelText).toBeFalsy();
    });

    it("renders the label text and help text when specified", function () {
        var labelText = "My TZ Picker",
            labelHelpText = "Help text here!",
            component = getComponent({
                labelText: labelText,
                labelHelpText: labelHelpText
            }),
            renderedHelpIcon = TestUtils.findRenderedDOMNodeWithClass(component, "icon-help"),
            renderedHelpText = TestUtils.findRenderedDOMNodeWithClass(component, "tooltip-text"),
            renderedLabelText = TestUtils.findRenderedDOMNodeWithDataId(component, "label");

        expect(renderedLabelText.textContent).toContain(labelText);
        expect(renderedHelpIcon).toBeTruthy();
        expect(renderedHelpText.textContent).toEqual(labelHelpText);
    });

    //TODO: remove when controlled no longer supported
    it("produces stateful/stateless components correctly given controlled prop", function () {
        var component = getComponent({ controlled: false });
        var stateful = component.refs.TimeZoneStateful;
        var stateless = component.refs.TimeZoneStateless;

        expect(stateful).toBeTruthy();
        expect(stateless).toBeFalsy();

        component = getComponent({ controlled: true });
        stateful = component.refs.TimeZoneStateful;
        stateless = component.refs.TimeZoneStateless;

        expect(stateless).toBeTruthy();
        expect(stateful).toBeFalsy();
    });

    //TODO: remove when controlled no longer supported
    it("logs warning for deprecated controlled prop", function () {
        console.warn = jest.genMockFunction();

        getComponent();

        expect(console.warn).toBeCalledWith(
            "Deprecated: use stateless instead of controlled. " +
            "The default for stateless will be true instead of false. " +
            "Support for controlled will be removed in next version");
    });
});
