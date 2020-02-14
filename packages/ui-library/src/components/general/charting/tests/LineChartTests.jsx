import React from "react";
import _ from "underscore";
import { mount } from "enzyme";

import LineChart from "../LineChart";
import { generateTheme } from "../../../../util/ChartingUtils";

window.__DEV__ = true;

jest.dontMock("../LineChart");

describe("LineChart", () => {
    const legend = [
        {
            label: "Mobile",
            id: "mobile",
        }, {
            label: "Desktop",
            id: "desktop",
        }
    ];

    const defaultProps = {
        "data-id": "line-chart",
        width: 500,
        height: 150,
        theme: generateTheme("#4c8dca", legend),
        legend: [
            {
                label: "Mobile",
                id: "mobile",
            }, {
                label: "Desktop",
                id: "desktop",
            }
        ],
        data: [
            {
                label: "Day #1",
                points: [
                    {
                        id: "mobile",
                        value: 8,
                    },
                    {
                        id: "desktop",
                        value: 3,
                    }
                ]
            }, {
                label: "Day #2",
                points: [
                    {
                        id: "mobile",
                        value: 2,
                    },
                    {
                        id: "desktop",
                        value: 7,
                    }
                ]
            }
        ],
    };

    const getComponent = props => {
        const componentProps = _.defaults(props || {}, defaultProps);
        return mount(<LineChart {...componentProps} />);
    };

    it("renders with default data-id", function () {
        const component = getComponent();
        expect(component.find('[data-id="line-chart"]').exists()).toEqual(true);
    });

    it("renders with empty dataset", () => {
        const component = getComponent({ data: [] });
        expect(component.exists()).toEqual(true);
    });

    it("renders with empty legend", () => {
        const component = getComponent({ legend: [] });
        expect(component.exists()).toEqual(true);
    });

    it("renders the highlight", function () {
        const component = getComponent({
            showHighlight: true,
            highlightRange: [0, 1],
        });

        const linearGradientId = component.find("linearGradient").first().prop("id");

        expect(component.find(`path[stroke="url(#${linearGradientId})"]`).exists()).toEqual(true);
    });

    it("calls onHoverDataPoint with correct data", () => {
        const onHoverDataPoint = jest.fn();
        const component = getComponent({
            onHoverDataPoint,
        });

        component.instance()._onHoverDataPoint({
            activeTooltipIndex: 1,
        });

        expect(onHoverDataPoint).toHaveBeenCalledWith(1);
    });

    it("renders a label if a point is highlighted", () => {
        const component = getComponent();

        component.instance()._onHoverDataPoint({
            activeTooltipIndex: 1,
        });

        component.instance().forceUpdate();

        const line = component.find("ReferenceLine");

        expect(line.prop("label")({ viewBox: { x: 0, y: 0 } })).toBeTruthy();
    });

    it("does not render a label if a point is not highlighted", () => {
        const component = getComponent();

        const line = component.find("ReferenceLine");

        expect(line.prop("label")({ viewBox: { x: 0, y: 0 } })).toEqual(null);
    });
});
