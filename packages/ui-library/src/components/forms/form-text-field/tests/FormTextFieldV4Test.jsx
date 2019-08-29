window.__DEV__ = true;

jest.dontMock("../v2");
jest.dontMock("../index.js");
jest.dontMock("../../FormLabel");
jest.dontMock("../../FormError");
jest.dontMock("../../../tooltips/HelpHint");

import StateContainer from "../../../utils/StateContainer";
import { allFlags } from "../../../../util/FlagUtils";
import { mountSnapshotDataIds } from "../../../../devUtil/EnzymeUtils";

describe("FormTextField v4", function () {
    const React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../../testutil/TestUtils"),
        FormTextField = require("../v2"),
        Utils = require("../../../../util/Utils"),
        _ = require("underscore");


    //Use this function to extract a property by either the new name or the legacy name with precedence give
    //to new name, legacy name, default.
    function legacyProp (opts, name, legacyName, deflt) {
        if (!opts) {
            return false;
        }

        if (typeof(opts[name]) === "undefined") {
            return typeof(opts[legacyName]) === "undefined" ? deflt : opts[legacyName];
        }

        return opts[name];
    }

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            stateless: false,
            labelText: "",
            required: legacyProp(opts, "required", "isRequired", false),
            flags: allFlags,
        });

        return ReactTestUtils.renderIntoDocument(<FormTextField {...opts} />);
    }

    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <FormTextField
                flags={allFlags}
            />);
    });

    it("renders the component", function () {
        const component = getComponent();

        // verify that the component is rendered
        const input = ReactDOM.findDOMNode(component);
        expect(ReactTestUtils.isDOMComponent(input)).toBeTruthy();

        // make sure that the input is not required by default
        const elements = TestUtils.scryRenderedDOMNodesWithClass(component, "required");
        expect(elements.length).toBe(0);
    });

    it("shows input as required", function () {
        const component = getComponent({
            isRequired: true
        });

        // verify that the component is rendered
        const input = TestUtils.findRenderedDOMNodeWithClass(component, "required");
        expect(ReactTestUtils.isDOMComponent(input)).toBeTruthy();
    });

    it("shows the default value", function () {
        const component = getComponent({
            value: "my random value"
        });

        // verify that the component is rendered
        const input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        expect(input.value).toEqual("my random value");
    });

    it("shows placeholder", function () {
        const component = getComponent({
            placeholder: "edit me"
        });

        // verify that the component is rendered
        const input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        expect(input.getAttribute("placeholder")).toEqual("edit me");
    });

    it("respects value over defaultValue and state precedence", function () {
        const component = getComponent({
            defaultValue: "my random value",
            value: "my value"
        });

        // verify that the component is rendered
        const input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        expect(input.value).toEqual("my value");
    });

    it("fire onFocus callback when input gains focus", function () {
        const handleFocus = jest.fn();
        const component = getComponent({
            onFocus: handleFocus
        });

        const input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.focus(input);
        expect(handleFocus.mock.calls.length).toBe(1);
    });

    it("shows the error message when it is specified", function () {
        const errorMessage = "help!";
        const component = getComponent({
            errorMessage: errorMessage
        });

        const errorDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "form-text-field-error-message");
        expect(errorDiv.textContent).toBe(errorMessage);
    });

    it("shows the error message when it is specified with the new syntax - default type is error", function () {
        const message = "help!";
        const component = getComponent({
            message: message
        });

        const errorDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "form-text-field-error-message");
        expect(errorDiv.textContent).toBe(message);
    });

    it("shows an info message when specified", function () {
        const message = "help!";
        const messageType = FormTextField.messageTypes.INFO;

        const component = getComponent({
            message: message,
            messageType: messageType,
        });

        const infoLabel = TestUtils.scryRenderedDOMNodesWithClass(component, "input-message--info");
        expect(infoLabel).toBeTruthy();
    });

    it("triggers onChange callback when input updated", function () {
        const callback = jest.fn();
        const component = getComponent({ onChange: callback });
        const input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        ReactTestUtils.Simulate.change(input, { target: { value: "abc" } });

        expect(callback.mock.calls[0][0].target.value).toBe("abc");
    });

    it("renders label", function () {
        const component = getComponent({
            labelText: "some label",
        });

        expect(ReactDOM.findDOMNode(component).textContent).toBe("some label");
    });

    it("enables autocomplete", function () {
        const component = getComponent({
            autoComplete: true,
            useAutocomplete: true
        });
        const input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        expect(input.getAttribute("autoComplete")).toBe("on");
    });

    it("disables autocomplete", function () {
        const component = getComponent({
            autoComplete: false,
            useAutocomplete: true
        });
        const input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        expect(input.getAttribute("autoComplete")).toBe("nope");
    });

    it("accepts arbitary string for autocomplete", function () {
        const component = getComponent({
            autoComplete: "name",
            useAutocomplete: true
        });
        const input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        expect(input.getAttribute("autoComplete")).toBe("name");
    });

    it("masks field if property set", function () {
        const component = getComponent({
            maskValue: true
        });
        const input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        expect(input.getAttribute("type")).toBe("password");
    });

    it("renders with default data-id", function () {
        const component = getComponent();

        const field = TestUtils.findRenderedDOMNodeWithDataId(component, "form-text-field");

        expect(field).toBeTruthy();
    });

    it("renders with given data-id", function () {
        const component = getComponent({ "data-id": "myField" });

        const field = TestUtils.findRenderedDOMNodeWithDataId(component, "myField");

        expect(field).toBeTruthy();
    });

    it("stateless: toggles reveal state", function () {
        const handleReveal = jest.fn();
        const component = getComponent({
            showReveal: true,
            stateless: true,
            onToggleReveal: handleReveal
        });
        const reveal = TestUtils.findRenderedDOMNodeWithDataId(component, "reveal");

        ReactTestUtils.Simulate.click(reveal);

        expect(handleReveal).toBeCalled();
    });

    it("v4 stateful: toggles reveal state", function () {
        const component = getComponent({ flags: [ "p-stateful" ] });
        const container = ReactTestUtils.findRenderedComponentWithType(component, StateContainer);
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, FormTextField.FormTextFieldStateless);

        expect(container.state.reveal).toBe(false);

        stateless.props.onToggleReveal();

        expect(container.state.reveal).toBe(true);
    });

    it("fires onKeyPress when key is pressed", function () {
        const handleKeyPress = jest.fn();
        const component = getComponent({
            onKeyPress: handleKeyPress
        });

        const input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.keyPress(input, { keyCode: 13 });

        expect(handleKeyPress.mock.calls[0][0].keyCode).toBe(13);
    });

    it("fires onKeyDown when key is pressed down", function () {
        const handleKeyDown = jest.fn();
        const component = getComponent({
            onKeyDown: handleKeyDown
        });

        const input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 13 });

        expect(handleKeyDown.mock.calls[0][0].keyCode).toBe(13);
    });

    it("passes back value to onValueChange", function () {
        const callback = jest.fn();
        const component = getComponent({ onValueChange: callback });
        const input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        ReactTestUtils.Simulate.change(input, { target: { value: "abc" } });

        expect(callback).toBeCalled();
        expect(callback.mock.calls[0][0]).toBe("abc");
    });

    it("does not render undo button by default", function () {
        const component = getComponent();
        const undo = TestUtils.findRenderedDOMNodeWithDataId(component, "undo");

        expect(undo).toBeFalsy();
    });

    it("renders undo if showUndo is true", function () {
        const component = getComponent({ showUndo: true });
        const undo = TestUtils.findRenderedDOMNodeWithDataId(component, "undo");

        expect(undo).toBeTruthy();
    });

    it("triggers onMouseDown", function () {
        const handleMouseDown = jest.fn();
        const component = getComponent({
            onMouseDown: handleMouseDown
        });

        const input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.mouseDown(input);

        expect(handleMouseDown).toBeCalled();
    });

    it("triggers onSave when save is clicked", function () {
        const onSave = jest.fn();
        const component = getComponent({
            showSave: true,
            onSave: onSave
        });
        const save = TestUtils.findRenderedDOMNodeWithDataId(component, "save");

        ReactTestUtils.Simulate.click(save);

        expect(onSave).toBeCalled();
    });

    it("triggers onUndo when undo is clicked", function () {
        const onUndo = jest.fn();
        const component = getComponent({
            showUndo: true,
            onUndo: onUndo
        });
        const undo = TestUtils.findRenderedDOMNodeWithDataId(component, "undo");

        ReactTestUtils.Simulate.click(undo);

        expect(onUndo).toBeCalled();
    });

    it("stateful: displays a modified value state upon changing value prop", function () {
        const initialValue = "init";
        const TestParent = React.createFactory( class extends React.Component {
            state = { value: initialValue };

            render() {
                return <FormTextField value={this.state.value} />;
            }
        });

        const parent = ReactTestUtils.renderIntoDocument(TestParent());
        const component = TestUtils.findRenderedComponentWithType(parent, FormTextField);
        const input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        expect(component.props.value).toBe(initialValue);
        expect(input.value).toBe(initialValue);

        const newValue = "changed";
        parent.setState({
            value: newValue
        });

        expect(component.props.value).toBe(newValue);
        expect(input.value).toBe(newValue);
    });

    it("renders custom className", function () {
        const component = getComponent({ className: "extra" });
        const container = ReactDOM.findDOMNode(component);

        expect(container.getAttribute("class")).toContain("extra");
    });

    it("renders custom inputClassName", function () {
        const component = getComponent({ inputClassName: "foo" });
        const input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        expect(input.getAttribute("class")).toContain("foo");
    });

    /*
    TODO: fix this test
    NOTE: Currently we've not been able to test the react-tooltip helpHint in it's shown state. Since the React Tooltip
    does not populate its content until it is displayed, the content of the tooltip cannot yet be tested.
    */
    it("renders help tooltip", function () {
        const component = getComponent({
            labelText: "some label",
            labelHelpText: "some help",
            helpClassName: "bottom right"
        });
        // const help = TestUtils.findRenderedDOMNodeWithDataId(component, "help-tooltip");
        const lock = TestUtils.findRenderedDOMNodeWithDataId(component, "lock-tooltip");

        expect(lock).toBeFalsy();
        // expect(help.textContent).toBe("some help");
        // expect(help.getAttribute("class")).toContain("bottom right");
    });

    /*
    TODO: fix this test
    NOTE: Currently we've not been able to test the react-tooltip helpHint in it's shown state. Since the React Tooltip
    does not populate its content until it is displayed, the content of the tooltip cannot yet be tested.
    */
    it("renders lock tooltip", function () {
        const component = getComponent({
            labelText: "some label",
            labelLockText: "some lock text",
            helpClassName: "bottom right"
        });
        // const labelLockText = TestUtils.findRenderedDOMNodeWithDataId(component, "lock-tooltip");
        const help = TestUtils.findRenderedDOMNodeWithDataId(component, "help-tooltip");

        expect(help).toBeFalsy();
        //expect(labelLockText.textContent).toBe("some lock text");
        //expect(labelLockText.getAttribute("class")).toContain("bottom right");
    });

    it("gives a default data-id", function () {
        const component = getComponent();
        const input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        expect(input.getAttribute("data-id")).toEqual("form-text-field-input");
    });

    /*
    TODO: fix this test
    NOTE: Currently we've not been able to test the react-tooltip helpHint in it's shown state. Since the React Tooltip
    does not populate its content until it is displayed, the content of the tooltip cannot yet be tested.
    */
    it("it is disabled and renders help tooltip", function () {
        const component = getComponent({
            labelText: "some label",
            labelHelpText: "some help",
            disabled: true
        });

        // const help = TestUtils.findRenderedDOMNodeWithDataId(component, "help-tooltip");
        // expect(help.textContent).toBe("some help");

        const input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        expect(ReactTestUtils.isDOMComponent(input)).toBeTruthy();
        expect(input.disabled).toBeTruthy();
    });


    it("does not apply the input type if not specified", function () {
        const component = getComponent(),
            input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        expect(input.getAttribute("type")).toEqual("text");
    });

    it("renders the size attr", function () {
        const component = getComponent({
            size: 5
        });

        const input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        expect(input.getAttribute("size")).toEqual("5");
    });

    it("it applies the input type when specified", function () {
        const type = "email",
            component = getComponent({
                type: type,
                stateless: true
            }),
            input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        expect(input.getAttribute("type")).toEqual(type);
    });

    it("v3: shows content measuring DOM when flexWidth is true", function () {
        const initialValue = "initial input text";
        const newValue = "something really long entered into the text input for testing purposes";
        const component = getComponent({
            "data-id": "ftf",
            flexWidth: true,
            required: false,
            label: "test",
            initialState: {
                value: initialValue,
            }
        });
        const input = TestUtils.findRenderedDOMNodeWithDataId(component, "ftf-input");
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, FormTextField.FormTextFieldStateless);
        const contentMeasurer = TestUtils.findRenderedDOMNodeWithDataId(component, "ftf-content-measurer");

        jest.runAllTimers();

        expect(input.value).toEqual(initialValue);
        expect(contentMeasurer).toBeTruthy();
        expect(stateless.pwChar).toEqual("•");

        ReactTestUtils.Simulate.change(input, { target: { value: newValue } });
        expect(input.value).toEqual(newValue);

        // Im not able get any information from the content-measurer and it seems that the style attribute of the
        // input is not updating in the test even though it does so in a browser
        // TODO: figure out a way to test this functionality
    });

    it("v4: shows content measuring DOM when flexWidth is true", function () {
        const initialValue = "initial input text";
        const newValue = "something really long entered into the text input for testing purposes";
        const component = getComponent({
            "data-id": "ftf",
            stateless: false,
            flexWidth: true,
            required: false,
            label: "test",
            initialState: {
                value: initialValue
            },
            flags: [ "p-stateful" ],
        });
        const input = TestUtils.findRenderedDOMNodeWithDataId(component, "ftf-input");
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, FormTextField.FormTextFieldStateless);
        const contentMeasurer = TestUtils.findRenderedDOMNodeWithDataId(component, "ftf-content-measurer");

        jest.runAllTimers();

        expect(input.value).toEqual(initialValue);
        expect(contentMeasurer).toBeTruthy();
        expect(stateless.pwChar).toEqual("•");

        ReactTestUtils.Simulate.change(input, { target: { value: newValue } });
        expect(input.value).toEqual(newValue);

        // Im not able get any information from the content-measurer and it seems that the style attribute of the
        // input is not updating in the test even though it does so in a browser
        // TODO: figure out a way to test this functionality
    });

    it("sets the proper input type", function () {
        const component = getComponent({
                "data-id": "ftf",
                type: "password"
            }),
            input = TestUtils.findRenderedDOMNodeWithDataId(component, "ftf-input");

        expect(input.type).toEqual("password");
    });

    it("uses proper password character for IE when flexWidth is true", function () {
        window.navigator.__defineGetter__("userAgent", function () {
            return "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko";
        });

        const component = getComponent({
            "data-id": "ftf",
            flexWidth: true
        });
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, FormTextField.FormTextFieldStateless);

        expect(stateless.pwChar).toEqual("●");
    });

    it("logs warning for type color when not in production", function () {
        console.warn = jest.fn();
        getComponent({ type: "color" });

        expect(console.warn).toBeCalledWith("Please use the ColorPicker component.");
    });

    it("does not log warning for type color when in production", function () {
        //Mock process.env.NODE_ENV
        process.env.NODE_ENV = "production";

        console.warn = jest.fn();
        getComponent({ type: "color" });

        expect(console.warn).not.toBeCalled();
        delete process.env.NODE_ENV;
    });

    it("throws error when deprecated prop 'controlled' is passed in", function () {
        const expectedError = new Error(Utils.deprecatePropError("controlled", "stateless", "false", "true"));

        expect(function () {
            getComponent({ controlled: true });
        }).toThrow(expectedError);
    });

    it("renders right and left icons", function() {
        const component = getComponent({ iconRight: "globe", iconLeft: "settings" });

        const leftIcon = TestUtils.findRenderedDOMNodeWithClass(component, "input-icon--left");
        const rightIcon = TestUtils.findRenderedDOMNodeWithClass(component, "input-icon--left");

        expect(leftIcon).toBeTruthy();
        expect(rightIcon).toBeTruthy();
    });

    it("selects on focus", function() {
        const component = getComponent({ value: "something", selectOnFocus: true });
        const input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        input.select = jest.fn();

        expect(input.select).not.toBeCalled();
        ReactTestUtils.Simulate.focus(input);
        expect(input.select).toBeCalled();
    });

    it("makes width bigger", function() {
        const component = getComponent({ value: "something", flexWidth: true });
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, FormTextField.FormTextFieldStateless);

        stateless.initialInputWidth = 100;
        stateless._contentMeasurerLabel = { offsetWidth: 150 };
        stateless.lastValue = "something else";
        stateless.setState({ nothing: "nothing" }); // force update

        expect(stateless.state.labelWidth).toBe(160);
    });

    it("makes width initial for a password field", function() {
        const component = getComponent({ value: "something", flexWidth: true, maskValue: true, reveal: false });
        const stateless = ReactTestUtils.findRenderedComponentWithType(component, FormTextField.FormTextFieldStateless);

        stateless.initialInputWidth = 100;
        stateless._contentMeasurerLabel = { offsetWidth: 90 };
        stateless.lastValue = "something else";
        stateless.setState({ nothing: "nothing" }); // force update

        expect(stateless.state.labelWidth).toBe(100);
    });

    it("doesn't fire toggle callback when disabled", function() {
        const handleReveal = jest.fn();
        const component = getComponent({
            showReveal: true,
            stateless: true,
            disabled: true,
            onToggleReveal: handleReveal
        });
        const reveal = TestUtils.findRenderedDOMNodeWithDataId(component, "reveal");

        ReactTestUtils.Simulate.click(reveal);

        expect(handleReveal).not.toBeCalled();
    });

});
