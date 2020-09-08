import React from "react";
import { mount, shallow } from "enzyme";
import Action from "../Action";
import Section from "../Section";
import { actionColorSchemes } from "../context/QuickActionsContext";

describe("QuickActions.Section", () => {
    const sectionDefaults = {
        children: (
            <Section
                title="Helpful Links"
            >
                <Action
                    label="IdP Connection"
                    iconName="globe"
                    onClick={() => console.log("Action clicked")}
                />
                <Action
                    label="IdP Connection"
                    iconName="globe"
                    onClick={() => console.log("Action clicked")}
                />
                <Action
                    label="IdP Connection"
                    iconName="globe"
                    onClick={() => console.log("Action clicked")}
                />
            </Section>
        ),
        title: "Helpful Links"
    };

    it("renders the Section component", () => {
        const component = mount(<Section {...sectionDefaults} />);

        expect(component.exists()).toEqual(true);
    });

    it("Section gives normal context value when invertColors is false", () => {
        const component = shallow(<Section {...sectionDefaults} invertColors={false} />);

        const provider = component.find("ContextProvider");

        expect(provider.prop("value")).toEqual(actionColorSchemes.NORMAL);
    });

    it("Section gives inverted context value when invertColors is true", () => {
        const component = shallow(<Section {...sectionDefaults} invertColors />);

        const provider = component.find("ContextProvider");

        expect(provider.prop("value")).toEqual(actionColorSchemes.INVERTED);
    });
});