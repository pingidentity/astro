import React from "react";
import DynamicFilter from "../DynamicFilter";
import userOptions from "../../../demo/components/forms/data/userOptions";
import { KeyCodes } from "../../../util/KeyboardUtils";
import { mount } from "enzyme";

jest.mock("popper.js");
jest.mock("react-portal");
Element.prototype.scrollIntoView = jest.fn();

const CATEGORIES = [
    {
        value: "applications",
        label: "Applications",
        options: [
            { value: "Pannier" },
            { value: "Y-find" },
            { value: "Tin" },
            { value: "Toughjoyfax" },
            { value: "Cardify" },
            { value: "Tempsoft" },
            { value: "Kanlam" },
            { value: "Lotstring" },
            { value: "Bitchip" },
            { value: "Bigtax" },
            { value: "Voyatouch" },
            { value: "Cookley" },
            { value: "Cardguard" },
            { value: "Holdlamis" },
            { value: "Opela" },
            { value: "Tresom" },
            { value: "It" },
            { value: "Gembucket" },
        ]
    },
    {
        value: "Environments",
        options: [
            { value: "Development" },
            { value: "Staging" },
            { value: "Production" },
        ]
    },
    {
        value: "Administrators",
        options: userOptions,
    },
];

describe("DynamicFilter", function () {

    function getComponent (props) {
        return mount(<DynamicFilter categories={CATEGORIES} {...props}/>);
    }

    it("renders with default data-id", function () {
        const component = getComponent();
        expect(component.exists("[data-id='dynamic-filter']")).toBeTruthy();
    });

    it("renders multivalues input for category with filters active", function() {
        const component = getComponent({ value: { "applications": ["Opela"] } });
        expect(component.exists("[data-id='filter-applications']")).toBeTruthy();
    });

    it("renders multivalues input for category after clicking link", function() {
        const component = getComponent();
        expect(component.exists("[data-id='filter-Environments']")).toBeFalsy();

        const link = component.find("[data-id='link-Environments']").first();
        console.log(link);
        link.simulate("click");

        expect(component.exists("[data-id='filter-Environments']")).toBeTruthy();
    });

    it("stops rendering multivalues input for category after clicking link and blurring", function() {
        const component = getComponent();

        const link = component.find("[data-id='link-Environments']").first();
        link.simulate("click");
        expect(component.exists("[data-id='filter-Environments']")).toBeTruthy();

        const multivalues = component.find("[data-id='filter-Environments']").first();
        const input = multivalues.find("[data-id='value-entry']").first();
        input.simulate("blur");
        expect(component.exists("[data-id='filter-Environments']")).toBeFalsy();
    });

    it("fires onValueChange event", function() {
        const callback = jest.fn();
        const component = getComponent({ value: { "applications": ["Opela"] }, onValueChange: callback });
        const multivalues = component.find("[data-id='filter-applications']").first();
        const dropdownInput = multivalues.find("[data-id='value-entry']").first();

        expect(callback).not.toBeCalled();

        dropdownInput.simulate("change", { target: { value: "bitchi" } });
        dropdownInput.simulate("keydown", { keyCode: KeyCodes.ENTER });

        expect(callback).toBeCalled();
        expect(callback.mock.calls[0][0]).toEqual({ "applications": ["Opela", "Bitchip"] });
    });

    it("doesn't blur the category when only mousing down on a link", function() {
        const component = getComponent();

        const link = component.find("[data-id='link-Environments']").first();
        link.simulate("click");
        expect(component.exists("[data-id='filter-Environments']")).toBeTruthy();

        const link2 = component.find("[data-id='link-applications']").first();
        link2.simulate("mousedown");

        const multivalues = component.find("[data-id='filter-Environments']").first();
        const input = multivalues.find("[data-id='value-entry']").first();
        input.simulate("blur");
        expect(component.exists("[data-id='filter-Environments']")).toBeTruthy();
    });

});