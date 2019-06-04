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
jest.mock("popper.js");

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import Utils from "../../../../../util/Utils";
import TestUtils from "../../../../../testutil/TestUtils";
import I18nPhoneInput, { I18nPhoneInputStateless } from "../v2";
import { mount } from "enzyme";
import { allFlags } from "../../../../../util/FlagUtils";

describe.skip("I18nPhoneInput", function () {
    const defaults = {
        onSearch: jest.fn(),
        onToggle: jest.fn(),
        onValueChange: jest.fn(),
        flags: allFlags
    };

    function getComponent (props) {
        return ReactTestUtils.renderIntoDocument(
            <I18nPhoneInput
                {...defaults}
                {...props}
            />
        );
    }

    it("renders the component", function () {
        const component = getComponent();

        const input = TestUtils.findRenderedDOMNodeWithDataId(component, "i18n-phone-input");

        expect(input).toBeTruthy();
    });

    it("stateless: renders the component", function () {
        const component = getComponent({
            stateless: true
        });

        const input = TestUtils.findRenderedDOMNodeWithDataId(component, "i18n-phone-input");

        expect(input).toBeTruthy();
    });

    it("shows error message", function () {
        const dataId = "phoneInput",
            component = getComponent({
                "data-id": "phoneInput",
                dialCode: "1",
                phoneNumber: "asdf"
            });

        const error = TestUtils.findRenderedDOMNodeWithDataId(component, dataId + "-phoneNumber-error-message");
        expect(error.textContent).toEqual("Please enter a valid phone number.");
    });

    it("prepopulates phone number", function () {
        const phoneNumber = "123 456 7890";
        const inputId = "phoneInput";

        const component = getComponent({
            "data-id": inputId,
            phoneNumber: phoneNumber
        });

        const phoneInput = TestUtils.findRenderedDOMNodeWithDataId(component, inputId + "-phoneNumber" + "-input");

        expect(phoneInput.value).toEqual(phoneNumber);
    });

    it("updates callback on country select", function () {
        const component = getComponent({
            open: true
        });

        const flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        const canada = TestUtils.findRenderedDOMNodeWithDataId(component, "country-ca");
        const afghanistan = TestUtils.findRenderedDOMNodeWithDataId(component, "country-af");

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
        const phoneNumber = "123 456 7890";

        const component = getComponent({
            countryCode: "us",
            phoneNumber: phoneNumber,
            open: true
        });

        const flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        const flagInner = TestUtils.findRenderedDOMNodeWithClass(flag, "iti-flag");

        expect(flagInner.className).toContain("us");

        ReactTestUtils.Simulate.click(flag);

        const noCountry = TestUtils.findRenderedDOMNodeWithDataId(component, "none-option");

        ReactTestUtils.Simulate.click(noCountry);
        expect(component.props.onValueChange).toBeCalledWith(
            { countryCode: "", dialCode: "", phoneNumber: phoneNumber });
    });

    it("triggers callback on phone number change", function () {
        const component = getComponent({
            "data-id": "phoneInput",
            dialCode: "1"
        });

        const phoneInput = TestUtils.findRenderedDOMNodeWithDataId(component, "phoneInput" + "-phoneNumber" + "-input");

        ReactTestUtils.Simulate.change(phoneInput, {
            target: {
                value: "111-222"
            }
        });

        expect(component.props.onValueChange).toBeCalledWith({ dialCode: "1", phoneNumber: "111-222" });
    });

    it("p-stateful: onToggle callback opens and closes component when open is not supplied", function () {
        const onToggle = jest.fn();
        const component = mount(<I18nPhoneInput {...defaults} onToggle={onToggle} />);

        expect(component.find(I18nPhoneInputStateless).props().open).toEqual(false);

        component.find(".selected-option").simulate("click");

        expect(component.find(I18nPhoneInputStateless).props().open).toEqual(true);
    });

    it("p-stateful: onToggle callback does not open or close component when open prop is supplied", function () {
        const onToggle = jest.fn();
        const component = mount(<I18nPhoneInput {...defaults} onToggle={onToggle} open />);

        expect(component.find(I18nPhoneInputStateless).props().open).toEqual(true);

        component.find(".selected-option").simulate("click");

        expect(component.find(I18nPhoneInputStateless).props().open).toEqual(true);
    });

    it("find and select country by typing", function () {
        const component = mount(<I18nPhoneInput {...defaults} open />);
        const getStatelessProps = () => component.find(I18nPhoneInputStateless).props();

        const flag = component.find(".selected-option");
        // enter can, validate still not selected, hit enter, validate Canada now selected
        flag.simulate("keydown", { keyCode: 67 }); // c
        flag.simulate("keydown", { keyCode: 65 }); // a
        flag.simulate("keydown", { keyCode: 78 }); // n
        flag.simulate("keydown", { keyCode: 13 }); // enter - select canada
        expect(component.props().onValueChange).toBeCalledWith({ countryCode: "ca", dialCode: "1", phoneNumber: "" });
        // open flag, enter afg, hit enter, validate Afganistan now selected
        flag.simulate("click");
        expect(getStatelessProps().searchString).toBe("");
        flag.simulate("keydown", { keyCode: 65 }); // a
        flag.simulate("keydown", { keyCode: 70 }); // f
        flag.simulate("keydown", { keyCode: 71 }); // g
        flag.simulate("keydown", { keyCode: 13 }); // enter - select afghanistan
        expect(component.props().onValueChange).toBeCalledWith({ countryCode: "af", dialCode: "93", phoneNumber: "" });
        // open flag, enter ag, validate that no country found
        flag.simulate("click");
        expect(getStatelessProps().searchString).toBe("");
        flag.simulate("keydown", { keyCode: 65 }); // a
        flag.simulate("keydown", { keyCode: 71 }); // g
        expect(getStatelessProps().searchString).toBe("");
    });

    it("find and select country by typing empty with esc", function () {
        const component = mount(<I18nPhoneInput {...defaults} open />);
        const getStatelessProps = () => component.find(I18nPhoneInputStateless).props();

        const flag = component.find(".selected-option");

        flag.simulate("keydown", { keyCode: 67 }); // c
        flag.simulate("keydown", { keyCode: 65 }); // a
        flag.simulate("keydown", { keyCode: 78 }); // n
        expect(getStatelessProps().searchString).toBe("can");
        flag.simulate("keydown", { keyCode: 27 }); // esc
        flag.simulate("keydown", { keyCode: 13 }); // enter - don't do anything because empty
        expect(getStatelessProps().searchString).toBe("");
    });

    it("stateless: triggers onSearch callback when typing and search string provided", function () {
        const component = getComponent({
            stateless: true,
            open: true,
            searchString: "",
            searchTime: 0
        });

        const flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 67 }); // c
        expect(component.props.onSearch).toBeCalled();
    });

    it("throws error when deprecated prop 'controlled' is passed in", function () {
        const expectedError = new Error(Utils.deprecatePropError("controlled", "stateless"));

        expect(function () {
            getComponent({ controlled: true });
        }).toThrow(expectedError);
    });

    it("throws error when deprecated prop 'onCountrySearch' is passed in", function () {
        const expectedError = new Error(Utils.deprecatePropError("onCountrySearch", "onSearch"));

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
