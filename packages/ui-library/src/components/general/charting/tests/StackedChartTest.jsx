import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../../testutil/TestUtils";
import _ from "underscore";
import StackedChart from "../StackedChart";
import Colors from "../Cards/dashboardColors";

describe("StackedChart", function () {
    const componentId = "stacked-chart";

    function getComponent(opts) {
        const exampleData = [10, 20, 30, 40];
        const legend = [
            { id: "At least daily" },
            { id: "At least weekly" },
            { id: "At least monthly" },
            { id: "At least quarterly" },
            { id: "Less than quarterly" },
        ];

        const colors = Object.values(Colors.COLORS);

        const withDefaults = _.defaults(opts || {}, {
            "data-id": componentId,
            id: "Test Chart",
            legend,
            colors,
            selectedId: "Col 2",
            data: [
                {
                    id: "Col 1",
                    data: exampleData
                },
                {
                    id: "Col 2",
                    data: exampleData
                }
            ]
        });

        return ReactTestUtils.renderIntoDocument(<StackedChart {...withDefaults} />);
    }

    it("rendered component with data-id=stacked-chart", function () {
        const component = getComponent();

        const element = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });

    it("renders tooltip", function () {
        const component = getComponent();

        component.setState({
            selected: { y: { index: 0 } }
        }, () => {
            const tooltip = component._renderTooltip({ payload: [{ payload: { name: "foo" } }] });

            expect(typeof tooltip).toBeTruthy();
        });

    });

    it("properly digests API-style data into Rechart data", function () {
        const exampleData = [10, 20, 30, 40];

        const data = [
            {
                id: "Jan 2018",
                data: exampleData,
            },
            {
                id: "Feb 2018",
                data: exampleData,
            }
        ];

        const component = getComponent();

        const digested = component._digestData(data);

        expect(digested.length).toEqual(2);
        expect(digested[0].name).toEqual("Jan 2018");
        expect(Object.keys(digested[0]).length).toEqual(5);
    });

    it("renders with a new selectedId", function () {
        const component = getComponent();

        const testId = "Some value";

        component.setState({
            legend: [testId]
        });

        const shouldUpdate = component.shouldComponentUpdate({ selectedId: testId });

        expect(shouldUpdate).toEqual(true);
    });

    it("fires the onClick event", function () {
        const fn = jest.fn();

        const component = getComponent({
            onClick: fn
        });

        component._handleOnClick("At least daily")({ name: "Col 2" }, 0, { preventDefault: true });

        expect(fn).toHaveBeenCalled();
    });

    it("fires the onMouseOver event", function () {
        const fn = jest.fn();

        const component = getComponent({
            onMouseOver: fn
        });

        component._handleMouseOver("At least daily")({ name: "Col 2" }, 0, { preventDefault: true });

        expect(fn).toHaveBeenCalled();
    });
});