import React from "react";
import { shallow } from "enzyme";
import ColumnChart, { ColumnChartTitle } from "../ColumnChart";
import { YAxis, XAxis } from "recharts";

describe("ColumnChart", () => {
    const onClick = jest.fn();
    const onMouseOut = jest.fn();
    const onMouseOver = jest.fn();

    const defaultProps = {
        data: [
            {
                id: "November 11, 2019",
                data: [
                    {
                        id: "authenticators",
                        value: 60,
                    },
                    {
                        id: "test-thing",
                        value: 20,
                    }
                ]
            },
            {
                id: "November 12, 2019",
                data: [
                    {
                        id: "authenticators",
                        value: 20,
                    },
                    {
                        id: "test-thing",
                        value: 30,
                    }
                ]
            },
            {
                id: "November 13, 2019",
                data: [
                    {
                        id: "authenticators",
                        value: 40,
                    },
                    {
                        id: "test-thing",
                        value: 60,
                    }
                ]
            },
        ],
        legend: [
            { label: "Authenticators", color: "#49BF6B", id: "authenticators" },
            { label: "Test Thing", color: "#379250", id: "test-thing" },
        ],
        onClick,
        onMouseOut,
        onMouseOver,
        title: "VERY IMPORTANT PLEASE PAY ATTENTION",

    };

    it("renders the component", () => {
        const component = shallow(
            <ColumnChart
                {...defaultProps}
            />
        );

        expect(component.exists()).toEqual(true);
    });

    it("renders the component unstacked", () => {
        const component = shallow(
            <ColumnChart
                {...defaultProps}
                stacked={false}
            />
        );

        expect(component.exists()).toEqual(true);
    });


    it("renders the proper number of y-axes", () => {
        const component = shallow(
            <ColumnChart
                {...defaultProps}
                legend={[
                    { label: "Authenticators", color: "#49BF6B", id: "authenticators" },
                    { label: "Test Thing", color: "#379250", yAxisId: "test-axis", id: "test-thing" },
                ]}
            />
        );

        expect(component.find("YAxis").length).toEqual(2);
    });

    // Testing all of these internal methods isn't ideal, but
    // it seemed like a more maintainable solution than attempting to mock
    // Recharts and all of its interactions.

    it("calls onClick with correct data", () => {
        const component = shallow(
            <ColumnChart
                {...defaultProps}
            />
        );

        const value = { name: "Your favorite value" };
        const fakeEvent = { target: "doesn't matter" };

        component.instance()._handleClick("Authenticators")(value, 1, fakeEvent);

        expect(onClick).toHaveBeenCalledWith({
            x: {
                index: 1,
                label: "Your favorite value",
            },
            y: {
                index: -1,
                label: "Authenticators",
            },
        }, fakeEvent);
    });

    it("calls onMouseOver with correct data", () => {
        const component = shallow(
            <ColumnChart
                {...defaultProps}
            />
        );

        const value = { name: "November 11, 2019" };
        const fakeEvent = { target: "doesn't matter" };

        component.instance()._handleMouseOver("authenticators")(value, 1, fakeEvent);

        expect(onMouseOver).toHaveBeenCalledWith({
            x: {
                index: 1,
                label: "November 11, 2019",
            },
            y: {
                index: 1,
                label: "authenticators",
            },
        }, fakeEvent);
    });

    it("renders a tooltip if data is selected", () => {
        const component = shallow(
            <ColumnChart
                {...defaultProps}
            />
        );

        const value = { name: "November 11, 2019" };
        const fakeEvent = { target: "doesn't matter" };

        component.instance()._handleMouseOver("authenticators")(value, 0, fakeEvent);
        const tooltip = component.instance()._renderTooltip();

        expect(tooltip).toBeDefined();
    });

    it("renderTooltip renders custom content", () => {
        const component = shallow(
            <ColumnChart
                {...defaultProps}
                renderTooltip={() => "BORK BORK BORK"}
            />
        );

        const value = { name: "November 11, 2019" };
        const fakeEvent = { target: "doesn't matter" };

        component.instance()._handleMouseOver("authenticators")(value, 0, fakeEvent);
        const tooltip = component.instance()._renderTooltip();

        expect(tooltip.props.children).toEqual("BORK BORK BORK");
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

    it("renders xAxis information", () => {
        const component = shallow(
            <ColumnChart
                {...defaultProps}
                hideX={false}
            />
        );

        expect(component.find(XAxis).exists()).toBeTruthy();
    });

    it("renders yAxis information", () => {
        const component = shallow(
            <ColumnChart
                {...defaultProps}
                hideY={false}
            />
        );
        expect(component.find(YAxis).exists()).toBeTruthy();
    });

    describe("ColumnCardTitle", () => {
        it("renders the component", () => {
            const component = shallow(<ColumnChartTitle title="SNAAAAAARF" />);
            expect(component.exists()).toEqual(true);
        });
    });
});
