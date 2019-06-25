import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../../testutil/TestUtils";
import _ from "underscore";

import StatAreaCard from "../StatAreaCard";

jest.useFakeTimers();

describe("StatAreaCard", () => {
    const chartData = [
        { id: "Mon", value: 111 },
        { id: "Tue", value: 222 },
        { id: "Wed", value: 333 },
        { id: "Thu", value: 444 },
        { id: "Fri", value: 555 },
        { id: "Sat", value: 666 },
        { id: "Sun", value: 777 },
        { id: "Sun", value: 0 },
    ];

    const partialChartData = [
        { id: "Mon" },
        { id: "Tue", value: 222 },
    ];

    const rockerButtonProps = {
        labels: ["A", "B", "C"]
    };

    const defaultProps = {
        "data-id": "my-card",
        data: chartData,
        title: "Hi",
        onValueChange: jest.fn(),
        rockerButtonProps: rockerButtonProps,
        subtitle: "so far",
        value: "1,000"
    };

    function getComponent(props) {
        return ReactTestUtils.renderIntoDocument(
            <div><StatAreaCard {...defaultProps} {...props} /></div>
        );
    }

    it("renders with the default data-id", () => {
        const component = getComponent();
        const container = TestUtils.findRenderedDOMNodeWithDataId(component, defaultProps["data-id"]);

        expect(container).toBeTruthy();
    });

    it("renders the strings", () => {
        const component = getComponent();

        const greeting = TestUtils.scryRenderedDOMNodesWithClass(component, "dashboard-card__title");
        expect(greeting[0].textContent).toBe(defaultProps.title);

        const value = TestUtils.findRenderedDOMNodeWithClass(component, "stat-area-card__value");
        expect(value.textContent).toBe(defaultProps.value);

        const subtitle = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__subtitle");
        expect(subtitle.textContent).toBe(defaultProps.subtitle);
    });

    it("renders chart if part of data is missing", () => {
        const component = getComponent({ data: partialChartData });

        const chart = TestUtils.scryRenderedDOMNodesWithClass(component, "recharts-responsive-container");
        expect(chart).toBeTruthy();
    });


    it("renders \"No Data\" chart when noDataData provided", function () {
        const component = getComponent({
            isNoData: true,
            noDataData: [{ id: 1, value: 2 }],
            noDataSubtitle: "No Data",
            noDataMessage: "No Data Message",
        });

        const noDataSubtitle = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__subtitle");
        expect(noDataSubtitle).toBeTruthy();

        const noDataMessage = TestUtils.findRenderedDOMNodeWithClass(component, "stat-area-card__no-data-message");
        expect(noDataMessage).toBeTruthy();

        const chart = TestUtils.findRenderedDOMNodeWithClass(component, "recharts-responsive-container");
        expect(chart).toBeTruthy();
    });

    it("renders \"No Data\" properly when props don't provied", function () {
        const component = getComponent({ isNoData: true });

        const noDataSubtitle = TestUtils.findRenderedDOMNodeWithClass(component, "stat-area-card__no-data-subtitle");
        expect(noDataSubtitle).toBeFalsy();

        const noDataMessage = TestUtils.findRenderedDOMNodeWithClass(component, "stat-area-card__no-data-message");
        expect(noDataMessage).toBeFalsy();

        const chart = TestUtils.findRenderedDOMNodeWithClass(component, "recharts-responsive-container");
        expect(chart).toBeTruthy();
    });

    it("renders the front-side title when data exists", () => {
        const component = getComponent();
        const title = TestUtils.findRenderedDOMNodeWithClass(component, "stat-area-card__front-title");
        expect(title.textContent).toBe(defaultProps.title);
    });

    it("renders the front-side title when data doesn't exist", () => {
        const component = getComponent({ isNoData: true });
        const title = TestUtils.findRenderedDOMNodeWithClass(component, "stat-area-card__front-title");
        expect(title.textContent).toBe(defaultProps.title);
    });

    it("renders the back-side title", () => {
        const component = getComponent({
            flipped: true
        });

        const title = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card--back-title");
        expect(title.textContent).toBe(defaultProps.title);
    });

    it("renders the rocker button labels", () => {
        const component = getComponent();

        const rockerButton = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            `${defaultProps["data-id"]}-range-selector`
        );

        expect(rockerButton.children.length).toBe(rockerButtonProps.labels.length);

        _.each(rockerButton.children, (item, index) => {
            expect(item.textContent).toBe(rockerButtonProps.labels[index]);
        });
    });

    it("does not render RockerButton if props are absent", () => {
        const component = getComponent({ rockerButtonProps: null });

        const rockerButton = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            `${defaultProps["data-id"]}-range-selector`
        );

        expect(rockerButton).toBeFalsy();
    });

    it("does not render the error or spinner by default", function () {
        const component = getComponent();

        const errorMessage = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__error");
        expect(errorMessage).toBeFalsy();

        const spinner = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__loader");
        expect(spinner).toBeFalsy();
    });

    it("renders only the spinner when loading", function () {
        const loaderMessageText = "Wait!";
        const component = getComponent({
            loading: true,
            loadingMessage: loaderMessageText,
        });

        const spinnerContainer = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__loader");
        expect(spinnerContainer).toBeTruthy();

        const greeting = TestUtils.scryRenderedDOMNodesWithClass(component, "dashboard-card__title");
        expect(greeting).toBeTruthy();

        const value = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__value");
        expect(value).toBeFalsy();

        const subtitle = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__subtitle");
        expect(subtitle).toBeFalsy();
    });

    it("renders the error when provided", function () {
        const errorMessageText = "Uh oh.";
        const component = getComponent({ errorMessage: errorMessageText });

        const errorMessage = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__error");
        expect(errorMessage).toBeTruthy();
        expect(errorMessage.textContent).toBe(errorMessageText);

        const title = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__title-text");
        expect(title).toBeFalsy();

        const value = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__value");
        expect(value).toBeFalsy();

        const subtitle = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__subtitle");
        expect(subtitle).toBeFalsy();

        const rockerButton = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            `${defaultProps["data-id"]}-range-selector`
        );
        expect(rockerButton).toBeFalsy();
    });

    it("CustomTooltip calls onMouseOver", function () {
        const onMouseOver = jest.fn();
        const testData = {
            id: "my-id",
            value: "my-value",
        };

        ReactTestUtils.renderIntoDocument(
            <div>
                <StatAreaCard.CustomTooltip
                    onMouseOver={onMouseOver}
                    yAxisKey={"value"}
                    xAxisKey={"id"}
                    payload={[
                        {
                            payload: testData
                        }
                    ]}
                />
            </div>
        );

        expect(onMouseOver).toBeCalledWith({ value: testData.value, id: testData.id });
    });

    it("CustomTooltip calls onMouseOut", function () {
        const onMouseOut = jest.fn();
        const testData = {
            id: "my-id",
            value: "my-value",
        };

        ReactTestUtils.renderIntoDocument(
            <div>
                <StatAreaCard.CustomTooltip
                    onMouseOut={onMouseOut}
                    active={false}
                    yAxisKey={"value"}
                    xAxisKey={"id"}
                    payload={[
                        {
                            payload: testData
                        }
                    ]}
                />
            </div>
        );

        expect(onMouseOut).toBeCalled();
    });

    it("calls onMouseOver only if data has changed", function () {
        const myFunction = jest.fn();
        const data1 = {
            id: 1,
            value: "one"
        };
        const data2 = {
            id: 2,
            value: "two"
        };
        const component = ReactTestUtils.renderIntoDocument(
            <StatAreaCard {...defaultProps} onMouseOver={myFunction} />
        );

        component._onMouseOver(data1);
        jest.runAllTimers();
        expect(myFunction).toBeCalledTimes(1);

        // same data as before
        component._onMouseOver(data1);
        jest.runAllTimers();
        expect(myFunction).toBeCalledTimes(1);

        // diff data
        component._onMouseOver(data2);
        jest.runAllTimers();
        expect(myFunction).toBeCalledTimes(2);
    });

    it("_onMouseOut should call onMouseOut handler only once", function () {
        const myFunction = jest.fn();
        const component = ReactTestUtils.renderIntoDocument(
            <StatAreaCard {...defaultProps} onMouseOut={myFunction} />
        );

        component.lastHover = "Today";
        component._onMouseOut();
        component._onMouseOut();
        component._onMouseOut();
        jest.runAllTimers();
        expect(myFunction).toBeCalledTimes(1);
    });

    it("_onMouseOut should reset \"lastHover\" value", function () {
        const myFunction = jest.fn();
        const component = ReactTestUtils.renderIntoDocument(
            <StatAreaCard {...defaultProps} onMouseOut={myFunction} />
        );

        component._onMouseOut();
        jest.runAllTimers();
        expect(component.lastHover).toBe(null);
    });
});
