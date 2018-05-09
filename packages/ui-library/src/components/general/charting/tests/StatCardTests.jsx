window.__DEV__ = true;

jest.dontMock("../StatCard");

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
        const chart = TestUtils.findRenderedDOMNodeWithDataId(component, "stat-card");
        expect(chart).toBeTruthy();
    });

    it("responds to flip", function () {
        const callback = jest.genMockFunction();
        const component = getComponent({
            flipped: true,
            onFlip: callback,
            accent: "none"
        });
        const toggle = TestUtils.findRenderedDOMNodeWithDataId(component, "view-toggle");

        expect(callback).not.toBeCalled();
        ReactTestUtils.Simulate.click(toggle);
        expect(callback).toBeCalled();
    });

    it("responds to flip without a callback", function () {
        const component = getComponent({
            accent: "magenta"
        });
        const toggle = TestUtils.findRenderedDOMNodeWithDataId(component, "view-toggle");

        expect(component.state.flipped).not.toBeTruthy();
        ReactTestUtils.Simulate.click(toggle);
        expect(component.state.flipped).toBeTruthy();
    });

    it("renders a StatCardRow", function() {
        const component = ReactTestUtils.renderIntoDocument(<StatCardRow>content</StatCardRow>);

        expect(component).toBeDefined();
    });
});
