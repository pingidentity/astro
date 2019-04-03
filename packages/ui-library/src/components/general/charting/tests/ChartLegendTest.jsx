import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../../testutil/TestUtils";
import _ from "underscore";
import ChartLegend from "../ChartLegend";


describe("ChartLegend", function () {
    const componentId = "chart-legend";

    function getComponent(opts) {
        const withDefaults = _.defaults(opts || {}, {
            "data-id": componentId,
            label: "Test Legend",
            data: [
                {
                    id: "Red",
                    color: "#FF0000"
                },
                {
                    id: "Blue",
                    color: "#FF0000"
                }
            ]
        });

        return ReactTestUtils.renderIntoDocument(<div><ChartLegend {...withDefaults} /></div>);
    }

    it("rendered component with data-id=chart-legend", function () {
        const component = getComponent();

        const element = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });

    it("fires a mouseOver event", function () {
        const cb = jest.fn();
        const component = getComponent({
            onMouseOver: cb
        });

        const element = TestUtils.scryRenderedDOMNodesWithDataId(component, "chart-legend-key")[0];

        ReactTestUtils.Simulate.mouseOver(element);

        expect(cb).toHaveBeenCalled();
    });

    it("fires a mouseOut event", function () {
        const cb = jest.fn();
        const component = getComponent({
            onMouseOut: cb
        });

        const element = TestUtils.scryRenderedDOMNodesWithDataId(component, "chart-legend-key")[0];

        ReactTestUtils.Simulate.mouseOut(element);

        expect(cb).toHaveBeenCalled();
    });
});