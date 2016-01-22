window.__DEV__ = true;

jest.dontMock("../../../testutil/TestUtils");
jest.dontMock("../TimePicker.jsx");
jest.dontMock("../../forms/FormSelectField.jsx");

describe("TimePicker", function () {
    var React = require("react/addons"),
        ReactTestUtils = React.addons.TestUtils,
        TimePicker = require("../TimePicker.jsx"),
        onValueChange = jest.genMockFunction(),
        component;

    function render (props) {
        return ReactTestUtils.renderIntoDocument(
            <TimePicker onValueChange={onValueChange} {...props} />
        );
    }

    it("populates an object with times based on props", function () {
        component = render({
            increments: 30,
            format: "12"
        });

        expect(component._getTimes()).toEqual({
            "12:00am": "12:00am",
            "12:30am": "12:30am",
            "1:00am": "1:00am",
            "1:30am": "1:30am",
            "2:00am": "2:00am",
            "2:30am": "2:30am",
            "3:00am": "3:00am",
            "3:30am": "3:30am",
            "4:00am": "4:00am",
            "4:30am": "4:30am",
            "5:00am": "5:00am",
            "5:30am": "5:30am",
            "6:00am": "6:00am",
            "6:30am": "6:30am",
            "7:00am": "7:00am",
            "7:30am": "7:30am",
            "8:00am": "8:00am",
            "8:30am": "8:30am",
            "9:00am": "9:00am",
            "9:30am": "9:30am",
            "10:00am": "10:00am",
            "10:30am": "10:30am",
            "11:00am": "11:00am",
            "11:30am": "11:30am",
            "12:00pm": "12:00pm",
            "12:30pm": "12:30pm",
            "1:00pm": "1:00pm",
            "1:30pm": "1:30pm",
            "2:00pm": "2:00pm",
            "2:30pm": "2:30pm",
            "3:00pm": "3:00pm",
            "3:30pm": "3:30pm",
            "4:00pm": "4:00pm",
            "4:30pm": "4:30pm",
            "5:00pm": "5:00pm",
            "5:30pm": "5:30pm",
            "6:00pm": "6:00pm",
            "6:30pm": "6:30pm",
            "7:00pm": "7:00pm",
            "7:30pm": "7:30pm",
            "8:00pm": "8:00pm",
            "8:30pm": "8:30pm",
            "9:00pm": "9:00pm",
            "9:30pm": "9:30pm",
            "10:00pm": "10:00pm",
            "10:30pm": "10:30pm",
            "11:00pm": "11:00pm",
            "11:30pm": "11:30pm"
        });

        component = render({
            increments: 60,
            format: "24"
        });

        expect(component._getTimes()).toEqual({
            "0:00": "0:00",
            "1:00": "1:00",
            "2:00": "2:00",
            "3:00": "3:00",
            "4:00": "4:00",
            "5:00": "5:00",
            "6:00": "6:00",
            "7:00": "7:00",
            "8:00": "8:00",
            "9:00": "9:00",
            "10:00": "10:00",
            "11:00": "11:00",
            "12:00": "12:00",
            "13:00": "13:00",
            "14:00": "14:00",
            "15:00": "15:00",
            "16:00": "16:00",
            "17:00": "17:00",
            "18:00": "18:00",
            "19:00": "19:00",
            "20:00": "20:00",
            "21:00": "21:00",
            "22:00": "22:00",
            "23:00": "23:00"
        });
    });

    it("properly populates the FormSelectField's options", function () {
        component = render({
            increments: 60,
            format: "24"
        });

        var select = ReactTestUtils.findRenderedDOMComponentWithTag(component, "select");

        expect(select.props.children.length).toEqual(24);
        expect(select.props.children[0].key).toEqual("0:00");
        expect(select.props.children[12].key).toEqual("12:00");
        expect(select.props.children[23].key).toEqual("23:00");
    });

    it("updates the value on change", function () {
        component = render({
            increments: 60,
            format: "24"
        });

        var select = ReactTestUtils.findRenderedDOMComponentWithTag(component, "select");
        var evt = {
            target: {
                value: "8:16"
            }
        };

        ReactTestUtils.Simulate.change(select, evt);

        expect(onValueChange).toBeCalledWith(evt.target.value);
    });
});
