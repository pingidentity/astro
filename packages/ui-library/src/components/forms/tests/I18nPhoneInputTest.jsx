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

jest.dontMock("../i18n/I18nPhoneInput.jsx");
jest.dontMock("../i18n/CountryFlagList.jsx");
jest.dontMock("../form-text-field/index.js");
jest.dontMock("../form-text-field/v1.jsx");

describe("I18nPhoneInput", function () {
    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        I18nPhoneInput = require("../i18n/I18nPhoneInput.jsx");

    var onValueChange = jest.genMockFunction();
    var View;

    beforeEach(function () {
        View = ReactTestUtils.renderIntoDocument(
            <I18nPhoneInput onValueChange={onValueChange} />
        );
    });

    afterEach(function () {
        onValueChange.mockClear();
    });

    it("renders the component", function () {
        var input = TestUtils.findRenderedDOMNodeWithDataId(View, "i18n-phone-input");

        expect(input).toBeTruthy();
    });

    it("updates callback on country select", function () {
        var flag = TestUtils.findRenderedDOMNodeWithDataId(View, "selected-flag");
        var canada = TestUtils.findRenderedDOMNodeWithDataId(View, "country-ca");
        var afghanistan = TestUtils.findRenderedDOMNodeWithDataId(View, "country-af");

        ReactTestUtils.Simulate.click(flag);

        ReactTestUtils.Simulate.click(afghanistan);
        expect(onValueChange).toBeCalledWith("93", "");

        ReactTestUtils.Simulate.click(flag);

        ReactTestUtils.Simulate.click(canada);
        expect(onValueChange).toBeCalledWith("1", "");

    });

    it("handles clearing selected country", function () {
        var phoneNumber = "123 456 7890";

        View = ReactTestUtils.renderIntoDocument(
            <I18nPhoneInput
                countryCode="us"
                phoneNumber={phoneNumber}
                onValueChange={onValueChange} />
        );

        var flag = TestUtils.findRenderedDOMNodeWithDataId(View, "selected-flag");
        var flagInner = TestUtils.findRenderedDOMNodeWithClass(flag, "iti-flag");

        expect(flagInner.className).toContain("us");

        ReactTestUtils.Simulate.click(flag);

        var noCountry = TestUtils.findRenderedDOMNodeWithDataId(View, "no-country");

        ReactTestUtils.Simulate.click(noCountry);
        expect(onValueChange).toBeCalledWith("", phoneNumber);
    });

    it("prepopulates phone number", function () {
        var phoneNumber = "123 456 7890";
        var inputId = "phoneInput";

        View = ReactTestUtils.renderIntoDocument(
            <I18nPhoneInput
                id={inputId}
                phoneNumber={phoneNumber} />
        );

        var phoneInput = TestUtils.findRenderedDOMNodeWithDataId(View, inputId + "_phonenumber");

        expect(phoneInput.value).toEqual(phoneNumber);
    });

    it("triggers callback on phone number change", function () {

        var callback = jest.genMockFunction();

        View = ReactTestUtils.renderIntoDocument(
            <I18nPhoneInput id="phoneInput" dialCode="1" onValueChange={callback} />
        );

        var phoneInput = TestUtils.findRenderedDOMNodeWithDataId(View, "phoneInput" + "_phonenumber");

        ReactTestUtils.Simulate.change(phoneInput, {
            target: {
                value: "111-222"
            }
        });

        expect(callback).toBeCalledWith("1", "111-222");
    });

    it("shows error message on blur", function () {
        View = ReactTestUtils.renderIntoDocument(
            <I18nPhoneInput id="phoneInput" dialCode="1" />
        );

        var phoneInput = TestUtils.findRenderedDOMNodeWithDataId(View, "phoneInput" + "_phonenumber");

        ReactTestUtils.Simulate.blur(phoneInput, {});

        var error = TestUtils.findRenderedDOMNodeWithClass(View, "tooltip-text-content");

        expect(error.textContent).toEqual("Please enter a valid phone number.");
    });

    it("find and select country by typing", function () {
        var flag = TestUtils.findRenderedDOMNodeWithDataId(View, "selected-flag");
        var currentCountryIso = View.state.selected.iso2;
        // open flag, enter can, validate still not selected, hit enter, validate Canada now selected
        ReactTestUtils.Simulate.click(flag);
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 67 }); // c
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 65 }); // a
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 78 }); // n
        expect(View.state.searchString).toBe("can");
        expect(View.state.selected.iso2).toBe(currentCountryIso);
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 13 }); // enter - select canada
        expect(onValueChange).toBeCalledWith("1", "");
        expect(View.state.selected.iso2).toBe("ca");
        // open flag, enter afg, hit enter, validate Afganistan now selected
        ReactTestUtils.Simulate.click(flag);
        expect(View.state.searchString).toBe("");
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 65 }); // a
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 70 }); // f
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 71 }); // g
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 13 }); // enter - select afganistan
        expect(onValueChange).toBeCalledWith("93", "");
        expect(View.state.selected.iso2).toBe("af");
        // open flag, enter ag, validate that no country found
        ReactTestUtils.Simulate.click(flag);
        expect(View.state.searchString).toBe("");
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 65 }); // a
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 71 }); // g
        expect(View.state.searchString).toBe("");
    });

    it("find and select country by typing empty with esc", function () {
        var flag = TestUtils.findRenderedDOMNodeWithDataId(View, "selected-flag");
        var currentCountryIso = View.state.selected.iso2;
        ReactTestUtils.Simulate.click(flag);
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 67 }); // c
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 65 }); // a
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 78 }); // n
        expect(View.state.searchString).toBe("can");
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 27 }); // esc
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 13 }); // enter - don't do anything because empty
        expect(View.state.searchString).toBe("");
        expect(View.state.selected.iso2).toBe(currentCountryIso);
    });

    it("find and select country by typing empty with delay", function () {
        var flag = TestUtils.findRenderedDOMNodeWithDataId(View, "selected-flag");
        ReactTestUtils.Simulate.click(flag);
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 67 }); // c
        View.setState({ searchTime: (View.state.searchTime - 2000) }); // simulate a 2 second wait
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 65 }); // a
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 70 }); // f
        expect(View.state.searchString).toBe("af");
    });
    
});
