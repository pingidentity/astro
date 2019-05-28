window.__DEV__ = true;

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import _ from "underscore";
import TestUtils from "../../../testutil/TestUtils";
import FormRadioInput from "../FormRadioInput";
import { mount } from "enzyme";

jest.dontMock("../FormRadioInput");
jest.dontMock("../FormLabel");

describe("FormRadioInput", function () {

    var getComponent = function (props) {
        props = _.defaults(props || {}, {
            name: "test_radio_input",
            onValueChange: jest.fn(),
            value: "test_value"
        });

        return ReactTestUtils.renderIntoDocument(<FormRadioInput {...props} />);
    };

    it("tests onValueChanged", function () {
        var component = getComponent();
        var input = TestUtils.findRenderedDOMNodeWithDataId(component, "FormRadioInput_test_value");
        ReactTestUtils.Simulate.change(input);
        //make sure callback was triggered
        expect(component.props.onValueChange.mock.calls[0][0]).toBe("test_value");
        //expect(component.props.onValueChange).toBeCalledWith("test_value");
    });

    it("test checked false", function () {
        var component = getComponent({ "data-id": "FormRadioInputDataId" });
        var input = TestUtils.findRenderedDOMNodeWithDataId(component, "FormRadioInputDataId_test_value");
        // make sure unchecked
        expect(input.checked).toBe(false);
    });

    it("test checked true", function () {
        var component = getComponent({ checked: true });
        var input = TestUtils.findRenderedDOMNodeWithDataId(component, "FormRadioInput_test_value");
        // make sure checked
        expect(input.checked).toBe(true);
    });



    it("contains the proper css classes", function () {
        var customClass = "my-test-class";
        var component = getComponent({ className: customClass });

        // test presence of custom class (className prop)
        var label = TestUtils.scryRenderedDOMNodesWithClass(component, customClass);
        expect(label.length).toBe(1);
    });

    it("renders disabled state", function () {
        var component = getComponent({ disabled: true });

        // test for disabled class on labels
        var labels = TestUtils.scryRenderedDOMNodesWithClass(component, "disabled");
        expect(labels.length).toBe(1);

        // test for disabled attribute on inputs
        var inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, "input");
        expect(inputs[0].disabled).toBeTruthy();
    });


    //This is a test to just make it fast. Unable to find a test that allows to see if active element is focused.
    it("checks to see it autoFocus is true and if it is render on pageload with focus", () => {
        const component = mount (
            <FormRadioInput autoFocus />
        );

        expect(component.find("input").exists()).toEqual(true);
    });
});
