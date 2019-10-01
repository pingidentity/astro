window.__DEV__ = true;

jest.mock("popper.js");
jest.mock("react-portal");

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
        TestUtils = require("../../../testutil/TestUtils"),
        I18nCountrySelector = require("../i18n/I18nCountrySelector"),
        _ = require("underscore");

    function getComponent (props) {
        props = _.defaults(props || {}, {
            onValueChange: jest.fn(),
            onToggle: jest.fn(),
            onSearch: jest.fn()
        });
        return TestUtils.renderInWrapper(<I18nCountrySelector {...props} />);
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
        expect(component.props.children.props.onValueChange).toBeCalledWith("004");

        ReactTestUtils.Simulate.click(flag);

        ReactTestUtils.Simulate.click(canada);
        expect(component.props.children.props.onValueChange).toBeCalledWith("124");
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
        expect(component.props.children.props.onValueChange).toBeCalledWith("004");

        ReactTestUtils.Simulate.click(flag);

        ReactTestUtils.Simulate.click(canada);
        expect(component.props.children.props.onValueChange).toBeCalledWith("124");
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
        expect(component.props.children.props.onValueChange).toBeCalledWith("");
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
        expect(component.props.children.props.onValueChange).toBeCalledWith("");
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
        expect(component.props.children.props.onSearch).toBeCalled();
    });

});
