import React from "react";
import _ from "underscore";
import LineChart from "../LineChart";
import { mount } from "enzyme";

window.__DEV__ = true;

jest.dontMock("../LineChart");

describe("LineChart", () => {
    const defaultProps = {
        "data-id": "line-chart",
        width: 500,
        height: 150,
        lineColors: [
            {
                id: "mobile",
                color: "#FFA9E7",
            },
            {
                id: "desktop",
                color: "#FF84E8",
            }
        ],
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
});