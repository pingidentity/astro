window.__DEV__ = true;

jest.dontMock("../PieChart");

describe("PieChart", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../../testutil/TestUtils"),
        _ = require("underscore"),
        PieChart = require("../PieChart");

    function getComponent (props) {
        props = _.defaults(props || {}, {
            data: [
                { id: "One", value: 1 },
                { id: "Two", value: 2 },
                { id: "Three", value: 3 }
            ],
            series: [{ id: "One" }, { id: "Two" }, { id: "Three" }]
        });
        return ReactTestUtils.renderIntoDocument(<PieChart {...props} />);
    }

    it("renders with default data-id", function () {
        var component = getComponent();
        var chart = TestUtils.findRenderedDOMNodeWithDataId(component, "pie-chart");
        expect(chart).toBeTruthy();
    });

    it("renders with custom data-id", function () {
        var component = getComponent({ "data-id": "my-pie-chart" });
        var chart = TestUtils.findRenderedDOMNodeWithDataId(component, "my-pie-chart");
        expect(chart).toBeTruthy();
    });
});