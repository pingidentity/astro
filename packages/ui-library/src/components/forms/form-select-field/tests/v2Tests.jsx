
jest.dontMock("./commonTests.jsx");
jest.dontMock("../v2.jsx");
jest.dontMock("../../FormError.jsx");
jest.dontMock("../../FormLabel.jsx");

describe("FormSelectField", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../../testutil/TestUtils"),
        FormSelectField = require("../v2.jsx"),
        CommonTests = require("./commonTests.jsx"),
        _ = require("underscore");

    function getComponent (props) {
        props = _.defaults(props || {}, {
            controlled: true,
            options: [
                { value: 1, label: "one" },
                { value: 2, label: "two" }
            ],
            value: "2",
            onChange: jest.genMockFunction(),
            onValueChange: jest.genMockFunction()
        });

        return ReactTestUtils.renderIntoDocument(<FormSelectField {...props} />);
    }

    CommonTests(getComponent);

    it("should render with default data-id", function () {
        var component = getComponent();

        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "form-select-field");

        expect(select).toBeTruthy();
    });

    it("renders the component with a data object", function () {
        var component = getComponent();

        var label = TestUtils.findRenderedDOMNodeWithClass(component, "input-select");
        var select = TestUtils.findRenderedDOMNodeWithTag(component, "select");
        var options = TestUtils.scryRenderedDOMNodesWithTag(component, "option");

        expect(ReactTestUtils.isDOMComponent(label)).toBeTruthy();

        expect(select.value).toBe("2");

        expect(options.length).toBe(2);
        expect(options[0].getAttribute("value")).toBe("1");
        expect(options[0].textContent).toBe("one");
        expect(options[1].getAttribute("value")).toBe("2");
        expect(options[1].textContent).toBe("two");
    });

    it("should render with the data-id given", function () {
        var component = getComponent({ "data-id": "mySelect" });

        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "mySelect");

        expect(select).toBeTruthy();
    });

    it("adds the none option when specified with a data array of objects", function () {
        var noneOptionText = "Select an option";
        var noneOptionValue = "0";

        var component = getComponent({
            options: [
                { value: 1, label: "one" },
                { value: 2, label: "two" }
            ],
            value: "0",
            noneOption: { label: noneOptionText, value: noneOptionValue }
        });

        var options = TestUtils.scryRenderedDOMNodesWithTag(component, "option");
        expect(options[0].textContent).toBe(noneOptionText);
        expect(options[0].getAttribute("value")).toBe(noneOptionValue);
    });

    it("stateless: fires the onChange & onValueChange callback when selection changes", function () {
        var component = getComponent();

        var select = TestUtils.findRenderedDOMNodeWithTag(component, "select");
        ReactTestUtils.Simulate.change(select, { target: { value: "1" } } );

        expect(component.props.onChange).toBeCalled();
        expect(component.props.onValueChange).toBeCalled();
    });

    it("stateful: onChange callback should change selection", function () {
        var component = getComponent({ controlled: false }),
            componentRef = component.refs.FormSelectFieldStateful,
            select = TestUtils.findRenderedDOMNodeWithTag(component, "select");

        expect(componentRef.state.value).toBe("2");

        ReactTestUtils.Simulate.change(select, { target: { value: "1" } });

        expect(componentRef.state.value).toBe("1");
    });

    it("stateful: _handleChange callback updates state value", function () {
        var component = getComponent({ controlled: false }),
            componentRef = component.refs.FormSelectFieldStateful;

        componentRef._handleChange({ target: { value: "1" } });

        expect(componentRef.state.value).toBe("1");
    });

    it("is disabled when it is specified", function () {
        var component = getComponent({
            disabled: true
        });

        var select = TestUtils.findRenderedDOMNodeWithTag(component, "select");
        expect(ReactTestUtils.isDOMComponent(select)).toBeTruthy();
        expect(select.disabled).toBeTruthy();
    });

    it("logs deprecated message when not in production", function () {
        console.warn = jest.genMockFunction();
        getComponent();

        expect(console.warn).toBeCalledWith(
            "** This component is deprecated and will be removed in an upcoming release. " +
            "See the \"FormDropDownList\" component for a replacement.");
    });

    it("does not log deprecation message when in production", function () {
        //Mock process.env.NODE_ENV
        process.env.NODE_ENV = "production";

        console.warn = jest.genMockFunction();
        getComponent();

        expect(console.warn).not.toBeCalled();
        delete process.env.NODE_ENV;
    });
});
