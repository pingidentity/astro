window.__DEV__ = true;

jest.dontMock("../ConditionalFieldset.jsx");
jest.dontMock("../../forms/form-select-field/index.js");
jest.dontMock("../../forms/form-select-field/v2.jsx");
jest.dontMock("../../forms/FormLabel.jsx");
jest.dontMock("../../forms/FormError.jsx");
jest.dontMock("../../forms/FormRadioGroup.jsx");

describe("ConditionalFieldset", function () {
    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        FormSelectField = require("../../forms/form-select-field").v2,
        FormRadioGroup = require("../../forms/FormRadioGroup.jsx"),
        ConditionalFieldset = require("../ConditionalFieldset.jsx"),
        _ = require("underscore"),
        callback,
        dataId = "fieldset",
        selectedIndex = 0;

    beforeEach(function () {
        callback = jest.genMockFunction();
    });

    function getGenericConditionalFieldset (props) {
        props = _.defaults(props || {}, {
            "data-id": dataId
        });

        return ReactTestUtils.renderIntoDocument(
            <ConditionalFieldset {...props}>
                 <div data-id="option1" title="Option 1"><span>Option with some <strong>MARKUP</strong></span></div>
                 <div data-id="option2" title="Option 2">Option 2</div>
             </ConditionalFieldset>
        );
    }

    it("renders default configuration with minimal params", function () {
        var component = getGenericConditionalFieldset({ "data-id": dataId });

        var form1 = TestUtils.findRenderedDOMNodeWithDataId(component, "option1");
        expect(form1).toBeTruthy();
        expect(form1.textContent).toBe("Option with some MARKUP");
        var form2 = TestUtils.findRenderedDOMNodeWithDataId(component, "option2");
        expect(form2).toBeFalsy();

        var select = TestUtils.findRenderedDOMNodeWithDataId(component, dataId + "-options");
        expect(select).toBeTruthy();
        var formSelectField = TestUtils.findRenderedComponentWithType(component, FormSelectField);
        expect(formSelectField).toBeTruthy();

        var options = TestUtils.scryRenderedDOMNodesWithTag(select, "option");
        expect(options.length).toBe(2);
        expect(options[0].getAttribute("value")).toBe("0");
        expect(options[0].textContent).toBe("Option 1");
        expect(options[1].getAttribute("value")).toBe("1");
        expect(options[1].textContent).toBe("Option 2");
    });

    it("renders default configuration with FormRadioGroup", function () {
        var component = getGenericConditionalFieldset({ type: "radio" });

        var form1 = TestUtils.findRenderedDOMNodeWithDataId(component, "option1");
        expect(form1).toBeTruthy();
        expect(form1.textContent).toBe("Option with some MARKUP");
        var form2 = TestUtils.findRenderedDOMNodeWithDataId(component, "option2");
        expect(form2).toBeFalsy();

        var radio = TestUtils.findRenderedDOMNodeWithDataId(component, dataId + "-options");
        expect(radio).toBeTruthy();
        var formRadioGroup = TestUtils.findRenderedComponentWithType(component, FormRadioGroup);
        expect(formRadioGroup).toBeTruthy();

        var options = TestUtils.scryRenderedDOMNodesWithTag(radio, "input");
        expect(options.length).toBe(2);
        // make sure no radios are checked since we didn't provide a default
        expect(options[0].checked).toBe(true);
        expect(options[1].checked).toBe(false);

        var optionLabel = TestUtils.scryRenderedDOMNodesWithTag(radio, "label");
        expect(optionLabel.length).toBe(2);
        expect(optionLabel[0].textContent).toBe("Option 1");
        expect(optionLabel[1].textContent).toBe("Option 2");
    });

    it("change option with select", function () {
        var component = getGenericConditionalFieldset({ "data-id": dataId });
        var componentRef = component.refs.ConditionalFieldsetStateful;
        expect(componentRef.state.selectedIndex).toBe(0);

        var form1 = TestUtils.findRenderedDOMNodeWithDataId(component, "option1");
        expect(form1).toBeTruthy();
        var form2 = TestUtils.findRenderedDOMNodeWithDataId(component, "option2");
        expect(form2).toBeFalsy();

        var select = TestUtils.findRenderedDOMNodeWithTag(component, "select");
        ReactTestUtils.Simulate.change(select, { target: { value: 1 } } );
        expect(componentRef.state.selectedIndex).toBe(1);

        form1 = TestUtils.findRenderedDOMNodeWithDataId(component, "option1");
        expect(form1).toBeFalsy();
        form2 = TestUtils.findRenderedDOMNodeWithDataId(component, "option2");
        expect(form2).toBeTruthy();
    });

    it("change option with radio", function () {
        var component = getGenericConditionalFieldset({ type: "radio" });
        var componentRef = component.refs.ConditionalFieldsetStateful;
        expect(componentRef.state.selectedIndex).toBe(0);

        var form1 = TestUtils.findRenderedDOMNodeWithDataId(component, "option1");
        expect(form1).toBeTruthy();
        var form2 = TestUtils.findRenderedDOMNodeWithDataId(component, "option2");
        expect(form2).toBeFalsy();

        var options = TestUtils.scryRenderedDOMNodesWithTag(component, "input");
        expect(options.length).toBe(2);
        expect(options[0].checked).toBe(true);
        expect(options[1].checked).toBe(false);
        expect(componentRef.state.selectedIndex).toBe(0);
        //ReactTestUtils.Simulate.change(options[1], { target: { checked: true } });
        //expect(componentRef.state.selectedIndex).toBe(1);

        // form1 = TestUtils.findRenderedDOMNodeWithDataId(component, "option1");
        // expect(form1).toBeFalsy();
        // form2 = TestUtils.findRenderedDOMNodeWithDataId(component, "option2");
        // expect(form2).toBeTruthy();
    });

    it("controlled change option", function () {
        var component = getGenericConditionalFieldset({
            "data-id": dataId,
            controlled: true,
            onValueChange: callback,
            selectedIndex: selectedIndex
        });

        var select = TestUtils.findRenderedDOMNodeWithTag(component, "select");
        ReactTestUtils.Simulate.change(select, { target: { value: 1 } } );
        expect(callback).toBeCalledWith(1);
    });

    it("change option with select", function () {
        var component = getGenericConditionalFieldset({
            "data-id": dataId,
            supportEmpty: true,
            emptyMessage: "DO NOTHING"
        });
        var componentRef = component.refs.ConditionalFieldsetStateful;
        expect(componentRef.state.selectedIndex).toBe(0);

        var form1 = TestUtils.findRenderedDOMNodeWithDataId(component, "option1");
        expect(form1).toBeFalsy();
        var form2 = TestUtils.findRenderedDOMNodeWithDataId(component, "option2");
        expect(form2).toBeFalsy();

        var select = TestUtils.findRenderedDOMNodeWithTag(component, "select");
        var options = TestUtils.scryRenderedDOMNodesWithTag(select, "option");
        expect(options.length).toBe(3);
        expect(options[0].getAttribute("value")).toBe("0");
        expect(options[0].textContent).toBe("DO NOTHING");
        expect(options[1].getAttribute("value")).toBe("1");
        expect(options[1].textContent).toBe("Option 1");
        expect(options[2].getAttribute("value")).toBe("2");
        expect(options[2].textContent).toBe("Option 2");

        ReactTestUtils.Simulate.change(select, { target: { value: 1 } } );
        expect(componentRef.state.selectedIndex).toBe(1);

        form1 = TestUtils.findRenderedDOMNodeWithDataId(component, "option1");
        expect(form1).toBeTruthy();
        form2 = TestUtils.findRenderedDOMNodeWithDataId(component, "option2");
        expect(form2).toBeFalsy();
    });
});