window.__DEV__ = true;

jest.dontMock("../v2");
jest.dontMock("../index.js");
jest.dontMock("../../FormLabel");
jest.dontMock("../../FormError");
jest.dontMock("../../../tooltips/HelpHint");

describe("FormTextField", function () {
    var React = require("react"),
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
            required: legacyProp(opts, "required", "isRequired", false)
        });

        return ReactTestUtils.renderIntoDocument(<FormTextField {...opts} />);
    }


    it("renders the component", function () {
        var component = getComponent();

        // verify that the component is rendered
        var input = ReactDOM.findDOMNode(component);
        expect(ReactTestUtils.isDOMComponent(input)).toBeTruthy();

        // make sure that the input is not required by default
        var elements = TestUtils.scryRenderedDOMNodesWithClass(component, "required");
        expect(elements.length).toBe(0);
    });

    it("shows input as required", function () {
        var component = getComponent({
            isRequired: true
        });

        // verify that the component is rendered
        var input = TestUtils.findRenderedDOMNodeWithClass(component, "required");
        expect(ReactTestUtils.isDOMComponent(input)).toBeTruthy();
    });

    it("shows the default value", function () {
        var component = getComponent({
            value: "my random value"
        });

        // verify that the component is rendered
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        expect(input.value).toEqual("my random value");
    });

    it("shows placeholder", function () {
        var component = getComponent({
            placeholder: "edit me"
        });

        // verify that the component is rendered
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        expect(input.getAttribute("placeholder")).toEqual("edit me");
    });

    it("respects value over defaultValue and state precedence", function () {
        var component = getComponent({
            defaultValue: "my random value",
            value: "my value"
        });

        // verify that the component is rendered
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        expect(input.value).toEqual("my value");
    });

    it("fire onFocus callback when input gains focus", function () {
        var handleFocus = jest.genMockFunction();
        var component = getComponent({
            onFocus: handleFocus
        });

        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
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
        var callback = jest.genMockFunction();
        var component = getComponent({ onChange: callback });
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        ReactTestUtils.Simulate.change(input, { target: { value: "abc" } });

        expect(callback.mock.calls[0][0].target.value).toBe("abc");
    });

    it("renders label", function () {
        var component = getComponent({
            labelText: "some label",
        });

        expect(ReactDOM.findDOMNode(component).textContent).toBe("some label");
    });

    it("enables autocomplete", function () {
        var component = getComponent({
            autoComplete: true,
            useAutocomplete: true
        });
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        expect(input.getAttribute("autoComplete")).toBe("on");
    });

    it("disables autocomplete", function () {
        var component = getComponent({
            autoComplete: false,
            useAutocomplete: true
        });
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        expect(input.getAttribute("autoComplete")).toBe("nope");
    });

    it("accepts arbitary string for autocomplete", function () {
        var component = getComponent({
            autoComplete: "name",
            useAutocomplete: true
        });
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        expect(input.getAttribute("autoComplete")).toBe("name");
    });

    it("masks field if property set", function () {
        var component = getComponent({
            maskValue: true
        });
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        expect(input.getAttribute("type")).toBe("password");
    });

    it("renders with default data-id", function () {
        var component = getComponent();

        var field = TestUtils.findRenderedDOMNodeWithDataId(component, "form-text-field");

        expect(field).toBeTruthy();
    });

    it("renders with given data-id", function () {
        var component = getComponent({ "data-id": "myField" });

        var field = TestUtils.findRenderedDOMNodeWithDataId(component, "myField");

        expect(field).toBeTruthy();
    });

    it("stateless: toggles reveal state", function () {
        var handleReveal = jest.genMockFunction();
        var component = getComponent({
            showReveal: true,
            stateless: true,
            onToggleReveal: handleReveal
        });
        var reveal = TestUtils.findRenderedDOMNodeWithDataId(component, "reveal");

        ReactTestUtils.Simulate.click(reveal);

        expect(handleReveal).toBeCalled();
    });

    it("stateful: toggles reveal state", function () {
        var component = getComponent(),
            componentRef = component.refs.stateful;

        expect(componentRef.state.reveal).toBe(false);

        componentRef._handleToggleReveal();

        expect(componentRef.state.reveal).toBe(true);
    });

    it("fires onKeyPress when key is pressed", function () {
        var handleKeyPress = jest.genMockFunction();
        var component = getComponent({
            onKeyPress: handleKeyPress
        });

        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.keyPress(input, { keyCode: 13 });

        expect(handleKeyPress.mock.calls[0][0].keyCode).toBe(13);
    });

    it("fires onKeyDown when key is pressed down", function () {
        var handleKeyDown = jest.genMockFunction();
        var component = getComponent({
            onKeyDown: handleKeyDown
        });

        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.keyDown(input, { keyCode: 13 });

        expect(handleKeyDown.mock.calls[0][0].keyCode).toBe(13);
    });

    it("passes back value to onValueChange", function () {
        var callback = jest.genMockFunction();
        var component = getComponent({ onValueChange: callback });
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        ReactTestUtils.Simulate.change(input, { target: { value: "abc" } });

        expect(callback).toBeCalledWith("abc");
    });

    it("does not render undo button by default", function () {
        var component = getComponent();
        var undo = TestUtils.findRenderedDOMNodeWithDataId(component, "undo");

        expect(undo).toBeFalsy();
    });

    it("renders undo if showUndo is true", function () {
        var component = getComponent({ showUndo: true });
        var undo = TestUtils.findRenderedDOMNodeWithDataId(component, "undo");

        expect(undo).toBeTruthy();
    });

    it("triggers onMouseDown", function () {
        var handleMouseDown = jest.genMockFunction();
        var component = getComponent({
            onMouseDown: handleMouseDown
        });

        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        ReactTestUtils.Simulate.mouseDown(input);

        expect(handleMouseDown).toBeCalled();
    });

    it("triggers onSave when save is clicked", function () {
        var onSave = jest.genMockFunction();
        var component = getComponent({
            showSave: true,
            onSave: onSave
        });
        var save = TestUtils.findRenderedDOMNodeWithDataId(component, "save");

        ReactTestUtils.Simulate.click(save);

        expect(onSave).toBeCalled();
    });

    it("triggers onUndo when undo is clicked", function () {
        var onUndo = jest.genMockFunction();
        var component = getComponent({
            showUndo: true,
            onUndo: onUndo
        });
        var undo = TestUtils.findRenderedDOMNodeWithDataId(component, "undo");

        ReactTestUtils.Simulate.click(undo);

        expect(onUndo).toBeCalled();
    });

    it("stateful: displays a modified value state upon changing value prop", function () {
        var initialValue = "init";
        var TestParent = React.createFactory( class extends React.Component {
            state = { value: initialValue };

            render() {
                return <FormTextField value={this.state.value} />;
            }
        });

        var parent = ReactTestUtils.renderIntoDocument(TestParent());
        var component = TestUtils.findRenderedComponentWithType(parent, FormTextField);
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        expect(component.props.value).toBe(initialValue);
        expect(input.value).toBe(initialValue);

        var newValue = "changed";
        parent.setState({
            value: newValue
        });

        expect(component.props.value).toBe(newValue);
        expect(input.value).toBe(newValue);
    });

    it("renders custom className", function () {
        var component = getComponent({ className: "extra" });
        var container = ReactDOM.findDOMNode(component);

        expect(container.getAttribute("class")).toContain("extra");
    });

    it("renders custom inputClassName", function () {
        var component = getComponent({ inputClassName: "foo" });
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        expect(input.getAttribute("class")).toContain("foo");
    });

    /*
    TODO: fix this test
    NOTE: Currently we've not been able to test the react-tooltip helpHint in it's shown state. Since the React Tooltip
    does not populate its content until it is displayed, the content of the tooltip cannot yet be tested.
    */
    it("renders help tooltip", function () {
        var component = getComponent({
            labelText: "some label",
            labelHelpText: "some help",
            helpClassName: "bottom right"
        });
        // var help = TestUtils.findRenderedDOMNodeWithDataId(component, "help-tooltip");
        var lock = TestUtils.findRenderedDOMNodeWithDataId(component, "lock-tooltip");

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
        var component = getComponent({
            labelText: "some label",
            labelLockText: "some lock text",
            helpClassName: "bottom right"
        });
        // var labelLockText = TestUtils.findRenderedDOMNodeWithDataId(component, "lock-tooltip");
        var help = TestUtils.findRenderedDOMNodeWithDataId(component, "help-tooltip");

        expect(help).toBeFalsy();
        //expect(labelLockText.textContent).toBe("some lock text");
        //expect(labelLockText.getAttribute("class")).toContain("bottom right");
    });

    it("gives a default data-id", function () {
        var component = getComponent();
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        expect(input.getAttribute("data-id")).toEqual("form-text-field-input");
    });

    /*
    TODO: fix this test
    NOTE: Currently we've not been able to test the react-tooltip helpHint in it's shown state. Since the React Tooltip
    does not populate its content until it is displayed, the content of the tooltip cannot yet be tested.
    */
    it("it is disabled and renders help tooltip", function () {
        var component = getComponent({
            labelText: "some label",
            labelHelpText: "some help",
            disabled: true
        });

        // var help = TestUtils.findRenderedDOMNodeWithDataId(component, "help-tooltip");
        // expect(help.textContent).toBe("some help");

        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");
        expect(ReactTestUtils.isDOMComponent(input)).toBeTruthy();
        expect(input.disabled).toBeTruthy();
    });


    it("does not apply the input type if not specified", function () {
        var component = getComponent(),
            input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        expect(input.getAttribute("type")).toEqual("text");
    });

    it("it applies the input type when specified", function () {
        var type = "email",
            component = getComponent({
                type: type,
                stateless: true
            }),
            input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        expect(input.getAttribute("type")).toEqual(type);
    });

    it("shows content measuring DOM when flexWidth is true", function () {
        var initialValue = "initial input text",
            newValue = "something really long entered into the text input for testing purposes",
            component = getComponent({
                "data-id": "ftf",
                stateless: false,
                flexWidth: true,
                required: false,
                label: "test",
                value: initialValue
            }),
            input = TestUtils.findRenderedDOMNodeWithDataId(component, "ftf-input"),
            componentRef = component.refs.stateful.refs.stateless,
            contentMeasurer = TestUtils.findRenderedDOMNodeWithDataId(component, "ftf-content-measurer");

        jest.runAllTimers();

        expect(input.value).toEqual(initialValue);
        expect(contentMeasurer).toBeTruthy();
        expect(componentRef.pwChar).toEqual("•");

        ReactTestUtils.Simulate.change(input, { target: { value: newValue } });
        expect(input.value).toEqual(newValue);

        // Im not able get any information from the content-measurer and it seems that the style attribute of the
        // input is not updating in the test even though it does so in a browser
        // TODO: figure out a way to test this functionality
    });

    it("sets the proper input type", function () {
        var component = getComponent({
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

        var component = getComponent({
                "data-id": "ftf",
                flexWidth: true
            }),
            componentRef = component.refs.stateful.refs.stateless;

        expect(componentRef.pwChar).toEqual("●");
    });

    it("logs warning for type color when not in production", function () {
        console.warn = jest.genMockFunction();
        getComponent({ type: "color" });

        expect(console.warn).toBeCalledWith("Please use the ColorPicker component.");
    });

    it("does not log warning for type color when in production", function () {
        //Mock process.env.NODE_ENV
        process.env.NODE_ENV = "production";

        console.warn = jest.genMockFunction();
        getComponent({ type: "color" });

        expect(console.warn).not.toBeCalled();
        delete process.env.NODE_ENV;
    });

    it("throws error when deprecated prop 'controlled' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("controlled", "stateless", "false", "true"));

        expect(function () {
            getComponent({ controlled: true });
        }).toThrow(expectedError);
    });

});
