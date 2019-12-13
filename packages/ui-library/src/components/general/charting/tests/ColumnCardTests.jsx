import React from "react";
import { shallow } from "enzyme";
import ColumnCard from "../ColumnCard";

describe("ColumnCard", () => {
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
        title: "VERY IMPORTANT PLEASE PAY ATTENTION"
    };

    it("renders the component", () => {
        const component = shallow(
            <ColumnCard
                {...defaultProps}
            />
        );

        expect(component.exists()).toEqual(true);
    });

    it("renders the chart and legend if loading is false", () => {
        const component = shallow(
            <ColumnCard
                {...defaultProps}
                loading={false}
            />
        ).dive();

        expect(component.find("Legend").exists()).toEqual(true);
        expect(component.find("ColumnChart").exists()).toEqual(true);
    });

    it("does not render the chard and legend if loading is true", () => {
        const component = shallow(
            <ColumnCard
                {...defaultProps}
                loading={true}
            />
        ).dive();

        expect(component.find("Legend").exists()).toEqual(false);
        expect(component.find("ColumnChart").exists()).toEqual(false);
    });

    it("calls onMouseOut with correct arguments", () => {
        const onMouseOut = jest.fn();
        const component = shallow(
            <ColumnCard
                {...defaultProps}
                onMouseOut={onMouseOut}
            />
        ).dive();

        const chart = component.find("ColumnChart");
        const event = { target: "nothing important" };
        chart.prop("onMouseOut")(event);

        expect(onMouseOut).toHaveBeenCalledWith(event);
    });

    it("calls onMouseOver with correct arguments", () => {
        const onMouseOver = jest.fn();
        const component = shallow(
            <ColumnCard
                {...defaultProps}
                onMouseOver={onMouseOver}
            />
        ).dive();

        const chart = component.find("ColumnChart");
        const value = { name: "fake stuff" };
        const event = { target: "nothing important" };
        chart.prop("onMouseOver")(value, event);

        expect(onMouseOver).toHaveBeenCalledWith(value, event);
    });
});
