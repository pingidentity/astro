window.__DEV__ = true;

jest.setMock("../../countryCodes", [
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

jest.dontMock("../v2.jsx");
jest.dontMock("../../CountryFlagList.jsx");
jest.dontMock("../../../form-text-field/index.js");
jest.dontMock("../../../form-text-field/v2.jsx");
jest.dontMock("../../../FormLabel.jsx");

describe("I18nPhoneInput", function () {
    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../../../testutil/TestUtils"),
        I18nPhoneInput = require("../v2.jsx"),
        _ = require("underscore");

    function getComponent (props) {
        props = _.defaults(props || {}, {
            onValueChange: jest.genMockFunction(),
            onToggle: jest.genMockFunction(),
            onCountrySearch: jest.genMockFunction()
        });

        return ReactTestUtils.renderIntoDocument(<I18nPhoneInput {...props} />);
    }

    it("renders the component", function () {
        var component = getComponent();

        var input = TestUtils.findRenderedDOMNodeWithDataId(component, "i18n-phone-input");

        expect(input).toBeTruthy();
    });

    it("stateless: renders the component", function () {
        var component = getComponent({
            controlled: true
        });

        var input = TestUtils.findRenderedDOMNodeWithDataId(component, "i18n-phone-input");

        expect(input).toBeTruthy();
    });

    it("shows error message", function () {
        var component = getComponent({
            "data-id": "phoneInput",
            dialCode: "1"
        });

        var phoneInput = TestUtils.findRenderedDOMNodeWithDataId(component, "phoneInput" + "-phoneNumber" + "-input");

        ReactTestUtils.Simulate.change(phoneInput, {
            target: {
                value: "abc def"
            }
        });

        var error = TestUtils.findRenderedDOMNodeWithDataId(component, "phoneInput-phoneNumber-error-message");

        expect(error.textContent).toEqual("Please enter a valid phone number.");
    });

    it("prepopulates phone number", function () {
        var phoneNumber = "123 456 7890";
        var inputId = "phoneInput";

        var component = getComponent({
            "data-id": inputId,
            phoneNumber: phoneNumber
        });

        var phoneInput = TestUtils.findRenderedDOMNodeWithDataId(component, inputId + "-phoneNumber" + "-input");

        expect(phoneInput.value).toEqual(phoneNumber);
    });

    it("updates callback on country select", function () {
        var component = getComponent();

        var flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-flag");
        var canada = TestUtils.findRenderedDOMNodeWithDataId(component, "country-ca");
        var afghanistan = TestUtils.findRenderedDOMNodeWithDataId(component, "country-af");

        ReactTestUtils.Simulate.click(flag);

        ReactTestUtils.Simulate.click(afghanistan);
        expect(component.props.onValueChange).toBeCalledWith({ dialCode: "93", phoneNumber: "" });

        ReactTestUtils.Simulate.click(flag);

        ReactTestUtils.Simulate.click(canada);
        expect(component.props.onValueChange).toBeCalledWith({ dialCode: "1", phoneNumber: "" });
    });

    it("handles clearing selected country", function () {
        var phoneNumber = "123 456 7890";

        var component = getComponent({
            countryCode: "us",
            phoneNumber: phoneNumber,
            open: true
        });

        var flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-flag");
        var flagInner = TestUtils.findRenderedDOMNodeWithClass(flag, "iti-flag");

        expect(flagInner.className).toContain("us");

        ReactTestUtils.Simulate.click(flag);

        var noCountry = TestUtils.findRenderedDOMNodeWithDataId(component, "no-country");

        ReactTestUtils.Simulate.click(noCountry);
        expect(component.props.onValueChange).toBeCalledWith({ dialCode: "", phoneNumber: phoneNumber });
    });

    it("triggers callback on phone number change", function () {
        var component = getComponent({
            "data-id": "phoneInput",
            dialCode: "1"
        });

        var phoneInput = TestUtils.findRenderedDOMNodeWithDataId(component, "phoneInput" + "-phoneNumber" + "-input");

        ReactTestUtils.Simulate.change(phoneInput, {
            target: {
                value: "111-222"
            }
        });

        expect(component.props.onValueChange).toBeCalledWith({ dialCode: "1", phoneNumber: "111-222" });
    });

    it("stateful: onToggle callback changes open/close state", function () {
        var component = getComponent(),
            componentRef = component.refs.I18nPhoneInputStateful;

        expect(componentRef.state.open).toBeFalsy();

        componentRef._handleToggle();

        expect(componentRef.state.open).toBeTruthy();
    });

    it("find and select country by typing", function () {
        var component = getComponent({
            open: true
        });
        var componentRef = component.refs.I18nPhoneInputStateful;

        var flag = TestUtils.findRenderedDOMNodeWithDataId(componentRef, "selected-flag");
        // enter can, validate still not selected, hit enter, validate Canada now selected
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 67 }); // c
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 65 }); // a
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 78 }); // n
        expect(componentRef.state.searchString).toBe("can");
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 13 }); // enter - select canada
        expect(component.props.onValueChange).toBeCalledWith({ dialCode: "1", phoneNumber: "" });
        // open flag, enter afg, hit enter, validate Afganistan now selected
        ReactTestUtils.Simulate.click(flag);
        expect(componentRef.state.searchString).toBe("");
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 65 }); // a
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 70 }); // f
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 71 }); // g
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 13 }); // enter - select afganistan
        expect(component.props.onValueChange).toBeCalledWith({ dialCode: "93", phoneNumber: "" });
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
        var componentRef = component.refs.I18nPhoneInputStateful;

        var flag = TestUtils.findRenderedDOMNodeWithDataId(componentRef, "selected-flag");

        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 67 }); // c
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 65 }); // a
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 78 }); // n
        expect(componentRef.state.searchString).toBe("can");
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 27 }); // esc
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 13 }); // enter - don't do anything because empty
        expect(componentRef.state.searchString).toBe("");
    });

    it("find and select country by typing empty with delay", function () {
        var component = getComponent({
            open: true
        });
        var componentRef = component.refs.I18nPhoneInputStateful;

        var flag = TestUtils.findRenderedDOMNodeWithDataId(componentRef, "selected-flag");

        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 67 }); // c
        componentRef.setState({ searchTime: (componentRef.state.searchTime - 2000) }); // simulate a 2 second wait
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 65 }); // a
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 70 }); // f
        expect(componentRef.state.searchString).toBe("af");
    });
});
