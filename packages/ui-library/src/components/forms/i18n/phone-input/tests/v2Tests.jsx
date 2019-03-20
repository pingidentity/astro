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

jest.dontMock("../v2");
jest.dontMock("../../CountryFlagList");
jest.dontMock("../../../FormError");
jest.dontMock("../../../FormLabel");
jest.dontMock("../../../FormDropDownList");
jest.dontMock("../../../form-text-field/index.js");
jest.dontMock("../../../form-text-field/v2");
jest.dontMock("../../../../../util/i18n/Translator.js");
jest.dontMock("../../../../../util/Utils");

describe("I18nPhoneInput", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        Utils = require("../../../../../util/Utils"),
        TestUtils = require("../../../../../testutil/TestUtils"),
        I18nPhoneInput = require("../v2");

    function getComponent ({
        onSearch = jest.fn(),
        onToggle = jest.fn(),
        onValueChange = jest.fn(),
        ...props
    } = {}) {
        return ReactTestUtils.renderIntoDocument(
            <I18nPhoneInput
                onSearch={onSearch}
                onToggle={onToggle}
                onValueChange={onValueChange}
                {...props}
            />
        );
    }

    it("renders the component", function () {
        var component = getComponent();

        var input = TestUtils.findRenderedDOMNodeWithDataId(component, "i18n-phone-input");

        expect(input).toBeTruthy();
    });

    it("stateless: renders the component", function () {
        var component = getComponent({
            stateless: true
        });

        var input = TestUtils.findRenderedDOMNodeWithDataId(component, "i18n-phone-input");

        expect(input).toBeTruthy();
    });

    it("shows error message", function () {
        var dataId = "phoneInput",
            component = getComponent({
                "data-id": "phoneInput",
                dialCode: "1",
                phoneNumber: "asdf"
            });

        var error = TestUtils.findRenderedDOMNodeWithDataId(component, dataId + "-phoneNumber-error-message");
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
        var component = getComponent({
            open: true
        });

        var flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        var canada = TestUtils.findRenderedDOMNodeWithDataId(component, "country-ca");
        var afghanistan = TestUtils.findRenderedDOMNodeWithDataId(component, "country-af");

        ReactTestUtils.Simulate.click(flag);

        ReactTestUtils.Simulate.click(afghanistan);
        expect(component.props.onValueChange).toBeCalledWith({ countryCode: "af", dialCode: "93", phoneNumber: "" });

        ReactTestUtils.Simulate.click(flag);

        ReactTestUtils.Simulate.click(canada);
        expect(component.props.onValueChange).toBeCalledWith({ countryCode: "ca", dialCode: "1", phoneNumber: "" });
    });

    it("gets correct country when more than one country has the same dial code", function () {
        const component = getComponent({
            open: true
        });

        const flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        const canada = TestUtils.findRenderedDOMNodeWithDataId(component, "country-ca");
        const unitedStates = TestUtils.findRenderedDOMNodeWithDataId(component, "country-us");

        ReactTestUtils.Simulate.click(flag);

        ReactTestUtils.Simulate.click(canada);
        expect(component.props.onValueChange).toBeCalledWith({ countryCode: "ca", dialCode: "1", phoneNumber: "" });

        ReactTestUtils.Simulate.click(flag);

        ReactTestUtils.Simulate.click(unitedStates);
        expect(component.props.onValueChange).toBeCalledWith({ countryCode: "us", dialCode: "1", phoneNumber: "" });
    });

    it("handles clearing selected country", function () {
        var phoneNumber = "123 456 7890";

        var component = getComponent({
            countryCode: "us",
            phoneNumber: phoneNumber,
            open: true
        });

        var flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        var flagInner = TestUtils.findRenderedDOMNodeWithClass(flag, "iti-flag");

        expect(flagInner.className).toContain("us");

        ReactTestUtils.Simulate.click(flag);

        var noCountry = TestUtils.findRenderedDOMNodeWithDataId(component, "none-option");

        ReactTestUtils.Simulate.click(noCountry);
        expect(component.props.onValueChange).toBeCalledWith(
            { countryCode: "", dialCode: "", phoneNumber: phoneNumber });
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
        const component = getComponent({
            open: true
        });
        const componentRef = component.refs.I18nPhoneInputStateful;

        const flag = TestUtils.findRenderedDOMNodeWithDataId(componentRef, "selected-option");
        // enter can, validate still not selected, hit enter, validate Canada now selected
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 67 }); // c
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 65 }); // a
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 78 }); // n
        expect(componentRef.state.searchString).toBe("can");
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 13 }); // enter - select canada
        expect(component.props.onValueChange).toBeCalledWith({ countryCode: "ca", dialCode: "1", phoneNumber: "" });
        // open flag, enter afg, hit enter, validate Afganistan now selected
        ReactTestUtils.Simulate.click(flag);
        expect(componentRef.state.searchString).toBe("");
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 65 }); // a
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 70 }); // f
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 71 }); // g
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 13 }); // enter - select afganistan
        expect(component.props.onValueChange).toBeCalledWith({ countryCode: "af", dialCode: "93", phoneNumber: "" });
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

        var flag = TestUtils.findRenderedDOMNodeWithDataId(componentRef, "selected-option");

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

        var flag = TestUtils.findRenderedDOMNodeWithDataId(componentRef, "selected-option");

        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 67 }); // c
        componentRef.setState({ searchTime: (componentRef.state.searchTime - 2000) }); // simulate a 2 second wait
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 65 }); // a
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 70 }); // f
        expect(componentRef.state.searchString).toBe("af");
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

    it("gets correct country code if given dial code and phone number for a specific country", () => {
        const component = getComponent({
            dialCode: "+1",
            // This is the main phone number for Ping
            phoneNumber: "8778982905"
        });

        const usFlag = TestUtils.findRenderedDOMNodeWithClass(component, "selected-option-label us");

        expect(usFlag).toBeTruthy();
    });

    it("fires Cannonball warning when use-portal isn't set", function() {
        console.warn = jest.fn();
        getComponent({ flags: ["p-stateful"] });
        expect(console.warn).toBeCalled();
    });

    it("doesn't fire Cannonball warning when use-portal and p-stateful are set", function() {
        console.warn = jest.fn();
        getComponent({ flags: [ "use-portal", "p-stateful" ] });
        expect(console.warn).not.toBeCalled();
    });

});
