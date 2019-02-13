window.__DEV__ = true;

jest.setMock("../i18n/countryCodes", [
    {
        name: "Afghanistan (‫افغانستان‬‎)",
        iso2: "af",
        isoNum: "004",
        dialCode: "93",
        priority: 0,
        areaCodes: null
    },
    {
        name: "Canada",
        iso2: "ca",
        isoNum: "124",
        dialCode: "1",
        priority: 1,
        areaCodes: null
    },
    {
        name: "United States",
        iso2: "us",
        isoNum: "840",
        dialCode: "1",
        priority: 0,
        areaCodes: null
    }
]);

jest.dontMock("../i18n/I18nCountrySelector");
jest.dontMock("../i18n/CountryFlagList");
jest.dontMock("../FormDropDownList");
jest.dontMock("../FormError");
jest.dontMock("../form-text-field/index.js");
jest.dontMock("../form-text-field/v2");
jest.dontMock("../../../util/i18n/Translator.js");

describe("I18nCountrySelector", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        Utils = require("../../../util/Utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        I18nCountrySelector = require("../i18n/I18nCountrySelector"),
        _ = require("underscore");

    function getComponent (props) {
        props = _.defaults(props || {}, {
            onValueChange: jest.fn(),
            onToggle: jest.fn(),
            onSearch: jest.fn()
        });
        return ReactTestUtils.renderIntoDocument(<I18nCountrySelector {...props} />);
    }

    it("stateless: renders the component", function () {
        var component = getComponent({
            stateless: true
        });
        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "i18n-country-selector")).toBeTruthy();
    });

    it("statelful: renders the component", function () {
        var component = getComponent();
        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "i18n-country-selector")).toBeTruthy();
    });

    it("stateless: updates callback on country select", function () {
        var component = getComponent({
            open: true,
            stateless: true
        });
        var flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        var canada = TestUtils.findRenderedDOMNodeWithDataId(component, "country-ca");
        var afghanistan = TestUtils.findRenderedDOMNodeWithDataId(component, "country-af");

        ReactTestUtils.Simulate.click(flag);

        ReactTestUtils.Simulate.click(afghanistan);
        expect(component.props.onValueChange).toBeCalledWith("004");

        ReactTestUtils.Simulate.click(flag);

        ReactTestUtils.Simulate.click(canada);
        expect(component.props.onValueChange).toBeCalledWith("124");
    });

    it("stateful: updates callback on country select", function () {
        var component = getComponent({
            open: true
        });
        var flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        var canada = TestUtils.findRenderedDOMNodeWithDataId(component, "country-ca");
        var afghanistan = TestUtils.findRenderedDOMNodeWithDataId(component, "country-af");

        ReactTestUtils.Simulate.click(flag);

        ReactTestUtils.Simulate.click(afghanistan);
        expect(component.props.onValueChange).toBeCalledWith("004");

        ReactTestUtils.Simulate.click(flag);

        ReactTestUtils.Simulate.click(canada);
        expect(component.props.onValueChange).toBeCalledWith("124");
    });

    it("stateless: handles clearing selected country", function () {
        var component = getComponent({
            stateless: true,
            countryCode: "840",
            open: true
        });

        var flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        var flagInner = TestUtils.findRenderedDOMNodeWithClass(flag, "iti-flag");

        expect(flagInner.className).toContain("us");

        var noCountry = TestUtils.findRenderedDOMNodeWithDataId(component, "none-option");

        ReactTestUtils.Simulate.click(noCountry);
        expect(component.props.onValueChange).toBeCalledWith("");
    });

    it("stateful: handles clearing selected country", function () {
        var component = getComponent({
            countryCode: "840",
            open: true
        });

        var flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        var flagInner = TestUtils.findRenderedDOMNodeWithClass(flag, "iti-flag");

        expect(flagInner.className).toContain("us");

        var noCountry = TestUtils.findRenderedDOMNodeWithDataId(component, "none-option");

        ReactTestUtils.Simulate.click(noCountry);
        expect(component.props.onValueChange).toBeCalledWith("");
    });

    it("stateful: onToggle callback changes open/close state", function () {
        var component = getComponent();
        var componentRef = component.refs.I18nCountrySelectorStateful;

        expect(componentRef.state.open).toBe(false);
        componentRef._handleToggle();
        expect(componentRef.state.open).toBe(true);
    });

    it("find and select country by typing", function () {
        var component = getComponent({
            open: true
        });
        var componentRef = component.refs.I18nCountrySelectorStateful;

        var flag = TestUtils.findRenderedDOMNodeWithDataId(componentRef, "selected-option");
        // var currentCountryIso = componentRef.state.selected.iso2;
        // enter can, validate still not selected, hit enter, validate Canada now selected
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 67 }); // c
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 65 }); // a
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 78 }); // n
        expect(componentRef.state.searchString).toBe("can");
        // expect(componentRef.state.selected.iso2).toBe(currentCountryIso);
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 13 }); // enter - select canada
        expect(component.props.onValueChange).toBeCalledWith("124"); //canada
        // open flag, enter afg, hit enter, validate Afganistan now selected
        ReactTestUtils.Simulate.click(flag);
        expect(componentRef.state.searchString).toBe("");
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 65 }); // a
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 70 }); // f
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 71 }); // g
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 13 }); // enter - select afganistan
        expect(component.props.onValueChange).toBeCalledWith("004"); //afganistan
        // open flag, enter ag, validate that no country found
        ReactTestUtils.Simulate.click(flag);
        expect(componentRef.state.searchString).toBe("");
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 65 }); // a
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 71 }); // g
        expect(componentRef.state.searchString).toBe("");
    });

    it("find and select country by typing empty with esc", function () {
        var component = getComponent({
            open: true
        });
        var componentRef = component.refs.I18nCountrySelectorStateful;

        var flag = TestUtils.findRenderedDOMNodeWithDataId(componentRef, "selected-option");

        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 67 }); // c
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 65 }); // a
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 78 }); // n
        expect(componentRef.state.searchString).toBe("can");
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 27 }); // esc
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 13 }); // enter - don't do anything because empty
        expect(componentRef.state.searchString).toBe("");
    });

    it("stateless: triggers onSearch callback when typing and search string provided", function () {
        var component = getComponent({
            stateless: true,
            open: true,
            searchString: "",
            searchTime: 0
        });

        var flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 67 }); // c
        expect(component.props.onSearch).toBeCalled();
    });

    it("throws error when deprecated prop 'controlled' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("controlled", "stateless"));

        expect(function () {
            getComponent({ controlled: true });
        }).toThrow(expectedError);
    });

    it("throws error when deprecated prop 'onCountrySearch' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("onCountrySearch", "onSearch"));

        expect(function () {
            getComponent({ onCountrySearch: jest.fn() });
        }).toThrow(expectedError);
    });

});
