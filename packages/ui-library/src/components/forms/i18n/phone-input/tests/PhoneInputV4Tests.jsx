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
import I18nPhoneInput, { I18nPhoneInputStateless } from "../v2";
import { mount, shallow } from "enzyme";

describe("I18nPhoneInput", function () {
    const defaults = {
        onSearch: jest.fn(),
        onToggle: jest.fn(),
        onValueChange: jest.fn(),
    };

    const shallowMountComponent = props => shallow(
        <I18nPhoneInput
            {...defaults}
            {...props}
        />
    ).dive().dive();

    it("renders the component", function () {
        const component = shallowMountComponent();

        expect(component.exists()).toEqual(true);
    });

    it("doesn't show error message for valid phone number", function () {
        const component = shallowMountComponent({
            "data-id": "phoneInput",
            dialCode: "1",
            phoneNumber: "303 555 5555"
        });

        const textField = component.find("FormTextField");

        expect(textField.prop("errorMessage")).toEqual(null);
    });

    it("shows error message for invalid phone number", function () {
        const component = shallowMountComponent({
            "data-id": "phoneInput",
            dialCode: "1",
            phoneNumber: "asdf"
        });

        const textField = component.find("FormTextField");

        expect(textField.prop("errorMessage")).toEqual("Please enter a valid phone number.");
    });

    it("prepopulates phone number", function () {
        const phoneNumber = "123 456 7890";
        const inputId = "phoneInput";

        const component = shallowMountComponent({
            "data-id": inputId,
            phoneNumber: phoneNumber
        });

        const textField = component.find("FormTextField");

        expect(textField.prop("value")).toEqual(phoneNumber);
    });

    it("updates callback on country select", function () {
        const component = mount(<I18nPhoneInput {...defaults} open />);

        const flag = component.find("[data-id=\"selected-option\"]");
        const canada = component.find("li[data-id=\"option_ca\"]");
        const afghanistan = component.find("li[data-id=\"option_af\"]");

        flag.simulate("click");

        afghanistan.simulate("click");
        expect(defaults.onValueChange).toBeCalledWith({ countryCode: "af", dialCode: "93", phoneNumber: "" });

        flag.simulate("click");

        canada.simulate("click");
        expect(defaults.onValueChange).toBeCalledWith({ countryCode: "ca", dialCode: "1", phoneNumber: "" });
    });

    it("gets correct country when more than one country has the same dial code", function () {
        const component = mount(<I18nPhoneInput {...defaults} open />);

        const flag = component.find("[data-id=\"selected-option\"]");
        const canada = component.find("li[data-id=\"option_ca\"]");
        const unitedStates = component.find("li[data-id=\"option_us\"]");

        flag.simulate("click");

        canada.simulate("click");
        expect(defaults.onValueChange).toBeCalledWith({ countryCode: "ca", dialCode: "1", phoneNumber: "" });

        flag.simulate("click");

        unitedStates.simulate("click");
        expect(defaults.onValueChange).toBeCalledWith({ countryCode: "us", dialCode: "1", phoneNumber: "" });
    });

    it("handles clearing selected country", function () {
        const phoneNumber = "123 456 7890";
        const onValueChange = jest.fn();

        const component = mount(
            <I18nPhoneInput
                {...defaults}
                countryCode="us"
                onValueChange={onValueChange}
                phoneNumber={phoneNumber}
                open
            />
        );

        const flag = component.find("[data-id=\"selected-option\"]");
        const flagInner = flag.find(".iti-flag");

        expect(flagInner.prop("className")).toContain("us");

        flag.simulate("click");

        const noCountry = component.find(".none-option").first();

        noCountry.simulate("click");
        expect(onValueChange).toBeCalledWith(
            { countryCode: "", dialCode: "", phoneNumber: phoneNumber });
    });

    it("onToggle callback opens and closes component when open is not supplied", function () {
        const onToggle = jest.fn();
        const component = mount(<I18nPhoneInput {...defaults} onToggle={onToggle} />);

        expect(component.find(I18nPhoneInputStateless).props().open).toEqual(false);

        component.find(".selected-option").simulate("click");

        expect(component.find(I18nPhoneInputStateless).props().open).toEqual(true);
    });

    it("onToggle callback does not open or close component when open prop is supplied", function () {
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

    it("passes correct country code if country code provided in props", () => {
        const component = shallowMountComponent({
            countryCode: "ca",
            phoneNumber: "+1 877-898-2905"
        });

        const flagList = component.find("CountryFlagList");

        expect(flagList.prop("selectedCountryCode")).toEqual("ca");
    });

    it("gets country code based on phone number", () => {
        const component = shallowMountComponent({
            phoneNumber: "+1 877-898-2905"
        });

        const flagList = component.find("CountryFlagList");

        expect(flagList.prop("selectedCountryCode")).toEqual("us");
    });

    it("doesn't pass selected country if no countryCode or phoneNumber provided", () => {
        const component = shallowMountComponent();

        const flagList = component.find("CountryFlagList");

        expect(flagList.prop("selectedCountryCode")).toEqual("");
    });

    it("handles onFocus event", () => {
        const onBlur = jest.fn();
        const onFocus = jest.fn();
        const component = mount(<I18nPhoneInput {...defaults} open onBlur={onBlur} onFocus={onFocus} />);

        expect(onFocus).not.toHaveBeenCalled();

        const input = component.find("[data-id=\"i18n-phone-input-phoneNumber-input\"]");
        input.simulate("focus");
        expect(onFocus).toHaveBeenCalledTimes(1);

        expect(onBlur).not.toHaveBeenCalled();
    });

    it("handles onBlur event", () => {
        const onBlur = jest.fn();
        const onFocus = jest.fn();
        const component = mount(<I18nPhoneInput {...defaults} open onBlur={onBlur} onFocus={onFocus} />);

        expect(onBlur).not.toHaveBeenCalled();

        const input = component.find("[data-id=\"i18n-phone-input-phoneNumber-input\"]");
        input.simulate("blur");
        expect(onBlur).toHaveBeenCalledTimes(1);

        expect(onFocus).not.toHaveBeenCalled();
    });

});
