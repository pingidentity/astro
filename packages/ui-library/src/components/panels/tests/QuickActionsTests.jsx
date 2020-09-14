import React from "react";
import { mount, shallow } from "enzyme";
import * as QuickActions from "../QuickActions";
import { actionColorSchemes } from "../QuickActionsContext";

describe("Quick Actions", () => {
    describe("Actions", () => {
        const actionDefaults = {
            id: "idp",
            label: "IdP Connection",
            iconName: "globe",
            onClick: () => console.log("Action clicked")
        };

        it("renders the Action component", () => {
            const component = shallow(
                <QuickActions.Action
                    {...actionDefaults}
                />
            );

            expect(component.exists()).toEqual(true);
        });

        it("calls the onClick callback when the Action is clicked", () => {
            const onClick = jest.fn();
            const component = mount(
                <QuickActions.Action
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
                <QuickActions.Action
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
                <QuickActions.Action
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
                <QuickActions.Action
                    {...actionDefaults}
                    cornerIcon="check"
                />
            );

            const cornerIcon = component.find("Icon").first();

            expect(cornerIcon.prop("iconName")).toEqual("check");
        });

        it("does not render corner icon when cornerIcon prop is not passed in", () => {
            const component = shallow(
                <QuickActions.Action
                    {...actionDefaults}
                />
            );

            const cornerIcon = component.find("Icon").first();

            expect(cornerIcon.prop("iconName")).not.toEqual("check");
        });
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

    describe("Section", () => {
        const sectionDefaults = {
            children: (
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
            ),
            title: "Helpful Links"
        };
        it("renders the Section component", () => {
            const component = mount(<QuickActions.Section {...sectionDefaults} />);

            expect(component.exists()).toEqual(true);
        });

        it("Section gives normal context value when invertColors is false", () => {
            const component = shallow(<QuickActions.Section {...sectionDefaults} invertColors={false} />);

            const provider = component.find("ContextProvider");

            expect(provider.prop("value")).toEqual(actionColorSchemes.NORMAL);
        });

        it("Section gives inverted context value when invertColors is true", () => {
            const component = shallow(<QuickActions.Section {...sectionDefaults} invertColors />);

            const provider = component.find("ContextProvider");

            expect(provider.prop("value")).toEqual(actionColorSchemes.INVERTED);
        });
    });
});