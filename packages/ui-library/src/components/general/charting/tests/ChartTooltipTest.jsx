import React from "react";
import { shallow } from "enzyme";
import ChartTooltip, { textAlignments } from "../ChartTooltip";

window.__DEV__ = true;

describe("ChartTooltip", () => {
    const defaults = {
        values: []
    };

    const getComponent = (props) => (
        shallow(<ChartTooltip
            {...{
                ...defaults,
                ...props
            }}
        />)
    );

    it("should render the component", () => {
        const component = getComponent();
        expect(component.exists()).toEqual(true);
    });

    it("renders with left alignment", () => {
        const component = getComponent({
            textAlignment: textAlignments.LEFT
        });

        const leftAligned = component.find(".chart-tooltip--align-left");
        expect(leftAligned.exists()).toEqual(true);
    });

    it("renders with right alignment", () => {
        const component = getComponent({
            textAlignment: textAlignments.RIGHT
        });

        const rightAligned = component.find(".chart-tooltip--align-right");
        expect(rightAligned.exists()).toEqual(true);
    });

    it("renders with center alignment", () => {
        const component = getComponent({
            textAlignment: textAlignments.CENTER
        });

        const centerAligned = component.find(".chart-tooltip--align-center");
        expect(centerAligned.exists()).toEqual(true);
    });

    it("renders with horizontal flag if there are more than three values", () => {
        const component = getComponent({
            values: [
                {
                    id: 1,
                    value: 1
                },
                {
                    id: 2,
                    value: 2
                },
                {
                    id: 3,
                    value: 3
                },
                {
                    id: 4,
                    value: 4
                },
            ]
        });

        const horizontal = component.find(".chart-tooltip__value-container--horizontal");

        expect(horizontal.exists()).toEqual(true);
    });

    it("does not render with horizontal flag if there are less than three values", () => {
        const component = getComponent({
            values: [
                {
                    id: 1,
                    value: 1
                },
                {
                    id: 2,
                    value: 2
                },
            ]
        });

        const horizontal = component.find(".chart-tooltip__value-container--horizontal");

        expect(horizontal.exists()).toEqual(false);
    });

    it("renders with specified color if value has color property", () => {
        const component = getComponent({
            values: [
                {
                    color: "fake",
                    id: 1,
                    value: 1
                },
                {
                    id: 2,
                    value: 2
                },
            ]
        });

        const [withColor, withoutColor] = component.find(".chart-tooltip__value");

        expect(withColor.props.style.color).toEqual("fake");
        expect(withoutColor.props.style.color).not.toEqual("fake");
    });
});
