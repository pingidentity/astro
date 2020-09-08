import React from "react";
import { mount, shallow } from "enzyme";
import HoverAction from "../HoverAction";

describe("QuickActions.HoverAction", () => {
    const actionDefaults = {
        id: "idp",
        label: "IdP Connection",
        iconName: "globe",
        onClick: () => console.log("Action clicked")
    };

    it("renders the HoverAction component", () => {
        const component = mount(<HoverAction {...actionDefaults} hoverIcon="plus" />);

        expect(component.exists()).toEqual(true);
    });

    it("shows the hoverIcon if the HoverAction has been hovered over", () => {
        const component = shallow(<HoverAction {...actionDefaults} hoverIcon="plus" />);
        const action = component.find("Action");
        action.prop("onMouseEnter")();

        expect(component.find("Action").prop("iconName")).toEqual("plus");
    });

    it("shows the iconName if the HoverAction has not been hovered over", () => {
        const component = shallow(<HoverAction {...actionDefaults} hoverIcon="plus" />);

        expect(component.find("Action").prop("iconName")).toEqual(actionDefaults.iconName);
    });

    it("shows the hoverIcon if the HoverAction has been moused out of", () => {
        const component = shallow(<HoverAction {...actionDefaults} hoverIcon="plus" />);
        component.find("Action").prop("onMouseEnter")();

        expect(component.find("Action").prop("iconName")).toEqual("plus");

        component.find("Action").prop("onMouseLeave")();
        expect(component.find("Action").prop("iconName")).toEqual(actionDefaults.iconName);
    });
});