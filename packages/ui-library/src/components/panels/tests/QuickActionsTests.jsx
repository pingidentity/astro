import React from "react";
import { shallow } from "enzyme";
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
            <QuickActions.EditButton onClick={() => console.log("Clicked")} />
        );

        expect(component.exists()).toEqual(true);
    });

    it("renders the Section component", () => {
        const component = shallow(
            <QuickActions.Section
                actions={[
                    <QuickActions.Action
                        label="IdP Connection"
                        iconName="globe"
                        onClick={() => console.log("Action clicked")}
                    />,
                    <QuickActions.Action
                        label="IdP Connection"
                        iconName="globe"
                        onClick={() => console.log("Action clicked")}
                    />,
                    <QuickActions.Action
                        label="IdP Connection"
                        iconName="globe"
                        onClick={() => console.log("Action clicked")}
                    />
                ]}
                title="Helpful Links"
            />
        );

        expect(component.exists()).toEqual(true);
    });
});