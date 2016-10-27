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

jest.dontMock("../v1.jsx");
jest.dontMock("../../CountryFlagList.jsx");
jest.dontMock("../../../FormError.jsx");
jest.dontMock("../../../FormDropDownList.jsx");
jest.dontMock("../../../form-text-field/index.js");
jest.dontMock("../../../form-text-field/v1.jsx");
jest.dontMock("../../../../../util/i18n/Translator.js");

describe("I18nPhoneInput", function () {
    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../../../testutil/TestUtils"),
        I18nPhoneInput = require("../v1.jsx"),
        _ = require("underscore");

    function getComponent (props) {
        props = _.defaults(props || {}, {
            onValueChange: jest.genMockFunction()
        });

        return ReactTestUtils.renderIntoDocument(<I18nPhoneInput {...props} />);
    }

    it("renders the component", function () {
        var component = getComponent();

        var input = TestUtils.findRenderedDOMNodeWithDataId(component, "i18n-phone-input");

        expect(input).toBeTruthy();
    });

    it("shows error message on blur", function () {
        var component = getComponent({
            id: "phoneInput",
            dialCode: "1"
        });

        var phoneInput = TestUtils.findRenderedDOMNodeWithDataId(component, "phoneInput" + "_phonenumber");

        ReactTestUtils.Simulate.blur(phoneInput, {});

        var error = TestUtils.findRenderedDOMNodeWithDataId(component, "phoneInput_phonenumber_errormessage");

        expect(error.textContent).toEqual("Please enter a valid phone number.");
    });

    it("prepopulates phone number", function () {
        var phoneNumber = "123 456 7890";
        var inputId = "phoneInput";

        var component = getComponent({
            id: inputId,
            phoneNumber: phoneNumber
        });

        var phoneInput = TestUtils.findRenderedDOMNodeWithDataId(component, inputId + "_phonenumber");

        expect(phoneInput.value).toEqual(phoneNumber);
    });

    it("updates callback on country select", function () {
        var component = getComponent();

        var flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        var canada = TestUtils.findRenderedDOMNodeWithDataId(component, "country-ca");
        var afghanistan = TestUtils.findRenderedDOMNodeWithDataId(component, "country-af");

        ReactTestUtils.Simulate.click(flag);

        ReactTestUtils.Simulate.click(afghanistan);
        expect(component.props.onValueChange).toBeCalledWith("93", "");

        ReactTestUtils.Simulate.click(flag);

        ReactTestUtils.Simulate.click(canada);
        expect(component.props.onValueChange).toBeCalledWith("1", "");

    });

    it("handles clearing selected country", function () {
        var phoneNumber = "123 456 7890";

        var component = getComponent({
            countryCode: "us",
            phoneNumber: phoneNumber
        });

        var flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        var flagInner = TestUtils.findRenderedDOMNodeWithClass(flag, "iti-flag");

        expect(flagInner.className).toContain("us");

        ReactTestUtils.Simulate.click(flag);

        var noCountry = TestUtils.findRenderedDOMNodeWithDataId(component, "none-option");

        ReactTestUtils.Simulate.click(noCountry);
        expect(component.props.onValueChange).toBeCalledWith("", phoneNumber);
    });

    it("triggers callback on phone number change", function () {
        var component = getComponent({
            id: "phoneInput",
            dialCode: "1"
        });

        var phoneInput = TestUtils.findRenderedDOMNodeWithDataId(component, "phoneInput" + "_phonenumber");

        ReactTestUtils.Simulate.change(phoneInput, {
            target: {
                value: "111-222"
            }
        });

        expect(component.props.onValueChange).toBeCalledWith("1", "111-222");
    });

    it("find and select country by typing", function () {
        var component = getComponent();

        var flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        var currentCountryIso = component.state.selected.iso2;
        // open flag, enter can, validate still not selected, hit enter, validate Canada now selected
        ReactTestUtils.Simulate.click(flag);
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 67 }); // c
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 65 }); // a
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 78 }); // n
        expect(component.state.searchString).toBe("can");
        expect(component.state.selected.iso2).toBe(currentCountryIso);
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 13 }); // enter - select canada
        expect(component.props.onValueChange).toBeCalledWith("1", "");
        expect(component.state.selected.iso2).toBe("ca");
        // open flag, enter afg, hit enter, validate Afganistan now selected
        ReactTestUtils.Simulate.click(flag);
        expect(component.state.searchString).toBe("");
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 65 }); // a
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 70 }); // f
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 71 }); // g
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 13 }); // enter - select afganistan
        expect(component.props.onValueChange).toBeCalledWith("93", "");
        expect(component.state.selected.iso2).toBe("af");
        // open flag, enter ag, validate that no country found
        ReactTestUtils.Simulate.click(flag);
        expect(component.state.searchString).toBe("");
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 65 }); // a
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 71 }); // g
        expect(component.state.searchString).toBe("");
    });

    it("find and select country by typing empty with esc", function () {
        var component = getComponent();

        var flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        var currentCountryIso = component.state.selected.iso2;
        ReactTestUtils.Simulate.click(flag);
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 67 }); // c
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 65 }); // a
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 78 }); // n
        expect(component.state.searchString).toBe("can");
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 27 }); // esc
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 13 }); // enter - don't do anything because empty
        expect(component.state.searchString).toBe("");
        expect(component.state.selected.iso2).toBe(currentCountryIso);
    });

    it("find and select country by typing empty with delay", function () {
        var component = getComponent();

        var flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        ReactTestUtils.Simulate.click(flag);
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 67 }); // c
        component.setState({ searchTime: (component.state.searchTime - 2000) }); // simulate a 2 second wait
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 65 }); // a
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 70 }); // f
        expect(component.state.searchString).toBe("af");
    });

    it("warns of deprecated component version", function () {
        console.warn = jest.genMockFunction();

        getComponent();

        expect(console.warn).toBeCalledWith(
            "** This version of the I18nPhoneInput is deprecated and will be removed in the next release");
    });

    it("does not log deprecation message when in production", function () {
        //Mock process.env.NODE_ENV
        process.env.NODE_ENV = "production";

        console.warn = jest.genMockFunction();
        getComponent();

        expect(console.warn).not.toBeCalled();
        delete process.env.NODE_ENV;
    });
});
