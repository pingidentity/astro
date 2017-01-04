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
jest.dontMock("../../forms/FormLabel.jsx");
jest.dontMock("../../tooltips/HelpHint.jsx");

describe("Calendar", function () {
    var React = require("react"),
        Calendar = require("../Calendar.jsx"),
        moment = require("moment-range"),
        _ = require("underscore"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),

        callback = jest.genMockFunction(),
        selectedDateString = "2015-10-15",
        selectedDate = moment(new Date(selectedDateString));

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

    it("renders with given data-id", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar data-id="myCalendar" date={selectedDate} />
        );

        var calendar = TestUtils.findRenderedDOMNodeWithDataId(component, "myCalendar");

        expect(calendar).toBeDefined();
    });

    //TODO: remove when v1 no longer supported
    it("renders with given id", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar id="myCalendar" date={selectedDate} />
        );

        var calendar = TestUtils.findRenderedDOMNodeWithDataId(component, "myCalendar");

        expect(calendar).toBeDefined();
    });

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
        expect(help.textContent).toContain(labelHelpText);
        expect(help.className).toContain(customHelpClass);
    });

    it("renders will null date and inputValue state it date not specified", function () {
        var component = ReactTestUtils.renderIntoDocument(<Calendar />);

        expect(component.state.date).toBeNull();
        expect(component.state.inputValue).toBeNull();
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

        //make sure calendar cells rendered: 35 days + 7 headers (MON-SUN)
        expect(cells.length).toEqual(42);
    });

    it("is rendering months view", function () {
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
                      onValueChange={callback}/>
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

    //TODO: remove when v1 no longer supported
    it("renders as required when isRequired set", function () {
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

    //TODO: remove when v1 no longer supported
    it("is triggering onChange callback on date selection", function () {
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

        ReactTestUtils.Simulate.click(cells[7], {});

        expect(callback).toBeCalled();
    });

    //TODO: remove when v1 no longer supported
    it("onChange changes date via input field", function () {
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

    //TODO: remove when v1 no longer supported
    it("is triggering onChange callback on arrow nagivation", function () {
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

        globalKeyListener({ keyCode: 39, stopPropagation: _.noop }); //arrow right

        expect(callback).toBeCalledWith("1444953600000");
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

        globalKeyListener({ keyCode: 39, stopPropagation: _.noop }); //arrow right

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

        var mockStopPropagation = jest.genMockFunction();
        globalKeyListener({ keyCode: 39, stopPropagation: mockStopPropagation }); //arrow right

        expect(callback).toBeCalledWith("1444953600000");
        expect(mockStopPropagation).toBeCalled(); //check event won't propagate
    });

    it("register/unregister global listeners", function () {
        document.addEventListener = jest.genMockFunction();
        document.removeEventListener = jest.genMockFunction();

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

    //TODO: remove when v1 no longer supported
    it("does not trigger onChange callback for empty string date input", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar format="YYYY-MM-DD"
                      date={selectedDate}
                      computableFormat="x"
                      closeOnSelect={true}
                      onChange={callback}/>
        );

        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        ReactTestUtils.Simulate.blur(input, { target: { value: "" } });

        expect(callback).not.toBeCalled();
    });

    it("does not trigger onValueChange callback for empty string date input", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Calendar format="YYYY-MM-DD"
                      date={selectedDate}
                      computableFormat="x"
                      closeOnSelect={true}
                      onValueChange={callback}/>
        );

        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        ReactTestUtils.Simulate.blur(input, { target: { value: "" } });

        expect(callback).not.toBeCalled();
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

    //TODO: remove when v1 no longer supported
    it("does not log warning for id, onChange or isRequired when in production", function () {
        //Mock process.env.NODE_ENV
        process.env.NODE_ENV = "production";

        console.warn = jest.genMockFunction();
        ReactTestUtils.renderIntoDocument(
            <Calendar id="myCalendar" onChange={jest.genMockFunction()} isRequired={true} date={selectedDate} />
        );

        expect(console.warn).not.toBeCalled();
        delete process.env.NODE_ENV;
    });

    //TODO: remove when v1 no longer supported
    it("logs warning for id prop", function () {
        console.warn = jest.genMockFunction();
        ReactTestUtils.renderIntoDocument(
            <Calendar id="myCalendar" date={selectedDate} />
        );

        expect(console.warn).toBeCalledWith(
            "Deprecated: use data-id instead of id. " +
            "Support for id will be removed in next version");
    });

    //TODO: remove when v1 no longer supported
    it("logs warning for onChange prop", function () {
        console.warn = jest.genMockFunction();
        ReactTestUtils.renderIntoDocument(
            <Calendar date={selectedDate} onChange={jest.genMockFunction()} />
          );

        expect(console.warn).toBeCalledWith(
          "Deprecated: use onValueChange instead of onChange. " +
          "Support for onChange will be removed in next version");
    });

    //TODO: remove when v1 no longer supported
    it("logs warning for isRequired prop", function () {
        console.warn = jest.genMockFunction();
        ReactTestUtils.renderIntoDocument(
            <Calendar date={selectedDate} isRequired={true} />
          );

        expect(console.warn).toBeCalledWith(
            "Deprecated: use required instead of isRequired. " +
            "Support for isRequired will be removed in next version");
    });

});
