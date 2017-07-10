window.__DEV__ = true;

jest.dontMock("../AreaChart.jsx");

describe("AreaChart", function () {
    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../../testutil/TestUtils"),
        _ = require("underscore"),
        Area = require("recharts").Area,
        AreaChart = require("../AreaChart.jsx");

    function getComponent (props) {
        props = _.defaults(props || {}, {
            data: [
                { id: "One", s1: 1, s2: 10 },
                { id: "Two", s1: 2, s2: 20 }
            ],
            series: [{ id: "s1", label: "s1" }, { id: "s2", label: "s2" }]
        });
        return ReactTestUtils.renderIntoDocument(<AreaChart {...props} />);
    }

    it("renders with default data-id", function () {
        var component = getComponent();
        var chart = TestUtils.findRenderedDOMNodeWithDataId(component, "area-chart");
        expect(chart).toBeTruthy();
    });

    it("renders with custom data-id", function () {
        var component = getComponent({ "data-id": "my-area-chart" });
        var chart = TestUtils.findRenderedDOMNodeWithDataId(component, "my-area-chart");
        expect(chart).toBeTruthy();
    });

    it("renders series area lines", function () {
        var component = getComponent();
        var series = TestUtils.scryRenderedComponentsWithType(component, Area);
        expect(series.length).toBe(2);
    });
});