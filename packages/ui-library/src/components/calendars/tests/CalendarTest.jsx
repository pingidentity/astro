window.__DEV__ = true;

var ReactDOM = require("react-dom");

jest.dontMock("../Calendar.jsx");
jest.dontMock("../Cell.jsx");
jest.dontMock("../DaysView.jsx");
jest.dontMock("../MonthsView.jsx");
jest.dontMock("../ViewHeader.jsx");
jest.dontMock("../YearsView.jsx");
jest.dontMock("../Utils");
jest.dontMock("../Constants");

describe("Calendar", function () {
    var React = require("react"),
        Calendar = require("../Calendar.jsx"),
        moment = require("moment-range"),

        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),

        callback = jest.genMockFunction(),
        selectedDateString = "2015-10-15",
        selectedDate = moment(new Date(selectedDateString));

    it("is rendering closed view", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar format="YYYY-MM-DD"
                      date={selectedDate}
                      computableFormat="x"
                      closeOnSelect={true}
                      onChange={callback}/>
        );

        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        expect(input.value).toBe(selectedDate.format("YYYY-MM-DD"));

        var cells = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "day");

        //make sure no calendar cells rendered (e.g. closed)
        expect(cells.length).toEqual(0);
    });

    it("is rendering days view", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar format="YYYY-MM-DD"
                      date={selectedDate}
                      computableFormat="x"
                      closeOnSelect={true}
                      onChange={callback}/>
        );

        var container = ReactTestUtils.findRenderedDOMComponentWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        var cells = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "day");

        //make sure calendar cells rendered: 35 days + 7 headers (MON-SUN)
        expect(cells.length).toEqual(42);
    });

    it("is rendering months view", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar format="YYYY-MM-DD"
                      date={selectedDate}
                      computableFormat="x"
                      closeOnSelect={true}
                      onChange={callback}/>
        );

        var container = ReactTestUtils.findRenderedDOMComponentWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        //Switch to months view
        var navigation = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        ReactTestUtils.Simulate.click(navigation, {});

        var cells = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "month");

        expect(cells.length).toEqual(12);

        ReactTestUtils.Simulate.click(cells[0]);

        //let's select month and make sure we go back to days view
        cells = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "day");
        expect(cells.length).toEqual(42);

    });

    it("is rendering years view", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar format="YYYY-MM-DD"
                      date={selectedDate}
                      computableFormat="x"
                      closeOnSelect={true}
                      onChange={callback}/>
        );

        var container = ReactTestUtils.findRenderedDOMComponentWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        //Switch to months view
        var navigation = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        ReactTestUtils.Simulate.click(navigation, {});

        //Switch to years view
        navigation = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        ReactTestUtils.Simulate.click(navigation, {});

        var cells = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "year");

        //make sure calendar cells rendered: 12 years
        expect(cells.length).toEqual(12);
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

    it("is triggering callback on date selection", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar format="YYYY-MM-DD"
                      date={selectedDate}
                      computableFormat="x"
                      closeOnSelect={true}
                      onChange={callback}/>
        );

        var container = ReactTestUtils.findRenderedDOMComponentWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        var cells = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "day");

        ReactTestUtils.Simulate.click(cells[7], {});

        expect(callback).toBeCalled();
    });

    it("changes date via input field", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar format="YYYY-MM-DD"
                      date={selectedDate}
                      computableFormat="x"
                      closeOnSelect={true}
                      onChange={callback}/>
        );

        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        ReactTestUtils.Simulate.change(input, { target: { value: "2016-10-15" } });

        //input was updated
        expect(input.value).toBe("2016-10-15");
    });

    it("is supporting min view", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar format="YYYY-MM-DD"
                      date={selectedDate}
                      minView={1}
                      computableFormat="x"
                      closeOnSelect={true}
                      onChange={callback}/>
        );

        var container = ReactTestUtils.findRenderedDOMComponentWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        var cells = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "month");

        expect(cells.length).toEqual(12);

        ReactTestUtils.Simulate.click(cells[0]);

        expect(callback).toBeCalled();
    });

    it("is triggering callback on arrow nagivation", function () {
        var globalKeyListener = TestUtils.captureGlobalListener("keyDown", document);

        var component = ReactTestUtils.renderIntoDocument(
            <Calendar format="YYYY-MM-DD"
                      date={selectedDate}
                      computableFormat="x"
                      closeOnSelect={true}
                      onChange={callback}/>
        );

        var container = ReactTestUtils.findRenderedDOMComponentWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        globalKeyListener({ keyCode: 39 }); //arrow right

        expect(callback).toBeCalledWith("1444953600000");
    });

    it("register/unregister global listeners", function () {
        document.addEventListener = jest.genMockFunction();
        document.removeEventListener = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <Calendar format="YYYY-MM-DD"
                      date={selectedDate}
                      computableFormat="x"
                      closeOnSelect={true}
                      onChange={callback}/>
        );

        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);

        expect(document.addEventListener.mock.calls.length).toEqual(1);
        expect(document.addEventListener.mock.calls[0][0]).toEqual("click");

        expect(document.removeEventListener.mock.calls.length).toEqual(1);
        expect(document.removeEventListener.mock.calls[0][0]).toEqual("click");
    });

    it("handles input blur event", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar format="YYYY-MM-DD"
                      date={selectedDate}
                      computableFormat="x"
                      closeOnSelect={true}
                      onChange={callback}/>
        );

        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        ReactTestUtils.Simulate.blur(input, {});

        expect(callback).toBeCalled();
    });

    it("handles input blur with invalid date", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar format="YYYY-MM-DD"
                      date={selectedDate}
                      computableFormat="x"
                      closeOnSelect={true}
                      onChange={callback}/>
        );

        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        ReactTestUtils.Simulate.change(input, { target: { value: "not a date" } });
        ReactTestUtils.Simulate.blur(input, {});

        expect(callback).toBeCalled();
    });

    it("is closing calendar on click outside", function () {
        var globalClickListener = TestUtils.captureGlobalListener("click", document);

        var component = ReactTestUtils.renderIntoDocument(
            <Calendar format="YYYY-MM-DD"
                      date={selectedDate}
                      computableFormat="x"
                      closeOnSelect={true}
                      onChange={callback}/>
        );

        var container = ReactTestUtils.findRenderedDOMComponentWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});
        globalClickListener();

        //click outside
        globalClickListener();

        var cells = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "day");

        //make sure calendar was closed
        expect(cells.length).toEqual(0);
    });

});
