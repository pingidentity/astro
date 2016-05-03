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

jest.dontMock("../i18nPhoneInput/I18nPhoneInput.jsx");
jest.dontMock("../form-text-field/index.js");
jest.dontMock("../form-text-field/v1.jsx");

describe("I18nPhoneInput", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-addons-test-utils"),
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
        var input = TestUtils.findRenderedDOMNodeWithDataId(View, "i18n-phone-input");

        expect(input).toBeTruthy();
    });

    it("opens country list on list button click", function () {
        var flag = TestUtils.findRenderedDOMNodeWithDataId(View, "selected-flag");
        var list = TestUtils.findRenderedDOMNodeWithDataId(View, "country-list");
        var listClasses = list.className.split(" ");

        expect(_.contains(listClasses, "hide")).toEqual(true);

        ReactTestUtils.Simulate.click(flag);

        listClasses = list.className.split(" ");
        expect(_.contains(listClasses, "hide")).toEqual(false);
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

    it("preselects flag by iso2", function () {
        var selectedIso2 = "af";

        View = ReactTestUtils.renderIntoDocument(
            <I18nPhoneInput
                countryCode={selectedIso2}
                onValueChange={onValueChange} />
        );

        var flag = TestUtils.findRenderedDOMNodeWithDataId(View, "selected-flag");
        var flagInner = TestUtils.findRenderedDOMNodeWithClass(flag, "iti-flag");

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

        var flag = TestUtils.findRenderedDOMNodeWithDataId(View, "selected-flag");
        var flagInner = TestUtils.findRenderedDOMNodeWithClass(flag, "iti-flag");

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

    it("closing when called outside", function () {
        var globalClickListener = TestUtils.captureGlobalListener("click", document);

        View = ReactTestUtils.renderIntoDocument(
            <I18nPhoneInput id="phoneInput" dialCode="1" />
        );

        var flag = TestUtils.findRenderedDOMNodeWithDataId(View, "selected-flag");

        //open country list
        ReactTestUtils.Simulate.click(flag);

        //click outside
        globalClickListener({
            target: {
                dataset: {}
            }
        });

        var list = TestUtils.findRenderedDOMNodeWithDataId(View, "country-list");

        expect(list.getAttribute("class")).toContain("hide");
    });

    it("unregister global listeners on unmount", function () {
        document.addEventListener = jest.genMockFunction();
        document.removeEventListener = jest.genMockFunction();

        var view = ReactTestUtils.renderIntoDocument(
            <I18nPhoneInput onValueChange={onValueChange} />
        );

        //trigger unmount
        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(view).parentNode);

        expect(document.addEventListener.mock.calls.length).toEqual(1);
        expect(document.addEventListener.mock.calls[0][0]).toEqual("click");

        expect(document.removeEventListener.mock.calls.length).toEqual(1);
        expect(document.removeEventListener.mock.calls[0][0]).toEqual("click");
    });


});
