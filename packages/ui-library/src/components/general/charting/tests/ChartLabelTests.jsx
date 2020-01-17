import React from "react";
import { shallow } from "enzyme";
import ChartLabel from "../ChartLabel";

describe("ChartLabel", () => {
    const defaultProps = {
        color: "#000000",
        label: "something",
        x: 0,
        y: 0,
    };

    it("renders the component", () => {
        const component = shallow(
            <ChartLabel
                {...defaultProps}
            />
        );

        expect(component.exists()).toEqual(true);
    });

    it("calculates correct x position for non-overflowing label", () => {
        const component = shallow(
            <ChartLabel
                {...defaultProps}
                chartWidth={300}
                x={200}
            />
        );

        const label = component.find("Label");

        expect(label.prop("viewBox").x).toEqual(200);
    });

    it("calculates correct x position for left-overflowing label", () => {
        const component = shallow(
            <ChartLabel
                {...defaultProps}
                chartWidth={300}
                x={0}
            />
        );

        component.instance()._setLabelRef({
            getBBox: () => ({
                width: 50
            })
        });

        component.instance().forceUpdate();

        const label = component.find("Label");

        expect(label.prop("viewBox").x).toEqual(25);
    });

    it("calculates correct x position for right-overflowing label", () => {
        const component = shallow(
            <ChartLabel
                {...defaultProps}
                chartWidth={300}
                x={300}
            />
        );

        component.instance()._setLabelRef({
            getBBox: () => ({
                width: 50
            })
        });

        component.instance().forceUpdate();

        const label = component.find("Label");

        expect(label.prop("viewBox").x).toEqual(275);
    });
});
