import React from "react";
import { mount, shallow } from "enzyme";
import Action from "../Action";

describe("QuickActions.Action", () => {
    const actionDefaults = {
        id: "idp",
        label: "IdP Connection",
        iconName: "globe",
        onClick: () => console.log("Action clicked")
    };

    it("renders the Action component", () => {
        const component = shallow(
            <Action
                {...actionDefaults}
            />
        );

        expect(component.exists()).toEqual(true);
    });

    it("calls the onClick callback when the Action is clicked", () => {
        const onClick = jest.fn();
        const component = mount(
            <Action
                {...actionDefaults}
                onClick={onClick}
                data-id="idp"
            />
        );

        expect(onClick).not.toHaveBeenCalled();

        const container = component.find("div[data-id=\"idp\"]");

        container.simulate("click", {});
        expect(onClick.mock.calls[0][0]).toEqual("idp");
    });


    it("calls the onMouseEnter callback when the Action is moused over", () => {
        const onMouseEnter = jest.fn();
        const component = mount(
            <Action
                {...actionDefaults}
                data-id="idp"
                onMouseEnter={onMouseEnter}
            />
        );

        const container = component.find("div[data-id=\"idp\"]");

        container.simulate("mouseenter", {});
        expect(onMouseEnter.mock.calls[0][0]).toEqual("idp");
    });

    it("calls the onMouseLeave callback when the Action is moused out of", () => {
        const onMouseLeave = jest.fn();
        const component = mount(
            <Action
                {...actionDefaults}
                data-id="idp"
                onMouseLeave={onMouseLeave}
            />
        );

        const container = component.find("div[data-id=\"idp\"]");

        container.simulate("mouseleave", {});
        expect(onMouseLeave.mock.calls[0][0]).toEqual("idp");
    });

    it("renders corner icon when cornerIcon prop is passed in", () => {
        const component = shallow(
            <Action
                {...actionDefaults}
                cornerIcon="check"
            />
        );

        const cornerIcon = component.find("Icon").first();

        expect(cornerIcon.prop("iconName")).toEqual("check");
    });

    it("does not render corner icon when cornerIcon prop is not passed in", () => {
        const component = shallow(
            <Action
                {...actionDefaults}
            />
        );

        const cornerIcon = component.find("Icon").first();

        expect(cornerIcon.prop("iconName")).not.toEqual("check");
    });
});