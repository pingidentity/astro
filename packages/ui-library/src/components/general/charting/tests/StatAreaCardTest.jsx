window.__DEV__ = true;

jest.dontMock("../StatAreaCard");
jest.dontMock("../Cards/DashboardCard");
jest.dontMock("../../../forms/RockerButton");
jest.dontMock("../../../forms/FormCheckbox");
jest.useFakeTimers();

describe("StatAreaCard", () => {
    const React = require("react");
    const ReactTestUtils = require("react-dom/test-utils");
    const TestUtils = require("../../../../testutil/TestUtils");
    const StatAreaCard = require("../StatAreaCard");
    const _ = require("underscore");

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

    const rockerButtonProps = {
        labels: ["A", "B", "C"]
    };

    const defaultProps = {
        "data-id": "my-card",
        yAxisKey: "value",
        data: chartData,
        title: "Hi",
        onValueChange: jest.fn(),
        rockerButtonProps: rockerButtonProps,
        subtitle: "so far",
        value: "1,000",
        xAxisKey: "xaxis",
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

        const greeting = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__title-text");
        expect(greeting.textContent).toBe(defaultProps.title);

        const value = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__value");
        expect(value.textContent).toBe(defaultProps.value);

        const subtitle = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__subtitle");
        expect(subtitle.textContent).toBe(defaultProps.subtitle);
    });

    it("renders the back-side title", () => {
        const component = getComponent({
            flipped: true
        });

        const title = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__back-title");
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

        const greeting = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__title-text");
        expect(greeting).toBeTruthy();

        const value = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__value");
        expect(value).toBeFalsy();

        const subtitle = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__subtitle");
        expect(subtitle).toBeFalsy();

        const rockerButton = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            `${defaultProps["data-id"]}-range-selector`
        );
        expect(rockerButton).toBeTruthy();
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

    it("calls onMouseOver", function () {
        const myFunction = jest.fn();

        const testData = {
            id: "my-id",
            value: "my-value",
        };

        ReactTestUtils.renderIntoDocument(
            <div>
                <StatAreaCard.CustomTooltip
                    onMouseOver={myFunction}
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

        expect(myFunction).toBeCalledWith({ value: testData.value, id: testData.id });
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
});