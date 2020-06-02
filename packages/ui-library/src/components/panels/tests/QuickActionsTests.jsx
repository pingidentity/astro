import React from "react";
import { mount, shallow } from "enzyme";
import * as QuickActions from "../QuickActions";
import { Title } from "../../layout/NavCard";

describe("Quick Actions", () => {
    it("renders the Action component", () => {
        const component = shallow(
            <QuickActions.Action
                label="IdP Connection"
                iconName="globe"
                invertColor
                onClick={() => console.log("Action clicked")}
            />
        );

        expect(component.exists()).toEqual(true);
        expect(component.hasClass("quick-actions__action-card--inverted")).toEqual(true);
    });

    it("renders the Container component", () => {
        const component = shallow(
            <QuickActions.Container> A child </QuickActions.Container>
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
                invertColor
                onClick={() => console.log("Clicked")}
            />
        );

        expect(component.exists()).toEqual(true);
        expect(component.hasClass("quick-actions__edit-button--inverted")).toEqual(true);
    });

    it("renders the Section component", () => {
        const component = mount(
            <QuickActions.Section
                title="Helpful Links"
                invertColor
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
        expect(component.find(Title).props().invertColor).toEqual(true);
        component.children(QuickActions.Action).forEach((child) => {
            expect(child.props().invertColor).toEqual(true);
        });
    });
});