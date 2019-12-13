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
        dataKey: "name",
        dataValue: "value",
        data: [
            { name: "Test 1", value: 4 },
            { name: "Test 2", value: 7 },
            { name: "Test 3", value: 2 },
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
        });

        const linearGradientId = component.find("linearGradient").prop("id");

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