window.__DEV__ = true;

import React from "react";
import { Line, ReferenceLine } from "recharts";
import { shallow } from "enzyme";
import _ from "underscore";
import { mountSnapshotDataIds } from "../../../../testutil/TestUtils";

import AccessoriesLineChart from "../AccessoriesLineChart";

describe("AccessoriesLineChartTest", function () {
    const defaultData = [
        { id: 1, value: "2" },
        { id: 2, value: "12" },
        { id: 3, value: "16" },
        { id: 4, value: "19" },
        { id: 5, value: "20" },
        { id: 6, value: "20" },
    ];

    const partialData = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4, value: "19" },
        { id: 5, value: "20" },
        { id: 6, value: "20" },
    ];

    const emptyData = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
    ];

    const defaultProps = {
        key: "accessories-line-chart",
        title: "Avg daily sign-ons:",
        count: "1,234,234",
        countLabel: "Past 7 days",
        hint: "See Contributing Data",
        chartLabel: "12 wk trend",
        trend: "+ 8.6%",
        isTrendPositive: true,
        data: defaultData
    };

    function getComponent(customProps) {
        const props = _.defaults(customProps || {}, defaultProps);

        return shallow(<AccessoriesLineChart {...props} />);
    }

    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <AccessoriesLineChart
                hint="It's a secret"
                {...defaultProps}
            />
        );
    });

    it("should render with default data-id", function() {
        const component = getComponent();
        const accessories = component.getElements();

        expect(accessories.length).toBe(3);
    });

    it("should render without title", function() {
        const component = getComponent({ title: "" });
        const accessories = component.at(0).getElement();

        expect(accessories).toBe(null);
    });

    it("should render without count", function() {
        const component = getComponent({ count: "" });
        const accessories = component.at(1).getElement();

        expect(accessories).toBe(null);
    });

    it("should render without helphint", function() {
        const component = getComponent({ hint: "" });
        const сhartLineWrapper = component.at(2).getElement();

        expect(сhartLineWrapper.key).toBe("chart-wrapper");
    });

    it("should render chart and trend black if trand is negative", function() {
        const component = getComponent({ isTrendPositive: false });
        const chartLine = component.find(Line);

        expect(chartLine.prop("stroke")).toBe("#000");
    });

    it("should render without ReferenceLine if all data exist", function() {
        const component = getComponent();
        const isLineEmpty = component.find(ReferenceLine).isEmpty();

        expect(isLineEmpty).toBeTruthy();
    });

    it("should render ReferenceLine if not all data exist", function() {
        const component = getComponent({ data: partialData });
        const line = component.find(ReferenceLine).getElement();

        expect(line).toBeDefined();
    });

    it("should render ReferenceLine if have not data at all", function() {
        const component = getComponent({ data: emptyData });
        const line = component.find(ReferenceLine).getElement();

        expect(line).toBeDefined();
    });
});
