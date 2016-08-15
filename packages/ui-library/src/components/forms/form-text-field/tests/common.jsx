module.exports = function (getComponent) {
    var ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../../testutil/TestUtils");

    //XXX: Once v1 is deprecated, replace the logic which finds nodes by class to by data-id
    //until then, the tests need to support both versions so very difficult to do.

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
        var errorMessage = "help!";
        var component = getComponent({
            errorMessage: errorMessage
        });

        var errorDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "form-text-field-error-message") ||
                       TestUtils.findRenderedDOMNodeWithDataId(component, "formTextField_errormessage");

        expect(errorDiv.textContent).toBe(errorMessage);
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

    it("masks field if property set", function () {
        var component = getComponent({
            maskValue: true
        });
        var input = TestUtils.findRenderedDOMNodeWithTag(component, "input");

        expect(input.getAttribute("type")).toBe("password");
    });
};
