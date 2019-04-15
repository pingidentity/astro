import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../../testutil/TestUtils";
import _ from "underscore";
import FrequencyCard from "../FrequencyCard";


describe("FrequencyCard", function () {
    const componentId = "frequency-card";

    const legend = [
        { id: "At least daily", color: "#193967" },
        { id: "At least weekly", color: "#4C8DCA" },
        { id: "At least monthly" },
        { id: "At least quarterly", color: "#6ACCE0" },
        { id: "Less than quarterly", color: "#EF6A04" },
    ];

    const donutData = [
        { id: "Enabled Users", value: 120543, color: "#E12F51" },
        { id: "Inactive Users", value: 51233 },
        { id: "Disabled Users", value: 3000 },
    ];

    function getComponent(opts) {
        const withDefaults = _.defaults(opts || {}, {
            "data-id": componentId,
            donutData: donutData,
            barData: [
                {
                    id: "First",
                    legend: legend,
                    data: [
                        {
                            id: "Feb 2018",
                            data: [ 60, 20, 10, 5, 5 ]
                        },
                        {
                            id: "March 2018",
                            data: [60, 20, 10, 5, 5]
                        },
                        {
                            id: "April 2018",
                            data: [60, 20, 10, 5, 5]
                        }
                    ]
                },
                {
                    id: "Second",
                    legend: legend,
                    data: [
                        {
                            id: "May 2018",
                            data: [60, 20, 10, 5, 5]
                        },
                        {
                            id: "June 2018",
                            data: [60, 20, 10, 5, 5]
                        },
                        {
                            id: "July 2018",
                            data: [60, 20, 10, 5, 5]
                        }
                    ]
                }
            ]
        });

        return ReactTestUtils.renderIntoDocument(<FrequencyCard {...withDefaults} />);
    }

    it("rendered component with data-id=frequency-card", function () {
        const component = getComponent({
        });

        const element = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });


    it("renders a label and number", function () {
        const component = getComponent();

        const value = component._renderNumber(3);

        expect(value).toEqual(3);
    });

    it("renders value correctly when greater than 1,000", function () {
        const component = getComponent();

        const value = component._renderNumber(1234);

        expect(value).toEqual("1.23k");
    });

    it("renders value correctly when greater than 10,000", function () {
        const component = getComponent();

        const value = component._renderNumber(12345);

        expect(value).toEqual("12.3k");
    });

    it("renders value correctly when greater than 100,000", function () {
        const component = getComponent();

        const value = component._renderNumber(123456);

        expect(value).toEqual("123k");
    });

    it("renders value correctly when than 1,000,000", function () {
        const component = getComponent();

        const value = component._renderNumber(1234567);

        expect(value).toEqual("1.23m");
    });

    it("selects the proper data set when _selectDataSet is called", () => {
        const component = getComponent();

        component._selectDataSet(1);

        expect(component.state.selectedStacked).toEqual(1);
    });

    it("returns proper donut chart label", () => {
        const component = getComponent();

        const d = [
            { value: 10 },
            { value: 10 },
            { value: 10 },
            { value: 10 },
            { value: 10 },
        ];

        const val = component._renderDonutLabel(d, 10);

        expect(val).toEqual("20%");
    });

    it("selects an item", () => {
        const component = getComponent();

        component._itemSelect("Test item");

        expect(component.state.hoveredItem.id).toEqual("Test item");
    });

    it("changes the rocker selection", () => {
        const component = getComponent();

        component._handleRockerChange({
            index: 1
        });

        expect(component.state.selectedStacked).toEqual(1);
    });

    it("clears selected item", () => {
        const component = getComponent();

        component._itemSelect("Test item");
        component._itemClearSelection();

        expect(component.state.hoveredItem).toEqual({});
    });

    it("finds an item by its ID", () => {
        const component = getComponent();

        const items = [
            {
                id: "Item 1"
            },
            {
                id: "Item 2"
            }
        ];

        const item = component._findItemById("Item 2", items);

        expect(item.id).toEqual("Item 2");
    });

    it("populates the selected item on donut chart legend mouseover", () => {
        const component = getComponent();

        const parent = TestUtils.findRenderedDOMNodeWithDataId(component, "donut-chart-legend");
        const legendElem = TestUtils.scryRenderedDOMNodesWithDataId(parent, "chart-legend-key")[0];

        ReactTestUtils.Simulate.mouseOver(legendElem);

        expect(component.state.hoveredItem).toEqual({
            ...donutData[0],
            "strokeWidth": 4,
        });
    });

    it("populates the selected item on bar chart legend mouseover", () => {
        const component = getComponent();

        const parent = TestUtils.findRenderedDOMNodeWithDataId(component, "stacked-chart-legend");
        const legendElem = TestUtils.scryRenderedDOMNodesWithDataId(parent, "chart-legend-key")[0];

        ReactTestUtils.Simulate.mouseOver(legendElem);

        expect(component.state.hoveredItem).toEqual(legend[0]);
    });

    it("clears the selected item on legend mouseout", () => {
        const component = getComponent();

        component._itemSelect("Test item");

        const parent = TestUtils.findRenderedDOMNodeWithDataId(component, "donut-chart-legend");
        const legendElem = TestUtils.scryRenderedDOMNodesWithDataId(parent, "chart-legend-key")[0];

        ReactTestUtils.Simulate.mouseOut(legendElem);

        expect(component.state.hoveredItem).toEqual({});
    });

    it("fires donut chart click event", () => {
        const fn = jest.fn();
        const component = getComponent({
            onDonutChartClick: fn
        });

        const event = { preventDefault: true };

        component._handleDonutChartClick({
            name: "Enabled Users"
        }, event);

        expect(fn).toHaveBeenCalled();
    });

    it("populates the selected item from the donut cell on mouseover", () => {
        const item = {
            id: "Test item",
            color: "#000000",
            value: 100
        };

        const component = getComponent({
            donutData: [ item ]
        });

        component._donutChartMouseOver(item);

        expect(component.state.hoveredItem).toEqual({ ...item, strokeWidth: 4 });
    });

    it("clears the selected item from the donut cell on mouseout", () => {
        const item = {
            id: "Test item",
            color: "#000000",
            value: 100
        };

        const component = getComponent({
            donutData: [item]
        });

        component._itemSelect("Test item");

        component._donutChartMouseOut(item);

        expect(component.state.hoveredItem).toEqual({});
    });

    it("populates the selected item from the stacked chart on mouseover", () => {
        const item = {
            y: {
                label: "Test item"
            }
        };

        const component = getComponent();

        component._barChartMouseOver(item);

        expect(component.state.hoveredItem).toEqual({ id: item.y.label });
    });

    it("clears the selected item from the stacked chart on mouseout", () => {
        const item = {
            y: {
                label: "Test item"
            }
        };

        const component = getComponent();

        component._barChartMouseOver(item);

        expect(component.state.hoveredItem).toEqual({ id: item.y.label });

        component._barChartMouseOut(item);

        expect(component.state.hoveredItem).toEqual({});
    });
});