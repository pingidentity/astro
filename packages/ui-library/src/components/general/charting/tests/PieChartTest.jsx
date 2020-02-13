import React from "react";
import _ from "underscore";
import { mount } from "enzyme";
import PieChart, { MetricsTooltip } from "../PieChart";

window.__DEV__ = true;

jest.dontMock("../PieChart");

describe("MetricsTooltip", () => {
    const getComponent = (props) => {
        const defaultProps = {
            color: "#0EA4D1",
            label: "Dogs",
            dataValue: "value",
        };

        return mount(<MetricsTooltip {...defaultProps} {...props} />);
    };

    it("renders the top label for a series", function () {
        const component = getComponent({
            series: [
                {
                    label: "Beagles",
                    value: 5
                }, {
                    label: "Yorkies",
                    value: 10,
                },
            ]
        });
        expect(component.find(".pie-chart__tooltip-top").exists()).toEqual(true);
    });

    it("renders the values for items in a series", function () {
        const component = getComponent({
            series: [
                {
                    label: "Beagles",
                    value: 5
                }, {
                    label: "Yorkies",
                    value: 10,
                },
            ]
        });
        expect(component.find(".pie-chart__tooltip-values").children().length).toEqual(2);
    });

    it("renders a single value", function () {
        const component = getComponent({
            value: 5,
        });
        expect(component.find(".pie-chart__tooltip-top").exists()).toEqual(false);
        expect(component.find(".pie-chart__tooltip-values").children().length).toEqual(1);
    });
});

describe("PieChart", () => {
    const getComponent = (props) => {
        props = _.defaults(props || {}, {
            showTooltips: true,
            data: [
                {
                    id: "dogs",
                    label: "Dogs",
                    color: "#0EA4D1",
                    series: [
                        {
                            label: "Beagles",
                            value: 5
                        }, {
                            label: "Yorkies",
                            value: 10,
                        },
                    ]
                },
                {
                    id: "bears",
                    label: "Bears",
                    color: "#96E7FF",
                    value: 13,
                },
            ]
        });
        return mount(<PieChart {...props} />);
    };

    it("renders with default data-id", function () {
        const component = getComponent();
        expect(component.find("[data-id='pie-chart']").exists()).toEqual(true);
    });

    it("renders the total of all the items", function () {
        const component = getComponent();
        expect(component.find(".pie-chart__center-value").text()).toEqual("28");
    });

    it("calls onMouseOver with correct data", () => {
        const onMouseOver = jest.fn();
        const component = getComponent({
            onMouseOver: onMouseOver,
        });

        const fakeEvent = { target: "doesn't matter" };

        component.instance()._mouseOver({
            id: "dogs"
        }, 0, fakeEvent);

        expect(onMouseOver).toHaveBeenCalledWith({
            id: "dogs",
            label: "Dogs",
            color: "#0EA4D1",
            series: [
                {
                    label: "Beagles",
                    value: 5
                }, {
                    label: "Yorkies",
                    value: 10,
                },
            ]
        }, fakeEvent);
    });

    it("calls onMouseOut with correct arguments", () => {
        const onMouseOut = jest.fn();
        const component = getComponent({
            onMouseOut: onMouseOut,
        });

        component.instance()._mouseOut();
        expect(onMouseOut).toHaveBeenCalled();
    });

    it("calls onClick with correct arguments", () => {
        const onClick = jest.fn();
        const component = getComponent({
            onClick,
        });

        const fakeEvent = { target: "doesn't matter" };

        component.instance()._onClick({
            id: "dogs"
        }, 0, fakeEvent);

        expect(onClick).toHaveBeenCalledWith({
            id: "dogs",
            label: "Dogs",
            color: "#0EA4D1",
            series: [
                {
                    label: "Beagles",
                    value: 5
                }, {
                    label: "Yorkies",
                    value: 10,
                },
            ]
        }, fakeEvent);
    });

    it("renders a tooltip if data is selected", () => {
        const component = getComponent();

        const tooltip = component.instance()._renderTooltip({
            payload: [
                {
                    payload: {
                        id: "dogs",
                    }
                }
            ]
        });

        expect(tooltip).toBeDefined();
    });

    it("renderTooltip renders custom content", () => {
        const component = getComponent({
            renderTooltip: () => "BORK BORK BORK",
        });

        const tooltip = component.instance()._renderTooltip({
            payload: [
                {
                    payload: {
                        id: "dogs",
                    }
                }
            ]
        });

        expect(tooltip.props.children).toEqual("BORK BORK BORK");
    });

    it("renders center value as data total by default", () => {
        const component = getComponent();

        const value = component.find(".pie-chart__center-value");

        expect(value.text()).toEqual("28");
    });

    it("doesn't render center if there's data", () => {
        const component = getComponent({ data: [] });

        expect(component.find(".pie-chart__center-info").exists()).toEqual(false);
    });
});