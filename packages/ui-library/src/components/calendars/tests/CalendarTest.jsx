window.__DEV__ = true;

jest.mock("popper.js");
jest.mock("react-portal");

import React from "react";
import ReactDOM from "react-dom";
import Calendar from "../Calendar";
import moment from "moment-range";
import _ from "underscore";
import { mountSnapshotDataIds } from "../../../devUtil/EnzymeUtils";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import { mount } from "enzyme";

describe("Calendar", function () {
    const callback = jest.fn(),
        selectedDateString = "2015-10-15",
        dateRange = {
            startDate: new Date(2015, 9, 10), //Oct 10 2015
            endDate: new Date(2015, 10, 20) //Nov 20 2015
        },
        selectedDate = moment(new Date(selectedDateString));

    function getComponent (props) {
        return ReactTestUtils.renderIntoDocument(
            <div><Calendar {...props} /></div>
        );
    }

    function mountComponent(props) {
        return mount(<Calendar {...props} />);
    }

    beforeEach(function () {
        callback.mockClear();
    });

    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <Calendar />
        );
    });

    it("renders with default data-id", function () {
        const component = getComponent({ date: selectedDate });

        const calendar = TestUtils.findRenderedDOMNodeWithDataId(component, "calendar");

        expect(calendar).toBeDefined();
    });

    it("renders open state in portal", function () {
        const wrapper = mountComponent({ date: selectedDate });
        const component = wrapper;

        component.instance().setState({ isVisible: true });
        wrapper.update();

        const calendar = wrapper.find("[data-id='input-calendar-wrapper']");
        expect(calendar.length).toBe(1);
    });

    it("renders with given data-id", function () {
        const component = ReactTestUtils.renderIntoDocument(
            <Calendar data-id="myCalendar" date={selectedDate} />
        );

        const calendar = TestUtils.findRenderedDOMNodeWithDataId(component, "myCalendar");

        expect(calendar).toBeDefined();
    });

    /*
    TODO: fix this test
    NOTE: Currently we've not been able to test the react-tooltip helpHint in it's shown state. Since the React Tooltip
    does not populate its content until it is displayed, the content of the tooltip cannot yet be tested.
    */
    it("renders the label and label help text with a custom label css class and custom help css class", function () {
        const dataId = "my-label",
            customLabelText = "My Label",
            customLabelClass = "label-css-class",
            customHelpClass = "help-css-class",
            labelHelpText = "Some help text",
            component = getComponent({
                "data-id": dataId,
                date: selectedDate,
                labelText: customLabelText,
                labelHelpText: labelHelpText,
                labelClassName: customLabelClass,
                helpClassName: customHelpClass,
            }),
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
            component = getComponent({
                "data-id": dataId,
                date: selectedDate,
                label: customLabelText,
            }),
            labelText = TestUtils.findRenderedDOMNodeWithDataId(component, "label");

        expect(labelText).toBeTruthy();
        expect(labelText.textContent).toContain(customLabelText);
    });

    it("is rendering closed view", function () {
        const component = getComponent({
            format: "YYYY-MM-DD",
            date: selectedDate,
            computableFormat: "x",
            closeOnSelect: true,
            onValueChange: callback,
        });

        const input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        expect(input.value).toBe(selectedDate.format("YYYY-MM-DD"));

        const cells = TestUtils.scryRenderedDOMNodesWithClass(component, "day");

        //make sure no calendar cells rendered (e.g. closed)
        expect(cells.length).toEqual(0);
    });

    it("is rendering days view", function () {
        const component = getComponent({
            format: "YYYY-MM-DD",
            initialState: {
                date: selectedDate,
            },
            computableFormat: "x",
            closeOnSelect: true,
            onValueChange: callback,
        });

        const container = TestUtils.findRenderedDOMNodeWithClass(component, "input-calendar");

        // open calendar
        ReactTestUtils.Simulate.click(container, {});

        const cells = TestUtils.scryRenderedDOMNodesWithClass(component, "day");

        // make sure calendar cells rendered: 35 days + 7 headers (MON-SUN)
        expect(cells.length).toEqual(42);

        // Navigate to September (previous month)
        const prev = TestUtils.findRenderedDOMNodeWithClass(component, "icon-left");
        ReactTestUtils.Simulate.click(prev, {});
        let month = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        expect(month.textContent).toBe("September");

        // Navigate back to October (next month)
        const next = TestUtils.findRenderedDOMNodeWithClass(component, "icon-right");
        ReactTestUtils.Simulate.click(next, {});
        month = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        expect(month.textContent).toBe("October");
    });

    it("is rendering months view", function () {
        const component = getComponent({
            format: "YYYY-MM-DD",
            initialState: {
                date: selectedDate,
            },
            computableFormat: "x",
            closeOnSelect: true,
            onValueChange: callback,
        });

        const container = TestUtils.findRenderedDOMNodeWithClass(component, "input-calendar");

        // open calendar
        ReactTestUtils.Simulate.click(container, {});

        // switch to months view
        const navigation = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        ReactTestUtils.Simulate.click(navigation, {});

        let cells = TestUtils.scryRenderedDOMNodesWithClass(component, "month");

        expect(cells.length).toEqual(12);

        // Navigate to previous year
        const prev = TestUtils.findRenderedDOMNodeWithClass(component, "icon-left");
        ReactTestUtils.Simulate.click(prev, {});
        let year = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        expect(parseInt(year.textContent)).toBe(moment(selectedDate).subtract(1, "years").year());

        // Navigate back to selectedDate year
        const next = TestUtils.findRenderedDOMNodeWithClass(component, "icon-right");
        ReactTestUtils.Simulate.click(next, {});
        year = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        expect(parseInt(year.textContent)).toBe(moment(selectedDate).year());

        // let's select month and make sure we go back to days view
        ReactTestUtils.Simulate.click(cells[0]);
        cells = TestUtils.scryRenderedDOMNodesWithClass(component, "day");
        expect(cells.length).toEqual(42);

    });

    it("is rendering years view", function () {
        const component = getComponent({
            format: "YYYY-MM-DD",
            initialState: {
                date: selectedDate,
            },
            computableFormat: "x",
            closeOnSelect: true,
            onValueChange: callback,
        });

        const container = TestUtils.findRenderedDOMNodeWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        //Switch to months view
        let navigation = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        ReactTestUtils.Simulate.click(navigation, {});

        //Switch to years view
        navigation = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        ReactTestUtils.Simulate.click(navigation, {});

        // Navigate to previous year range
        const prev = TestUtils.findRenderedDOMNodeWithClass(component, "icon-left");
        ReactTestUtils.Simulate.click(prev, {});
        let yearRange = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        expect(yearRange.textContent).toBe("2000-2011");

        // Navigate back to current year range
        const next = TestUtils.findRenderedDOMNodeWithClass(component, "icon-right");
        ReactTestUtils.Simulate.click(next, {});
        yearRange = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        expect(yearRange.textContent).toBe("2010-2021");

        const cells = TestUtils.scryRenderedDOMNodesWithClass(component, "year");

        //make sure calendar cells rendered: 12 years
        expect(cells.length).toEqual(12);
    });

    it("renders as required when required set", function () {
        const component = getComponent({
            format: "YYYY-MM-DD",
            date: selectedDate,
            computableFormat: "x",
            closeOnSelect: true,
            onValueChange: callback,
            required: true,
        });

        expect(TestUtils.findRenderedDOMNodeWithClass(component, "input-calendar").className).toContain("required");
    });

    it("is triggering onValueChange callback on date selection", function () {
        const component = getComponent({
            format: "YYYY-MM-DD",
            date: selectedDate,
            computableFormat: "x",
            closeOnSelect: true,
            onValueChange: callback,
        });

        const container = TestUtils.findRenderedDOMNodeWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        const cells = TestUtils.scryRenderedDOMNodesWithClass(component, "day");

        ReactTestUtils.Simulate.mouseDown(cells[7], {});

        expect(callback).toBeCalled();
    });

    it("is not triggering onValueChange callback when an empty cell is clicked", function () {
        const component = getComponent({
            format: "YYYY-MM-DD",
            date: selectedDate,
            onValueChange: callback,
        });

        const container = TestUtils.findRenderedDOMNodeWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        const cells = TestUtils.scryRenderedDOMNodesWithClass(component, "day");

        ReactTestUtils.Simulate.mouseDown(cells[0], {});

        expect(callback).not.toBeCalled();
    });

    it("onValueChange changes date via input field", function () {
        const component = getComponent({
            format: "YYYY-MM-DD",
            date: selectedDate,
            computableFormat: "x",
            closeOnSelect: true,
            onValueChange: callback,
        });

        const input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        ReactTestUtils.Simulate.change(input, { target: { value: "2016-10-15" } });

        //input was updated
        expect(input.value).toBe("2016-10-15");
    });

    it("is supporting min view", function () {
        const component = getComponent({
            format: "YYYY-MM-DD",
            date: selectedDate,
            minView: 1,
            computableFormat: "x",
            closeOnSelect: true,
            onValueChange: callback,
        });

        const container = TestUtils.findRenderedDOMNodeWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        const cells = TestUtils.scryRenderedDOMNodesWithClass(component, "month");

        expect(cells.length).toEqual(12);

        ReactTestUtils.Simulate.click(cells[0]);

        expect(callback).toBeCalled();
    });

    it("is triggering onValueChange callback on arrow nagivation", function () {
        const globalKeyListener = TestUtils.captureGlobalListener("keyDown", document);

        const component = getComponent({
            format: "YYYY-MM-DD",
            date: selectedDate,
            computableFormat: "x",
            closeOnSelect: true,
            onValueChange: callback,
        });

        const container = TestUtils.findRenderedDOMNodeWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        globalKeyListener({ keyCode: 39, preventDefault: _.noop }); //arrow right

        expect(callback).toBeCalledWith("1444953600000");
    });

    it("stops arrow navigation keyDown event propagation", function () {
        const globalKeyListener = TestUtils.captureGlobalListener("keyDown", document);

        const component = getComponent({
            format: "YYYY-MM-DD",
            date: selectedDate,
            computableFormat: "x",
            closeOnSelect: true,
            onValueChange: callback,
        });

        const container = TestUtils.findRenderedDOMNodeWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        const mockpreventDefault = jest.fn();
        globalKeyListener({ keyCode: 39, preventDefault: mockpreventDefault }); //arrow right

        expect(callback).toBeCalledWith("1444953600000");
        expect(mockpreventDefault).toBeCalled(); //check event won't propagate
    });

    it("register/unregister global listeners", function () {
        document.addEventListener = jest.fn();
        document.removeEventListener = jest.fn();

        const component = getComponent({
            format: "YYYY-MM-DD",
            date: selectedDate,
            computableFormat: "x",
            closeOnSelect: true,
            onValueChange: callback,
        });

        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);

        expect(document.addEventListener.mock.calls.length).toEqual(1);
        expect(document.addEventListener.mock.calls[0][0]).toEqual("click");

        expect(document.removeEventListener.mock.calls.length).toEqual(1);
        expect(document.removeEventListener.mock.calls[0][0]).toEqual("click");
    });

    it("does nothing with a blur event if nothing's changed", function () {
        const component = getComponent({
            format: "YYYY-MM-DD",
            date: selectedDate,
            computableFormat: "x",
            closeOnSelect: true,
            onValueChange: callback,
        });

        const input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        ReactTestUtils.Simulate.blur(input, {});

        expect(callback).not.toBeCalled();
    });

    it("handles input blur event", function () {
        const component = getComponent({
            format: "YYYY-MM-DD",
            date: selectedDate,
            computableFormat: "x",
            closeOnSelect: true,
            onValueChange: callback,
        });

        const input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        expect(callback).not.toBeCalled();
        ReactTestUtils.Simulate.change(input, { target: { value: "03-13-2019" } });
        ReactTestUtils.Simulate.blur(input, {});

        expect(callback).toBeCalled();
    });

    it("handles input blur with invalid date", function () {
        const component = getComponent({
            format: "YYYY-MM-DD",
            date: selectedDate,
            computableFormat: "x",
            closeOnSelect: true,
            onValueChange: callback,
        });

        const input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        ReactTestUtils.Simulate.change(input, { target: { value: "not a date" } });
        ReactTestUtils.Simulate.blur(input, {});

        expect(callback).toBeCalled();
    });

    it("is closing calendar on click outside", function () {
        const globalClickListener = TestUtils.captureGlobalListener("click", document);

        const component = getComponent({
            format: "YYYY-MM-DD",
            date: selectedDate,
            computableFormat: "x",
            closeOnSelect: true,
            onValueChange: callback,
        });

        const container = TestUtils.findRenderedDOMNodeWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});
        globalClickListener();

        //click outside
        globalClickListener();

        const cells = TestUtils.scryRenderedDOMNodesWithClass(component, "day");

        //make sure calendar was closed
        expect(cells.length).toEqual(0);
    });

    it("renders with dates outside range disabled", function () {
        const component = getComponent({
            initialState: {
                date: selectedDate,
            },
            dateRange: dateRange,
        });

        const container = TestUtils.findRenderedDOMNodeWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        //In October
        let cells = Object.values(TestUtils.scryRenderedDOMNodesWithClass(component, "day"));
        cells = cells.filter(function (cell) {
            return cell.classList.contains("disabled") && !cell.classList.contains("prev");
        });

        expect(cells.length).toBe(9); // dates 1 to 9 out of range

        //Navigate to November
        const next = TestUtils.scryRenderedDOMNodesWithClass(component, "icon")[1];
        ReactTestUtils.Simulate.click(next, {});
        const month = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        expect(month.textContent).toBe("November");

        cells = Object.values(TestUtils.scryRenderedDOMNodesWithClass(component, "day"));
        cells = cells.filter(function (cell) {
            return cell.classList.contains("disabled") && !cell.classList.contains("next");
        });

        expect(cells.length).toBe(10); // dates 21 - 30 out of range
    });

    it("renders with months outside range disabled", function () {
        const component = getComponent({
            date: new Date(2015, 9, 15),
            dateRange
        });

        const container = TestUtils.findRenderedDOMNodeWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        //In October & Switch to months view
        const navigation = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        ReactTestUtils.Simulate.click(navigation, {});

        const cells = Object.values(TestUtils.scryRenderedDOMNodesWithClass(component, "month"));
        const disabled = cells.filter(function (cell) {
            return cell.classList.contains("disabled");
        });
        expect(disabled.length).toBe(10);

        const enabled = cells.filter(function (cell) {
            return !cell.classList.contains("disabled");
        });
        expect(enabled.length).toBe(2); // only Oct & Nov not disabled
        expect(enabled[0].textContent).toBe("Oct");
        expect(enabled[1].textContent).toBe("Nov");
    });

    it("renders with years outside range disabled", function () {
        const component = getComponent({
            date: selectedDate, dateRange,
        });

        const container = TestUtils.findRenderedDOMNodeWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        //In October & Switch to months view
        let navigation = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        ReactTestUtils.Simulate.click(navigation, {});

        //Switch to years view
        navigation = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        ReactTestUtils.Simulate.click(navigation, {});

        const cells = Object.values(TestUtils.scryRenderedDOMNodesWithClass(component, "year"));
        const disabled = cells.filter(function (cell) {
            return cell.classList.contains("disabled");
        });
        expect(disabled.length).toBe(11);

        const enabled = cells.filter(function (cell) {
            return !cell.classList.contains("disabled");
        });
        expect(enabled.length).toBe(1); // only 2015 not disabled
        expect(enabled[0].textContent).toBe("2015");
    });

    it("input display date can't be out of range", function () {
        const component = getComponent({
            date: selectedDate,
            dateRange: dateRange,
            format: "YYYY-MM-DD",
        });

        const input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        ReactTestUtils.Simulate.change(input, { target: { value: "2080-12-04" } });
        ReactTestUtils.Simulate.blur(input, {});

        //input was not updated
        expect(input.value).not.toBe("2080-12-04");
    });

    it("disables header arrow navigation if date out of range", function () {
        const component = getComponent({
            initialState: {
                date: selectedDate,
            },
            dateRange: dateRange,
        });

        const container = TestUtils.findRenderedDOMNodeWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        //In October
        let month = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        expect(month.textContent).toBe("October");

        let arrows = TestUtils.scryRenderedDOMNodesWithClass(component, "icon");
        expect(arrows.length).toBe(2); // prev & next

        //Nothing happens clicking disabled prev
        const prev = arrows[0];
        expect(prev.classList.contains("disabled")).toBe(true);
        ReactTestUtils.Simulate.click(prev, {});
        month = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        expect(month.textContent).toBe("October");

        //Navigate to with enabled next
        let next = arrows[1];
        ReactTestUtils.Simulate.click(next, {});
        month = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        expect(month.textContent).toBe("November");

        arrows = TestUtils.scryRenderedDOMNodesWithClass(component, "icon");
        expect(arrows.length).toBe(2); // prev & next

        //Nothing happens clicking disabled next
        next = arrows[1];
        expect(next.classList.contains("disabled")).toBe(true);
        ReactTestUtils.Simulate.click(next, {});
        month = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        expect(month.textContent).toBe("November");
    });

    it("disables header arrow navigation if month out of range", function () {
        const component = getComponent({
            date: selectedDate,
            dateRange: dateRange,
        });

        const container = TestUtils.findRenderedDOMNodeWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        //In October
        const month = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        expect(month.textContent).toBe("October");

        //Switch to months view
        ReactTestUtils.Simulate.click(month, {});
        let year = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        expect(year.textContent).toBe("2015");

        const arrows = TestUtils.scryRenderedDOMNodesWithClass(component, "icon");
        expect(arrows.length).toBe(2); // prev & next

        //Nothing happens clicking disabled prev
        const prev = arrows[0];
        expect(prev.classList.contains("disabled")).toBe(true);
        ReactTestUtils.Simulate.click(prev, {});
        year = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        expect(year.textContent).toBe("2015");

        //Nothing happens clicking disabled next
        const next = arrows[1];
        expect(next.classList.contains("disabled")).toBe(true);
        ReactTestUtils.Simulate.click(next, {});
        year = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        expect(year.textContent).toBe("2015");
    });

    it("disables header arrow navigation if year out of range", function () {
        const component = getComponent({
            date: selectedDate,
            dateRange: dateRange,
        });

        const container = TestUtils.findRenderedDOMNodeWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        //In October
        const month = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        expect(month.textContent).toBe("October");

        //Switch to years view
        ReactTestUtils.Simulate.click(month, {});
        const year = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        expect(year.textContent).toBe("2015");

        ReactTestUtils.Simulate.click(year, {});
        let years = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        expect(years.textContent).toBe("2010-2021");

        const arrows = TestUtils.scryRenderedDOMNodesWithClass(component, "icon");
        expect(arrows.length).toBe(2); // prev & next

        //Nothing happens clicking disabled prev
        const prev = arrows[0];
        expect(prev.classList.contains("disabled")).toBe(true);
        ReactTestUtils.Simulate.click(prev, {});
        years = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        expect(years.textContent).toBe("2010-2021");

        //Nothing happens clicking disabled next
        const next = arrows[1];
        expect(next.classList.contains("disabled")).toBe(true);
        ReactTestUtils.Simulate.click(next, {});
        years = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        expect(years.textContent).toBe("2010-2021");
    });

    it("does not change date if out of range date selected", function () {
        const component = getComponent({
            date: selectedDate,
            dateRange: dateRange,
            onValueChange: callback,
        });

        const container = TestUtils.findRenderedDOMNodeWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        //In October
        let cells = Object.values(TestUtils.scryRenderedDOMNodesWithClass(component, "day"));
        cells = cells.filter(function (cell) {
            return cell.classList.contains("disabled") && !cell.classList.contains("prev");
        });

        expect(cells[0].textContent).toBe("1");
        ReactTestUtils.Simulate.click(cells[0], {});
        expect(callback).not.toBeCalled();
    });

    it("does not change date if out of range month selected", function () {
        const component = getComponent({
            date: selectedDate, dateRange: dateRange, onValueChange: callback,
        });

        const container = TestUtils.findRenderedDOMNodeWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        //In October & switch to months view
        const month = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        ReactTestUtils.Simulate.click(month, {});

        let cells = Object.values(TestUtils.scryRenderedDOMNodesWithClass(component, "month"));
        cells = cells.filter(function (cell) {
            return cell.classList.contains("disabled");
        });

        expect(cells[0].textContent).toBe("Jan");
        ReactTestUtils.Simulate.click(cells[0], {});
        expect(callback).not.toBeCalled();
    });

    it("does not change year if out of range year selected", function () {
        const component = getComponent({
            date: selectedDate, dateRange: dateRange, onValueChange: callback,
        });

        const container = TestUtils.findRenderedDOMNodeWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        //In October & switch to years view
        const month = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        ReactTestUtils.Simulate.click(month, {});
        const year = TestUtils.findRenderedDOMNodeWithClass(component, "navigation-title");
        ReactTestUtils.Simulate.click(year, {});

        let cells = Object.values(TestUtils.scryRenderedDOMNodesWithClass(component, "year"));
        cells = cells.filter(function (cell) {
            return cell.classList.contains("disabled");
        });

        expect(cells[0].textContent).toBe("2010");
        ReactTestUtils.Simulate.click(cells[0], {});
        expect(callback).not.toBeCalled();
    });


    it("prevView navigation does not trigger onValueChange callback when date out of range", function () {
        const wrapper = mountComponent({
            date: selectedDate, dateRange: dateRange, onValueChange: callback,
        });
        const component = wrapper;

        component.instance().prevView(moment(new Date(2015, 9, 1))); // Oct 1st is out of date range
        expect(callback).not.toBeCalled();
    });

    it("prevView navigation does trigger onValueChange callback when there's no date range", function () {
        const wrapper = mountComponent({
            date: selectedDate, onValueChange: callback,
        });
        const component = wrapper;

        component.instance().prevView(moment(new Date(2015, 9, 1)));
        expect(callback).toBeCalled();
    });

    it("should hide calendar when clicking input text to type date", () => {
        const component = getComponent();

        ReactTestUtils.Simulate.click(TestUtils.findRenderedDOMNodeWithDataId(component, "calendar-input"));
        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "input-calendar-wrapper")).toBeFalsy();
    });

    it("changes the date when in progressively stateful mode", function() {
        const component = getComponent({
            initialState: {
                date: selectedDate,
            },
            closeOnSelect: false,
        });

        const container = TestUtils.findRenderedDOMNodeWithClass(component, "input-calendar");

        // open calendar
        ReactTestUtils.Simulate.click(container);
        const cell = TestUtils.findRenderedDOMNodeWithDataId(component, "days-cell-4");

        ReactTestUtils.Simulate.mouseDown(cell);

        const activeCell = TestUtils.findRenderedDOMNodeWithClass(component, "current");
        expect(activeCell).toEqual(cell);
    });

    it("can handle time as a single number in string form", function() {
        const component = getComponent({
            computableFormat: "x",
            date: "1552766657444",
        });

        const textInput = TestUtils.findRenderedDOMNodeWithDataId(component, "calendar-input");

        expect(textInput.value).toBe("03-16-2019");
    });

    it("returns a utcOffset when utcOffset prop is passed", function() {

        const component = getComponent({
            date: "02/02/2002",
            utcOffset: "+05:00",
            format: "DD-MM-YYYY Z"
        });

        const textInput = TestUtils.findRenderedDOMNodeWithDataId(component, "calendar-input");

        expect(textInput.value ).toBe("02-02-2002 +05:00");

    });

    it("Does not allow dates outside of range with UTC offset", function() {

        const component = getComponent({
            dateRange: {
                startDate: "2015-10-10", //Oct 10 2015
                endDate: "2015-11-20" //Nov 20 2015
            },
            format: "YYYY-MM-DD",
            utcOffset: "-24:00",
        });

        const input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        ReactTestUtils.Simulate.change(input, { target: { value: "2015-10-17" } });
        ReactTestUtils.Simulate.blur(input, {});

        const textInput = TestUtils.findRenderedDOMNodeWithDataId(component, "calendar-input");

        expect(textInput.value).toBe("2015-10-17");

        ReactTestUtils.Simulate.change(input, { target: { value: "2015-10-09" } });
        ReactTestUtils.Simulate.blur(input, {});

        expect(textInput.value).toBe("2015-10-17");

        ReactTestUtils.Simulate.change(input, { target: { value: "2015-11-21" } });
        ReactTestUtils.Simulate.blur(input, {});

        expect(textInput.value).toBe("2015-10-17");
    });

    it("calls onValueChange when clicking last day in range with utcOffset", function () {
        const onValueChange = jest.fn();
        const component = getComponent({
            date: "2015-10-15",
            dateRange: {
                startDate: "2015-10-05",
                endDate: "2015-10-17"
            },
            onValueChange,
            utcOffset: "-20:00"
        });

        const container = TestUtils.findRenderedDOMNodeWithClass(component, "input-calendar");

        //open calendar
        ReactTestUtils.Simulate.click(container, {});

        const endDate = TestUtils.findRenderedDOMNodeWithDataId(component, "days-cell-17");
        ReactTestUtils.Simulate.mouseDown(endDate);

        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledWith("10-17-2015");

        const afterEndDate = TestUtils.findRenderedDOMNodeWithDataId(component, "days-cell-18");
        ReactTestUtils.Simulate.mouseDown(afterEndDate);
        expect(onValueChange).toHaveBeenCalledTimes(1);
    });

    it("handles invalid characters written into the input using validateInputValue", function() {
        const validateInputValue = jest.fn(() => true);
        const component = getComponent({
            validateInputValue,
            date: "02-02-2002",
            format: "DD-MM-YYYY"
        });

        const input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        ReactTestUtils.Simulate.change(input, { target: { value: "abc" } });
        ReactTestUtils.Simulate.blur(input, {});

        const textInput = TestUtils.findRenderedDOMNodeWithDataId(component, "calendar-input");

        expect(validateInputValue).toHaveBeenCalled();
        expect(textInput.value).toEqual("02-02-2002");
    });
});
