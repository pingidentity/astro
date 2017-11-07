window.__DEV__ = true;

jest.dontMock("../LineChart.jsx");

describe("LineChart", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../../testutil/TestUtils"),
        _ = require("underscore"),
        Line = require("recharts").Line,
        LineChart = require("../LineChart.jsx");

    function getComponent (props) {
        props = _.defaults(props || {}, {
            data: [
                { id: "One", s1: 1, s2: 10 },
                { id: "Two", s1: 2, s2: 20 }
            ],
            series: [{ id: "s1", label: "s1" }, { id: "s2", label: "s2" }]
        });
        return ReactTestUtils.renderIntoDocument(<LineChart {...props} />);
    }

    it("renders with default data-id", function () {
        var component = getComponent();
        var chart = TestUtils.findRenderedDOMNodeWithDataId(component, "line-chart");
        expect(chart).toBeTruthy();
    });

    it("renders with custom data-id", function () {
        var component = getComponent({ "data-id": "my-line-chart" });
        var chart = TestUtils.findRenderedDOMNodeWithDataId(component, "my-line-chart");
        expect(chart).toBeTruthy();
    });

    it("renders series lines", function () {
        var component = getComponent();
        var series = TestUtils.scryRenderedComponentsWithType(component, Line);
        expect(series.length).toBe(2);
    });
});