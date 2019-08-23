window.__DEV__ = true;

jest.dontMock("../HeroChart");
jest.dontMock("../BarChart");
jest.dontMock("../../../forms/RockerButton");
jest.useFakeTimers();

describe("HeroChart", function () {
    const React = require("react");
    const ReactTestUtils = require("react-dom/test-utils");
    const TestUtils = require("../../../../testutil/TestUtils");
    const HeroChart = require("../HeroChart");
    const _ = require("underscore");
    const Wrapper = TestUtils.UpdatePropsWrapper;

    const chartData = [
        { xaxis: "1/1", yups: 111, nopes: 11 },
        { xaxis: "1/2", yups: 222, nopes: 22 },
        { xaxis: "1/3", yups: 333, nopes: 33 },
    ];

    const rockerButtonProps = {
        labels: ["A", "B", "C", "D"]
    };

    const defaultProps = {
        "data-id": "mr-chart",
        bgImage: "http://server.com/my/image/img.jpg",
        bottomSeriesKey: "nopes",
        data: chartData,
        greeting: "Hi",
        onValueChange: jest.fn(),
        rockerButtonProps: rockerButtonProps,
        subtitle: "so far",
        value: "1,000",
        title: "Wins",
        tooltipBottomLabel: "Loses",
        tooltipTopLabel: "Wins",
        topSeriesKey: "yups",
        xAxisKey: "xaxis",
    };

    function getComponent(props) {
        const componentProps = _.defaults(props || {}, defaultProps);
        return ReactTestUtils.renderIntoDocument(
            <HeroChart {...componentProps} />
        );
    }

    it("data-id's don't change", () => {
        TestUtils.mountSnapshotDataIds(
            <HeroChart
                {...defaultProps}
            />
        );
    });

    it("renders with the default data-id", function () {
        const component = getComponent();
        const container = TestUtils.findRenderedDOMNodeWithDataId(component, defaultProps["data-id"]);

        expect(container).toBeTruthy();
    });

    it("should call _handleResize after mounting", () => {
        const component = getComponent();

        component.setState = jest.fn();
        jest.runAllTimers();
        expect(component.setState).toHaveBeenCalled();
    });

    it("should unsubscribe all handlers after unmounting", () => {
        const component = getComponent();

        spyOn(window, "removeEventListener");
        component.componentWillUnmount();

        expect(window.removeEventListener).toHaveBeenCalled();
    });

    it("renders the strings", function () {
        const component = getComponent();

        const greeting = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__greeting");
        expect(greeting.textContent).toBe(defaultProps.greeting);

        const title = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__title");
        expect(title.textContent).toBe(defaultProps.title);

        const value = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__value");
        expect(value.textContent).toBe(defaultProps.value);

        const subtitle = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__subtitle");
        expect(subtitle.textContent).toBe(defaultProps.subtitle);
    });

    it("renders the rocker button labels", function () {
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

    it("renders the bg image", function () {
        const component = ReactTestUtils.renderIntoDocument(
            <Wrapper
                type={HeroChart}
                {...defaultProps}
            />
        );

        const container = TestUtils.findRenderedDOMNodeWithDataId(component, defaultProps["data-id"]);

        expect(container.style.backgroundImage).toBe(`url(${defaultProps.bgImage})`);

        component._setProps({ bgImage: null });

        expect(container.style.backgroundImage).toBe("");
    });

    it("renders the bars", function () {
        const component = getComponent();

        const topChart = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__top-chart");
        const topBarContainer = TestUtils.findRenderedDOMNodeWithClass(topChart, "recharts-bar-rectangles");
        expect(topBarContainer.children.length).toBe(chartData.length);

        const botChart = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__bottom-chart");
        const botBarContainer = TestUtils.findRenderedDOMNodeWithClass(botChart, "recharts-bar-rectangles");
        expect(botBarContainer.children.length).toBe(chartData.length);
    });

    it("renders the x-axis", function () {
        const component = getComponent();

        // x-axis labels/ticks are part of top chart
        const topChart = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__top-chart");
        const axisContainer = TestUtils.findRenderedDOMNodeWithClass(topChart, "recharts-cartesian-axis-ticks");

        expect(axisContainer.children.length).toBe(chartData.length);

        _.each(axisContainer.children, (item, index) => {
            const textContainer = TestUtils.findRenderedDOMNodeWithTag(item, "tspan");
            expect(textContainer.textContent).toBe(chartData[index][defaultProps.xAxisKey]);
        });
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

        const topChart = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__top-chart");
        expect(topChart).toBeFalsy();

        const botChart = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__bottom-chart");
        expect(botChart).toBeFalsy();

        const greeting = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__greeting");
        expect(greeting).toBeTruthy();

        const title = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__title");
        expect(title).toBeFalsy();

        const value = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__total");
        expect(value).toBeFalsy();

        const subtitle = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__subtitle");
        expect(subtitle).toBeFalsy();
    });

    it("renders only the spinner when loading", function () {
        const loaderMessageText = "Wait!";
        const component = getComponent({
            loading: true,
            loadingMessage: loaderMessageText,
        });

        const spinnerContainer = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__loader");
        expect(spinnerContainer).toBeTruthy();

        const pageSpinner = TestUtils.findRenderedDOMNodeWithClass(spinnerContainer, "page-loader");
        expect(pageSpinner).toBeTruthy();

        const spinnerText = TestUtils.findRenderedDOMNodeWithClass(spinnerContainer, "page-loader__text");
        expect(spinnerText.textContent).toBe(loaderMessageText);

        const topChart = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__top-chart");
        expect(topChart).toBeFalsy();

        const botChart = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__bottom-chart");
        expect(botChart).toBeFalsy();

        const greeting = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__greeting");
        expect(greeting).toBeTruthy();

        const title = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__title");
        expect(title).toBeTruthy();

        const value = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__value");
        expect(value).toBeTruthy();

        const subtitle = TestUtils.findRenderedDOMNodeWithClass(component, "hero-chart__subtitle");
        expect(subtitle).toBeTruthy();
    });

    it("renders the x-axis in the various font sizes", function () {
        const fontSizeData = [
            { size: "15", threshold: 1 },
            { size: "14", threshold: 19 },
            { size: "13", threshold: 22 },
            { size: "12", threshold: 24 },
            { size: "11", threshold: 26 },
        ];

        fontSizeData.forEach((item) => {
            let customChartData = [];

            for (let i = 0; i < item.threshold; i += 1) {
                customChartData.push({ xaxis: i, yups: 1, nopes: 1 });
            }

            const component = getComponent({ data: customChartData });
            const xAxisTick = TestUtils.findRenderedDOMNodeWithClass(component, "recharts-cartesian-axis-ticks")
                .childNodes[0];
            const textTag = TestUtils.findRenderedDOMNodeWithTag(xAxisTick, "text");
            expect(textTag.getAttribute("font-size")).toEqual(item.size);
        });
    });

    it("sets the selected element on mouse over", function () {
        const component = getComponent();

        component._handleBarMouseOver("test", 0)();

        expect(component.state.barSelected).toEqual("test-0");
    });

    it("clears the selected element on mouse out", function () {
        const component = getComponent();

        component._handleBarMouseOver("test", 0)();

        expect(component.state.barSelected).toEqual("test-0");

        component._handleBarMouseOut();

        expect(component.state.barSelected).toEqual(null);
    });
});
