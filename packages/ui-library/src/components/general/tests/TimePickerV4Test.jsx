window.__DEV__ = true;

jest.dontMock("moment");
jest.dontMock("../TimePicker");
jest.dontMock("../../forms/FormError");
jest.dontMock("../../forms/FormDropDownList");
jest.dontMock("../../forms/form-text-field/index.js");
jest.dontMock("../../forms/form-text-field/v2");
jest.dontMock("../../forms/FormDropDownList");
jest.mock("popper.js");
jest.mock("react-portal");

import { allFlags } from "../../../util/FlagUtils";

describe("TimePicker", function () {
    const React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        Utils = require("../../../util/Utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        TimePicker = require("../TimePicker"),
        moment = require("moment"),
        onValueChange = jest.fn();

    function render (props) {
        return ReactTestUtils.renderIntoDocument(
            <TimePicker onValueChange={onValueChange} {...props} flags={allFlags} />
        );
    }

    const openDropdown = component => {
        const clickDropdown = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        ReactTestUtils.Simulate.click(clickDropdown); // open the dropdown
    };

    beforeEach(function () {
        onValueChange.mockClear();
    });

    it("populates an object with times based on props", function () {
        let component = render({
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

    it("properly populates the FormDropDown's options", function () {
        const component = render({
            increments: 60,
            format: "24",
        });
        openDropdown(component);

        const select = TestUtils.findRenderedDOMNodeWithDataId(component, "select-list");


        expect(select.children.length).toEqual(25);
        expect(select.children[0].textContent).toEqual("--");
        expect(select.children[1].textContent).toEqual("0:00");
        expect(select.children[13].textContent).toEqual("12:00");
        expect(select.children[24].textContent).toEqual("23:00");
    });

    it("updates the value on change", function () {
        const component = render({
            increments: 60,
            format: "24"
        });
        openDropdown(component);

        const select = TestUtils.findRenderedDOMNodeWithDataId(component, "select-list");

        ReactTestUtils.Simulate.click(select.children[0]);
        expect(onValueChange).toBeCalledWith("");

        ReactTestUtils.Simulate.click(select.children[14]);
        expect(onValueChange).toBeCalledWith("13:00");

        ReactTestUtils.Simulate.click(select.children[24]);
        expect(onValueChange).toBeCalledWith("23:00");
    });

    it("takes a `moment` object as a value", function () {
        const component = render({
            increments: 60,
            format: "24",
            value: moment("2016-04-01T14:00:00.000Z")
        });

        const date = new Date("April 1 2016");
        const offset = date.getTimezoneOffset() / 60;
        const selected = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-input-input");
        // subtract time zone ofset from 1400 hours eg: 14 - 7 (PDT -700)
        expect(selected.value).toEqual((14 - offset) + ":00");
    });

    it("takes a `moment` object as a value", function () {
        const component = render({
            increments: 60,
            format: "12",
            value: moment("2019-04-04T14:00:00.000Z").utc()
        });

        const selected = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-input-input");
        expect(selected.value).toEqual("2:00pm");
    });

    it("verify default data-id", function () {
        const component = render({ increments: 60, format: "24" });
        expect(component.props["data-id"]).toBe("time-picker");
    });

    it("throws error when deprecated prop 'id' is passed in", function () {
        const expectedError = new Error(Utils.deprecatePropError("id", "data-id"));

        expect(function () {
            render({ id: "foo" });
        }).toThrow(expectedError);
    });

});
