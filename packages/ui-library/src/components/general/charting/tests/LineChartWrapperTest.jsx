import React from "react";
import _ from "underscore";
import LineChartWrapper from "../LineChartWrapper";
import { mount } from "enzyme";
import { generateTheme } from "../../../../util/ChartingUtils";

window.__DEV__ = true;

jest.dontMock("../LineChartWrapper");

describe("LineChartWrapper", () => {
    const defaultProps = {
        width: 500,
        height: 150,
        theme: generateTheme("#FFA9E7", [
            {
                label: "Mobile",
                id: "mobile",
            }, {
                label: "Desktop",
                id: "desktop",
            }
        ]),
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
                id: "jan",
                label: "January",
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
                ]
            },
            {
                id: "feb",
                label: "February",
                data: [
                    {
                        label: "Day #1",
                        points: [
                            {
                                id: "mobile",
                                value: 2,
                            },
                            {
                                id: "desktop",
                                value: 6,
                            }
                        ]
                    }, {
                        label: "Day #2",
                        points: [
                            {
                                id: "mobile",
                                value: 7,
                            },
                            {
                                id: "desktop",
                                value: 4,
                            }
                        ]
                    }
                ]
            },
        ],
    };

    const getComponent = props => {
        const componentProps = _.defaults(props || {}, defaultProps);
        return mount(<LineChartWrapper {...componentProps} />);
    };

    it("renders with default data-id", function () {
        const component = getComponent();
        expect(component.find('[data-id="line-chart-wrapper"]').exists()).toEqual(true);
    });

    it("renders without data", () => {
        const component = getComponent({ data: undefined });
        expect(component.find('[data-id="line-chart-wrapper"]').exists()).toEqual(true);
    });

    it("renders the legend items", function () {
        const component = getComponent();
        expect(component.find(".legend__item").length).toEqual(2);
    });

    it("renders the rocker button for two or more items", function () {
        const component = getComponent();
        expect(component.find(".rocker-button").exists()).toBeTruthy();
    });

    it("selects the proper data set when clicked", function () {
        const onSelectDataSet = jest.fn();
        const component = getComponent({
            onSelectDataSet
        });
        component.find('[data-id="rocker-label_february"]').simulate("click");

        expect(onSelectDataSet).toHaveBeenCalledWith("feb", undefined);
    });

    it("doesn't render the rocker button for one item", function () {
        const component = getComponent({
            data: [
                {
                    label: "January",
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
                    ]
                },
            ]
        });
        expect(component.find(".rocker-button").exists()).toBeFalsy();
    });
});