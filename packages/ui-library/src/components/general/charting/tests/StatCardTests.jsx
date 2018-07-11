window.__DEV__ = true;

describe("StatCard", function () {
    const React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../../testutil/TestUtils"),
        _ = require("underscore"),
        StatCard = require("../StatCard"),
        StatCardRow = require("../StatCardRow");

    function getComponent (props) {
        props = _.defaults(props || {}, {
            title: "Failed Attempts",
            description: "February 2016",
            value: "1,056",
            data: [
                { label: "Last 30 days", value: "29" },
                { label: "Last 60 days", value: "124" },
                { label: "Last 90 days", value: "167" },
                { label: "Last 120 days", value: "195" },
                { label: "Last 150 days", value: "201" },
            ]
        });
        return ReactTestUtils.renderIntoDocument(<StatCard {...props} />);
    }

    it("renders with default data-id", function () {
        const component = getComponent();
        const chart = TestUtils.findRenderedDOMNodeWithDataId(component, "dashboard-card");
        expect(chart).toBeTruthy();
    });

    it("renders a StatCardRow", function() {
        const component = ReactTestUtils.renderIntoDocument(<StatCardRow>content</StatCardRow>);

        expect(component).toBeDefined();
    });

    it("does not render the error or spinner by default", function () {
        const component = getComponent();

        const errorMessage = TestUtils.findRenderedDOMNodeWithClass(component, "stat-card__error");
        expect(errorMessage).toBeFalsy();

        const spinner = TestUtils.findRenderedDOMNodeWithClass(component, "stat-card__spinner");
        expect(spinner).toBeFalsy();
    });

    it("renders the spinner when provided", function () {
        const component = getComponent({
            loading: true
        });

        const spinnerContainer = TestUtils.findRenderedDOMNodeWithClass(component, "stat-card__loader");
        expect(spinnerContainer).toBeTruthy();

        const pageSpinner = TestUtils.findRenderedDOMNodeWithClass(spinnerContainer, "page-loader");
        expect(pageSpinner).toBeTruthy();

    });
});
