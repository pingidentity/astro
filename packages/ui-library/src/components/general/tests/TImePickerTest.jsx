window.__DEV__ = true;

jest.dontMock("../TimePicker.jsx");
jest.dontMock("../../forms/form-select-field/index.js");
jest.dontMock("../../forms/form-select-field/v2.jsx");
jest.dontMock("../../forms/FormDropDownList.jsx");
jest.dontMock("moment");

describe("TimePicker", function () {
    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        TimePicker = require("../TimePicker.jsx"),
        moment = require("moment"),
        onValueChange = jest.genMockFunction(),
        component;

    function render (props) {
        return ReactTestUtils.renderIntoDocument(
            <TimePicker onValueChange={onValueChange} {...props} />
        );
    }

    beforeEach(function () {
        onValueChange.mockClear();
    });

    it("populates an object with times based on props", function () {
        component = render({
            increments: 30,
            format: "12"
        });

        expect(component._getTimes()).toEqual([
            { label: "12:00am", value: "12:00am" },
            { label: "12:30am", value: "12:30am" },
            { label: "1:00am", value: "1:00am" },
            { label: "1:30am", value: "1:30am" },
            { label: "2:00am", value: "2:00am" },
            { label: "2:30am", value: "2:30am" },
            { label: "3:00am", value: "3:00am" },
            { label: "3:30am", value: "3:30am" },
            { label: "4:00am", value: "4:00am" },
            { label: "4:30am", value: "4:30am" },
            { label: "5:00am", value: "5:00am" },
            { label: "5:30am", value: "5:30am" },
            { label: "6:00am", value: "6:00am" },
            { label: "6:30am", value: "6:30am" },
            { label: "7:00am", value: "7:00am" },
            { label: "7:30am", value: "7:30am" },
            { label: "8:00am", value: "8:00am" },
            { label: "8:30am", value: "8:30am" },
            { label: "9:00am", value: "9:00am" },
            { label: "9:30am", value: "9:30am" },
            { label: "10:00am", value: "10:00am" },
            { label: "10:30am", value: "10:30am" },
            { label: "11:00am", value: "11:00am" },
            { label: "11:30am", value: "11:30am" },
            { label: "12:00pm", value: "12:00pm" },
            { label: "12:30pm", value: "12:30pm" },
            { label: "1:00pm", value: "1:00pm" },
            { label: "1:30pm", value: "1:30pm" },
            { label: "2:00pm", value: "2:00pm" },
            { label: "2:30pm", value: "2:30pm" },
            { label: "3:00pm", value: "3:00pm" },
            { label: "3:30pm", value: "3:30pm" },
            { label: "4:00pm", value: "4:00pm" },
            { label: "4:30pm", value: "4:30pm" },
            { label: "5:00pm", value: "5:00pm" },
            { label: "5:30pm", value: "5:30pm" },
            { label: "6:00pm", value: "6:00pm" },
            { label: "6:30pm", value: "6:30pm" },
            { label: "7:00pm", value: "7:00pm" },
            { label: "7:30pm", value: "7:30pm" },
            { label: "8:00pm", value: "8:00pm" },
            { label: "8:30pm", value: "8:30pm" },
            { label: "9:00pm", value: "9:00pm" },
            { label: "9:30pm", value: "9:30pm" },
            { label: "10:00pm", value: "10:00pm" },
            { label: "10:30pm", value: "10:30pm" },
            { label: "11:00pm", value: "11:00pm" },
            { label: "11:30pm", value: "11:30pm" }
        ]);

        component = render({
            increments: 60,
            format: "24"
        });

        expect(component._getTimes()).toEqual([
            { label: "0:00", value: "0:00" },
            { label: "1:00", value: "1:00" },
            { label: "2:00", value: "2:00" },
            { label: "3:00", value: "3:00" },
            { label: "4:00", value: "4:00" },
            { label: "5:00", value: "5:00" },
            { label: "6:00", value: "6:00" },
            { label: "7:00", value: "7:00" },
            { label: "8:00", value: "8:00" },
            { label: "9:00", value: "9:00" },
            { label: "10:00", value: "10:00" },
            { label: "11:00", value: "11:00" },
            { label: "12:00", value: "12:00" },
            { label: "13:00", value: "13:00" },
            { label: "14:00", value: "14:00" },
            { label: "15:00", value: "15:00" },
            { label: "16:00", value: "16:00" },
            { label: "17:00", value: "17:00" },
            { label: "18:00", value: "18:00" },
            { label: "19:00", value: "19:00" },
            { label: "20:00", value: "20:00" },
            { label: "21:00", value: "21:00" },
            { label: "22:00", value: "22:00" },
            { label: "23:00", value: "23:00" }
        ]);
    });

    it("properly populates the FormSelectField's options", function () {
        component = render({
            increments: 60,
            format: "24"
        });

        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "select-list");

        expect(select.children.length).toEqual(25);
        expect(select.children[0].textContent).toEqual("--");
        expect(select.children[1].textContent).toEqual("0:00");
        expect(select.children[13].textContent).toEqual("12:00");
        expect(select.children[24].textContent).toEqual("23:00");
    });

    it("updates the value on change", function () {
        component = render({
            increments: 60,
            format: "24"
        });

        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "select-list");

        ReactTestUtils.Simulate.click(select.children[0]);
        expect(onValueChange).toBeCalledWith("");

        ReactTestUtils.Simulate.click(select.children[14]);
        expect(onValueChange).toBeCalledWith("13:00");

        ReactTestUtils.Simulate.click(select.children[24]);
        expect(onValueChange).toBeCalledWith("23:00");
    });

    it("takes a `moment` object as a value", function () {
        component = render({
            increments: 60,
            format: "12",
            value: moment("2016-04-01T14:00:00.000Z")
        });

        var date = new Date("April 1 2016");
        var offset = date.getTimezoneOffset() / 60;
        var selected = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");

        // subtract time zone ofset from 1400 hours eg: 14 - 7 (PDT -700)
        expect(selected.textContent).toEqual((14 - offset) + ":00am");
    });

    it("verify default data-id", function () {
        component = render({ increments: 60, format: "24" });
        expect(component.props["data-id"]).toBe("time-picker");
    });

    it("verify id causes warning to be output", function () {
        console.warn = jest.genMockFunction();
        component = render({ id: "some-id", increments: 60, format: "12" });
        expect(console.warn).toBeCalledWith("Deprecated: use data-id instead of id. " +
                                                "Support for id will be removed in next version");
    });
});
