window.__DEV__ = true;

jest.dontMock("../DashboardCardTitle");

describe("DashboardCardTitle", () => {
    const React = require("react");
    const ReactTestUtils = require("react-dom/test-utils");
    const TestUtils = require("../../../../../testutil/TestUtils");
    const DashboardCardTitle = require("../DashboardCardTitle");



    const defaultProps = {
        "data-id": "dashboard-card__title",
    };

    function getComponent(props) {
        return ReactTestUtils.renderIntoDocument(
            <div><DashboardCardTitle {...defaultProps} {...props} /></div>
        );
    }

    it(" renders a title", function () {
        const component = getComponent({
            title: "hello"
        });

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__title");

        expect(element.textContent).toEqual("hello");
    });

    it(" renders a title on the back when provided with backTitle prop", function () {
        const component = getComponent({
            title: "hello",
            backTitle: true
        });

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card--back-title");

        expect(element).toBeTruthy();
    });

    it("does not render backTitle if backTitle is not provided", function () {
        const component = getComponent({
            title: "hello",
        });

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card--back-title");

        expect(element).toBe(null);
    });

    it("renders children", function () {
        const component = getComponent({
            children: <div />
        });

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__title-accessories");

        expect(element).toBeTruthy();
    });

    it("does not render children if no children provided", function () {
        const component = getComponent({
        });

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "dashboard-card__title-accessories");

        expect(element).toBe(null);
    });

});