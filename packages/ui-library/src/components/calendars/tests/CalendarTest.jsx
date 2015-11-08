window.__DEV__ = true;

jest.dontMock("../../../testutil/TestUtils");
jest.dontMock("../Calendar.jsx");

describe("Calendar", function () {
    var React = require("react/addons"),
        Calendar = require("../Calendar.jsx"),
        moment = require("moment-range"),

        ReactTestUtils = React.addons.TestUtils,

        callback = jest.genMockFunction(),
        selectedDateString = "2015-10-15",
        selectedDate = moment(new Date(selectedDateString));

    it("test basic happy path rendering", function () {
        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore: start */
            <Calendar format="YYYY-MM-DD"
                    date={selectedDate}
                    computableFormat="x"
                    closeOnSelect={true}
                    onChange={callback}/>
            /* jshint ignore: end */
        );

        var input = ReactTestUtils.findRenderedDOMComponentWithTag(component, "input");
        expect(input.getDOMNode().value).toBe(selectedDate.format("YYYY-MM-DD"));
    });
});
