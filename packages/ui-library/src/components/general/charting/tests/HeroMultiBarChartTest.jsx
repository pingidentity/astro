import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import { mount } from "enzyme";
import TestUtils from "../../../../testutil/TestUtils";
import HeroMultiBarChart from "../HeroMultiBarChart";
import _ from "underscore";
import { BarChart } from "recharts";
import { mountSnapshotDataIds } from "../../../../devUtil/EnzymeUtils";

jest.dontMock("recharts");
jest.dontMock("../HeroMultiBarChart");
jest.dontMock("../../../forms/RockerButton");
jest.useFakeTimers();

describe("HeroMultiBarChart", function () {
    const Wrapper = TestUtils.UpdatePropsWrapper;

    const chartData = [
        { id: "1/1", yups: 111, nopes: 222 },
        { id: "1/2", yups: 11111, nopes: 22222 },
        { id: "1/3", yups: 111111, nopes: 222222 },
    ];

    const defaultProps = {
        "data-id": "custom-chart",
        bgImage: "http://server.com/my/image/img.jpg",
        title: "Totals for Today",
        legend: [
            {
                label: "MFA",
                value: "1000",
                textColor: "#fff",
            }
        ],
        data: chartData,
        xAxisKey: "id",
        dataKeys: ["yups", "nopes"],
        dataKeysStyle: { nopes: { color: "#e34234", hoverColor: "#e34255" } },
        rockerButton: <div>Rocker button</div>,

    };

    const getComponent = props => {
        const componentProps = _.defaults(props || {}, defaultProps);
        return ReactTestUtils.renderIntoDocument(
            <HeroMultiBarChart {...componentProps} />
        );
    };

    const getMountedComponent = props => {
        const componentProps = _.defaults(props || {}, defaultProps);
        return mount(<HeroMultiBarChart {...componentProps} />);
    };

    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <HeroMultiBarChart
                {...defaultProps}
            />
        );
    });

    it("renders with the default data-id", function () {
        const component = getComponent();
        const container = TestUtils.findRenderedDOMNodeWithDataId(component, defaultProps["data-id"]);

        expect(container).toBeTruthy();
    });

    it("renders the strings", function () {
        const component = getComponent();

        const title = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__title");
        expect(title.textContent).toBe(defaultProps.title);

        const legendInfo = TestUtils.findRenderedDOMNodeWithClass(component, "legend__item-info");
        expect(legendInfo.textContent).toBe(defaultProps.legend[0].label);

        const legendValue = TestUtils.findRenderedDOMNodeWithClass(component, "legend__item-value");
        expect(legendValue.textContent).toBe(defaultProps.legend[0].value);


    });

    it("renders the bg image", function () {
        const component = ReactTestUtils.renderIntoDocument(
            <Wrapper
                type={HeroMultiBarChart}
                {...defaultProps}
            />
        );

        const container = TestUtils.findRenderedDOMNodeWithDataId(component, defaultProps["data-id"]);

        expect(container.style.backgroundImage).toBe(`url(${defaultProps.bgImage})`);

        component._setProps({ bgImage: null });

        expect(container.style.backgroundImage).toBe("");
    });

    it("renders the x-axis", function () {
        const wrapper = getMountedComponent();
        const topChart = wrapper.find(BarChart).get(0);
        const xAxis = topChart.props.children[2];

        expect(xAxis.props.dataKey).toBe("id");
    });

    it("renders the x-axis in the various font sizes", function () {
        const fontSizeData = [
            { size: 15, threshold: 1 },
            { size: 14, threshold: 19 },
            { size: 13, threshold: 22 },
            { size: 12, threshold: 24 },
            { size: 11, threshold: 26 },
        ];

        fontSizeData.forEach((item) => {
            let customChartData = [];

            for (let i = 0; i < item.threshold; i += 1) {
                customChartData.push({ id: i, yups: 1, nopes: 1 });
            }

            const wrapper = getMountedComponent({ data: customChartData });
            const topChart = wrapper.find(BarChart).get(0);
            const xAxis = topChart.props.children[2];
            expect(xAxis.props.tick.fontSize).toEqual(item.size);
        });
    });

    it("renders the multi bars", function () {
        const wrapper = getMountedComponent();

        const barChart = wrapper.find(BarChart).at(0).instance();
        expect(barChart.props["data-id"]).toBe(`${defaultProps["data-id"]}-multi-bar-chart`);
        expect(barChart.props.data.length).toBe(chartData.length);
    });

    it("does not render the error or spinner by default", function () {
        const component = getComponent();

        const errorMessage = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__error");
        expect(errorMessage).toBeFalsy();

        const spinner = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__loader");
        expect(spinner).toBeFalsy();
    });

    it("renders the error when provided", function () {
        const errorMessageText = "Uh oh.";
        const component = getComponent({ errorMessage: errorMessageText });

        const errorMessage = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__error");
        expect(errorMessage).toBeTruthy();
        expect(errorMessage.textContent).toBe(errorMessageText);

        const title = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__title");
        expect(title).toBeFalsy();

        const barChart = TestUtils.findRenderedDOMNodeWithClass(
            component,
            `${defaultProps["data-id"]}-multi-bar-chart`
        );
        expect(barChart).toBeFalsy();

        const rockerButton = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__rocker");
        expect(rockerButton).toBeTruthy();
    });

    it("renders only the spinner when loading", function () {
        const loaderMessageText = "Wait!";
        const component = getComponent({
            loading: true,
            loadingMessage: loaderMessageText,
        });

        const spinnerContainer = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__loader");
        expect(spinnerContainer).toBeTruthy();

        const spinnerText = TestUtils.findRenderedDOMNodeWithClass(spinnerContainer, "page-loader__text");
        expect(spinnerText.textContent).toBe(loaderMessageText);

        const title = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__title");
        expect(title).toBeFalsy();

        const barChart = TestUtils.findRenderedDOMNodeWithClass(
            component,
            `${defaultProps["data-id"]}-multi-bar-chart`
        );
        expect(barChart).toBeFalsy();

        const rockerButton = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__rocker");
        expect(rockerButton).toBeTruthy();
    });

    it("sets proper label on mouse over", function () {
        const component = getComponent();
        const barSelected = {
            key: "yups",
            index: 0,
            entry: { id: "1/1", yups: 111, nopes: 222 }
        };

        component._handleBarMouseOver(barSelected.key, barSelected.index, barSelected.entry)();
        component._renderHoverLabel({
            index: barSelected.index,
            labelKey: barSelected.key,
            value: barSelected.entry[barSelected.key]
        });
        expect(component.state.barSelected).toEqual(barSelected);
    });

    it("sets the selected element on mouse over with labelFormater", function () {
        const component = getComponent({ labelFormater: (value) => value });
        const barSelected = {
            key: "yups",
            index: 1,
            entry: chartData[1]
        };

        component._handleBarMouseOver(barSelected.key, barSelected.index, barSelected.entry)();
        component._renderBars();
        component._renderHoverLabel({
            index: barSelected.index,
            labelKey: barSelected.key,
            value: barSelected.entry[barSelected.key],
        });
        expect(component.state.barSelected).toEqual(barSelected);
    });

    it("clears the selected element on mouse out", function () {
        const component = getComponent();
        const barSelected = {
            key: "yups",
            index: 0,
            entry: chartData[0]
        };

        component._handleBarMouseOver(barSelected.key, barSelected.index, barSelected.entry)();
        expect(component.state.barSelected).toEqual(barSelected);

        component._handleBarMouseOut();
        component._renderHoverLabel({
            index: barSelected.index,
            labelKey: barSelected.key,
            value: barSelected.entry[barSelected.key],
        });
        expect(component.state.barSelected).toEqual(null);
    });

    it("_kFormatter format to proper format", function () {
        const component = getComponent();

        expect(component._kFormatter(111)).toEqual(111);
        expect(component._kFormatter(22222)).toEqual("22.2K");
    });
});
