import React from "react";
import { mount, shallow } from "enzyme";
import * as QuickActions from "../QuickActions";

describe("Quick Actions", () => {
    it("renders the Action component", () => {
        const component = shallow(
            <QuickActions.Action
                label="IdP Connection"
                iconName="globe"
                onClick={() => console.log("Action clicked")}
            />
        );

        expect(component.exists()).toEqual(true);
    });

    it("renders the Divider component", () => {
        const component = shallow(<QuickActions.Divider />);
        expect(component.exists()).toEqual(true);
    });

    it("renders the EditButton component", () => {
        const component = shallow(
            <QuickActions.EditButton
                onClick={() => console.log("Clicked")}
            />
        );

        expect(component.exists()).toEqual(true);
    });

    it("renders the Section component", () => {
        const component = mount(
            <QuickActions.Section
                title="Helpful Links"
            >
                <QuickActions.Action
                    label="IdP Connection"
                    iconName="globe"
                    onClick={() => console.log("Action clicked")}
                />
                <QuickActions.Action
                    label="IdP Connection"
                    iconName="globe"
                    onClick={() => console.log("Action clicked")}
                />
                <QuickActions.Action
                    label="IdP Connection"
                    iconName="globe"
                    onClick={() => console.log("Action clicked")}
                />
            </QuickActions.Section>
        );

        expect(component.exists()).toEqual(true);
    });
});