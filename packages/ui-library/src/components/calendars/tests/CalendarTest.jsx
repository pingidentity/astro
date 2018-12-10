window.__DEV__ = true;

jest.dontMock("../Calendar");
jest.dontMock("../Cell");
jest.dontMock("../DaysView");
jest.dontMock("../MonthsView");
jest.dontMock("../ViewHeader");
jest.dontMock("../YearsView");
jest.dontMock("../../../util/Utils.js");
jest.dontMock("../Constants");
jest.dontMock("../../forms/FormLabel");
jest.dontMock("../../tooltips/HelpHint");
jest.dontMock("../../../util/KeyboardUtils.js");

jest.mock("popper.js");
jest.mock("react-portal");

describe("Calendar", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        Calendar = require("../Calendar"),
        moment = require("moment-range"),
        _ = require("underscore"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        Utils = require("../../../util/Utils.js"),

        callback = jest.fn(),
        selectedDateString = "2015-10-15",
        dateRange = {
            startDate: new Date(2015, 9, 10),   //Oct 10 2015
            endDate: new Date(2015, 10, 20)  //Nov 20 2015
        },
        selectedDate = moment(new Date(selectedDateString));

    function getComponent (props) {
        return ReactTestUtils.renderIntoDocument(
            <Calendar {...props} />
        );
    }

    beforeEach(function () {
        callback.mockClear();
    });

    it("renders with default data-id", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar date={selectedDate} />
        );

        var calendar = TestUtils.findRenderedDOMNodeWithDataId(component, "calendar");

        expect(calendar).toBeDefined();
    });

    it("renders open state in portal", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar date={selectedDate} flags={[ "use-portal" ]} />
        );

        component.setState({ isVisible: true });

        var calendar = TestUtils.findRenderedDOMNodeWithDataId(component, "input-calendar-wrapper");

        expect(calendar).toBeDefined();
    });

    it("renders with given data-id", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar data-id="myCalendar" date={selectedDate} />
        );

        var calendar = TestUtils.findRenderedDOMNodeWithDataId(component, "myCalendar");

        expect(calendar).toBeDefined();
    });

    /*
    TODO: fix this test
    NOTE: Currently we've not been able to test the react-tooltip helpHint in it's shown state. Since the React Tooltip
    does not populate its content until it is displayed, the content of the tooltip cannot yet be tested.
    */
    it("renders the label and label help text with a custom label css class and custom help css class", function () {
        var dataId = "my-label",
            customLabelText = "My Label",
            customLabelClass = "label-css-class",
            customHelpClass = "help-css-class",
            labelHelpText = "Some help text",
            component = ReactTestUtils.renderIntoDocument(
                <Calendar
                    data-id={dataId}
                    date={selectedDate}
                    labelText={customLabelText}
                    labelHelpText={labelHelpText}
                    labelClassName={customLabelClass}
                    helpClassName={customHelpClass}
                />
            ),
            label = TestUtils.findRenderedDOMNodeWithDataId(component, dataId + "-label"),
            labelText = TestUtils.findRenderedDOMNodeWithDataId(component, "label"),
            help = TestUtils.findRenderedDOMNodeWithDataId(component, "help-tooltip");

        expect(labelText).toBeTruthy();
        expect(labelText.textContent).toContain(customLabelText);
        expect(label.className).toContain(customLabelClass);

        expect(help).toBeTruthy();
        // expect(help.textContent).toContain(labelHelpText);
        // expect(help.className).toContain(customHelpClass);
    });

    it("renders the label with the label prop", function () {
        const dataId = "my-label",
            customLabelText = "My Label",
            component = ReactTestUtils.renderIntoDocument(
                <Calendar
                    data-id={dataId}
                    date={selectedDate}
                    label={customLabelText}
                />
            ),
            labelText = TestUtils.findRenderedDOMNodeWithDataId(component, "label");

        expect(labelText).toBeTruthy();
        expect(labelText.textContent).toContain(customLabelText);
    });

    it("renders will null date and inputValue state if date not specified", function () {
        var component = ReactTestUtils.renderIntoDocument(<Calendar />);

        expect(component.state.date).toBeNull();
        expect(component.state.inputValue).toBe("");
    });

    it("is rendering closed view", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar format="YYYY-MM-DD"
                      date={selectedDate}
                      computableFormat="x"
                      closeOnSelect={true}
                      onValueChange={callback}/>
        );

        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        expect(input.value).toBe(selectedDate.format("YYYY-MM-DD"));

        var cells = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "day");

        //make sure no calendar cells rendered (e.g. closed)
        expect(cells.length).toEqual(0);
    });

    it("is rendering days view", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar
                format="YYYY-MM-DD"
                date={selectedDate}
                computableFormat="x"
                closeOnSelect={true}
                onValueChange={callback}
            />
        );

        var container = ReactTestUtils.findRenderedDOMComponentWithClass(component, "input-calendar");

        // open calendar
        ReactTestUtils.Simulate.click(container, {});

        var cells = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "day");

        // make sure calendar cells rendered: 35 days + 7 headers (MON-SUN)
        expect(cells.length).toEqual(42);

        // Navigate to September (previous month)
        var prev = ReactTestUtils.findRenderedDOMComponentWithClass(component, "icon-left");
        ReactTestUtils.Simulate.click(prev, {});
        var month = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        expect(month.textContent).toBe("September");

        // Navigate back to October (next month)
        var next = ReactTestUtils.findRenderedDOMComponentWithClass(component, "icon-right");
        ReactTestUtils.Simulate.click(next, {});
        month = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        expect(month.textContent).toBe("October");
    });

    it("is rendering months view", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar
                format="YYYY-MM-DD"
                date={selectedDate}
                computableFormat="x"
                closeOnSelect={true}
                onValueChange={callback}
            />
        );

        var container = ReactTestUtils.findRenderedDOMComponentWithClass(component, "input-calendar");

        // open calendar
        ReactTestUtils.Simulate.click(container, {});

        // switch to months view
        var navigation = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        ReactTestUtils.Simulate.click(navigation, {});

        var cells = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "month");

        expect(cells.length).toEqual(12);

        // Navigate to previous year
        var prev = ReactTestUtils.findRenderedDOMComponentWithClass(component, "icon-left");
        ReactTestUtils.Simulate.click(prev, {});
        var year = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        expect(parseInt(year.textContent)).toBe(moment(selectedDate).subtract(1, "years").year());

        // Navigate back to selectedDate year
        var next = ReactTestUtils.findRenderedDOMComponentWithClass(component, "icon-right");
        ReactTestUtils.Simulate.click(next, {});
        year = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        expect(parseInt(year.textContent)).toBe(moment(selectedDate).year());

        // let's select month and make sure we go back to days view
        ReactTestUtils.Simulate.click(cells[0]);
        cells = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "day");
        expect(cells.length).toEqual(42);

    });

    it("is rendering years view", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar
                format="YYYY-MM-DD"
                date={selectedDate}
                computableFormat="x"
                closeOnSelect={true}
                onValueChange={callback}
            />
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

        // Navigate to previous year range
        var prev = ReactTestUtils.findRenderedDOMComponentWithClass(component, "icon-left");
        ReactTestUtils.Simulate.click(prev, {});
        var yearRange = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        expect(yearRange.textContent).toBe("2000-2011");

        // Navigate back to current year range
        var next = ReactTestUtils.findRenderedDOMComponentWithClass(component, "icon-right");
        ReactTestUtils.Simulate.click(next, {});
        yearRange = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        expect(yearRange.textContent).toBe("2010-2021");

        var cells = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "year");

        //make sure calendar cells rendered: 12 years
        expect(cells.length).toEqual(12);
    });

    it("renders as required when required set", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar format="YYYY-MM-DD"
                      date={selectedDate}
                      computableFormat="x"
                      closeOnSelect={true}
                      onValueChange={callback}
                      required={true}/>
        );

        expect(ReactDOM.findDOMNode(component).className).toContain("required");
    });

    it("is triggering onValueChange callback on date selection", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar format="YYYY-MM-DD"
                      date={selectedDate}
                      computableFormat="x"
                      closeOnSelect={true}
                      onValueChange={callback}/>
        );

        var container = ReactTestUtils.findRenderedDOMComponentWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        var cells = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "day");

        ReactTestUtils.Simulate.mouseDown(cells[7], {});

        expect(callback).toBeCalled();
    });

    it("is not triggering onValueChange callback when an empty cell is clicked", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar
                format="YYYY-MM-DD"
                date={selectedDate}
                onValueChange={callback}
            />
        );

        var container = ReactTestUtils.findRenderedDOMComponentWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        var cells = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "day");

        ReactTestUtils.Simulate.mouseDown(cells[0], {});

        expect(callback).not.toBeCalled();
    });

    it("onValueChange changes date via input field", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar format="YYYY-MM-DD"
                      date={selectedDate}
                      computableFormat="x"
                      closeOnSelect={true}
                      onValueChange={callback}/>
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
                      onValueChange={callback}/>
        );

        var container = ReactTestUtils.findRenderedDOMComponentWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        var cells = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "month");

        expect(cells.length).toEqual(12);

        ReactTestUtils.Simulate.click(cells[0]);

        expect(callback).toBeCalled();
    });

    it("is triggering onValueChange callback on arrow nagivation", function () {
        var globalKeyListener = TestUtils.captureGlobalListener("keyDown", document);

        var component = ReactTestUtils.renderIntoDocument(
            <Calendar format="YYYY-MM-DD"
                      date={selectedDate}
                      computableFormat="x"
                      closeOnSelect={true}
                      onValueChange={callback}/>
        );

        var container = ReactTestUtils.findRenderedDOMComponentWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        globalKeyListener({ keyCode: 39, preventDefault: _.noop }); //arrow right

        expect(callback).toBeCalledWith("1444953600000");
    });

    it("stops arrow nagivation keyDown event propogation", function () {
        var globalKeyListener = TestUtils.captureGlobalListener("keyDown", document);

        var component = ReactTestUtils.renderIntoDocument(
            <Calendar format="YYYY-MM-DD"
                      date={selectedDate}
                      computableFormat="x"
                      closeOnSelect={true}
                      onValueChange={callback} />
        );

        var container = ReactTestUtils.findRenderedDOMComponentWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        var mockpreventDefault = jest.fn();
        globalKeyListener({ keyCode: 39, preventDefault: mockpreventDefault }); //arrow right

        expect(callback).toBeCalledWith("1444953600000");
        expect(mockpreventDefault).toBeCalled(); //check event won't propagate
    });

    it("register/unregister global listeners", function () {
        document.addEventListener = jest.fn();
        document.removeEventListener = jest.fn();

        var component = ReactTestUtils.renderIntoDocument(
            <Calendar format="YYYY-MM-DD"
                      date={selectedDate}
                      computableFormat="x"
                      closeOnSelect={true}
                      onValueChange={callback}/>
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
                      onValueChange={callback}/>
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
                      onValueChange={callback}/>
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
                      onValueChange={callback}/>
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

    it("renders with dates outside range disabled", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar date={selectedDate} dateRange={dateRange} />
        );

        var container = ReactTestUtils.findRenderedDOMComponentWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        //In October
        var cells = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "day");
        cells = cells.filter(function (cell) {
            return cell.classList.contains("disabled") && !cell.classList.contains("prev");
        });

        expect(cells.length).toBe(9); // dates 1 to 9 out of range

        //Navigate to November
        var next = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "icon")[1];
        ReactTestUtils.Simulate.click(next, {});
        var month = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        expect(month.textContent).toBe("November");

        cells = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "day");
        cells = cells.filter(function (cell) {
            return cell.classList.contains("disabled") && !cell.classList.contains("next");
        });

        expect(cells.length).toBe(10); // dates 21 - 30 out of range
    });

    it("renders with months outside range disabled", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar date={new Date(2015, 9, 15)} dateRange={dateRange} />
        );

        var container = ReactTestUtils.findRenderedDOMComponentWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        //In October & Switch to months view
        var navigation = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        ReactTestUtils.Simulate.click(navigation, {});

        var cells = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "month");
        var disabled = cells.filter(function (cell) {
            return cell.classList.contains("disabled");
        });
        expect(disabled.length).toBe(10);

        var enabled = cells.filter(function (cell) {
            return !cell.classList.contains("disabled");
        });
        expect(enabled.length).toBe(2); // only Oct & Nov not disabled
        expect(enabled[0].textContent).toBe("Oct");
        expect(enabled[1].textContent).toBe("Nov");
    });

    it("renders with years outside range disabled", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar date={selectedDate} dateRange={dateRange} />
        );

        var container = ReactTestUtils.findRenderedDOMComponentWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        //In October & Switch to months view
        var navigation = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        ReactTestUtils.Simulate.click(navigation, {});

        //Switch to years view
        navigation = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        ReactTestUtils.Simulate.click(navigation, {});

        var cells = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "year");
        var disabled = cells.filter(function (cell) {
            return cell.classList.contains("disabled");
        });
        expect(disabled.length).toBe(11);

        var enabled = cells.filter(function (cell) {
            return !cell.classList.contains("disabled");
        });
        expect(enabled.length).toBe(1);  // only 2015 not disabled
        expect(enabled[0].textContent).toBe("2015");
    });

    it("input display date can't be out of range", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar date={selectedDate} dateRange={dateRange} format="YYYY-MM-DD" />
        );

        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        ReactTestUtils.Simulate.change(input, { target: { value: "2080-12-04" } });
        ReactTestUtils.Simulate.blur(input, {});

        //input was not updated
        expect(input.value).not.toBe("2080-12-04");
    });

    it("disables header arrow navigation if date out of range", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar date={selectedDate} dateRange={dateRange} />
        );

        var container = ReactTestUtils.findRenderedDOMComponentWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        //In October
        var month = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        expect(month.textContent).toBe("October");

        var arrows = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "icon");
        expect(arrows.length).toBe(2); // prev & next

        //Nothing happens clicking disabled prev
        var prev = arrows[0];
        expect(prev.classList.contains("disabled")).toBe(true);
        ReactTestUtils.Simulate.click(prev, {});
        month = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        expect(month.textContent).toBe("October");

        //Navigate to with enabled next
        var next = arrows[1];
        ReactTestUtils.Simulate.click(next, {});
        month = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        expect(month.textContent).toBe("November");

        arrows = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "icon");
        expect(arrows.length).toBe(2); // prev & next

        //Nothing happens clicking disabled next
        next = arrows[1];
        expect(next.classList.contains("disabled")).toBe(true);
        ReactTestUtils.Simulate.click(next, {});
        month = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        expect(month.textContent).toBe("November");
    });

    it("disables header arrow navigation if month out of range", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar date={selectedDate} dateRange={dateRange} />
        );

        var container = ReactTestUtils.findRenderedDOMComponentWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        //In October
        var month = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        expect(month.textContent).toBe("October");

        //Switch to months view
        ReactTestUtils.Simulate.click(month, {});
        var year = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        expect(year.textContent).toBe("2015");

        var arrows = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "icon");
        expect(arrows.length).toBe(2); // prev & next

        //Nothing happens clicking disabled prev
        var prev = arrows[0];
        expect(prev.classList.contains("disabled")).toBe(true);
        ReactTestUtils.Simulate.click(prev, {});
        year = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        expect(year.textContent).toBe("2015");

        //Nothing happens clicking disabled next
        var next = arrows[1];
        expect(next.classList.contains("disabled")).toBe(true);
        ReactTestUtils.Simulate.click(next, {});
        year = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        expect(year.textContent).toBe("2015");
    });

    it("disables header arrow navigation if year out of range", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar date={selectedDate} dateRange={dateRange} />
        );

        var container = ReactTestUtils.findRenderedDOMComponentWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        //In October
        var month = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        expect(month.textContent).toBe("October");

        //Switch to years view
        ReactTestUtils.Simulate.click(month, {});
        var year = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        expect(year.textContent).toBe("2015");

        ReactTestUtils.Simulate.click(year, {});
        var years = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        expect(years.textContent).toBe("2010-2021");

        var arrows = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "icon");
        expect(arrows.length).toBe(2); // prev & next

        //Nothing happens clicking disabled prev
        var prev = arrows[0];
        expect(prev.classList.contains("disabled")).toBe(true);
        ReactTestUtils.Simulate.click(prev, {});
        years = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        expect(years.textContent).toBe("2010-2021");

        //Nothing happens clicking disabled next
        var next = arrows[1];
        expect(next.classList.contains("disabled")).toBe(true);
        ReactTestUtils.Simulate.click(next, {});
        years = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        expect(years.textContent).toBe("2010-2021");
    });

    it("does not change date if out of range date selected", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar date={selectedDate} dateRange={dateRange} onValueChange={callback} />
        );

        var container = ReactTestUtils.findRenderedDOMComponentWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        //In October
        var cells = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "day");
        cells = cells.filter(function (cell) {
            return cell.classList.contains("disabled") && !cell.classList.contains("prev");
        });

        expect(cells[0].textContent).toBe("1");
        ReactTestUtils.Simulate.click(cells[0], {});
        expect(callback).not.toBeCalled();
    });

    it("does not change date if out of range month selected", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar date={selectedDate} dateRange={dateRange} onValueChange={callback} />
        );

        var container = ReactTestUtils.findRenderedDOMComponentWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        //In October & switch to months view
        var month = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        ReactTestUtils.Simulate.click(month, {});

        var cells = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "month");
        cells = cells.filter(function (cell) {
            return cell.classList.contains("disabled");
        });

        expect(cells[0].textContent).toBe("Jan");
        ReactTestUtils.Simulate.click(cells[0], {});
        expect(callback).not.toBeCalled();
    });

    it("does not change year if out of range year selected", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar date={selectedDate} dateRange={dateRange} onValueChange={callback} />
        );

        var container = ReactTestUtils.findRenderedDOMComponentWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        //In October & switch to years view
        var month = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        ReactTestUtils.Simulate.click(month, {});
        var year = ReactTestUtils.findRenderedDOMComponentWithClass(component, "navigation-title");
        ReactTestUtils.Simulate.click(year, {});

        var cells = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "year");
        cells = cells.filter(function (cell) {
            return cell.classList.contains("disabled");
        });

        expect(cells[0].textContent).toBe("2010");
        ReactTestUtils.Simulate.click(cells[0], {});
        expect(callback).not.toBeCalled();
    });


    it("prevView navigation does not trigger onValueChange callback when date out of range", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar date={selectedDate} dateRange={dateRange} onValueChange={callback} />
        );

        component.prevView(moment(new Date(2015, 9, 1))); // Oct 1st is out of date range
        expect(callback).not.toBeCalled();
    });

    it("setDate does not trigger onValueChange callback when date out of range", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar date={selectedDate} dateRange={dateRange} onValueChange={callback} />
        );

        component.setDate(moment(new Date(2015, 9, 1))); // Oct 1st is out of date range
        expect(callback).not.toBeCalled();
    });

    it("throws error when deprecated prop 'id' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("id", "data-id"));

        expect(function () {
            getComponent({ id: "foo" });
        }).toThrow(expectedError);
    });

    it("throws error when deprecated prop 'onChange' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("onChange", "onValueChange"));

        expect(() => ReactTestUtils.renderIntoDocument(<Calendar onChange={jest.fn()} />)).toThrow(expectedError);
    });

    it("throws error when deprecated prop 'isRequired' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("isRequired", "required"));

        expect(function () {
            getComponent({ isRequired: true });
        }).toThrow(expectedError);
    });

    it("should hide calendar when clicking input text to type date", () => {
        var component = getComponent();

        ReactTestUtils.Simulate.click(TestUtils.findRenderedDOMNodeWithDataId(component, "calendar"));
        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "input-calendar-wrapper")).toBeFalsy();
    });

});
