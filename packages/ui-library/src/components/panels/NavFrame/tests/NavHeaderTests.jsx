import React from "react";
import { mount, shallow } from "enzyme";
import FlexRow from "../../../layout/FlexRow";
import NavHeader, {
    NavLink,
    NavMenu
} from "../NavHeader";

describe("NavHeader", () => {
    const defaultProps = {
        navTree: [
            {
                id: "SNAAAARF",
                label: "Header 1"
            },
            {
                id: "1",
                label: "Header 2",
            }
        ]
    };
    it("renders the component", () => {
        const component = shallow(
            <NavHeader
                {...defaultProps}
            />
        );

        expect(component.exists()).toEqual(true);
    });

    it("renders dividers between right content nodes", () => {
        const component = shallow(
            <NavHeader
                {...defaultProps}
                right={[
                    "",
                    "",
                    ""
                ]}
            />
        ).dive();

        const [, rightRow] = component.find(FlexRow);

        expect(rightRow.props.children.length).toEqual(5);
    });

    describe("NavMenu", () => {
        const defaultMenuProps = {
            items: [
                {
                    icon: "globe",
                    id: 1,
                    label: "This thing right here"
                },
                {
                    icon: "globe",
                    id: 2,
                    label: "This other, worse thing"
                }
            ]
        };

        it("renders the component", () => {
            const component = shallow(
                <NavMenu
                    {...defaultMenuProps}
                />
            );

            expect(component.exists()).toBeTruthy();
        });

        it("gives each item an onClick function that sends back correct arguments", () => {
            const onClickItem = jest.fn();
            const component = shallow(
                <NavMenu
                    {...defaultMenuProps}
                    onClickItem={onClickItem}
                />
            );

            const [{ onClick }] = component.prop("items");
            onClick();

            expect(onClickItem.mock.calls[0][0]).toEqual(1);
        });
    });

    describe("NavLink", () => {
        it("renders the component", () => {
            // Doing a mount instead of a shallow to render the NavLink as well
            const component = mount(
                <NavLink
                    iconName="globe"
                    href="OH NO DON'T GO HERE IT'S JUST AWFUL"
                />
            );

            expect(component.exists()).toEqual(true);
        });
    });
});
