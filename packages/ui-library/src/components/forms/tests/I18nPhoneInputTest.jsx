window.__DEV__ = true;

jest.setMock("../i18nPhoneInput/countryCodes", [
    {
        name: "Afghanistan (‫افغانستان‬‎)",
        iso2: "af",
        dialCode: "93",
        priority: 0,
        areaCodes: null
    },
    {
        name: "Canada",
        iso2: "ca",
        dialCode: "1",
        priority: 1,
        areaCodes: null
    },
    {
        name: "United States",
        iso2: "us",
        dialCode: "1",
        priority: 0,
        areaCodes: null
    }
]);

jest.dontMock("classnames");
jest.dontMock("underscore");
jest.dontMock("../../../testutil/TestUtils");
jest.dontMock("../i18nPhoneInput/I18nPhoneInput.jsx");
jest.dontMock("../FormTextField.jsx");

describe("I18nPhoneInput", function () {
    var React = require("react/addons"),
        ReactTestUtils = React.addons.TestUtils,
        TestUtils = require("../../../testutil/TestUtils"),
        I18nPhoneInput = require("../i18nPhoneInput/I18nPhoneInput.jsx"),
        _ = require("underscore");

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
        var input = TestUtils.findRenderedDOMComponentWithDataId(View, "i18n-phone-input");

        expect(input).toBeTruthy();
    });

    it("opens country list on list button click", function () {
        var flag = TestUtils.findRenderedDOMComponentWithDataId(View, "selected-flag");
        var list = TestUtils.findRenderedDOMComponentWithDataId(View, "country-list");
        var listClasses = list.getDOMNode().className.split(" ");

        expect(_.contains(listClasses, "hide")).toEqual(true);

        ReactTestUtils.Simulate.click(flag);

        listClasses = list.getDOMNode().className.split(" ");
        expect(_.contains(listClasses, "hide")).toEqual(false);
    });

    it("updates callback on country select", function () {
        var flag = TestUtils.findRenderedDOMComponentWithDataId(View, "selected-flag");
        var canada = TestUtils.findRenderedDOMComponentWithDataId(View, "country-ca");
        var afghanistan = TestUtils.findRenderedDOMComponentWithDataId(View, "country-af");

        ReactTestUtils.Simulate.click(flag);

        ReactTestUtils.Simulate.click(afghanistan);
        expect(onValueChange).toBeCalledWith("93", "");

        ReactTestUtils.Simulate.click(flag);

        ReactTestUtils.Simulate.click(canada);
        expect(onValueChange).toBeCalledWith("1", "");

    });

    it("preselects flag by iso2", function () {
        var selectedIso2 = "af";

        View = ReactTestUtils.renderIntoDocument(
            <I18nPhoneInput
                countryCode={selectedIso2}
                onValueChange={onValueChange} />
        );

        var flag = TestUtils.findRenderedDOMComponentWithDataId(View, "selected-flag");
        var flagInner = ReactTestUtils.findRenderedDOMComponentWithClass(flag, "iti-flag").getDOMNode();

        expect(flagInner.className).toContain(selectedIso2);
    });

    it("preselects flag by dial code", function () {
        var selectedIso2 = "af";
        var selectedDialCode = "93";

        View = ReactTestUtils.renderIntoDocument(
            <I18nPhoneInput
                dialCode={selectedDialCode}
                onValueChange={onValueChange} />
        );

        var flag = TestUtils.findRenderedDOMComponentWithDataId(View, "selected-flag");
        var flagInner = ReactTestUtils.findRenderedDOMComponentWithClass(flag, "iti-flag").getDOMNode();

        expect(flagInner.className).toContain(selectedIso2);
    });

    it("prepopulates phone number", function () {
        var phoneNumber = "123 456 7890";
        var inputId = "phoneInput";

        View = ReactTestUtils.renderIntoDocument(
            <I18nPhoneInput
                id={inputId}
                phoneNumber={phoneNumber} />
        );

        var phoneInput = TestUtils.findRenderedDOMComponentWithDataId(View, inputId + "_phonenumber").getDOMNode();

        expect(phoneInput.value).toEqual(phoneNumber);
    });
});
