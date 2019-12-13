import React from "react";
import { shallow } from "enzyme";
import ColumnChart from "../ColumnChart";

describe("ColumnChart", () => {
    const onMouseOut = jest.fn();
    const onMouseOver = jest.fn();

    const defaultProps = {
        data: [
            {
                id: "1D",
                helpText: "This is by day",
                data: [
                    {
                        id: "November 11, 2019",
                        data: [
                            60,
                            20,
                        ]
                    },
                    {
                        id: "November 12, 2019",
                        data: [
                            20,
                            30,
                        ]
                    },
                    {
                        id: "November 13, 2019",
                        data: [
                            40,
                            60,
                        ]
                    },
                ]
            }
        ],
        legend: [
            { id: "Authenticators", color: "#49BF6B" },
            { id: "Test Thing", color: "#379250" },
        ],
        onMouseOut,
        onMouseOver,
        title: "VERY IMPORTANT PLEASE PAY ATTENTION"
    };

    it("renders the component", () => {
        const component = shallow(
            <ColumnChart
                {...defaultProps}
            />
        );

        expect(component.exists()).toEqual(true);
    });

    // Testing all of these internal methods isn't ideal, but
    // it seemed like a more maintainable solution than attempting to mock
    // Recharts and all of its interactions.

    it("calls onMouseOver with correct data", () => {
        const component = shallow(
            <ColumnChart
                {...defaultProps}
            />
        );

        const value = { name: "Your favorite value" };
        const fakeEvent = { target: "doesn't matter" };

        component.instance()._handleMouseOver("Authenticators")(value, 1, fakeEvent);

        expect(onMouseOver).toHaveBeenCalledWith({
            x: {
                index: 1,
                label: "Your favorite value",
            },
            y: {
                index: 1,
                label: "Authenticators",
            },
        }, fakeEvent);
    });

    it("renders a tooltip if data is selected", () => {
        const component = shallow(
            <ColumnChart
                {...defaultProps}
            />
        );

        const value = { name: "Your favorite value" };
        const fakeEvent = { target: "doesn't matter" };

        component.instance()._handleMouseOver("Authenticators")(value, 0, fakeEvent);
        const tooltip = component.instance()._renderTooltip();

        expect(tooltip).toBeDefined();
    });

    it("doesn't render tooltip if there's nothing selected", () => {
        const component = shallow(
            <ColumnChart
                {...defaultProps}
            />
        );

        const tooltip = component.instance()._renderTooltip();

        expect(tooltip).not.toBeDefined();
    });

    it("calls onMouseOut with correct arguments", () => {
        const component = shallow(
            <ColumnChart
                {...defaultProps}
            />
        );

        component.instance()._handleMouseOut();
        expect(onMouseOut).toHaveBeenCalled();
    });
});
