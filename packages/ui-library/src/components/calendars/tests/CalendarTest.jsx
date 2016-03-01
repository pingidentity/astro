window.__DEV__ = true;

var ReactDOM = require("react-dom");

jest.dontMock("../Calendar.jsx");

describe("Calendar", function () {
    var React = require("react"),
        Calendar = require("../Calendar.jsx"),
        moment = require("moment-range"),

        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),

        callback = jest.genMockFunction(),
        selectedDateString = "2015-10-15",
        selectedDate = moment(new Date(selectedDateString));

    it("test basic happy path rendering", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar format="YYYY-MM-DD"
                    date={selectedDate}
                    computableFormat="x"
                    closeOnSelect={true}
                    onChange={callback}/>
        );

        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        expect(input.value).toBe(selectedDate.format("YYYY-MM-DD"));
    });

    it("renders as required", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar format="YYYY-MM-DD"
                    date={selectedDate}
                    computableFormat="x"
                    closeOnSelect={true}
                    onChange={callback}
                    isRequired={true}/>
        );

        expect(ReactDOM.findDOMNode(component).className).toContain("required");
    });
});
